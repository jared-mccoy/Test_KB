// homepage.ts

import { QuartzEmitterPlugin } from "../types"
import { pageResources, renderPage } from "../../components/renderPage"
import * as fs from "fs"
import * as path from "path"
import { fileURLToPath } from "url"
import { FullSlug, pathToRoot, FilePath } from "../../util/path"
import DepGraph from "../../depgraph"
import { Root } from "hast"
import { exec } from "child_process"
import { write } from "./helpers"
import { FullPageLayout } from "../../cfg"
import { renderToString } from "preact-render-to-string";
import { JSResourceToScriptElement } from "../../util/resources"
import { Homepage as HomepageComponentConst} from "../../components/"


// Replace __dirname with this for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to homepage static assets
const homepageSrcDir = path.resolve(__dirname, "../../homepage")
const homepageDestDir = path.resolve(__dirname, "../../public/homepage")
const homePageDestIndex = path.resolve(__dirname, "../../public/index.html")

// Function to recursively copy a directory with error handling and logging only on errors
async function copyDirectory(src: string, dest: string): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await fs.promises.mkdir(dest, { recursive: true });
      const entries = await fs.promises.readdir(src, { withFileTypes: true });

      for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
          await copyDirectory(srcPath, destPath); // recursively copy subdirectories
        } else {
          await fs.promises.copyFile(srcPath, destPath); // copy files
        }
      }
      //console.log(`: Directory copied successfully from ${src} to ${dest}`);
      resolve(); // Resolve when all files are copied
    } catch (err) {
      console.error(`Error copying directory: ${src} -> ${dest}`, err);
      reject(err); // Reject in case of error
    }
  });
}


// Function to run the SASS compiler targeting homepage/sass to homepage/css
async function compileSass() {
  return new Promise((resolve, reject) => {
    exec('sass homepage/sass:public/homepage/css', (err, stdout, stderr) => {
      if (err) {
        console.error('Error compiling SASS:', stderr);
        reject(err);
      } else {
        //console.log(': SASS compiled successfully:', stdout);
        resolve(stdout);
      }
    });
  });
}

export const Homepage: QuartzEmitterPlugin<Partial<FullPageLayout>> = () => {
  return {
    name: "Homepage",
    getQuartzComponents() {
      return []; // No Quartz components needed
    },
    async getDependencyGraph(_ctx, _content, _resources) {
      return new DepGraph<FilePath>();
    },
    async emit(ctx, content, resources): Promise<FilePath[]> {

      // OFF TO OPTIMIZE
      // Compile SASS to CSS
      await compileSass();

      // Copy the homepage directory contents
      await copyDirectory(homepageSrcDir, homepageDestDir)

      const slug = "index" as FullSlug;
      const externalResources = pageResources(pathToRoot(slug), resources);

      const allFiles = content.map(([tree, file]) => file.data);

      const HomepageComponent = HomepageComponentConst()
      const renderedHTML = renderToString(
        <HomepageComponent
          ctx={ctx}
          fileData={{ slug, frontmatter: { title: "Homepage" } }}
          externalResources={externalResources}
          cfg={ctx.cfg.configuration}
          children={[]}
          tree={{ type: "root", children: [] } as Root}
          allFiles={allFiles}
        />
      );
      

      // Inject CSS files into the <head>
      const cssLinks = externalResources.css
        .map(href => `<link rel="stylesheet" href="${href}">`)
        .join("\n");

      // Inject beforeDOMReady JS scripts
      const beforeDOMScripts = externalResources.js
        .filter(resource => resource.loadTime === "beforeDOMReady")
        .map((resource) => renderToString(JSResourceToScriptElement(resource)))
        .join("\n");

      // Inject afterDOMReady JS scripts
      const afterDOMScripts = externalResources.js
        .filter(resource => resource.loadTime === "afterDOMReady")
        .map((resource) => renderToString(JSResourceToScriptElement(resource)))
        .join("\n");

      // Combine everything into the final HTML
      const html = `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Homepage</title>
            ${cssLinks}
            ${beforeDOMScripts}
          </head>
          <body>
            ${renderedHTML}
            ${afterDOMScripts}
          </body>
        </html>`;

      // Call the write function to output the final HTML
      return [
        await write({
          ctx,
          content: html,
          slug,
          ext: ".html",
        }),
      ];
    },
  };
};