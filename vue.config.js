const path = require('path')

module.exports = {
  //publicPath: process.env.VUE_APP_BASE_URL,

  "devServer": {
    overlay: false,
    disableHostCheck: true, // [WDS] Disconnected! 작성된 포트 번호와 실제 구동한 포트번호의 불일치.
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