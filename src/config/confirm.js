import { MessageBox } from 'element-ui';

const defaultOption = {
    title: '',
    message: '请仔细检查你的提交，提交后可在我的图表中查看结果',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    showClose: false
}
export default {
    confirm(successAction, cancelAction, options = defaultOption) {
        return MessageBox(options).then(() => {
            // 用户点击了确定按钮
            return Promise.resolve(successAction())
        }, () => {
            // 用户点击了关闭和取消按钮
            return Promise.reject(cancelAction())
        }).catch(error => {
            // 继续抛出异常
            return Promise.reject(error);
        })
    }
}