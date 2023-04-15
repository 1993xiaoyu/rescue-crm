<template>
  <el-form ref="ruleFormRef" :model="ruleForm" label-width="80px" :inline="true">
    <el-form-item label="姓名" prop="tutorName">
      <el-input v-model="ruleForm.tutorName" placeholder="请输入" clearable />
    </el-form-item>
    <el-form-item label="状态" prop="tutorState">
      <el-select v-model="ruleForm.tutorState" placeholder="请选择" clearable>
        <el-option label="正常" value="0" />
        <el-option label="冻结" value="1" />
      </el-select>
    </el-form-item>

    <el-form-item label="医院" prop="tutorHospital">
      <el-select v-model="ruleForm.tutorHospital" placeholder="请选择医院" filterable clearable>
        <el-option
          :label="item.hospital"
          :value="item.hospital"
          :key="item.id"
          v-for="item in hospitalList"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="科室" prop="tutorDepartment">
      <el-select v-model="ruleForm.tutorDepartment" placeholder="请选择科室" filterable clearable>
        <el-option
          :label="item.department"
          :value="item.department"
          :key="item.id"
          v-for="item in departmentList"
        />
      </el-select>
    </el-form-item>

    <div class="btn-box">
      <el-button type="primary" @click="submitForm">查询</el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      <el-button @click="handleUpload">导入</el-button>
      <el-button @click="handleExport">导出</el-button>
      <el-button @click="volunteerDialogShow" type="primary">新增人员</el-button>
    </div>
  </el-form>
  <Upload v-model="uploadDialogShow" @closeUploadDialogShow="closeUploadDialogShow" />
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import Upload from './upload.vue'
  import { exportData } from '@/api/doctor.ts'
  import { ElMessage } from 'element-plus'
  import useEnum from '@/hooks/useEnum'

  const { hospitalList, departmentList, getHospitalData, getDepartmentData } = useEnum()

  getHospitalData()
  getDepartmentData()

  const emit = defineEmits(['editDialogShow', 'searchList', 'emittutor'])

  const ruleFormRef = ref()
  const ruleForm = reactive({
    tutorName: '',
    tutorHospital: '',
    tutorDepartment: '',
    tutorState: '',
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
    //emit('editDialogShow', true);
    emit('emittutor', {}, 'add')
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
  .el-form-item {
    width: 300px;
  }
  .el-select {
    width: 100%;
  }
</style>
