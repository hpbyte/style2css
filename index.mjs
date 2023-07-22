#!/usr/bin/env zx

import { fs, question } from "zx";
import stylus from "stylus";

const stylusFilePath = await question("Enter the path for the stylus file: ");
const cssFilePath = await question("Enter the path for the output css file: ");

function stylusToCss(stylusCode) {
  let cssCode = "";

  // Use the stylus module to parse the Stylus code and generate the CSS code.
  stylus(stylusCode).render((err, css) => {
    if (err) throw err;
    cssCode = css;
  });

  return cssCode;
}

function convertFile(stylusFilePath, cssFilePath) {
  fs.readFile(stylusFilePath, "utf8", (err, stylusCode) => {
    if (err) throw err;

    const cssCode = stylusToCss(stylusCode);

    fs.writeFile(cssFilePath, cssCode, "utf8", (err) => {
      if (err) throw err;
      console.log(
        chalk.green(`Conversion complete! CSS file saved at: ${cssFilePath}`)
      );
    });
  });
}

convertFile(stylusFilePath, cssFilePath);
