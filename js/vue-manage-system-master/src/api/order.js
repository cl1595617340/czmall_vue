import http from '../api/public'

/**/
export const getorderlist = (params) => {
    return http.fetchPost('/admin/order/order/getorderlist', params)
}

export const updateOrderSend = (params) => {
    return http.fetchPost('/admin/order/order/updateOrderSend', params)
}
