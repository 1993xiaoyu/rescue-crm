<template>
  <el-form ref="ruleFormRef" :model="ruleForm" label-width="80px" :inline="true">
    <el-form-item label="设备ID" prop="name">
      <el-input v-model="ruleForm.name" placeholder="请输入" />
    </el-form-item>
    <el-form-item prop="date1" label="安装时间">
      <el-date-picker
        v-model="ruleForm.date1"
        type="date"
        placeholder="请选择"
        style="width: 100%"
      />
    </el-form-item>
    <el-form-item label="状态" prop="region">
      <el-select v-model="ruleForm.region" placeholder="请选择">
        <el-option label="上海" value="shagn" />
        <el-option label="北京" value="beijing" />
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm">查询</el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
    <el-form-item>
      <el-button @click="handleUpload">导入</el-button>
      <el-button @click="handleExport">导出</el-button>
      <el-button @click="aedDialogShow" type="primary">新增设备</el-button>
    </el-form-item>
  </el-form>
  <Upload v-model="uploadDialogShow" @closeUploadDialogShow="closeUploadDialogShow" />
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import Upload from './upload.vue'
  import { exportData } from '@/api/aed.ts'
  import { ElMessage } from 'element-plus'

  const emit = defineEmits(['editDialogShow', 'searchList'])

  const ruleFormRef = ref()
  const ruleForm = reactive({
    volunteerId: '',
    volunteerState: '',
    trainTime: '',
  })

  const uploadDialogShow = ref(false)
  const submitForm = () => {
    emit('searchList', { ...ruleForm })
  }

  const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
  }

  const aedDialogShow = () => {
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
