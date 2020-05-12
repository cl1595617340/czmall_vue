import http from '../api/public'

let hostUrl = "http://118.178.187.197:8088";

/*查询主页推广数据*/
export const f_GeneralizeList = (params) => {
  return http.fetchPost(hostUrl+'/front/generalize/generalize/f_GeneralizeList', params)
}
