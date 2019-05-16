const withTypeScript = require('@zeit/next-typescript');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const nextSourceMaps = require('@zeit/next-source-maps')({
  devtool: 'hidden-source-map',
});
const SentryCliPlugin = require('@sentry/webpack-plugin');
const { parsed: localEnv = {} } = require('dotenv').config();
const CopyPlugin = require('copy-webpack-plugin');

module.exports = nextSourceMaps(
  withTypeScript({
    distDir: '../build',
    assetPrefix: localEnv.STATIC_CDN_URL || 'https://books.local.ridi.io',
    useFileSystemPublicRoutes: false,
    experimental: {
      amp: true,
    },
    exportPathMap: () => {
      return {};
    },
    publicRuntimeConfig: {
      ENVIRONMENT: process.env.ENVIRONMENT || localEnv.ENVIRONMENT || 'local',
      SENTRY_DSN: process.env.SENTRY_DSN || localEnv.SENTRY_DSN,
      VERSION: require('./package.json').version,
      ...require(`./env/${process.env.ENVIRONMENT || localEnv.ENVIRONMENT || 'local'}`),
    },
    webpack(config, option) {
      const { isServer } = option;
      if (isServer) {
        config.plugins.push(
          new ForkTsCheckerWebpackPlugin({
            tsconfig: '../tsconfig.json',
          }),
        );
      }
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();
        Object.values(entries).forEach(entry => {
          if (!entry.includes('@babel/polyfill') && !!entry.unshift) {
            entry.unshift('@babel/polyfill');
          } else if (typeof entry === 'string') {
            entry = ['@babel/polyfill', entry];
          }
        });
        return entries;
      };
      if (process.env.ENVIRONMENT !== 'local') {
        config.plugins.push(
          new SentryCliPlugin({
            include: ['./build/', './src/'],
            release: require('./package.json').version,
            urlPrefix: `~/_next/`,
            ignoreFile: '.sentrycliignore',
            entries: [],
            ignore: ['coverage', 'server', 'node_modules', 'webpack.config.js'],
            rewrite: true,
          }),
        );
      }
      config.output.publicPath = !!localEnv.STATIC_CDN_URL
        ? localEnv.STATIC_CDN_URL + '/_next/'
        : '/_next/';
      config.plugins.push(
        new CopyPlugin([
          {
            from: '../static/manifest.webmanifest',
            to: '',
            transform(content, src) {
              return Promise.resolve(
                Buffer.from(content, 'utf8')
                  .toString()
                  .replace(/<path>/gi, localEnv.STATIC_CDN_URL || ''),
              );
            },
          },
        ]),
      );
      config.plugins.push(
        new InjectManifest({
          swSrc: 'static/service-worker.js',
          exclude: [/\.map$/, /\/pages\/partials\//, /build-manifest.json/, /manifest.webmanifest/],
        }),
      );

      config.node = {
        fs: 'empty',
      };
      return config;
    },
  }),
);
