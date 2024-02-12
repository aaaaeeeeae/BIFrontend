// 通知组件
import { Notification } from "element-ui";

export default {
    successMessage(message) {
        Notification.success(message)
    },
    errorMessage(message) {
        Notification.error(message)
    },
    warningMessage(message) {
        Notification.warning(message)
    },
    infoMessage(message) {
        Notification.info(message)
    }
}