import http from '../api/public'

let hostUrl = "http://localhost:8088";


/*查询所有的手机信息*/
export const f_getGoodsListToType = (params) => {
  return http.fetchPost(hostUrl+'/front/goods/goods/f_getGoodsListToType', params)
}

/*主页的搜索模糊查询*/
export const getType3AndGoods = (params) => {
  return http.fetchPost(hostUrl+'/front/goods/goods/getType3AndGoods', params)
}

/*主页的搜索模糊查询*/
export const f_likeGetGoods = (params) => {
  return http.fetchPost(hostUrl+'/front/goods/goods/f_likeGetGoods', params)
}

/*主页的大模糊查询取反，主要查询除了手机分类的数据*/
export const f_likeGetGoodsNot = (params) => {
  return http.fetchPost(hostUrl+'/front/goods/goods/f_likeGetGoodsNot', params)
}
