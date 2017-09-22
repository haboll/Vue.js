<!--
button组件
@params:content 按钮内容
@params:disabled 是否禁用
@params:thin 小号button
@params:fat 大号button
@params:hasImg  是否包含额外元素img
@params:imgSrc img.src
-->
<template>
    <button class="sem-btn"
            v-on:click.stop.prevent="onclick"
            v-bind:class="[{'has-img': hasImg, disabled: disabled, thin: thin, fat: fat}]"
    >
      <img class="btn-img" v-if="hasImg" v-bind:src="imgSrc" />
      {{content}}
    </button>
</template>
<script>
  import Vue from 'vue'
  import './style.scss'
  const propsVerify = {
    content: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    thin: {
      type: Boolean
    },
    fat: {
      type: Boolean
    },
    hasImg: {
      type: Boolean
    },
    imgSrc: {
      type: String
    }
  }
  const Button = Vue.component('my-button', {
    props: propsVerify,
    methods: {
      onclick: function () {
        this.$emit('onclick')
      }
    }
  })

  export default Button
</script>
