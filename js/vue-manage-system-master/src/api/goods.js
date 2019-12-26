import http from '../api/public'

/*3表查询分类信息*/
export const list = (params) => {
    return http.fetchPost('/admin/goods/goods/list', params)
}


/*批量下架商品*/
export const updateGodosState = (params) => {
    return http.fetchPost('/admin/goods/goods/updateGodosState', params)
}
/*修改手机的版本信息*/
export const updateVersions = (params) => {
    return http.fetchPost('/admin/goods/goods/updateVersions', params)
}

/*修改手机的版本信息*/
export const addVersions = (params) => {
    return http.fetchPost('/admin/goods/goods/addVersions', params)
}

/*子组件版本添加后根基goodsId刷新用的*/
export const Versionslist = (params) => {
    return http.fetchPost('/admin/goods/goods/Versionslist', params)
}

/*子组件版本添加后根基goodsId刷新用的*/
export const deleteVersions = (params) => {
    return http.fetchPost('/admin/goods/goods/deleteVersions', params)
}

/*--------------------------------------------------添加颜色展示图(4次上传图片)----------*/
/*添加颜色展示图*/
export const addGoodsColor = (params) => {
    return http.fetchPost('/admin/goods/goods/addGoodsColor', params)
}
/*件上传02*/
export const upload02 = (params) => {
    return http.fetchPost('/admin/goods/goods/upload02', params)
}

/*测试文件上传03*/
export const upload03Totarget = (params) => {
    return http.fetchPost('/admin/goods/goods/upload03Totarget', params)
}
/*测试文件上传04*/
export const upload04Tofront = (params) => {
    return http.fetchPost('/admin/goods/goods/upload04Tofront', params)
}
/*---------------------------------------*/
/*子组件展示图添加后根基goodsId刷新用的*/
export const GoodscolorlistById = (params) => {
    return http.fetchPost('/admin/goods/goods/GoodscolorlistById', params)
}
/*子组件展示图添加后根基goodsId刷新用的*/
export const delGoodsColor = (params) => {
    return http.fetchPost('/admin/goods/goods/delGoodsColor', params)
}
/*修改和删除图片前要先删除他的上一个图片*/
export const deleteGoodsColorimg = (params) => {
    return http.fetchPost('/admin/goods/goods/delete', params)
}
/*修改展示图*/
export const updateGoodsColor = (params) => {
    return http.fetchPost('/admin/goods/goods/updateGoodsColor', params)
}

/*----------------------------------------------------------------参数操作-----*/
/*修改参数*/
export const updateParameter = (params) => {
    return http.fetchPost('/admin/goods/goods/updateParameter', params)
}
/*添加参数*/
export const addParameter = (params) => {
    return http.fetchPost('/admin/goods/goods/addParameter', params)
}
/*--------------------------------------------------------文本域的上传图片,也是4次----*/
export const mdupload = (params) => {
    return http.fetchPost('/admin/goods/goods/mdupload', params)
}
export const mdupload02 = (params) => {
    return http.fetchPost('/admin/goods/goods/mdupload02', params)
}
export const mdupload03Totarget = (params) => {
    return http.fetchPost('/admin/goods/goods/mdupload03Totarget', params)
}
export const mdupload04Tofront = (params) => {
    return http.fetchPost('/admin/goods/goods/mdupload04Tofront', params)
}

/*---------------------------------------修改商品的基本信息--*/
export const updateGoods = (params) => {
    return http.fetchPost('/admin/goods/goods/updateGoods', params)
}


/*---------------------------------------添加商品的基本信息--*/
export const addGoods = (params) => {
    return http.fetchPost('/admin/goods/goods/addGoods', params)
}


export const zfb = (params) => {
    return http.fetchPost('/zfbLogin', params)
}
