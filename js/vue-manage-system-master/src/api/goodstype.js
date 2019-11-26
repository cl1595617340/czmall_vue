import http from '../api/public'

/*3表查询分类信息*/
export const getGoodsType = (params) => {
    return http.fetchGet('/admin/type/goodstype/getGoodsType', params)
}

/*修改分类状态*/
export const updateTypestate = (params) => {
    return http.fetchPost('/admin/type/goodstype/updateTypestate', params)
}

/*根据1级分类动态加载2级分类*/
export const getGoodsType2Byid = (params) => {
    return http.fetchPost('/admin/type/goodstype/getGoodsType2Byid', params)
}

/*/!*测试文件上传*!/
export const uploadss = (params) => {
    return http.fetchPost('/admin/type/goodstype/upload', params)
}*/
/*测试文件上传02*/
export const upload02 = (params) => {
    return http.fetchPost('/admin/type/goodstype/upload02', params)
}

/*根据1级分类动态加载2级分类*/
export const addType = (params) => {
    return http.fetchPost('/admin/type/goodstype/addType', params)
}

/*根据1级分类动态加载2级分类*/
export const getGoodstypeBy2 = (params) => {
    return http.fetchPost('/admin/type/goodstype/getGoodstypeBy2', params)
}
/*根基3级分类id查询2级分类信息*/
export const getGoodstype2By3 = (params) => {
    return http.fetchPost('/admin/type/goodstype/getGoodstype2By3', params)
}
/*修改分类信息*/
export const updateType = (params) => {
    return http.fetchPost('/admin/type/goodstype/updateType', params)
}


export const updatesb = (params) => {
    return http.fetchPost('/admin/type/goodstype/updatesb', params)
}
