import request from './http.js'

function userLogin(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}
function userRegister(data) {
    return request({
        url: 'user/register',
        method: 'post',
        data
    })
}
function userLogout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}
function getLoginUserId() {
    return request({
        url: 'user/get/login',
        method: 'get'
    })
}
export { userLogin, userRegister, userLogout, getLoginUserId }