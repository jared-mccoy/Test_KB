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

  // Extract propLinks before adding new document links
  const textlinks = fileData.links || [];
  console.log(`Backlinks for ${slug}: ${textlinks}`);

/*   // Push frontmatter links to root links and ensure uniqueness
  allFiles.forEach((file) => {
    const data = file as DataMap | undefined;
    if (data?.frontmatter?.links) {
      const frontmatterLinks: SimpleSlug[] = data.frontmatter.links.map(link => simplifySlug(link as FullSlug));
      const uniqueLinks = new Set([...(file.links || []), ...frontmatterLinks]);
      file.links = Array.from(uniqueLinks);
    }
  });
  // Collect backLinks referencing the current file and filter out the current slug
  */
  const backLinks: BacklinkData[] = allFiles.filter((file) => file.links?.includes(slug)/*  && simplifySlug(file.slug!) !== slug */).map((f) => ({
    title: f.frontmatter?.title,
    url: resolveRelative(fileData.slug!, f.slug!),
  }));

  const renderProperty = (key: string, value: any) => {
    if (key === "title" || key === "links") return null; // Skip rendering the title and links properties

    const wikilinkRegex = /\[\[([^[\]]*(?:\[[^[\]]*\])*[^[\]]*)\]\]/;
    const urlRegex = /https?:\/\/[^\s]+/;

    if (Array.isArray(value)) {
      return (
        <tr key={key}>
          <td class="prop-key">{key}:</td>
          <td class="prop-value">
            {value.map((item, index) => {
              if (typeof item !== "string") return <div key={index}>{item}</div>;

              const wikilinkMatch = item.match(wikilinkRegex);
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
      if (typeof value !== "string") {
        return (
          <tr key={key}>
            <td class="prop-key">{key}:</td>
            <td class="prop-value">{value}</td>
          </tr>
        );
      }

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
{/*           {textlinks.length > 0 && (
            <tr>
              <td class="prop-key">textlinks:</td>
              <td class="prop-value">
                {textlinks.map((link, index) => {
                  const backlinkFile = allFiles.find(file => simplifySlug(file.slug!) === link);
                  if (backlinkFile) {
                    const backlinkTitle = backlinkFile.frontmatter?.title || simplifySlug(backlinkFile.slug!);
                    const backlinkUrl = resolveRelative(fileData.slug!, backlinkFile.slug!);
                    return (
                      <div key={index}>
                        <a href={backlinkUrl} class="internal">
                          {backlinkTitle}
                        </a>
                      </div>
                    );
                  }
                  return null;
                })}
              </td>
            </tr>
          )} */}
        </tbody>
      </table>
    </div>
  );
};

Properties.css = style;
export default (() => Properties) satisfies QuartzComponentConstructor;
