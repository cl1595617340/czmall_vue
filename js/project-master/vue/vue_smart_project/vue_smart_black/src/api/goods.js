import http from '../api/public'

let hostUrl = "http://localhost:8088";


/*查询所有的1级分类*/
export const f_getGoodsListToType = (params) => {
  return http.fetchGet(hostUrl+'/front/goods/goods/f_getGoodsListToType', params)
}
