import http from '../api/public'

/**/
export const getmemberlist = (params) => {
    return http.fetchPost('/admin/member/member/getmemberlist', params)
}
/*停用和启用会员*/
export const updateMemberState = (params) => {
    return http.fetchPost('/admin/member/member/updateMemberState', params)
}
