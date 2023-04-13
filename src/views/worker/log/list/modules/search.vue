<template>
  <el-form ref="ruleFormRef" :model="ruleForm" label-width="80px" :inline="true">
    <el-form-item label="操作人" prop="userName">
      <el-input v-model="ruleForm.userName" />
    </el-form-item>

    <el-form-item label="操作时间" prop="status">
      <el-select v-model="ruleForm.status" placeholder="请选择">
        <el-option label="开启" value="1" />
        <el-option label="冻结" value="0" />
      </el-select>
    </el-form-item>
    <el-form-item label="操作类型" prop="logState">
      <el-select v-model="ruleForm.logState" placeholder="请选择">
        <el-option label="类型1" value="1" />
        <el-option label="类型2" value="0" />
      </el-select>
    </el-form-item>
    <div class="btn-box">
      <el-button type="primary" @click="submitForm">查询</el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </div>
  </el-form>
</template>

<script setup>
  import { reactive, ref } from 'vue'

  const emit = defineEmits(['searchList'])

  const ruleFormRef = ref()
  const ruleForm = reactive({
    userName: '',
    status: '',
    logState: '',
  })

  const submitForm = () => {
    emit('searchList', { ...ruleForm })
  }

  const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
  }
</script>
<style lang="scss" scoped>
  .btn-box {
    text-align: right;
    margin-bottom: 60px;
  }
</style>
