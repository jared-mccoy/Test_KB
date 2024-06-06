import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types";
import backlinksStyle from "./styles/backlinks.scss";  // Existing style
import contentLayoutStyle from "./styles/contentLayout.scss";  // New layout style
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

  // Extract original backlinks before adding new document links
  const originalBacklinks = fileData.links || [];
  console.log(`Backlinks for ${slug}: ${originalBacklinks}`);

  // Push frontmatter links to root links and ensure uniqueness
  allFiles.forEach((file) => {
    const data = file as DataMap | undefined;
    if (data?.frontmatter?.links) {
      const frontmatterLinks: SimpleSlug[] = data.frontmatter.links.map(link => simplifySlug(link as FullSlug));
      const uniqueLinks = new Set([...(file.links || []), ...frontmatterLinks]);
      file.links = Array.from(uniqueLinks);
    }
  });

  // Collect backlinks referencing the current file
  const backlinkFiles = allFiles.filter((file) => file.links?.includes(slug));
  console.log("Backlink files:", backlinkFiles.map(file => file.slug));

  return (
    <div class={classNames(displayClass, "backlinks-container")}>
      <h3>{i18n(cfg.locale).components.backlinks.title}</h3>
      <ul class="overflow">
        {backlinkFiles.length > 0 ? (
          backlinkFiles.map((f) => (
            <li key={f.slug}>
              <a href={resolveRelative(fileData.slug!, f.slug!)} class="internal">
                {f.frontmatter?.title}
              </a>
            </li>
          ))
        ) : (
          <li>{i18n(cfg.locale).components.backlinks.noBacklinksFound}</li>
        )}
      </ul>
    </div>
  );
}

Backlinks.css = [backlinksStyle, contentLayoutStyle];  // Import both styles
export default (() => Backlinks) satisfies QuartzComponentConstructor;
