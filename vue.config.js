module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto",
        },
        {
          test: /\.worker\.js$/,
          use: { loader: "worker-loader" },
        },
      ],
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        options.compilerOptions.whitespace = "preserve";
        return options;
      });
  },
  transpileDependencies: ["vuetify"],
  publicPath: process.env.NODE_ENV === "production" ? "/vendme-ic/" : "/",
};
