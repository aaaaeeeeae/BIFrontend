// 提示组件
import { Message } from "element-ui";

const baseSettings = { center: true, duration: 2000 };

export default {
    successMessage(message) {
        Message({
            type: 'success',
            message: message,
            ...baseSettings
        })
    },
    errorMessage(message) {
        Message({
            type: 'error',
            message: message,
            ...baseSettings
        })
    },
    warnningMessage(message) {
        Message({
            type: 'warning',
            message: message,
            ...baseSettings
        })
    },
    infoMessage(message) {
        Message({
            type: 'info',
            message: message,
            ...baseSettings
        })
    }
}