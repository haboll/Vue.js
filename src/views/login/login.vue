<template>
<div class="login">
  <div class="locale">
    <my-select :setting="selectStates.getSelect('lang')">
      <select-list></select-list>
    </my-select>
  </div>
  <div>
    <my-button @onclick="login()"></my-button>
  </div>
</div>
</template>
<script>
  import './login.scss'
  import MyButton from '@/components/button'
  import MySelect from '@/components/select'
  import SelectState from '@/components/select/selectState'

  let selectStates = new SelectState([
    ['lang', {value: 'zh-Cn', placeholder: '请选择', options: [{name: '简体中文', value: 'zh-Cn'}, {name: 'english', value: 'en-Us'}]}]
  ])

  export default {
    name: 'login',
    data () {
      return {
        locale: 'zh-Cn',
        selectStates: selectStates
      }
    },
    components: [MySelect, MyButton],
    methods: {
      login: function () {
        console.log(this)
        this.$router.push({path: '/main'})
      }
    }
  }
</script>
