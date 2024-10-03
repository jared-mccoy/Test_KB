import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    //Component.Breadcrumbs(),
    Component.ArticleTitle(),
    //Component.ContentMeta(),
    //Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    //Component.DesktopOnly(Component.Graph()),
    Component.Search(),
    Component.Graph(),
    //Component.Darkmode(),
    //Component.DesktopOnly(Component.Navigator()),
    Component.DesktopOnly(Component.TableOfContents()),
    //Component.Properties(),
  ],
  right: [
    //Component.MobileOnly(Component.Graph()),
    //Component.Properties(),
    //Component.Backlinks(),
  ],
}

// NOTE: When Nesting components (e.g. Search > Darkmode, Graph > Navigator), the quick fix is to add the nested component to the listPage layout as a root component (which triggers loading of scripts and stylesheets). TODO add a way to load js/css for nested scripts automatically (see homepage.tsx). 

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    //Component.Breadcrumbs(), 
    Component.ArticleTitle(), 
    Component.ContentMeta(),
    Component.Homepage(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),    
    Component.Darkmode(),
    Component.Navigator(),
    Component.Properties(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}
