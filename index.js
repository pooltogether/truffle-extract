#!/usr/bin/env node
const program = require('commander')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

program
  .version('1.0.0')
  .option('-b --build-dir <dir>', 'directory where Truffle artifacts are located', 'build/contracts')
  .option('-o --output-dir <directory>', 'directory to put output files', 'out')

program.parse(process.argv)

const buildDir = program.buildDir
const outputDir = program.outputDir

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir)
}

const filenames = fs.readdirSync(buildDir)
filenames.forEach(filename => {
  const filepath = path.join(buildDir, filename)
  try {
    const json = JSON.parse(fs.readFileSync(filepath))
    const outputFilepath = path.join(outputDir, path.parse(filepath).name + '.json')
    fs.writeFileSync(outputFilepath, JSON.stringify(json.abi, null, 2))
    console.log(chalk.green(`Wrote ${outputFilepath}...`))
  } catch (e) {
    console.error(chalk.red(`Unable to read ${filepath}: ${e.message}`))
  }
})