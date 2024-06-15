export default function findNumericColumns(array) {
    // 存储是否为数值类型的标记  
    const columnTypes = {};
    // 正则匹配时间类型
    const timePattern = /^(\d{4}-\d{2}-\d{2}|\d{2}:\d{2}:\d{2})$/;
    for (const obj of array) {
        for (const key in obj) {
            // eslint-disable-next-line no-prototype-builtins
            if (obj.hasOwnProperty(key)) {
                // 检查属性的值是否为数值类型
                const isString = typeof obj[key] === 'string';
                const isTimeFormat = isString && timePattern.test(obj[key]);
                const isNumeric = !isTimeFormat && !isNaN(parseFloat(obj[key])) && isFinite(parseFloat(obj[key]));
                
                if (columnTypes[key] !== undefined) {
                    columnTypes[key] = columnTypes[key] && isNumeric;
                } else {
                    columnTypes[key] = isNumeric;
                }
                // 如果发现非数值类型的值，设为false  
                if (!isNumeric) {
                    columnTypes[key] = false;
                }
            }
        }
    }
    console.log(columnTypes);
    // 找出所有只包含数值类型的列  
    const numericColumns = Object.keys(columnTypes).filter(key => columnTypes[key]);
    return numericColumns;
}
