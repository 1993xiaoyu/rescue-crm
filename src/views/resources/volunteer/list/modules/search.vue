<template>
  <el-form ref="ruleFormRef" :model="ruleForm" label-width="80px" :inline="true">
    <el-form-item label="姓名" prop="volunteerName">
      <el-input v-model="ruleForm.volunteerName" placeholder="请输入" />
    </el-form-item>
    <el-form-item prop="trainDate" label="加入时间">
      <el-date-picker
        v-model="ruleForm.trainDate"
        type="date"
        placeholder="请选择"
        style="width: 100%"
        value-format="YYYY-MM-DD"
      />
    </el-form-item>
    <el-form-item label="人员状态" prop="volunteerState">
      <el-select v-model="ruleForm.volunteerState" placeholder="请选择" clearable>
        <el-option label="开启" value="0" />
        <el-option label="冻结" value="1" />
      </el-select>
    </el-form-item>

    <div class="btn-box">
      <el-button type="primary" @click="submitForm">查询</el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      <el-button @click="handleUpload">导入</el-button>
      <el-button @click="handleExport">导出</el-button>
      <el-button @click="volunteerDialogShow" type="primary">新增志愿者</el-button>
    </div>
  </el-form>
  <Upload v-model="uploadDialogShow" @closeUploadDialogShow="closeUploadDialogShow" />
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import Upload from './upload.vue'
  import { exportData } from '@/api/volunteer.ts'
  import { ElMessage } from 'element-plus'

  const emit = defineEmits(['editDialogShow', 'searchList'])

  const ruleFormRef = ref()
  const ruleForm = reactive({
    volunteerName: '',
    volunteerState: '',
    trainDate: '',
  })

  const uploadDialogShow = ref(false)
  const submitForm = () => {
    emit('searchList', { ...ruleForm })
  }

  const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
  }

  const volunteerDialogShow = () => {
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
      //  http://test.forjhntech.online/1779c482-4d6c-425f-be63-eb361338a8ab_%E5%BF%97%E6%84%BF%E8%80%85%E6%95%B0%E6%8D%AE.xlsx
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
