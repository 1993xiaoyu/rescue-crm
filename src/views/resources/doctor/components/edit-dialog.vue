<template>
  <el-dialog
    v-model="dialogVisible"
    :title="currDialogType === 'add' ? '新增医护人员' : '编辑医护人员'"
    width="60%"
    top="2vh"
    class="tutor-dialog"
  >
    <el-form ref="ruleFormRef" :model="ruleForm" label-width="100px" status-icon :inline="true">
      <el-form-item label="姓名" prop="tutorName" required :show-message="false">
        <el-input v-model="ruleForm.tutorName" />
      </el-form-item>
      <el-form-item label="状态" prop="tutorState">
        <el-switch v-model="ruleForm.tutorState" active-value="0" inactive-value="1" />
      </el-form-item>
      <el-form-item label="性别" prop="tutorSex">
        <el-radio-group v-model="ruleForm.tutorSex">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="学历" prop="tutorEducation" required :show-message="false">
        <el-select v-model="ruleForm.tutorEducation" placeholder="请选择学历">
          <el-option
            :label="item.qualification"
            :value="item.qualification"
            :key="item.id"
            v-for="item in qualificationList"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="医院" prop="tutorHospital" required :show-message="false">
        <el-select v-model="ruleForm.tutorHospital" placeholder="请选择医院" filterable>
          <el-option
            :label="item.hospital"
            :value="item.hospital"
            :key="item.id"
            v-for="item in hospitalList"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="科室" prop="tutorDepartment" required :show-message="false">
        <el-select v-model="ruleForm.tutorDepartment" placeholder="请选择科室" filterable>
          <el-option
            :label="item.department"
            :value="item.department"
            :key="item.id"
            v-for="item in departmentList"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="职称" prop="tutorTitle" required :show-message="false" filterable>
        <el-select v-model="ruleForm.tutorTitle" placeholder="请选择职称">
          <el-option
            :label="item.title"
            :value="item.title"
            :key="item.id"
            v-for="item in titleList"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="手机号" prop="tutorPhone" required :show-message="false">
        <el-input v-model="ruleForm.tutorPhone" />
      </el-form-item>

      <el-form-item label="出生日期" prop="tutorBirthday" required :show-message="false">
        <el-date-picker
          v-model="ruleForm.tutorBirthday"
          type="date"
          placeholder="请选择培训日期"
          style="width: 100%"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="家庭地址" prop="tutorHomeAddress" :show-message="false">
        <el-input v-model="ruleForm.tutorHomeAddress" />
      </el-form-item>

      <div class="tutor-dialog__btns">
        <el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
        <el-button @click="closeDialog(ruleFormRef)">取消</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { tutorAdd, tutorEdit } from '@/api/doctor.ts'
  import { ElMessage } from 'element-plus'
  import useEnum from '@/hooks/useEnum'

  const {
    qualificationList,
    hospitalList,
    departmentList,
    titleList,
    getQualificationData,
    getHospitalData,
    getDepartmentData,
    getTitleData,
  } = useEnum()

  getQualificationData()
  getHospitalData()
  getDepartmentData()
  getTitleData()

  const emit = defineEmits(['closeEditDialogShow', 'refreshList'])

  const props = defineProps({
    show: {
      type: Boolean,
      default: false,
    },
  })

  const ruleFormRef = ref()
  const defData = {
    tutorBirthday: '',
    tutorName: '',
    tutorState: '0',
    tutorSex: '0',
    tutorEducation: '',
    tutorHospital: '',
    tutorDepartment: '',
    tutorTitle: '',
    tutorPhone: '',
    tutorHomeAddress: '',
  }
  const ruleForm = ref({})

  const currDialogType = ref('add')

  const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid) => {
      if (valid) {
        const currFun = currDialogType.value === 'add' ? tutorAdd : tutorEdit
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
    //  initDialog();
    emit('closeEditDialogShow', false)
    // if (!formEl) return;
    // formEl.resetFields();
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
      return val
    },
  })

  const setDialogData = (item, type) => {
    if (type === 'add') {
      ruleForm.value = defData
    } else {
      ruleForm.value = {
        ...item,
      }
    }
    currDialogType.value = type
  }

  defineExpose({ setDialogData })
</script>

<style lang="scss" scoped>
  .tutor-dialog {
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
