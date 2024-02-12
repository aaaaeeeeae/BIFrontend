// 一些常见状态码

export default {
    SUCCESS: 0, // 成功
    PARAMS_ERROR: 40000, // 请求参数错误
    NOT_LOGIN: 40100, // 未登录
    NO_AUTH_ERROR: 40101, // 无权限
    NOT_FOUND: 40400, // 请求数据不存在
    TOO_MANY_REQUEST: 42900, // 请求过于频繁
    SYSTEM_ERROR: 50000, // 系统内部异常
    OPERATION_ERROR: 50001 // 操作失败
}