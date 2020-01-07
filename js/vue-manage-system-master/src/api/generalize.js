import http from '../api/public'

/**/
export const getAllgeneralize = (params) => {
    return http.fetchPost('/admin/generalize/generalize/getAllgeneralize', params)
}
/*根基专区id得到旗下的商品*/
export const getGeneralizeById = (params) => {
    return http.fetchPost('/admin/generalize/generalize/getGeneralizeById', params)
}

/*修改专区关系的大小图*/
export const updateGeneralizerelation = (params) => {
    return http.fetchPost('/admin/generalize/generalize/updateGeneralizerelation', params)
}
/*修改和删除图片前要先删除他的上一个图片*/
export const deletesb = (params) => {
    return http.fetchPost('/admin/generalize/generalize/delete', params)
}
/*添加专区的关系*/
export const addGeneralizerelation = (params) => {
    return http.fetchPost('/admin/generalize/generalize/addGeneralizerelation', params)
}
/*删除专区旗下的商品*/
export const delGeneralizeGoods = (params) => {
    return http.fetchPost('/admin/generalize/generalize/delGeneralizeGoods', params)
}

/*添加专区*/
export const addGeneralize = (params) => {
    return http.fetchPost('/admin/generalize/generalize/addGeneralize', params)
}

/*添加专区*/
export const updateGeneralize = (params) => {
    return http.fetchPost('/admin/generalize/generalize/updateGeneralize', params)
}

/*停用和启用专区*/
export const updateGeneralizeState = (params) => {
    return http.fetchPost('/admin/generalize/generalize/updateGeneralizeState', params)
}
