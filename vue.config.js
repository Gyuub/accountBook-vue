const path = require('path')

module.exports = {
  publicPath: process.env.VUE_APP_BASE_URL,

  "devServer": {
    overlay: false
  },
  "transpileDependencies": [
    "vuetify"
  ],

  configureWebpack: {
    resolve: {
      alias: {
        "~": path.resolve("src"),
      },
      extensions: [".js", ".vue", ".json"],
    },
  },


}     