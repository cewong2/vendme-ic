module.exports = {
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap(options =>
        Object.assign(options, {
          compilerOptions: {
            whitespace: "condense"
          }
        })
      );
  }
}