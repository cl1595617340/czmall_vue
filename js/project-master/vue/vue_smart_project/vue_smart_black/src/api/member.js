import http from '../api/public'

let hostUrl = "http://localhost:8088";

/*添加会员*/
export const saveMember = (params) => {
  return http.fetchPost(hostUrl+'/front/goods/member/saveMember', params)
}

/*根基名字查询用户是否已经支付宝注册过了*/
export const f_getMemByName = (params) => {
  return http.fetchPost(hostUrl+'/front/goods/member/f_getMemByName', params)
}

/*用户登录*/
export const f_memlogin = (params) => {
  return http.fetchPost(hostUrl+'/front/goods/member/f_memlogin', params)
}


/*添加会员地址*/
export const addAddress = (params) => {
  return http.fetchPost(hostUrl+'/front/goods/address/addAddress', params)
}
/*根基用户头像查询用户id，做添加地址用（因为只有前端avater一致）*/
export const f_getMemIdByavatar = (params) => {
  return http.fetchPost(hostUrl+'/front/goods/address/f_getMemIdByavatar', params)
}
/*查看用户的地址*/
export const f_memAddressBuId = (params) => {
  return http.fetchPost(hostUrl+'/front/goods/member/f_memAddressBuId', params)
}
/*用户点击默认地址，其他地址默认都修改为1*/
export const f_updateOtherdef = (params) => {
  return http.fetchPost(hostUrl+'/front/goods/address/f_updateOtherdef', params)
}
/*删除地址*/
export const delAddress = (params) => {
  return http.fetchPost(hostUrl+'/front/goods/address/delAddress', params)
}
/*删除地址*/
export const updateAddress = (params) => {
  return http.fetchPost(hostUrl+'/front/goods/address/updateAddress', params)
}
