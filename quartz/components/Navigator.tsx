import { QuartzComponentConstructor, QuartzComponent, QuartzComponentProps } from "./types";
// @ts-ignore
import script from "./scripts/navigator.inline";
import style from "./styles/navigator.scss";


export default ((opts?: any) => {
  const Navigator: QuartzComponent = (props: QuartzComponentProps) => {
    const { fileData, allFiles, displayClass } = props;
    const frontmatter = (fileData.frontmatter || {}) as Record<string, any>;
    const slug = fileData.slug!;
    const validSeqPropTypes = ['Module', 'Series'];
    const seqGroups: Record<string, any>[] = [];
  
    const extractGroupIds = (group: any): string[] => {
      if (typeof group === 'string') {
        const id = group.match(/\[\[([^\|]+)\|[^\]]+\]\]/)?.[1];
        return id ? [id] : [];
      }
      if (Array.isArray(group)) {
        return group
          .map((g) => g.match(/\[\[([^\|]+)\|[^\]]+\]\]/)?.[1])
          .filter(Boolean) as string[];
      }
      return [];
    };
  
    if (slug === '66fc7a2c75884b3ba9c8c020') {
      let test;
    }
  
    // Collect potential sequence parent IDs from frontmatter.group and frontmatter.series, including current file's slug
    let potentialSeqParentIds = [
      ...extractGroupIds(frontmatter.group),
      ...extractGroupIds(frontmatter.series),
      slug, // Include current file's slug
    ];
  
    // Get potential sequence parents, including the current file
    const potentialSeqParents = allFiles.filter((f) =>
      potentialSeqParentIds.includes(f.slug!),
    );
  
    // Process seqGroups by iterating over potential sequence parents
    potentialSeqParents.forEach((file) => {
      const fileGroupTypes = Array.isArray(file.frontmatter?.type)
        ? file.frontmatter.type
        : [file.frontmatter?.type].filter(Boolean);
      const groupType = fileGroupTypes.find((type) =>
        validSeqPropTypes.includes(type),
      );
      if (!groupType && file.slug !== slug) return;
  
      ['group_has', 'series_has'].forEach((key) => {
        const title =
          file.frontmatter?.title_display ||
          file.frontmatter?.title ||
          file.slug;
        const titleSuffix = title?.match(/\(([^)]+)\)$/)?.[1];
        if (!title) return;
  
        const groupItems = file.frontmatter?.[key];
        if (!groupItems) return;
        const groupIds = extractGroupIds(groupItems);
  
        seqGroups.push({
          title: titleSuffix || title,
          id: file.slug,
          type: groupType,
          items: groupIds,
        });
      });
    });
  

    const scriptData = {
      slug,
      seqGroups,
      allFiles: allFiles
        .filter(f => seqGroups.some(g => g.items.includes(f.slug)))
        .map(f => ({
          slug: f.slug,
          frontmatter: {
            title: f.frontmatter?.title,
            title_display: f.frontmatter?.title_display,
            resource: f.frontmatter?.resource,
          },
        })),
    };
    

    return (
      <div class={`navigator-container ${displayClass || ''}`} data-script={JSON.stringify(scriptData)}>
        <h3>Navigation</h3>           
        <div class="autoplay-toggle">
          <label>
          <input type="checkbox" name="autoplay" id="autoplay-checkbox" checked />
          Autoplay
          </label>
        </div>
        <select class="seqgroup-selector" name="seqGroup">
          {seqGroups.map((group, index) => (
            <option key={index} value={group.title}>
              {group.title}
            </option>
          ))}
          <option value="Off">Off</option>
        </select>
      </div>
    );
  };    

  Navigator.css = style;
  Navigator.afterDOMLoaded = script;

  return Navigator;
}) satisfies QuartzComponentConstructor;

