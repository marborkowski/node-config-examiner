'use strict';

const diff = require('diff-json-structure');
const chalk = require('chalk');
const config = require('config');
const env = process.env.NODE_ENV || 'default';

module.exports = {
  logger: () => {},
  $printDiff: function printDiff(parts) {
    const output = [];

    parts.forEach(function (part) {
        part.value
        .split('\n')
        .filter(function (line) { return !!line; })
        .forEach(function (line) {
            if (part.removed) {
              output.push(chalk.red('-  ' + line));
            } else {
              output.push(chalk.dim('   ' + line));
            }
        });
    });

    const message = `
  
    ${chalk.red('******************************************************************************************************************************')}
    ${chalk.red('IMPORTANT!!!')}
    ${chalk.red(`PLEASE SEE ALL THE DIFFERENCES IN THE CONFIGURATION BETWEEN YOUR CURRENT ENVIRONMENT \`${env}\` AND THE DEFAULT ONE`)}
    ${chalk.red('******************************************************************************************************************************')}
    
    ${output.join('\n')}`;

    this.logger(message);

  },
  findEnv: function (env) {
    let resources = config.util.getConfigSources();

    resources = resources.filter(function(element) {
      const fileName = element.name.replace(/^.*[\\\/]/, '');
      return fileName === `${env}.json`;
    });

    return resources[0].parsed;
  },
  examinate: function (logger) {
    if (!logger) {
      this.logger = console.log;
    } else {
      this.logger = logger;
    }

    const confDefault = this.findEnv('default');
    const confCurrent = this.findEnv(env);

    this.$printDiff(
      diff(
        confDefault,
        confCurrent
      )
    );
  }
}