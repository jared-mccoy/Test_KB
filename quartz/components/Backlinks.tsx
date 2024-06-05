import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types";
import style from "./styles/backlinks.scss";
import { resolveRelative, simplifySlug, SimpleSlug, FullSlug } from "../util/path";
import { i18n } from "../i18n";
import { classNames } from "../util/lang";
import { DataMap } from "vfile";

function coerceToArray(input: string | string[]): string[] | undefined {
  if (input === undefined || input === null) return undefined;

  if (!Array.isArray(input)) {
    input = input
      .toString()
      .split(",")
      .map((tag: string) => tag.trim());
  }

  return input.filter((tag: unknown) => typeof tag === "string" || typeof tag === "number").map((tag: string | number) => tag.toString());
}

function extractLinks(data: { [key: string]: any }) {
  const links: { [key: string]: string[] } = {};

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const values = coerceToArray(data[key]);
      if (values) {
        links[key] = [];
        values.forEach(value => {
          const match = value.match(/\[\[([^[\]]+)\|([^[\]]+)\]\]/);
          if (match) {
            links[key].push(match[1]);
          }
        });
      }
    }
  }
  return links;
}

const Backlinks: QuartzComponent = ({
  fileData,
  allFiles,
  displayClass,
  cfg,
}: QuartzComponentProps) => {
  const slug = simplifySlug(fileData.slug!);

  // Extract and push frontmatter links to root links, ensuring uniqueness
  allFiles.forEach((file) => {
    const data = file as DataMap | undefined;
    if (data?.frontmatter) {
      const frontmatterLinks = extractLinks(data.frontmatter);
      for (const key in frontmatterLinks) {
        const links = frontmatterLinks[key].map(link => simplifySlug(link as FullSlug));
        const uniqueLinks = new Set([...(file.links || []), ...links]);
        file.links = Array.from(uniqueLinks);
      }
    }
  });

  const backlinkFiles = allFiles.filter((file) => file.links?.includes(slug));

  // Function to render a property row
  const renderProperty = (key: string, value: any) => {
    if (Array.isArray(value)) {
      return (
        <tr key={key}>
          <td>{key}</td>
          <td>
            <ul>
              {value.map((item, index) => {
                const match = item.match(/\[\[([^[\]]+)\|([^[\]]+)\]\]/);
                if (match) {
                  const link = match[1];
                  const title = match[2];
                  return (
                    <li key={index}>
                      <a href={resolveRelative(fileData.slug!, simplifySlug(link as FullSlug))} class="internal">
                        {title}
                      </a>
                    </li>
                  );
                }
                return <li key={index}>{item}</li>;
              })}
            </ul>
          </td>
        </tr>
      );
    } else {
      const match = value.match(/\[\[([^[\]]+)\|([^[\]]+)\]\]/);
      if (match) {
        const link = match[1];
        const title = match[2];
        return (
          <tr key={key}>
            <td>{key}</td>
            <td>
              <a href={resolveRelative(fileData.slug!, simplifySlug(link as FullSlug))} class="internal">
                {title}
              </a>
            </td>
          </tr>
        );
      }
      return (
        <tr key={key}>
          <td>{key}</td>
          <td>{value}</td>
        </tr>
      );
    }
  };

  return (
    <div class={classNames(displayClass, "backlinks")}>
      <h3>{i18n(cfg.locale).components.backlinks.title}</h3>
      <table class="frontmatter-table">
        <tbody>
          {Object.entries(fileData.frontmatter || {}).map(([key, value]) => renderProperty(key, value))}
          <tr>
            <td>Backlinks</td>
            <td>
              {backlinkFiles.length > 0 ? (
                <ul>
                  {backlinkFiles.map((f) => (
                    <li key={f.slug}>
                      <a href={resolveRelative(fileData.slug!, f.slug!)} class="internal">
                        {f.frontmatter?.title}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                i18n(cfg.locale).components.backlinks.noBacklinksFound
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

Backlinks.css = style;
export default (() => Backlinks) satisfies QuartzComponentConstructor;
