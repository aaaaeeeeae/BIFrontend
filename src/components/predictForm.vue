<template>
    <div class="warrap" v-loading="loading" element-loading-text="正在拼命加载中...">
        <div v-if="handledData.length > 0" class="left">
            <el-form ref="form" :model="form" label-width="90px" :rules="rules">
                <el-form-item label="预测类型" prop="type">
                    <el-radio-group v-model="form.type">
                        <el-radio-button label="连续值"></el-radio-button>
                        <el-radio-button label="离散值"></el-radio-button>
                    </el-radio-group>
                    <!-- <el-radio v-model="form.type" label="连续值1">连续值</el-radio>
                    <el-radio v-model="form.type" label="离散值2">离散值</el-radio> -->
                </el-form-item>
                <el-form-item label="预测目标" prop="target">
                    <el-radio-group v-model="form.target">
                        <el-radio :label="column" v-for="(column, index) in numberticColumns" :key="index">
                            {{ column }}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="权重" v-if="form.type === '离散值'">
                    <el-row v-for="(column, index) in Object.keys(handledData[0])" :key="index">
                        <el-col :span="12">
                            <span>{{ column }}</span>
                        </el-col>
                        <el-col :span="12">
                            <el-input-number v-model="weight[index]" :min="0" :max="10" :label="column"
                                controls-position="right" size="small"></el-input-number>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="预测描述" prop="description">
                    <el-input type="textarea" v-model="form.description" placeholder="请输入预测描述，越详细AI预测得越准确哦"
                        autosize></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即分析</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div :class="`right  ${handledData.length > 0 ? 'after' : 'before'}`">
            <el-upload class="upload" action="#" :on-remove="handleRemove" :limit="1" :on-exceed="handleExceed"
                :on-change="avatarUpload" :accept="supportType" :auto-upload="false" ref="upload" :file-list="fileList"
                drag>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div slot="tip" class="el-upload__tip">Tips: 只能上传表格类型文件，且文件大小不超过 1 MB</div>
            </el-upload>
            <div class="table" v-if="handledData.length > 0">
                <el-table :data="handledData" style="width: 100%" max-height="300" border>
                    <el-table-column v-for="(column, index) in Object.keys(handledData[0])" :key="index" :prop="column"
                        :label="column">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import { getChartById } from '../request/chartRequest.js'
import handleTable from '../utils/hadleTableData.js'
import { uploadFile } from '../request/chartRequest.js'
import findNumericColumns from '../utils/findNumbericColumns.js'

export default {
    name: '',
    data() {
        return {
            form: {
                target: '',
                description: '',
                type: '连续值'
            },
            weight: [],
            rawData: '',
            supportType: '.xlsx, .xls, .csv',
            handledData: [],
            maxSize: 1024 * 1024 * 1,
            fileList: [],
            numberticColumns: [],
            loading: false,
            rules: {
                target: [{ required: true, message: '请选择预测目标', trigger: 'change' }],
                type: [{ required: true, message: '请选择分析类型', trigger: 'change' }],
                description: [{ required: true, message: '请填写分析描述', trigger: 'blur' }]
            }
        }
    },
    methods: {
        handleExceed() {
            this.$messageService.errorMessage('上传文件过多，只能上传一个文件');
        },
        handleRemove() {
            this.$messageService.warnningMessage('文件已删除')
            // 更新视图
            this.handledData.length = 0
            this.fileList.pop()
            this.form = {
                target: '',
                type: '连续值',
                description: ''
            }
            this.weight = []
        },
        async avatarUpload(file) {
            const isLt1M = file.size / this.maxSize < 1;
            if (!isLt1M) {
                this.$messageService.errorMessage('上传失败，文件过大');
                this.$refs.upload.clearFiles();
                return
            }
            // 上传到服务器，返回
            try {
                this.loading = true
                const formData = new FormData();
                formData.append('file', file.raw)
                const res = await uploadFile(formData)
                console.log(res);
                this.rawData = res
                console.log(this.rawData);
                this.fileList.push({ name: file.name })
                this.loading = false
            } catch (error) {
                this.loading = false
                console.log(error);
            }
            return isLt1M;
        },
        onSubmit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.nextStep(this.form, this.rawData, this.weight);
                } else {
                    this.$messageService.errorMessage('请将表单填写完整')
                }
            });
        }
    },
    async created() {
        // 如果是从详情页跳转过来直接进行预测的
        if (this.$route.query.chartId) {
            try {
                console.log(123);
                this.loading = true
                this.fileList.push({ name: '已上传的数据' })
                const res = await getChartById(this.$route.query.chartId)
                this.rawData = res.chartData
                this.loading = false
            } catch (error) {
                this.loading = false
                console.log(error);
            }
        }
    },
    watch: {
        rawData: {
            deep: true,
            immediate: true,
            handler(newVal) {
                if (newVal) {
                    this.rawData = newVal
                    this.handledData = handleTable(this.rawData)
                }
            }
        },
        handledData: {
            deep: true,
            handler(newVal) {
                console.log(newVal);
                this.handledData = newVal
                this.numberticColumns = findNumericColumns(this.handledData)
                Object.keys(this.handledData[0]).forEach(() => {
                    this.weight.push(0)
                })
            }
        }
    },
    props: ['nextStep']
}
</script>

<style lang="less" scoped>
.center {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.warrap {
    min-height: 70vh;
    width: 100%;
    position: relative;
    .center;

    .left {
        width: 50%;
        padding: 10px;
        padding-right: 30px;
    }

    .right {
        width: 50%;
        flex-direction: column;
        transition: width 0.5s ease, border-left 0.5s ease;
        .center;

        .upload {
            width: 90%;
            text-align: center;
        }
    }

    .table {
        margin-top: 10px;
    }

    .after {
        border-left: 1px solid #edeff2;
    }

    .before {
        width: 100% !important;
    }
}
</style>
