import http from '../api/public'

/**/
export const getAdmin = (params) => {
    return http.fetchPost('/admin/getAdmin', params)
}


