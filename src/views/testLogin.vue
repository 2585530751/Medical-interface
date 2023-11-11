<template>
  <div>
    <h3>登录</h3>
    用户名:<input type="text" v-model="loginForm.account" placeholder="请输入用户名"/>
    <br><br>
    密码： <input type="password" v-model="loginForm.password" placeholder="请输入密码"/>
    <br><br>
    <button @click="testLogin()">登录</button>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        account: '',
        password: ''
      },
      responseResult: []
    }
  },
  methods: {
    login () {
      axios.defaults.baseURL = 'http://localhost:8080'
      axios.post('/user/login', {
            account: this.loginForm.account,
            password: this.loginForm.password
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              let res = successResponse.data;
              console.log(res.data);
              console.log(res.msg);
              this.$router.replace({path: '/'})
            }
          })
          .catch(failResponse => {
          })
    }
  }
}
</script>