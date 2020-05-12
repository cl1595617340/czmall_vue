import http from '../api/public'

let hostUrl = "http://118.178.187.197:8088";

/*查询所有的1级分类*/
export const getAllGoodsTypeByF = (params) => {
  return http.fetchGet(hostUrl+'/front/type/goodstype/getAllGoodsTypeByF', params)
}


/*1级分类显示其下的所有分类信息*/
export const getGoodstypeTo23ByF = (params) => {
  return http.fetchPost(hostUrl+'/front/type/goodstype/getGoodstypeTo23ByF', params)
}

