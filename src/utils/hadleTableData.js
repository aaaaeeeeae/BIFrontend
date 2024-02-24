export default function handleTable(rawData) {
    // 只取前50条
    const lines = rawData.split('\n').slice(0, 50)
    // 去除末尾空行
    while (lines.length > 0 && lines[lines.length - 1] === '') {
        lines.pop();
    }
    const headers = lines.shift().split(',')
    return lines.map(line => {
        const values = line.split(',')
        const obj = {}
        values.forEach((val, index) => {
            obj[headers[index]] = val
        })
        return obj
    })
}
