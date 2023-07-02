#!/usr/bin/env node
const { mdLinks } = require("./index");
const colors = {
  blue: "\x1b[38;5;38m",
  teal: "\x1b[38;5;69m",
  orange: "\x1b[38;5;215m",
  yellow: "\x1b[38;5;220m",
  red: "\x1b[38;5;160m",
  celest: "\x1b[38;5;158m",
  highlighter: "\x1b[48;5;107m",
  highlighterTeal: "\x1b[48;5;69m",
  highlighterYellow: "\x1b[48;5;220m",
  highlighterYellowLigth: "\x1b[48;5;229m",
  bold: "\x1b[1m",
  underlined: "\x1b[4m",
  reset: "\x1b[0m", // Reset to default color
};
const { brokenLinks, linksTotal, uniqueLinks } = require("./stats");
const userPath = process.argv[2];
const validateOption = process.argv.includes("--validate");
const statsOption = process.argv.includes("--stats");
const helpOption = process.argv.includes("--help");
const cfonts = require("cfonts");

function messageIcon(message) {
    const lowercaseMessage = message.toLowerCase();
  
    if (lowercaseMessage === 'ok') {
      return '🆗';
    } else if (lowercaseMessage === 'fail') {
      return '❎';
    } else {
      return '🚨';
    }
  }
  function statsIcon(status) {
    if (status === '200' || status === 200) {
      return '✅';
    } else if (status === '400'|| status === 400) {
      return '⛔';
    } else {
      return '⚠️';
    }
  }

if (helpOption) {
  cfonts.say("md-links", {
    font: "block",
    align: "center",
    gradient: ["red", "cyan"],
  });
  console.log(
    `md-links is a command-line program that identifies links in Markdown files, just as validating their HTTP status.\n\nTo use md-links you must add the following information: \n \n 1. ${colors.orange}md-links <path>${colors.reset} dentifies the links in all Markdown files found. \n \n 2. ${colors.orange}md-links <path> ${colors.reset}${colors.highlighterTeal}${colors.bold} -stats ${colors.reset} counts the total and unique amount of links. \n \n 3. ${colors.orange}md-links <path> ${colors.highlighterYellow}${colors.bold} --validate ${colors.reset} validates the HTTP status of all the links. \n \n 4.${colors.orange} md-links <path> ${colors.reset}${colors.highlighter}${colors.bold} --validate --stats ${colors.reset} besides the total and unique amount of links, it also counts the broken links.  `
  );
} else if (!validateOption && !statsOption) {
  mdLinks(userPath, { validate: false })
    .then((linksArray) => {
      if (linksArray.length === 0) {
        console.log(
          `${colors.red}${colors.bold} ⚠️No links were found.${colors.reset}`
        );
      } else {
        linksArray.forEach((l) =>
          console.log(
            `${colors.highlighterYellowLigth}${colors.bold}Href:${colors.reset}${l.file}\n` +
              `${colors.teal}${colors.bold}Text: ${colors.reset}${l.text}\n` +
              `${colors.orange}${colors.bold}File: ${colors.reset}${l.href}\n`
          )
        );
      }
    })
    .catch((error) => {
      console.error(
        `${colors.red}${colors.bold}`,
        error.message,
        `${colors.reset}`
      );
    });
} else if (validateOption && !statsOption) {
  mdLinks(userPath, { validate: true })
    .then((linksArray) => {
      if (linksArray.length === 0) {
        console.log(
          `${colors.red}${colors.bold}⚠️No links were found.${colors.reset}`
        );
      } else {
        linksArray.forEach((link) =>
          console.log(
            ` ${colors.highlighter}${colors.bold}Href: ${colors.reset} ${link.file}\n` +
              ` ${colors.teal}${colors.bold}Text: ${colors.reset}${link.text}\n` +
              ` ${colors.orange}${colors.bold}File: ${colors.reset}${link.href}\n` +
              ` ${colors.yellow}${colors.bold}Status: ${colors.reset}${link.status}${statsIcon(link.status)}\n` +
              ` ${colors.red}${colors.bold}Ok: ${colors.reset}${messageIcon(link.ok)}\n`
          )
        );
      }
    })
    .catch((error) => {
      console.error(
        `${colors.red}${colors.bold}`,
        error.message`${colors.reset}`
      );
    });
} else if (statsOption && !validateOption) {
  mdLinks(userPath, { validate: false })
    .then((linksArray) => {
      if (linksArray.length === 0) {
        console.log(
          `${colors.red}${colors.bold}⚠️No links were found.${colors.reset}`
        );
      } else {
        console.log(
          `${colors.yellow}${colors.bold}Total:${colors.reset} ${linksTotal(
            linksArray
          )} \n` +
            `${colors.celest}${colors.bold}Unique:${colors.reset} ${uniqueLinks(
              linksArray
            )}`
        );
      }
    })
    .catch((error) => {
      console.error(
        `${colors.red}${colors.bold}`,
        error.message + `${colors.reset}`
      );
    });
} else if (statsOption && validateOption) {
  mdLinks(userPath, { validate: true })
    .then((linksArray) => {
      if (linksArray.length === 0) {
        console.log(
          `${colors.red}${colors.bold}⚠️No links were found.${colors.reset}`
        );
      } else {
        console.log(
          ` ${colors.yellow}${colors.bold}Total:${colors.reset} ${uniqueLinks(
            linksArray
          )}\n` +
            ` ${colors.celest}${colors.bold}Unique:${
              colors.reset
            } ${uniqueLinks(linksArray)}\n` +
            ` ${colors.orange}${colors.bold}Broken:${
              colors.reset
            } ${brokenLinks(linksArray)}\n`
        );
      }
    })
    .catch((error) => {
      console.error(
        `${colors.red}${colors.underlined}${colors.bold}`,
        error.message,
        `${colors.reset}`
      );
    });
} else {
  console.log(`⚠️Write a valid command.`);
}

