

module.exports = function (api) {
   api.cache(true); //make it so that babel does not re-init plugins/presets on every compile.

   const presets = [
      ["@babel/preset-env"],
   ];
   const plugins = [
      '@babel/transform-runtime'
   ];

   return {
      presets,
      plugins
   };
};