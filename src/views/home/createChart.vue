<template>
    <div class="create-chart">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="图表名称" prop="name">
                <el-input v-model="form.name" placeholder="请输入图表名称"></el-input>
            </el-form-item>
            <el-form-item label="图表类型" prop="chartType">
                <el-select v-model="form.chartType" placeholder="请选择图表类型">
                    <el-option label="无" value=""></el-option>
                    <el-option label="折线图" value="折线图"></el-option>
                    <el-option label="柱状图" value="柱状图"></el-option>
                    <el-option label="饼图" value="饼图"></el-option>
                    <el-option label="散点图" value="散点图"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分析目标" prop="goal">
                <el-input type="textarea" v-model="form.goal" placeholder="请输入分析目标，越详细AI分析得越准确哦"></el-input>
            </el-form-item>
            <el-form-item label="上传数据" prop="file">
                <el-upload class="upload-demo" action="#" :on-remove="handleRemove" multiple :limit="1"
                    :on-exceed="handleExceed" :file-list="file" :on-change="avatarUpload" :accept="supportType"
                    :auto-upload="false" ref="upload">
                    <el-button size="small" type="primary">选取文件</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传表格类型文件，且文件大小不超过 1 MB</div>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即分析</el-button>
                <el-button @click="resetForm">清空</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import request from '../../request/http.js'
export default {
    name: '',
    data() {
        var validateFile = (rule, value, callback) => {
            const file = this.$refs.upload.uploadFiles[0];
            if (!file) {
                return callback(new Error('请上传文件'));
            }
            callback();
        };
        return {
            form: {
                name: '',
                goal: '',
                chartType: ''
            },
            file: [],
            supportType: '.xlsx, .xls, .csv',
            maxSize: 1024 * 1024 * 1,
            rules: {
                name: [{ required: true, message: '请输入图表名称', trigger: 'blur' },
                { min: 1, max: 99, message: '长度在 1 到 100 个字符', trigger: 'blur' }],
                goal: [{ required: true, message: '请输入分析目标', trigger: 'blur' }],
                file: [{ validator: validateFile, trigger: 'change' }]
            }
        }
    },
    methods: {
        onSubmit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    const successAction = async () => {
                        const formData = new FormData();
                        for (let key in this.form) {
                            formData.append(key, this.form[key]);
                        }
                        formData.append('file', this.$refs.upload.uploadFiles[0].raw);
                        await request({
                            url: '/chart/gen',
                            method: 'post',
                            data: formData,
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                    }

                    this.$confirmService.confirm(successAction, this.cancelAction).then(() => {
                        this.$messageService.successMessage('提交成功')
                    }).catch(err => {
                        if (err !== undefined || err !== ''){
                            this.$messageService.errorMessage(err)
                        }
                    })
                } else {
                    this.$messageService.errorMessage('请将表单填写完整');
                }
            });

        },
        handleExceed() {
            this.$messageService.errorMessage('上传文件过多，只能上传一个文件');
        },
        handleRemove() {
            this.$messageService.warnningMessage('文件已删除');
        },
        avatarUpload(file) {
            const isLt1M = file.size / this.maxSize < 1;
            if (!isLt1M) {
                this.$messageService.errorMessage('上传失败，文件过大');
                this.$refs.upload.clearFiles();
            }
            return isLt1M;
        },
        cancelAction() {
            this.$messageService.warnningMessage('已取消提交')
        },
        resetForm() {
            this.$refs.form.resetFields();
            this.$refs.upload.clearFiles();
            this.$messageService.warnningMessage('表单已清空');
        }
    }
}
</script>

<style lang="less" scoped>
.create-chart {
    margin: 30px;
    width: 60vw;
}
</style>
