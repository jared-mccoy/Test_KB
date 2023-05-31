import { PluggableList } from "unified"
import { QuartzTransformerPlugin } from "../types"
import { remarkWikiLink } from "@flowershow/remark-wiki-link"
import { relative, relativeToRoot, slugify } from "../../path"
import path from "path"
import { visit } from 'unist-util-visit'
import isAbsoluteUrl from "is-absolute-url"

interface Options {
  /** How to resolve Markdown paths */
  markdownLinkResolution: 'absolute' | 'relative'
  /** Strips folders from a link so that it looks nice */
  prettyLinks: boolean
}

const defaultOptions: Options = {
  markdownLinkResolution: 'absolute',
  prettyLinks: true
}

export class LinkProcessing extends QuartzTransformerPlugin {
  name = "LinkProcessing"
  opts: Options

  constructor(opts?: Options) {
    super()
    this.opts = { ...defaultOptions, ...opts }
  }

  markdownPlugins(): PluggableList {
    return [[remarkWikiLink, {
      pathFormat: this.opts.markdownLinkResolution === "absolute" ? 'obsidian-absolute' : 'raw'
    }]]
  }

  htmlPlugins(): PluggableList {
    return [() => {
      return (tree, file) => {
        const curSlug = file.data.slug! 
        const transformLink = (target: string) => {
          const targetSlug = slugify(decodeURI(target))
          if (this.opts.markdownLinkResolution === 'relative' && !path.isAbsolute(targetSlug)) {
            return './' + relative(curSlug, targetSlug)
          } else {
            return './' + relativeToRoot(curSlug, targetSlug)
          }
        }

        // rewrite all links
        visit(tree, 'element', (node, _index, _parent) => {
          if (
            node.tagName === 'a' &&
            node.properties &&
            typeof node.properties.href === 'string'
          ) {
            node.properties.className = isAbsoluteUrl(node.properties.href) ? "external" : "internal"

            // don't process external links or intra-document anchors
            if (!(isAbsoluteUrl(node.properties.href) || node.properties.href.startsWith("#"))) {
              node.properties.href = transformLink(node.properties.href)
            }

            if (this.opts.prettyLinks && node.children.length === 1 && node.children[0].type === 'text') {
              node.children[0].value = path.basename(node.children[0].value)
            }
          }
        })

        // transform all images
        visit(tree, 'element', (node, _index, _parent) => {
          if (
            node.tagName === 'img' &&
            node.properties &&
            typeof node.properties.src === 'string'
          ) {
            if (!isAbsoluteUrl(node.properties.src)) {
              const ext = path.extname(node.properties.src)
              node.properties.src = transformLink("/assets/" + node.properties.src) + ext
            }
          }
        })
      }
    }]
  }
}