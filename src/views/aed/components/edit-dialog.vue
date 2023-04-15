<template>
  <el-dialog
    v-model="dialogVisible"
    :title="currDialogType === 'add' ? '新增设备' : '编辑设备'"
    width="60%"
    top="3vh"
    class="aed-dialog"
  >
    <el-form ref="ruleFormRef" :model="ruleForm" label-width="150px" status-icon :inline="true">
      <el-form-item label="设备序列号" prop="aedNumber" required :show-message="false">
        <el-input v-model="ruleForm.aedNumber" />
      </el-form-item>

      <el-form-item label="品牌" prop="equipmentBrand" required :show-message="false">
        <el-input v-model="ruleForm.equipmentBrand" />
      </el-form-item>
      <el-form-item label="设备型号" prop="aedModel" required :show-message="false">
        <el-input v-model="ruleForm.aedModel" />
      </el-form-item>
      <el-form-item label="保修期至" prop="equipmentDate">
        <el-date-picker
          v-model="ruleForm.equipmentDate"
          type="date"
          placeholder="请选择保修日期"
          style="width: 100%"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>

      <el-form-item label="设备状态" prop="aedStatus" required :show-message="false">
        <el-select v-model="ruleForm.aedStatus" placeholder="请选择" filterable>
          <el-option
            :label="item.aedStatus"
            :value="item.aedStatus"
            :key="item.id"
            v-for="item in enumObj.aedStatusList || []"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="电池状态" prop="batteryStatus">
        <el-select v-model="ruleForm.batteryStatus" placeholder="请选择" filterable>
          <el-option
            :label="item.batteryStatus"
            :value="item.batteryStatus"
            :key="item.id"
            v-for="item in enumObj.batteryStatusList || []"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="电池电量" prop="aedLevel" required :show-message="false">
        <el-input v-model="ruleForm.aedLevel" placeholder="现有电量/总电量" />
      </el-form-item>
      <el-form-item label="电极片状态" prop="electrodeStatus">
        <el-select v-model="ruleForm.electrodeStatus" placeholder="请选择" filterable>
          <el-option
            :label="item.electrodeStatus"
            :value="item.electrodeStatus"
            :key="item.id"
            v-for="item in enumObj.electrodeStatusList || []"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="安装厂商" prop="installationManufacturer">
        <el-input v-model="ruleForm.installationManufacturer" />
      </el-form-item>
      <el-form-item label="安装地址" prop="aedPosition" required :show-message="false">
        <el-input v-model="ruleForm.aedPosition" />
      </el-form-item>
      <el-form-item label="安装地址精度" prop="aedLongitude" required :show-message="false">
        <el-input v-model="ruleForm.aedLongitude" />
      </el-form-item>
      <el-form-item label="安装地址维度" prop="aedLatitude" required :show-message="false">
        <el-input v-model="ruleForm.aedLatitude" />
      </el-form-item>

      <el-form-item label="安装时间" prop="installationTime" required :show-message="false">
        <el-date-picker
          v-model="ruleForm.installationTime"
          type="date"
          placeholder="请选择保修日期"
          style="width: 100%"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>

      <el-form-item label="资金来源" prop="capitalSource" required :show-message="false">
        <el-radio-group v-model="ruleForm.capitalSource">
          <el-radio label="正常">正常</el-radio>
          <el-radio label="异常">异常</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="AED柜号" prop="aedNo" required :show-message="false">
        <el-input v-model="ruleForm.aedNo" />
      </el-form-item>
      <el-form-item label="设备管理员" prop="administrators" required :show-message="false">
        <el-input v-model="ruleForm.administrators" />
      </el-form-item>
      <el-form-item label="管理员手机" prop="administratorsPhone" required :show-message="false">
        <el-input v-model="ruleForm.administratorsPhone" />
      </el-form-item>
      <el-form-item
        label="管理单位座机"
        prop="administratorsLandline"
        required
        :show-message="false"
      >
        <el-input v-model="ruleForm.administratorsLandline" />
      </el-form-item>

      <div class="aed-dialog__btns">
        <el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
        <el-button @click="closeDialog(ruleFormRef)">取消</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { aedAdd, aedEdit } from '@/api/aed'
  import { ElMessage } from 'element-plus'
  const emit = defineEmits(['closeEditDialogShow', 'refreshList'])

  const props = defineProps({
    show: {
      type: Boolean,
      default: false,
    },
    enumObj: {
      type: Object,
      default: () => {},
    },
  })

  const ruleFormRef = ref()
  const defData = {
    aedNumber: '',
    aedStatus: '',
    aedLevel: '',
    aedPosition: '',
    aedNo: '',
    administrators: '',
    administratorsPhone: '',
    equipmentBrand: '',
    warranty: '',
    batteryStatus: '',
    electrodeStatus: '',
    installationManufacturer: '',
    installationTime: '',
    capitalSource: '',
    aedLatitude: '',
    aedLongitude: '',
    administratorsLandline: '',
    aedModel: '',
    equipmentDate: '',
  }
  const ruleForm = ref({})

  const currDialogType = ref('add')

  const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid) => {
      if (valid) {
        const currFun = currDialogType.value === 'add' ? aedAdd : aedEdit
        currFun({
          ...ruleForm.value,
        }).then((res) => {
          if (res.code === 0) {
            ElMessage({ type: 'success', message: '操作成功' })
            emit('closeEditDialogShow', false)
            emit('refreshList')
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
  .aed-dialog {
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
