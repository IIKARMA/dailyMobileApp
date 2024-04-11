module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['react-native-worklets-core/plugin'],
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', 'json', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          '@src': './src',
          '@assets': './src/assets',
          '@components': './src/components',
          '@features': './src/features',
          '@navigation': './src/navigation',
          '@i18n': './src/i18n',
        },
      },
    ],
    ['react-native-reanimated/plugin', {
      "globals": [
          "__scanCodes"
      ]
  }]
  ],
};
