<template>
<div class="login">
  <div class="locale">
    <my-select :setting="langSetting"
               @onOpen="langOnOpen"
               @onChange="langOnChange"
    >
    </my-select>
  </div>
  <div>
    <my-button @onclick="login">登陆</my-button>
  </div>
</div>
</template>
<script>
  import './login.scss'
  import store from 'store'
  import auth from '@/auth'
  import Md5 from 'blueimp-md5'
  import MyButton from '@/components/button'
  import MySelect from '@/components/select/index'
  import SelectState from '../../components/select/selectState'
  export default {
    name: 'login',
    data: () => {
      return {
        user: 'adminhy',
        password: '121659',
        isLogining: false,
        selectStates: new SelectState([
          ['lang', {open: false, value: 'zh-Cn', options: [{name: '简体中文', value: 'zh-Cn'}, {name: '繁体中文', value: 'zh-Tw'}, {name: 'English', value: 'en-Us'}]}]])
      }
    },
    components: [MySelect, MyButton],
    methods: {
      login: function () {
        let {user, password} = this
        let hash = Md5(`${password}`)
        this.isLogining = true
        auth.authorize(user, hash, (err, data) => {
          if (err) {
            this.isLogining = false
            let msg = this.getErrorMsgs(err.code)
            let info = ''
            msg ? info = msg : info = err.msg
            console.log(info)
          }
          this.$router.push({path: '/main'})
        })
      },
      getErrorMsgs: function (code) {
        const msgs = {
          '-3': '找不到此用户',
          '-4': '密码错误',
          '-5': '请输入用户名或登录密码',
          '-7': '用户没有登录该客户端的权限'
        }
        return msgs[code]
      },
      langOnOpen: function (val) {
        this.langSetSelectState('lang', val)
      },
      langOnChange: function (val) {
        this.langSetSelectState('lang', val)
        this.$i18n.locale = val.value
        store.set('locale', val.value)
      },
      langSetSelectState (key, obj, cb) {
        if (key) {
          if (Array.isArray(key)) {
            this.selectStates.editSomeSelect(key, obj)
          } else {
            this.selectStates.editSelect(key, obj)
          }
        } else {
          this.selectStates.editAllSelect(obj)
        }
        cb && cb()
      }
    },
    computed: {
      langSetting: function () {
        this.selectStates.getSelect('lang').value = this.$i18n.locale
        return this.selectStates.getSelect('lang')
      }
    }
  }
</script>
