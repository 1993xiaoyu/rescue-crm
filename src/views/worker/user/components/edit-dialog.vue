<template>
  <el-dialog
    v-model="dialogVisible"
    :title="currDialogType === 'add' ? '新增用户' : '编辑用户'"
    width="60%"
    class="dialog-dialog"
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      status-icon
      :inline="true"
    >
      <div class="dialog-dialog__title">基本信息</div>

      <el-form-item label="姓名" prop="userName" required>
        <el-input v-model="ruleForm.userName" />
      </el-form-item>
      <el-form-item label="昵称" prop="loginName" required>
        <el-input v-model="ruleForm.loginName" />
      </el-form-item>

      <el-form-item label="手机号" prop="phoneNumber" required>
        <el-input v-model="ruleForm.phoneNumber" />
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" />
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status" active-value="0" inactive-value="1" />
      </el-form-item>

      <el-form-item label="所属机构" prop="hospital" required>
        <el-select v-model="ruleForm.hospital" placeholder="请选择">
          <el-option label="所属机构1" value="1" />
          <el-option label="所属机构2" value="2" />
          <el-option label="所属机构3" value="3" />
        </el-select>
      </el-form-item>

      <el-form-item label="身份证号" prop="idicciid">
        <el-input v-model="ruleForm.idicciid" />
      </el-form-item>

      <!-- <el-form-item label="出生时间" prop="birthday">
                <el-date-picker
                    v-model="ruleForm.birthday"
                    type="date"
                    placeholder="请选择时间"
                    style="width: 100%"
                    value-format="YYYY-MM-DD"
                />
            </el-form-item> -->

      <el-form-item label="用户角色" prop="roleIds">
        <el-select v-model="ruleForm.roleIds" multiple placeholder="请选择">
          <el-option label="超级管理员" value="1" />
          <el-option label="普通管理员" value="2" />
          <el-option label="AED管理员" value="3" />
        </el-select>
      </el-form-item>

      <div class="dialog-dialog__btns">
        <el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
        <el-button @click="closeDialog(ruleFormRef)">取消</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script setup>
  import { reactive, ref, computed } from 'vue'
  import { userAdd, userEdit } from '@/api/work'
  import { ElMessage } from 'element-plus'
  const emit = defineEmits(['closeEditDialogShow'])

  const props = defineProps({
    show: {
      type: Boolean,
      default: false,
    },
  })

  const ruleFormRef = ref()
  const defData = {
    roleIds: '',
    userName: '',
    sex: '',
    status: '0',
    hospital: '',
    phoneNumber: '',
    email: '',
    idicciid: '',
    birthday: '',
    loginName: '',
  }
  const ruleForm = ref({})

  const rules = reactive({
    userName: [
      {
        required: true,
        message: '请填写',
        trigger: 'blur',
      },
    ],
    hospital: [
      {
        required: true,
        message: '请选择',
        trigger: 'blur',
      },
    ],
    phoneNumber: [
      {
        required: true,
        message: '请填写',
        trigger: 'blur',
      },
    ],
  })

  const currDialogType = ref('add')

  const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid) => {
      if (valid) {
        const currFun = currDialogType.value === 'add' ? userAdd : userEdit
        currFun({
          ...ruleForm.value,
        }).then((res) => {
          if (res.code === 0) {
            ElMessage({ type: 'success', message: '操作成功' })
            emit('closeEditDialogShow', false)
            initDialog()
          } else {
            ElMessage({
              type: 'error',
              message: res.message || '新增失败，请检查',
            })
          }
        })
      }
    })
  }

  const closeDialog = () => {
    initDialog()
    emit('closeEditDialogShow', false)
  }

  const initDialog = () => {
    currDialogType.value = 'add'
    ruleForm.value = defData
  }

  const dialogVisible = computed({
    get() {
      initDialog()
      return props.show
    },
    set(val) {
      initDialog()
      return val
    },
  })

  const setDialogData = (item) => {
    ruleForm.value = item
    currDialogType.value = 'edit'
  }

  defineExpose({ setDialogData })
</script>

<style lang="scss" scoped>
  .dialog-dialog {
    .el-form-item {
      width: 45%;
    }
    .el-select {
      width: 100%;
    }

    &__title {
      font-weight: 700;
      margin-bottom: 24px;
    }

    &__btns {
      width: 100%;
      margin-top: 68px;
      padding-top: 22px;
      border-top: 1px solid #e1e6eb;
      margin-bottom: -8px;
      text-align: center;
    }
  }
</style>
