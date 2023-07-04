
  <img src="md-links.png" alt="md-links" width="100%" />


## Table of contents
* [1. Introduction](#1-introduction)
* [2. Installation](#2-installation)
* [3. Usage](#3-usage)

## 1. Introduction
This is an npm package for extracting and analyzing links from Markdown files. It provides a command-line interface (CLI) tool that allows you to retrieve all the links contained in a given directory or file, and provides options for validating the status of each link and generating statistics about the links.

## 2. Installation
To install the package, use the following command:

```
npm install md-links-AndreaRoa 
```

To install the command line globally, run: 

```
npm install -g md-links-Andrea Roa
```

## Usage 
To use the md-links-cli tool, run the following command in your terminal:

### Important: 
Replace `<path>` with the path to the directory or file containing the Markdown files you want to analyze.

```
md-links --help
```
Displays usage instructions


```
md-links <path> 
```
You will get the href, text and file of the links.


```
md-links <path> --stats
```
You will get the total and unique of the links.


```
md-links <path> --validate
```
You will get the href, text, file, status and ok of the links.

```
md-links <path> --validate --stats
```
You will get the total, uniques and brokens of the links. 

