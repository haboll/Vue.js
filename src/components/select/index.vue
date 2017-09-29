<!--
select组件
@params:content 按钮内容
@params:disabled 是否禁用
@params:thin 小号button
@params:fat 大号button
@params:hasImg  是否包含额外元素img
@params:imgSrc img.src
-->
<template>
    <div class="sem-select"
            @click.stop.prevent="onclick"
    >
      <div class="select-content">{{showText}}</div>
      <div class="select-img">
        <img src="./drop_icon.png"/>
      </div>
    </div>
</template>
<script>
  import Vue from 'vue'
  import './style.scss'
  const propsVerify = {
    setting: {
      type: Object,
      require: true
    }
  }
  const Select = Vue.component('my-select', {
    props: propsVerify,
    data: () => {
      return {
        showText: 'select'
      }
    },
    methods: {
      onclick: function () {
        console.log(1)
        this.$emit('onclick')
      }
    },
    created: function () {
      let {value, options, multiple, placeholder} = this.setting
      if ((value || value === 0) && options) {
        if (!multiple) {
          let option = options.filter(o => {
            return o.value === value
          })
          this.showText = option[0] ? option[0]['name'] : placeholder
        }
      }
    }
  })
  export default Select

</script>
