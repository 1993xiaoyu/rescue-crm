import { ref } from 'vue'
import {
  getQualification,
  getHospital,
  getDepartment,
  getTitle,
  getManagement,
  getOccupationt,
  getOrganization,
  getMechanismStauts,
  mechanismName,
} from '@/api/enum'
export default function useSideBar() {
  const qualificationList = ref([])
  const hospitalList = ref([])
  const departmentList = ref([])
  const titleList = ref([])
  const managementList = ref([])
  const occupationtList = ref([])
  const organizationList = ref([])
  const mechanismStautsList = ref([])
  const mechanismNameList = ref([])
  const getQualificationData = async () => {
    if (!qualificationList.value.length) {
      const res: any = await getQualification({})
      qualificationList.value = res.list || []
    }
  }

  const getHospitalData = async () => {
    if (!hospitalList.value.length) {
      const res: any = await getHospital({})
      hospitalList.value = res.list || []
    }
  }

  const getDepartmentData = async () => {
    if (!departmentList.value.length) {
      const res: any = await getDepartment({})
      departmentList.value = res.list || []
    }
  }

  const getTitleData = async () => {
    if (!titleList.value.length) {
      const res: any = await getTitle({})
      titleList.value = res.list || []
    }
  }

  const getManagementData = async () => {
    if (!managementList.value.length) {
      const res: any = await getManagement({})
      managementList.value = res.list || []
    }
  }

  const getOccupationtData = async () => {
    if (!occupationtList.value.length) {
      const res: any = await getOccupationt({})
      occupationtList.value = res.list || []
    }
  }

  const getOrganizationData = async () => {
    if (!organizationList.value.length) {
      const res: any = await getOrganization({})
      organizationList.value = res.list || []
    }
  }

  //机构状态
  const getMechanismStautsData = async () => {
    if (!mechanismStautsList.value.length) {
      const res: any = await getMechanismStauts({})
      mechanismStautsList.value = res.list || []
    }
  }

  // 机构名称
  const getMechanismNameData = async () => {
    if (!mechanismNameList.value.length) {
      const res: any = await mechanismName({})
      mechanismNameList.value = res.list || []
    }
  }

  return {
    qualificationList,
    hospitalList,
    departmentList,
    titleList,
    managementList,
    occupationtList,
    organizationList,
    mechanismStautsList,
    mechanismNameList,
    getQualificationData,
    getHospitalData,
    getDepartmentData,
    getTitleData,
    getManagementData,
    getOccupationtData,
    getOrganizationData,
    getMechanismStautsData,
    getMechanismNameData,
  }
}
