const path = require('path');

module.exports = {
  pages: {
    index: {
        entry: 'main.js',
        template: 'public/index.html',
        filename: 'index.html',
        title: "CLT.PatientView",
    }
  },
  configureWebpack: {
    resolve: {
        alias: {
            '@components': path.resolve('./src/components'),
            '@views': path.resolve('./src/views'),
            '@assets': path.resolve('./src/assets'),
            '@data': path.resolve('./src/data')
        },
        modules: ["node_modules", "packages"]
    }
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions = {
          ...(options.compilerOptions || {}),
          isCustomElement: tag => /^ion-/.test(tag)
        };
        return options;
      });
  }
}
