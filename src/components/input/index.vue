<!--
input组件
@params:disabled 是否禁用
@params:thin 小号input
@params:fat 大号input
@params:value 输入值
-->
<template>
  <input class="sem-input"
         v-model="value"
         v-bind:class="[{disabled: disabled, thin: thin, fat: fat}]"
  />
</template>
<script>
  import Vue from 'vue'
  import './style.scss'
  const propsVerify = {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      require: true
    },
    thin: {
      type: Boolean
    },
    fat: {
      type: Boolean
    }
  }
  const Input = Vue.component('my-input', {
    props: propsVerify,
    methods: {
      onclick: function () {
        this.$emit('onclick')
      }
    }
  })

  export default Input
</script>
