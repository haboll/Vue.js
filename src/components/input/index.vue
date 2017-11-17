<!--
input组件
@params:disabled 是否禁用
@params:thin 小号input
@params:fat 大号input
@params:value 输入值
-->
<template>
 <div class="sem-input">
   <slot></slot>
 </div>
</template>
<script>
  import Vue from 'vue'
  import './style.scss'

  export const Input = Vue.component('my-input', {
    template: ' <div class="sem-input"><slot></slot></div>'
  })
  export const TextArea = Vue.component('my-textarea', {
    template: ' <div class="sem-input"><slot></slot></div>'
  })
  export default Input
</script>
