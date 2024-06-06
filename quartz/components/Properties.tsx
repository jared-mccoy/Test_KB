import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types";
import style from "./styles/backlinks.scss";  // Using the same combined styles
import { i18n } from "../i18n";
import { classNames } from "../util/lang";

const Properties: QuartzComponent = ({
  fileData,
  displayClass,
  cfg,
  additionalContent,
}: QuartzComponentProps & { additionalContent?: string }) => {
  const renderProperty = (key: string, value: any) => {
    if (key === "title") {
      return null; // Skip rendering the title property
    }

    const wikilinkRegex = /\[\[([^[\]]*(?:\[[^[\]]*\])*[^[\]]*)\]\]/;
    const urlRegex = /https?:\/\/[^\s]+/;

    if (Array.isArray(value)) {
      return (
        <tr key={key}>
          <td class="prop-key">{key}:</td>
          <td class="prop-value">
            {value.map((item, index) => {
              if (typeof item !== "string") {
                return <div key={index}>{item}</div>;
              }

              const wikilinkMatch = item.match(wikilinkRegex);
              const urlMatch = item.match(urlRegex);

              if (wikilinkMatch) {
                const parts = wikilinkMatch[1].split("|");
                const link = parts[0];
                const title = parts[1] || link;
                return (
                  <div key={index}>
                    <a href={link} class="internal">
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
              <a href={link} class="internal">
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
    <div class={classNames(displayClass, "properties-container")}>
      <h3>{i18n(cfg.locale).components.backlinks.title}</h3>
      <table>
        <tbody>
          {Object.entries(fileData.frontmatter || {}).map(([key, value]) => renderProperty(key, value))}
        </tbody>
      </table>
      {additionalContent && <div dangerouslySetInnerHTML={{ __html: additionalContent }} />}
    </div>
  );
};

Properties.css = style;
export default (() => Properties) satisfies QuartzComponentConstructor;
