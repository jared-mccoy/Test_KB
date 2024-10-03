import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import { content } from "./content.js";
import { fileURLToPath } from "url";

// Resolve __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the relative paths
const templateFilePath = path.resolve(__dirname, "../indexTemplate.html");
const outputFilePath = path.resolve(__dirname, "../index.html");

// Register a helper for accessing array elements
Handlebars.registerHelper("getArrayItem", function (array, index) {
  return array[index];
});

// Load the Handlebars template
fs.readFile(templateFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the template file:", err);
    return;
  }

  // Compile the Handlebars template
  const template = Handlebars.compile(data);

  // Generate the HTML by combining the template with the content
  const result = template({ content });

  // Write the result to index.html
  fs.writeFile(outputFilePath, result, "utf8", (err) => {
    if (err) {
      console.error("Error writing the output file:", err);
    } else {
      console.log("index.html has been successfully generated.");
    }
  });
});
