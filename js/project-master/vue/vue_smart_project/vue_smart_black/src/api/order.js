import http from '../api/public'

let hostUrl = "http://118.178.187.197:8088";

/*添加订单*/
export const addOrder = (params) => {
  return http.fetchPost(hostUrl+'/front/order/order/addOrder', params)
}

/*添加订单关系*/
export const addOrderRelation = (params) => {
  return http.fetchPost(hostUrl+'/front/order/order/addOrderRelation', params)
}
/*根据订单编号查询订单，做添加订单编号用*/
export const f_getOrderIdBynum = (params) => {
  return http.fetchPost(hostUrl+'/front/order/order/f_getOrderIdBynum', params)
}

/*根据订单编号查询订单，做添加订单编号用*/
export const f_memOrderList = (params) => {
  return http.fetchPost(hostUrl+'/front/order/order/f_memOrderList', params)
}
/*根据订单编号查询订单，做添加订单编号用*/
export const f_getOrderInfo = (params) => {
  return http.fetchPost(hostUrl+'/front/order/order/f_getOrderInfo', params)
}
/*修改订单状态*/
export const f_updateOrderState = (params) => {
  return http.fetchPost(hostUrl+'/front/order/order/f_updateOrderState', params)
}

/*用户确实收货，修改完成时间*/
export const f_updatePayOkDate = (params) => {
  return http.fetchPost(hostUrl+'/front/order/order/f_updatePayOkDate', params)
}


/*拿到支付的订单号*/
export const getOrderNum = (params) => {
  return http.fetchPost(hostUrl+'/getOrderNum', params)
}

/*用户成功支付后，修改他订单的支付时间*/
export const f_updatePayok = (params) => {
  return http.fetchPost(hostUrl+'/front/order/order/f_updatePayok', params)
}

/*修改订单的支付方式（花呗，支付宝）*/
export const f_updatePayType = (params) => {
  return http.fetchPost(hostUrl+'/front/order/order/f_updatePayType', params)
}
