<template>
  <el-dialog
    v-model="dialogVisible"
    :title="currDialogType === 'add' ? '新增机构' : '编辑机构'"
    width="70%"
    class="dialog-dialog"
  >
    <el-form ref="ruleFormRef" :model="ruleForm" label-width="120px" status-icon :inline="true">
      <div class="dialog-dialog__title">基本信息</div>

      <el-form-item label="机构名称" prop="mechanismName" required :show-message="false">
        <el-input v-model="ruleForm.mechanismName" />
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status" active-value="0" inactive-value="1" />
      </el-form-item>

      <el-form-item label="机构类别" prop="organizationType" required :show-message="false">
        <el-select v-model="ruleForm.organizationType" placeholder="请选择">
          <el-option label="社区卫生服务中心" value="1" />
          <el-option label="所属机构2" value="2" />
          <el-option label="所属机构3" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="经营性质" prop="management" required :show-message="false">
        <el-select v-model="ruleForm.management" placeholder="请选择">
          <el-option label="非营利性（政府办）" value="1" />
          <el-option label="私立" value="2" />
        </el-select>
      </el-form-item>

      <el-form-item label="机构地址" prop="mechanismAdress" required :show-message="false">
        <el-input v-model="ruleForm.mechanismAdress" />
      </el-form-item>

      <el-form-item label="发证机关" prop="sendCard" required :show-message="false">
        <el-input v-model="ruleForm.sendCard" />
      </el-form-item>

      <el-form-item label="机构电话号码" prop="phone" required :show-message="false">
        <el-input v-model="ruleForm.phone" />
      </el-form-item>

      <el-form-item label="唯一标识" prop="identificationCode" required :show-message="false">
        <el-input v-model="ruleForm.identificationCode" />
      </el-form-item>

      <el-form-item label="法人姓名" prop="legalName" required :show-message="false">
        <el-input v-model="ruleForm.legalName" />
      </el-form-item>
      <el-form-item label="法人证件号" prop="legalIccid" required :show-message="false">
        <el-input v-model="ruleForm.legalIccid" />
      </el-form-item>

      <el-form-item label="负责人姓名" prop="chargeName" required :show-message="false">
        <el-input v-model="ruleForm.chargeName" />
      </el-form-item>
      <el-form-item label="负责人证件号" prop="chargeIccid" required :show-message="false">
        <el-input v-model="ruleForm.chargeIccid" />
      </el-form-item>
      <el-form-item label="负责人电话" prop="chargePhone" required :show-message="false">
        <el-input v-model="ruleForm.chargePhone" />
      </el-form-item>

      <el-form-item label="有效期开始" prop="startTime" required :show-message="false">
        <el-date-picker
          v-model="ruleForm.startTime"
          type="date"
          placeholder="请选择时间"
          style="width: 100%"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="有效期结束" prop="endTime" required :show-message="false">
        <el-date-picker
          v-model="ruleForm.endTime"
          type="date"
          placeholder="请选择时间"
          style="width: 100%"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="开业日期" prop="openDate" required :show-message="false">
        <el-date-picker
          v-model="ruleForm.openDate"
          type="date"
          placeholder="请选择时间"
          style="width: 100%"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>

      <el-form-item label="下一校验日期" prop="calibrationDate" required :show-message="false">
        <el-date-picker
          v-model="ruleForm.calibrationDate"
          type="date"
          placeholder="请选择时间"
          style="width: 100%"
          value-format="YYYY-MM-DD"
        />
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
  import { mechanismAdd, mechanismEdit } from '@/api/organ.ts'
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
    mechanismName: '',
    organizationType: '',
    status: '0',
    mechanismAdress: '',
    sendCard: '',
    phone: '',
    startTime: '',
    management: '',
    identificationCode: '',
    endTime: '',
    legalName: '',
    legalIccid: '',

    chargeName: '',
    chargeIccid: '',
    chargePhone: '',
    openDate: '',
    calibrationDate: '',
  }
  const ruleForm = ref({})

  const currDialogType = ref('add')

  const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid) => {
      if (valid) {
        const currFun = currDialogType.value === 'add' ? mechanismAdd : mechanismEdit
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
    ruleForm.value = {
      ...item,
    }

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
