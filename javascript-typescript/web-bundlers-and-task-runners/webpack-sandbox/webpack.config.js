const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

const devMode = process.env.NODE_ENV !== "production";
const prodMode = !devMode;


const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if (prodMode) {
        config.minimizer = [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config
}


const filename = ext => devMode ? `[name].${ext}` : `[name].[hash].${ext}`


const babelOptions = preset => {
    const opts = {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: [
            "@babel/transform-runtime",
            '@babel/plugin-syntax-dynamic-import',
        ]
    }

    if (preset) {
        opts.presets.push(preset)
    }

    return opts
}

module.exports = {
    mode: "development",
    devtool: devMode ? "source-map" : false,
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: "./index.tsx",
        analytics: "./analytics.js",
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            minify: {
                collapseWhitespace: prodMode
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns:
                [
                    {
                        from: path.resolve(__dirname, "src/favicon.ico"),
                        to: path.resolve(__dirname, "dist")
                    }
                ]
        }),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),
        new ESLintPlugin({
            files: 'src/*.ts',
        }),
    ],
    resolve: {
        extensions: [".jsx", ".tsx", ".js", ".ts", ".json", ".png"],
        alias: {
            "@models": path.resolve(__dirname, 'src/models'),
            "@": path.resolve(__dirname, 'src'),
        }
    },
    optimization: optimization(),
    devServer: {
        port: 8080,
        hot: devMode
    },
    module: {
        rules: [
            /** Styles( CSS, SASS )*/
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    // Translates CSS into CommonJS.
                    "css-loader",
                    'sass-loader'
                ]
            },
            /** Pictures */
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            /** Fonts */
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            /** Files CSV */
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
            },
            /** Files XML */
            {
                test: /\.xml$/i,
                use: ['xml-loader'],
            },
            /** Javascript, React */
            {

                test: /\.m?jsx?$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: babelOptions(),
                },
            },
            /** TypeScript, React */
            {
                test: /.tsx?$/i,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                    options: babelOptions("@babel/preset-typescript"),
                }]
            },

        ]
    }
};
