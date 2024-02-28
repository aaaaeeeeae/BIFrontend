import request from './http.js'

function getChartByPage(data) {
    return request({
        url: '/chart/my/list/page',
        method: 'post',
        data
    })
}
function genChart(data) {
    return request({
        url: '/chart/gen',
        method: 'post',
        data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
function deleteChart(data) {
    return request({
        url: '/chart/delete',
        method: 'post',
        data
    })
}
function getChartById(data) {
    return request({
        url: `chart/get?id=${data}`,
        method: 'get',
        headers: {
            'Content-Type': 'x-www-form-urlencoded'
        }
    })
}
function editChart(data) {
    return request({
        url: '/chart/edit',
        method: 'post',
        data
    })
}
export { getChartByPage, genChart, deleteChart, getChartById, editChart }