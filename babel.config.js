module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'babel-plugin-react-compiler',
        {
          target: '18',
          sources: (filename) => {
            return filename.includes('/src/');
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
