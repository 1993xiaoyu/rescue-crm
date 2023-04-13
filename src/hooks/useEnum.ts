import { ref } from 'vue'
import { getQualification, getHospital, getDepartment, getTitle, getManagement } from '@/api/enum'
export default function useSideBar() {
  const qualificationList = ref([])
  const hospitalList = ref([])
  const departmentList = ref([])
  const titleList = ref([])
  const managementList = ref([])
  const getQualificationData = async () => {
    if (!qualificationList.value.length) {
      const res = await getQualification()
      qualificationList.value = res.list || []
    }
  }

  const getHospitalData = async () => {
    if (!hospitalList.value.length) {
      const res = await getHospital()
      hospitalList.value = res.list || []
    }
  }

  const getDepartmentData = async () => {
    if (!departmentList.value.length) {
      const res = await getDepartment()
      departmentList.value = res.list || []
    }
  }

  const getTitleData = async () => {
    if (!titleList.value.length) {
      const res = await getTitle()
      titleList.value = res.list || []
    }
  }

  const getManagementData = async () => {
    if (!managementList.value.length) {
      const res = await getManagement()
      console.log(res, '===managementList')
      managementList.value = res.list || []
    }
  }

  return {
    qualificationList,
    hospitalList,
    departmentList,
    titleList,
    managementList,
    getQualificationData,
    getHospitalData,
    getDepartmentData,
    getTitleData,
    getManagementData,
  }
}
