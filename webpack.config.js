const path = require("path");

module.exports = {
    entry: path.join(__dirname, "/client/src/App.jsx"),

    // the bundle file we will get in the result
    output: {
        path: path.join(__dirname, "/client/dist/js"),
        filename: "bundle.js"
    },

    module: {
    // apply loaders to files that meet given conditions
        loaders: [
            {
                test: /\.jsx?$/,
                include: path.join(__dirname, "/client/src"),
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015"]
                }
            }
        ]
    },
    resolve: {
        extensions: [".jsx", ".js"]
    },

    // start Webpack in a watch mode, so Webpack will rebuild the bundle on changes
    watch: true
};
