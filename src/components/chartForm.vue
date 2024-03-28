<template>
    <div class="">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="图表名称" prop="name">
                <el-input v-model="form.name" placeholder="请输入图表名称" :clearable="true"></el-input>
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
            <el-form-item label="上传数据" prop="file" v-if="!isEdit">
                <el-upload class="upload-demo" action="#" :on-remove="handleRemove" multiple :limit="1"
                    :on-exceed="handleExceed" :on-change="avatarUpload" :accept="supportType" :auto-upload="false"
                    ref="upload">
                    <el-button size="small" type="primary">选取文件</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传表格类型文件，且文件大小不超过 1 MB</div>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" v-if="!isEdit">立即分析</el-button>
                <el-button type="primary" @click="onSubmit" v-else>重新分析</el-button>
                <el-button @click="resetForm">清空</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        var validateFile = (rule, value, callback) => {
            if (!this.form.file) {
                return callback(new Error('请上传文件'));
            }
            callback();
        };
        return {
            form: {
                name: '',
                goal: '',
                chartType: '',
                file: null
            },
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
                return
            }
            this.form.file = file.raw;
            return isLt1M;
        },
        cancelAction() {
            this.$messageService.warnningMessage('已取消提交')
        },
        resetForm() {
            this.clearnForm();
            this.$messageService.warnningMessage('表单已清空');
        },
        clearnForm() {
            this.$refs.form.resetFields();
            this.$refs.upload.clearFiles();
        },
        onSubmit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.nextStep(this.form);
                } else {
                    this.$messageService.errorMessage('请将表单填写完整');
                }
            });
        }
    },
    props: ['nextStep', 'oldData'],
    computed: {
        isEdit() {
            return this.$route.path.includes('/edit')
        }
    },
    mounted() {
        this.$bus.$on('clearnForm', this.clearnForm)
        if (this.isEdit) {
            this.form = this.oldData
        }
    },
    beforeDestroy() {
        this.$bus.$off('clearnForm')
    },
    watch: {
        oldData(newValue) {
            if (this.isEdit) {
                this.form = newValue
            }
        }
    }
}
</script>

<style lang="less" scoped></style>
