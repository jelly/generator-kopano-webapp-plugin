const mkdirp = require("mkdirp");
const Generator = require('yeoman-generator');
const capitalize = require('capitalize-first-letter');

module.exports = class extends Generator {
  prompting() {
    return this.prompt([{
      type    : 'input',
      name    : 'name',
      message : 'Your project name',
      default : 'example'
    }, {
      type    : 'input',
      name    : 'author',
      message : 'Author',
      default : 'John Doe'
    }, {
      type    : 'input',
      name    : 'url',
      message : 'Your project URL',
      default : 'https://kopano.com'
    }, {
      type    : 'input',
      name    : 'description',
      message : 'Your project description',
      default : 'My first plugin'
    }, {
      type    : 'confirm',
      name    : 'php',
      message : 'PHP pluginn',
    }]).then((answers) => {
      answers.classname = 'Plugin' + capitalize(answers.name);
      const basepath = answers.name;

      if (answers.php) {
        mkdirp.sync(basepath + '/php');
        this.fs.copyTpl(
          this.templatePath('_plugin.php'),
            this.destinationPath(basepath + '/php/plugin.' + answers.name + '.php'),
             answers
        );
      }

      mkdirp.sync(basepath + 'js');
      this.fs.copyTpl(
        this.templatePath('_manifest.xml'),
          this.destinationPath(basepath + '/manifest.xml'),
            answers
      );

      this.fs.copyTpl(
        this.templatePath('_plugin.js'),
          this.destinationPath(basepath + '/js/' + answers.name + '.js'),
            answers
      );

      this.fs.copy(
        this.templatePath('_build.xml'),
         this.destinationPath(basepath + '/build.xml')
      );
    });
  }
};
