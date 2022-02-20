const path = require('path')

module.exports = {
  "devServer": {
    overlay: false
  },
  "transpileDependencies": [
    "vuetify"
  ],
  // "chainWebpack": config => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src/'))
  // }
  configureWebpack: {
    resolve: {
      alias: {
        "~": path.resolve("src"),
      },
      extensions: [".js", ".vue", ".json"],
    },
  },
}     