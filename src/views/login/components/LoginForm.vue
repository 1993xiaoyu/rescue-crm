<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
    <el-form-item label="" prop="username">
      <el-input
        placeholder="请输入用户名"
        autoComplete="on"
        style="position: relative"
        v-model="ruleForm.username"
        @keyup.enter.native="submitForm(ruleFormRef)"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><UserFilled /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item label="" prop="password">
      <el-input
        placeholder="请输入密码"
        autoComplete="on"
        @keyup.enter.native="submitForm(ruleFormRef)"
        v-model="ruleForm.password"
        :type="passwordType"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><GoodsFilled /></el-icon>
        </template>
        <template #suffix>
          <div class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </div>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item>
      <el-checkbox v-model="ruleForm.rememberMe">记住密码</el-checkbox>
    </el-form-item>

    <el-form-item style="width: 100%">
      <el-button
        :loading="loading"
        class="login-btn"
        type="primary"
        @click="submitForm(ruleFormRef)"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue'
  import type { FormInstance } from 'element-plus'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/store/modules/user'
  import { getQueryObject } from '@/utils/index'
  import { Base64 } from 'js-base64'

  const router = useRouter()
  const UserStore = useUserStore()
  const ruleFormRef = ref<FormInstance>()
  const passwordType = ref('password')
  const loading = ref(false)

  const rules = reactive({
    password: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    username: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  })

  // 表单数据
  const ruleForm = reactive({
    username: 'admin',
    password: '123456',
    rememberMe: false,
  })

  // 显示密码图标
  const showPwd = () => {
    passwordType.value = passwordType.value === 'password' ? '' : 'password'
  }

  // 存储账号密码
  const setUserNameAndPsw = () => {
    if (ruleForm.rememberMe) {
      const password = Base64.encode(ruleForm.password) // base64加密
      localStorage.setItem('username', ruleForm.username)
      localStorage.setItem('password', password)
    } else {
      localStorage.removeItem('username')
      localStorage.removeItem('password')
    }
  }

  const getUserNameAndPassword = () => {
    if (localStorage.getItem('username') && localStorage.getItem('password')) {
      ruleForm.username = localStorage.getItem('username')
      ruleForm.password = Base64.decode(localStorage.getItem('password')) //解密
      ruleForm.rememberMe = true
    }
  }

  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
      if (valid) {
        loading.value = true

        // 登录
        setTimeout(async () => {
          setUserNameAndPsw()
          const { username, password } = ruleForm

          // let encrypt = new JSEncrypt();
          // encrypt.setPublicKey(publicKey);
          // let password = encrypt.encrypt(loginForm.password);
          const queryPar = getQueryObject(location.href) || {}
          const env = queryPar.env === 'master' ? 'master' : 'test'
          const res = await UserStore.login({ username, password })

          loading.value = false
          const cockpitUserList = ['barmyy', 'fyrmyyjhz', 'fysk', 'hdfjgly', 'hysq']
          if (res.code === 0) {
            const tenantUserInfo = {
              password,
              username,
              env,
            }
            localStorage.setItem('TenantUserInfo', JSON.stringify(tenantUserInfo))
            if (cockpitUserList.includes(username)) {
              router.push({
                name: 'cockpit',
                query: { env },
              })
            } else {
              router.push({ path: '/home' })
            }
          }
        }, 1000)
      } else {
        console.log('error submit!')
        return false
      }
    })
  }

  onMounted(() => {
    getUserNameAndPassword()
  })
</script>

<style lang="scss" scoped>
  @import '../index.scss';
</style>
