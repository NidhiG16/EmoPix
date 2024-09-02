module.exports = {
    resolve: {
      fullySpecified: false, // Resolve imports without extensions
    },
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto",
        },
      ],
    },
  };
  