import matter from "gray-matter"
import remarkFrontmatter from "remark-frontmatter"
import { QuartzTransformerPlugin } from "../types"
import yaml from "js-yaml"
import toml from "toml"
import { slugTag } from "../../util/path"
import { QuartzPluginData } from "../vfile"
import { i18n } from "../../i18n"

export interface Options {
  delimiters: string | [string, string];
  language: "yaml" | "toml";
  filter?: {
    include?: string[];
    exclude?: string[];
  };
}

const defaultOptions: Options = {
  delimiters: "---",
  language: "yaml",
};

function filterFrontmatter<T extends Record<string, any>>(frontmatter: T, options: Options): T {
  const { filter } = options;
  if (!filter) {
    return frontmatter;
  }

  const { include, exclude } = filter;
  let filteredFrontmatter: Record<string, any> = {};

  if (include) {
    include.forEach((key) => {
      if (key in frontmatter) {
        filteredFrontmatter[key] = frontmatter[key];
      }
    });
  } else {
    filteredFrontmatter = { ...frontmatter };
  }

  if (exclude) {
    exclude.forEach((key) => {
      if (key in filteredFrontmatter) {
        delete filteredFrontmatter[key];
      }
    });
  }
  return filteredFrontmatter as T;
}

function coalesceAliases(data: { [key: string]: any }, aliases: string[]) {
  for (const alias of aliases) {
    if (data[alias] !== undefined && data[alias] !== null) return data[alias]
  }
}

function coerceToArray(input: string | string[]): string[] | undefined {
  if (input === undefined || input === null) return undefined

  // coerce to array
  if (!Array.isArray(input)) {
    input = input
      .toString()
      .split(",")
      .map((tag: string) => tag.trim())
  }

  // remove all non-strings
  return input
    .filter((tag: unknown) => typeof tag === "string" || typeof tag === "number")
    .map((tag: string | number) => tag.toString())
}

function normalizeKeys(data: { [key: string]: any }) {
  const normalizedData: { [key: string]: any } = {}
  for (const key of Object.keys(data)) {
    normalizedData[key.toLowerCase()] = data[key]
  }
  return normalizedData
}

export const FrontMatter: QuartzTransformerPlugin<Partial<Options> | undefined> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "FrontMatter",
    markdownPlugins({ cfg }) {
      return [
        [remarkFrontmatter, ["yaml", "toml"]],
        () => {
          return (_, file) => {
            const content = Buffer.from(file.value).toString();
            const { data, content: matterContent, excerpt, orig } = matter(content, {
              ...opts,
              engines: {
                yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
                toml: (s) => toml.parse(s) as object,
              },
            });

            // Filter frontmatter before normalization
            const filteredData = filterFrontmatter(data, opts);

            const normalizedData = normalizeKeys(filteredData);

            if (normalizedData.title != null && normalizedData.title.toString() !== "") {
              normalizedData.title = normalizedData.title.toString()
            } else {
              normalizedData.title = file.stem ?? i18n(cfg.configuration.locale).propertyDefaults.title
            }

            const tags = coerceToArray(coalesceAliases(normalizedData, ["tags", "tag"]))
            if (tags) normalizedData.tags = [...new Set(tags.map((tag: string) => slugTag(tag)))]

            const aliases = coerceToArray(coalesceAliases(normalizedData, ["aliases", "alias"]))
            if (aliases) normalizedData.aliases = aliases
            const cssclasses = coerceToArray(coalesceAliases(normalizedData, ["cssclasses", "cssclass"]))
            if (cssclasses) normalizedData.cssclasses = cssclasses

            // Add the unparsed frontmatter text to the normalizedData
            const frontmatterMatch = content.match(/---\n([\s\S]*?)\n---/);
            if (frontmatterMatch) {
              normalizedData.text = frontmatterMatch[1];
            }

            file.data.frontmatter = normalizedData as QuartzPluginData["frontmatter"]
          }
        },
      ]
    },
  }
}

declare module "vfile" {
  interface DataMap {
    frontmatter: { [key: string]: unknown } & {
      title: string
    } & Partial<{
        tags: string[]
        aliases: string[]
        description: string
        publish: boolean
        draft: boolean
        lang: string
        enableToc: string
        cssclasses: string[]
        text: string
        links: string[] // Add links here
      }>
  }
}

