import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types";
import style from "./styles/backlinks.scss";
import { resolveRelative, simplifySlug, SimpleSlug, FullSlug } from "../util/path";
import { i18n } from "../i18n";
import { classNames } from "../util/lang";
import { DataMap } from "vfile";

const Backlinks: QuartzComponent = ({
  fileData,
  allFiles,
  displayClass,
  cfg,
}: QuartzComponentProps) => {
  const slug = simplifySlug(fileData.slug!);

  // Push frontmatter links to root links and ensure uniqueness
  allFiles.forEach((file) => {
    const data = file as DataMap | undefined;
    if (data?.frontmatter?.links) {
      const frontmatterLinks: SimpleSlug[] = data.frontmatter.links.map(link => simplifySlug(link as FullSlug));
      const uniqueLinks = new Set([...(file.links || []), ...frontmatterLinks]);
      file.links = Array.from(uniqueLinks);
    }
  });

  const backlinkFiles = allFiles.filter((file) => file.links?.includes(slug));

  const renderProperty = (key: string, value: any) => {
    const wikilinkRegex = /\[\[([^[\]]*(?:\[[^[\]]*\])*[^[\]]*)\]\]/;
    const urlRegex = /https?:\/\/[^\s]+/;
  
    if (Array.isArray(value)) {
      return (
        <tr key={key}>
          <td class="prop-key">{key}:</td>
          <td class="prop-value">
            {value.map((item, index) => {
              const wikilinkMatch = item.match(wikilinkRegex);

              console.log('WIKI',wikilinkMatch);
              const urlMatch = item.match(urlRegex);
  
              if (wikilinkMatch) {
                const parts = wikilinkMatch[1].split("|");
                const link = parts[0];
                const title = parts[1] || link;
                return (
                  <div key={index}>
                    <a href={resolveRelative(fileData.slug!, simplifySlug(link as FullSlug))} class="internal">
                      {title}
                    </a>
                  </div>
                );
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
            })}
          </td>
        </tr>
      );
    } else {
      const wikilinkMatch = value.match(wikilinkRegex);
      const urlMatch = value.match(urlRegex);
  
      if (wikilinkMatch) {
        const parts = wikilinkMatch[1].split("|");
        const link = parts[0];
        const title = parts[1] || link;
        return (
          <tr key={key}>
            <td class="prop-key">{key}:</td>
            <td class="prop-value">
              <a href={resolveRelative(fileData.slug!, simplifySlug(link as FullSlug))} class="internal">
                {title}
              </a>
            </td>
          </tr>
        );
      } else if (urlMatch) {
        return (
          <tr key={key}>
            <td class="prop-key">{key}:</td>
            <td class="prop-value">
              <a href={value} class="external" target="_blank" rel="noopener noreferrer">
                {value}
              </a>
            </td>
          </tr>
        );
      }
  
      return (
        <tr key={key}>
          <td class="prop-key">{key}:</td>
          <td class="prop-value">{value}</td>
        </tr>
      );
    }
  };
  
  

  return (
    <div class={classNames(displayClass, "backlinks")}>
      <h3>{i18n(cfg.locale).components.backlinks.title}</h3>
      <table>
        <tbody>
          {Object.entries(fileData.frontmatter || {}).map(([key, value]) => renderProperty(key, value))}
        </tbody>
      </table>
    </div>
  );
};

Backlinks.css = style;
export default (() => Backlinks) satisfies QuartzComponentConstructor;
