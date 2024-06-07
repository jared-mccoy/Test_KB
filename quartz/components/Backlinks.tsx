import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types";
import { resolveRelative, simplifySlug } from "../util/path";

const Backlinks: QuartzComponent = ({
  fileData,
  allFiles,
}: QuartzComponentProps) => {
  const slug = simplifySlug(fileData.slug!);
  const backlinkFiles = allFiles.filter((file) => file.links?.includes(slug));
  const backlinksData = backlinkFiles.map((f) => ({
    title: f.frontmatter?.title,
    url: resolveRelative(fileData.slug!, f.slug!),
  }));

  // Persist a deep copy of backlinks data to fileData
  fileData.backlinksData = JSON.parse(JSON.stringify(backlinksData));

  return null;
};

export default (() => Backlinks) satisfies QuartzComponentConstructor;
