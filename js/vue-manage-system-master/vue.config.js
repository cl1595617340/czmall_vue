module.exports = {
    devServer: {
        proxy: {
            '/':{
                target:'http://localhost:8088',
                disableHostCheck: true,
                changeOrigin:true,
                pathRewrite:{
                    '/':''
                }
            }
        }
    }
}
