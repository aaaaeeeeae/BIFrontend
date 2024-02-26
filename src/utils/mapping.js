const dayjs = require('dayjs');
function mappingReq(data) {
    return {
        图表编码: data.id,
        图表名称: data.name,
        分析目标: data.goal,
        图表类型: data.chartType,
        创建时间: dayjs(data.createTime).format('YYYY年-MM月-DD日 HH:mm'),
        更新时间: dayjs(data.updateTime).format('YYYY年-MM月-DD日 HH:mm')
    }
}
function mappingRes(data) {
    return {
        可视化结果: data.genChart,
        分析结论: data.genResult.replace("分析结论：", '')
    }

}
export { mappingReq, mappingRes }