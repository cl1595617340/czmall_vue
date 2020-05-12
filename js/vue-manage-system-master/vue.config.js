module.exports = {
    devServer: {
        proxy: {
            '/':{
                target:'http://118.178.187.197:8088',
                disableHostCheck: true,
                changeOrigin:true,
                pathRewrite:{
                    '/':''
                }
            }
        }
    }
}
