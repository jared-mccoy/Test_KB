import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types";
import style from "./styles/backlinks.scss";
import { resolveRelative, simplifySlug, SimpleSlug, FullSlug } from "../util/path";
import { i18n } from "../i18n";
import { classNames } from "../util/lang";
import { DataMap } from "vfile";

interface BacklinkData {
  title: string | undefined;
  url: string;
}

const Properties: QuartzComponent = ({
  fileData,
  allFiles,
  displayClass,
  cfg,
}: QuartzComponentProps) => {
  const slug = simplifySlug(fileData.slug!);

  const backLinks: BacklinkData[] = allFiles.filter((file) => file.links?.includes(slug)).map((f) => ({
    title: f.frontmatter?.title,
    url: resolveRelative(fileData.slug!, f.slug!),
  }));

  const renderProperty = (key: string, value: any) => {
    if (key === "title" || key === "links" || key === 'text') return null; // Skip rendering the title and links properties

    const wikilinkRegex = /\[\[([^[\]]*(?:\[[^[\]]*\])*[^[\]]*)\]\]/;
    const urlRegex = /https?:\/\/[^\s]+/;

    // Coerce all values to arrays
    const values = Array.isArray(value) ? value : [value];

    return (
      <tr key={key}>
        <td class="prop-key">{key}:</td>
        <td class="prop-value">
          {values.map((item, index) => {
            if (typeof item !== "string") return <div key={index}>{item}</div>;

            const wikilinkMatch = item.match(wikilinkRegex);
            const urlMatch = item.match(urlRegex);

            if (wikilinkMatch) {
              const parts = wikilinkMatch[1].split("|");
              const link = parts[0];
              const title = parts[1] || link;
              if (allFiles.some(f => simplifySlug(f.slug!) === simplifySlug(link as FullSlug))) {
                return (
                  <div key={index}>
                    <a href={resolveRelative(fileData.slug!, simplifySlug(link as FullSlug))} class="internal">
                      {title}
                    </a>
                  </div>
                );
              } else {
                // Remove the non-matching wikilink item
                return null;
              }
            } else if (urlMatch) {
              return (
                <div key={index}>
                  <a href={item} class="external" target="_blank" rel="noopener noreferrer">
                    {item}
                  </a>
                </div>
              );
            }

            return <div key={index}>{item}</div>;
          }).filter(Boolean)} {/* Remove null values */}
        </td>
      </tr>
    );
  };

  return (
    <div class={classNames(displayClass, "backlinks")}>
      <h3>{i18n(cfg.locale).components.backlinks.title}</h3>
      <table>
        <tbody>
          {Object.entries(fileData.frontmatter || {}).map(([key, value]) => renderProperty(key, value))}
          {backLinks.length > 0 && (
            <tr>
              <td class="prop-key">backlinks:</td>
              <td class="prop-value">
                {backLinks.map((backlink, index) => (
                  <div key={index}>
                    <a href={backlink.url} class="internal">
                      {backlink.title}
                    </a>
                  </div>
                ))}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

Properties.css = style;
export default (() => Properties) satisfies QuartzComponentConstructor;
