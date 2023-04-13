<template>
  <el-form ref="ruleFormRef" :model="ruleForm" label-width="80px" :inline="true">
    <el-form-item label="姓名" prop="userName">
      <el-input v-model="ruleForm.userName" />
    </el-form-item>

    <el-form-item label="状态" prop="status">
      <el-select v-model="ruleForm.status" placeholder="请选择">
        <el-option label="开启" value="0" />
        <el-option label="冻结" value="1" />
      </el-select>
    </el-form-item>

    <div class="btn-box">
      <el-button type="primary" @click="submitForm">查询</el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      <el-button @click="handleUpload">导入</el-button>
      <el-button @click="handleExport">导出</el-button>
      <el-button @click="dialogShow" type="primary">新增用户</el-button>
    </div>
  </el-form>
  <Upload v-model="uploadDialogShow" @closeUploadDialogShow="closeUploadDialogShow" />
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import Upload from './upload.vue'
  import { exportData } from '@/api/work'
  import { ElMessage } from 'element-plus'

  const emit = defineEmits(['editDialogShow', 'searchList'])

  const ruleFormRef = ref()
  const ruleForm = reactive({
    userName: '',
    status: '',
  })

  const uploadDialogShow = ref(false)
  const submitForm = () => {
    emit('searchList', { ...ruleForm })
  }

  const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
  }

  const dialogShow = () => {
    emit('editDialogShow', true)
  }

  const handleUpload = () => {
    uploadDialogShow.value = true
  }

  const closeUploadDialogShow = () => {
    uploadDialogShow.value = false
  }

  // 导出数据
  const handleExport = async () => {
    const params = {
      ...ruleForm,
    }
    const res = await exportData(params)

    if (res.msg) {
      window.open(`/api/common/download?fileName=${res.msg}&delete=true`, '_self')
    } else {
      ElMessage({
        type: 'waring',
        message: '下载失败，请稍后再试',
      })
    }
  }
</script>
<style lang="scss" scoped>
  .btn-box {
    text-align: right;
    margin-bottom: 60px;
  }
</style>
