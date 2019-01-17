// ref:
// - https://umijs.org/plugin/develop.html

export interface Options {
  enable?: boolean;
}

export default function (api: any, options: Options) {

  // Example: output the webpack config
  api.chainWebpackConfig((config: object): void => {
    console.log(config.toString());
  });
}
