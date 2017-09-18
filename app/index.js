const mkdirp = require("mkdirp");
const Generator = require('yeoman-generator');

const capitalizeFirstLetter = (name) => name.charAt(0).toUpperCase() + name.slice(1);

module.exports = class extends Generator {
  prompting() {
    return this.prompt([{
      type    : 'input',
      name    : 'name',
      message : 'Your project name',
      default : this.appname // Default to current folder name
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
      answers.classname = 'Plugin' + capitalizeFirstLetter(answers.name);
      this.log(answers);

      if (answers.php) {
        mkdirp.sync('php');
        this.fs.copyTpl(
          this.templatePath('_plugin.php'),
            this.destinationPath('php/plugin.' + answers.name + '.php'),
             answers
        );
      }

      mkdirp.sync('js');
      this.fs.copyTpl(
        this.templatePath('_manifest.xml'),
          this.destinationPath('manifest.xml'),
            answers
      );

      this.fs.copyTpl(
        this.templatePath('_plugin.js'),
          this.destinationPath('js/' + answers.name + '.js'),
            answers
      );

      this.fs.copy(
        this.templatePath('_build.xml'),
         this.destinationPath('build.xml')
      );
    });
  }
};
