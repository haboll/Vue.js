<template>
<div class="login">
  <div class="locale">
    <my-select :setting="langSetting"
               @onChange="langOnChange">
    </my-select>
  </div>
  <div>
    <my-button @onclick="login"></my-button>
  </div>
</div>
</template>
<script>
  import './login.scss'
  import MyButton from '@/components/button'
  import MySelect from '@/components/select/index'
  import SelectState from '../../components/select/selectState'
  export default {
    name: 'login',
    data: () => {
      return {
        locale: 'en-Us',
        selectStates: new SelectState([
          ['lang', {open: false, value: 'zh-Cn', options: [{name: '简体中文', value: 'zh-Cn'}]}]
        ])
      }
    },
    components: [MySelect, MyButton],
    methods: {
      login: function () {
        this.$router.push({path: '/main'})
      },
      langOnChange: function (val) {
        this.langSetSelectState('lang', val)
      },
      langSetSelectState (key, obj) {
        if (key) {
          if (Array.isArray(key)) {
            this.selectStates.editSomeSelect(key, obj)
          } else {
            this.selectStates.editSelect(key, obj)
          }
        } else {
          this.selectStates.editAllSelect(obj)
        }
      }
    },
    computed: {
      langSetting: function () {
        return this.selectStates.getSelect('lang')
      }

    }
  }
</script>
