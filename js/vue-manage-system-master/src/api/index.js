import http from '../api/public'


export const getlist = (params) => {
    return http.fetchGet('/getEmpList', params)
}
