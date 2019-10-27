const Generator = require("yeoman-generator");
const { basename } = require("path");
const debug = require("debug")("create-umi");

module.exports = class BasicGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.name = basename(process.cwd());
    this.props = {};
  }

  writing() {
    debug(`this.name: ${this.name}`);
    debug(`this.props: ${JSON.stringify(this.props)}`);

    const context = {
      name: this.name,
      props: this.props
    };

    this.fs.copy(this.templatePath("mock", ".*"), this.destinationPath("mock"));
    this.fs.copy(
      this.templatePath("src", "layouts"),
      this.destinationPath("src/layouts")
    );
    this.fs.copy(
      this.templatePath("src", "models"),
      this.destinationPath("src/models")
    );
    this.fs.copy(
      this.templatePath("src", "pages", "index"),
      this.destinationPath("src/pages/index")
    );

    this.fs.copy(
      this.templatePath("src", "pages", "list"),
      this.destinationPath("src/pages/list")
    );
    this.fs.copy(
      this.templatePath("src", "global.less"),
      this.destinationPath("src/global.less")
    );
    this.fs.copyTpl(
      this.templatePath("tsconfig.json"),
      this.destinationPath("tsconfig.json")
    );
    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath("package.json"),
      context
    );
    this.fs.copy(
      this.templatePath("_gitignore"),
      this.destinationPath(".gitignore")
    );
    this.fs.copy(this.templatePath(".env"), this.destinationPath(".env"));
    this.fs.copyTpl(
      this.templatePath(".umirc.js"),
      this.destinationPath(".umirc.js"),
      context
    );
    this.fs.copy(
      this.templatePath(".eslintrc"),
      this.destinationPath(".eslintrc")
    );
    this.fs.copy(
      this.templatePath(".prettierrc"),
      this.destinationPath(".prettierrc")
    );
    this.fs.copy(
      this.templatePath(".prettierignore"),
      this.destinationPath(".prettierignore")
    );
  }
};
