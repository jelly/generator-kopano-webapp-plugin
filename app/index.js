const mkdirp = require("mkdirp");
const Generator = require('yeoman-generator');

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
      message : 'project URL',
      default : 'https://kopano.com'
    }, {
      type    : 'input',
      name    : 'description',
      message : 'description',
      default : 'My first plugin'
    }]).then((answers) => {
      mkdirp.sync('js');
      this.fs.copyTpl(
        this.templatePath('_manifest.xml'),
         this.destinationPath('manifest.xml'),
         {
           name: answers.name,
           author: answers.author,
           url: answers.url,
           description: answers.description,
        }
      );

      this.fs.copyTpl(
        this.templatePath('_plugin.js'),
         this.destinationPath('js/' + answers.name + '.js'),
         {
           name: answers.name,
           classname: 'Plugin' + answers.name,
        }
      );

      this.fs.copy(
        this.templatePath('_build.xml'),
         this.destinationPath('build.xml'),
         {
         }
      );
    });
  }
};
