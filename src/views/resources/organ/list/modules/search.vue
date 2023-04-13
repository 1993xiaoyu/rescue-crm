<template>
  <el-form ref="ruleFormRef" :model="ruleForm" label-width="80px" :inline="true">
    <el-form-item label="关键字" prop="mechanismName">
      <el-input v-model="ruleForm.mechanismName" />
    </el-form-item>

    <el-form-item label="状态" prop="stauts">
      <el-select v-model="ruleForm.stauts" placeholder="请选择">
        <el-option label="注册" value="1" />
        <el-option label="变更" value="2" />
      </el-select>
    </el-form-item>
    <el-form-item label="机构类型" prop="organizationType">
      <el-select v-model="ruleForm.organizationType" placeholder="请选择">
        <el-option :label="item.management" :value="item.id" v-for="item in managementList" />
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm">查询</el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
    <el-form-item>
      <el-button @click="handleUpload">导入</el-button>
      <el-button @click="handleExport">导出</el-button>
      <el-button @click="dialogShow" type="primary">新增机构</el-button>
    </el-form-item>
  </el-form>
  <Upload v-model="uploadDialogShow" @closeUploadDialogShow="closeUploadDialogShow" />
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import Upload from './upload.vue'
  import { exportData } from '@/api/organ.ts'
  import { ElMessage } from 'element-plus'

  import useEnum from '@/hooks/useEnum'

  const { getManagementData, managementList } = useEnum()

  getManagementData()

  const emit = defineEmits(['editDialogShow', 'searchList'])

  const ruleFormRef = ref()
  const ruleForm = reactive({
    mechanismName: '',
    status: '',
    organizationType: '',
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
