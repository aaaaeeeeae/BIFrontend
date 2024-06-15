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

function predictChart(data) {
    return request({
        url: '/chart/predict',
        method: 'post',
        data
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

function uploadFile(data) {
    return request({
        url: '/file/uploadFile',
        method: 'post',
        data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

function tryAgain(data) {
    return request({
        url: `/chart/tryAgain?id=${data}`,
        method: 'get',
        headers: {
            'Content-Type': 'x-www-form-urlencoded'
        }
    })
}

async function genChartWithRetry(userId, data, maxRetries = 3, delay = 2000) {
    const retryKey = `${userId}-retries-genChart`
    let retries = parseInt(sessionStorage.getItem(retryKey) || 0)
    try {
        const res = request({
            url: '/chart/gen',
            method: 'post',
            data,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        sessionStorage.removeItem(retryKey)
        return res
    } catch (error) {
        if (retries >= maxRetries) {
            return Promise.reject('重试失败，且已达最大重试次数')
        }
        retries++;
        sessionStorage.setItem(retryKey, retries.toString());
        await new Promise(resolve => setTimeout(resolve, delay))
        return genChartWithRetry(data, retries--, delay * 2)
    }
}

export { getChartByPage, genChart, deleteChart, getChartById, editChart, uploadFile, tryAgain, genChartWithRetry, predictChart }