<template>
  <el-dialog v-model="dialogVisible" title="修改密码" width="40%">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="旧的密码" prop="oldPassword">
        <el-input v-model="ruleForm.oldPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新的密码" prop="newPassword">
        <el-input v-model="ruleForm.newPassword" type="password"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ref, defineExpose, reactive } from 'vue'
  import type { ElForm } from 'element-plus'
  import { useUserStore } from '@/store/modules/user'
  import { resetPwd } from '@/api/user'

  const dialogVisible = ref(false)
  const UserStore = useUserStore()
  const show = () => {
    dialogVisible.value = true
  }

  type FormInstance = InstanceType<typeof ElForm>

  const formSize = ref('')
  const ruleFormRef = ref<FormInstance>()
  const ruleForm = reactive({
    username: UserStore.userInfo.username,
    oldPassword: UserStore.userInfo.password,
    newPassword: '',
  })
  const rules = reactive({
    configPassword: [
      {
        required: true,
        message: '请输入新的密码',
        trigger: 'blur',
      },
    ],
  })
  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
      if (valid) {
        resetPwd({ oldPassword: ruleForm.oldPassword, newPassword: ruleForm.newPassword }).then(
          (res) => {
            dialogVisible.value = false
            console.log(res, '===res')
          },
        )
      } else {
        return false
      }
    })
  }

  defineExpose({
    show,
  })
</script>

<style scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
