import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types";
import style from "./styles/properties.scss";
import { resolveRelative, simplifySlug, SimpleSlug, FullSlug } from "../util/path";
import { i18n } from "../i18n";
import { classNames } from "../util/lang";
import { DataMap } from "vfile";
import { extractFilename } from "./scripts/util";

interface BacklinkData {
  title: string | undefined;
  url: string;
}

export default ((opts?: any) => {

  const Properties: QuartzComponent = ({
    fileData,
    allFiles,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    const slug = simplifySlug(fileData.slug!);

    const backLinks: BacklinkData[] = allFiles
      .filter((file) => file.links?.includes(slug)) // seems DEFUNCT need to check against props...
      .map((f) => ({
        title: f.frontmatter?.title,
        url: resolveRelative(fileData.slug!, f.slug!),
      }));

      
    const keyContainsFilter = ["title", "links", "text"];
    const keyStartsWithFilter = ["feature"];
    const keyIsFilter= ["time_stamp"];
    const approvedTypes = ["string"];

    const renderProperty = (key: string, value: any) => {
      if (keyContainsFilter.some((k) => key.includes(k))) return null;
      if (keyStartsWithFilter.some((k) => key.startsWith(k))) return null;
      if (keyIsFilter.some((k) => key === k)) return null;

      if (slug === "66c11003f939b5d3d3de0ed7"){
        let x
      }
    
      const values = Array.isArray(value) ? value : [value];
      const isMultiple = values.length > 1; // Check if more than one value exists
    
      const filteredValues = values.map((item, index) => {
    
        const wikilinkMatch = item?.match?.(/\[\[([^[\]]*(?:\[[^[\]]*\])*[^[\]]*)\]\]/);
        const urlMatch = item?.match?.(/https?:\/\/[^\s]+/);
    
        if (wikilinkMatch) {
          const parts = wikilinkMatch[1].split("|");
          let link = parts[0];

          if (key === "resource") link = "[Resources]/" + extractFilename(item);
          else if ( !allFiles.some((f) => f.slug === link) )  return;
    
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
        } else {
          return <div key={index}>{item}</div>;
        }
    
      }).filter(x => x != null);
    
      return filteredValues.length > 0 ? (
        <div class="property-section" data-multiple={isMultiple ? "true" : "false"} key={key}>
          <span class="prop-key">{key}:</span>
          <div class="prop-value">{filteredValues}</div>
        </div>
      ) : null;
    };
      
      

    return (
      <div class={classNames(displayClass, "properties-container single-column")}>
        <h3>{i18n(cfg.locale).components.backlinks.title}</h3>
        <div class="scrollable-container">
          {Object.entries(fileData.frontmatter || {}).map(([key, value]) => renderProperty(key, value))}

          {backLinks.length > 0 && (
            renderProperty("backlinks", backLinks.map(link => (
              <a href={link.url} class="internal">{link.title}</a>
            )))
          )}
        </div>
      </div>
    );
  };
  Properties.css = style;

  return Properties;
})satisfies QuartzComponentConstructor;
