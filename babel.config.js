module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        extensions: [".ios.js", ".android.js", ".ios.jsx", ".android.jsx", ".js", ".jsx", ".json", ".ts", ".tsx"],
        root: ["."],
        alias: {
          "^@infra/(.+)": "./src/infra/\\1",
          "^@main/(.+)": "./src/main/\\1",
          "^@quiz/(.+)": "./src/modules/\\1"
        },
      },
    ],
    [
      "wildcard", 
      {
        'exts': ["js", "ts"]
      }
    ]
  ]
};