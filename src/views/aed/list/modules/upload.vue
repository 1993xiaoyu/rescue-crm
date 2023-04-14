<template>
  <el-dialog v-model="dialogVisible" title="批量更新巡检信息" width="40%" class="upload-dialog">
    <div class="upload-content">
      <div class="upload-content__item">
        <span class="upload-content__num">1</span>
        <div>
          <div class="upload-content__title">下载批量导入模板</div>
          <div class="upload-content__tip">
            请下载批量模板导入的模板，并在表格中完善设备信息，请勿修改模板结构
          </div>
          <el-button @click="handleImportTemplate">下载模板</el-button>
        </div>
      </div>
      <div class="upload-content__item">
        <span class="upload-content__num">2</span>
        <div>
          <div class="upload-content__title">上传完善后的表格</div>
          <div class="upload-content__tip"> 请将完善后的表格上传，上传成功后设备即新增成功。 </div>

          <el-upload
            action="//test.forjhntech.online/api/system/aed/importData"
            ref="uploadRef"
            class="upload-demo"
            :on-change="handleChange"
            :on-success="handleSuccess"
            :on-error="handleError"
            accept="xsxl"
            :limit="1"
            :multiple="false"
            :auto-upload="false"
            :with-credentials="true"
          >
            <el-button slot="trigger" type="primary">上传文件</el-button>
          </el-upload>
        </div>
      </div>
    </div>
    <div class="upload-btns">
      <el-button type="primary" @click="submitUpload">确定</el-button>
      <el-button @click="closeDialog">取消</el-button>
    </div>
  </el-dialog>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { importTemplate } from '@/api/aed'
  import { ElMessage } from 'element-plus'
  const emit = defineEmits(['closeUploadDialogShow'])
  const uploadRef = ref()
  const props = defineProps({
    show: {
      type: Boolean,
      default: false,
    },
  })
  const dialogVisible = computed({
    get() {
      return props.show
    },
    set(val) {
      return val
    },
  })

  const fileList = ref()

  // 请求模板
  const handleImportTemplate = async () => {
    const res = await importTemplate()
    if (res.msg) {
      window.open(`/api/common/download?fileName=${res.msg}&delete=true`, '_self')
    } else {
      ElMessage({
        type: 'waring',
        message: '模板获取失败，请稍后再试',
      })
    }
  }

  const handleChange = (uploadFile) => {
    fileList.value = uploadFile
  }

  const beforeUpload = () => {
    const file = fileList.value
    const typeAll = ['xlsx', 'XLSX']
    const type = file.name.split('.')[1]
    const size = file.size / 1024 / 1024
    let isRight = true

    if (typeAll.indexOf(type) == -1) {
      isRight = false
      ElMessage({
        type: 'waring',
        message: '上传文件的格式不正确，请重新上传',
      })
    }
    if (size > 2) {
      isRight = false
      ElMessage({
        type: 'waring',
        message: '文件体积过大，请重新上传',
      })
    }
    return isRight
  }

  const submitUpload = () => {
    if (!beforeUpload()) {
      return
    }
    uploadRef.value.submit()
  }
  const closeDialog = () => {
    fileList.value = ''
    emit('closeUploadDialogShow', false)
  }
  const handleSuccess = (res) => {
    console.log(res, '===success')
    ElMessage({
      type: 'success',
      message: '上传成功',
    })
    closeDialog()
  }
  const handleError = (res) => {
    ElMessage({
      type: 'waring',
      message: '请检查文件，上传失败',
    })
    console.log(res, '===error')
  }
</script>

<style lang="scss" scoped>
  .upload-dialog {
    .upload-content {
      color: #000;
      font-size: 14px;
      &__item {
        display: flex;
        margin-bottom: 20px;
        &:nth-child(2) {
          .upload-content__num {
            background: #7175fc82;
            color: #fff;
          }
        }
      }
      &__num {
        border-radius: 50%;
        background: #7175fc19;
        margin-right: 20px;
        height: 26px;
        width: 26px;
        text-align: center;
        line-height: 26px;
      }

      &__title {
        margin-bottom: 7px;
      }
      &__tip {
        font-size: 12px;
        color: #888;
        margin-bottom: 10px;
      }
    }
    .upload-btns {
      width: 100%;
      margin-top: 68px;
      padding-top: 22px;
      border-top: 1px solid #e1e6eb;
      margin-bottom: -8px;
      text-align: center;
    }
  }
</style>
