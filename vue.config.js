module.exports = {
    chainWebpack: config => {
        config.module.rules.delete("svg");
    },
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.svg$/,
                    use: [{ loader: 'svg-loader' }]
                }
            ]
        }
    }
}