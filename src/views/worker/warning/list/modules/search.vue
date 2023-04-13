<template>
  <el-form ref="ruleFormRef" :model="ruleForm" label-width="80px" :inline="true">
    <el-form-item label="预警模块" prop="status">
      <el-select v-model="ruleForm.status" placeholder="请选择">
        <el-option label="开启" value="1" />
        <el-option label="冻结" value="0" />
      </el-select>
    </el-form-item>
    <el-form-item label="预警等级" prop="level">
      <el-select v-model="ruleForm.level" placeholder="请选择">
        <el-option label="等级1" value="1" />
        <el-option label="等级2" value="0" />
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
    status: '',
    level: '',
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
