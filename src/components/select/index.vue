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
    <div :class="{open: open}"
         class="sem-select"
         @click.stop.prevent="onclick"
    >
      <div v-if="!editable" class="select-content">{{showText}}</div>
      <div v-else>
        <my-input :value="iValue"/>
      </div>
      <div class="select-img">
        <img src="./drop_icon.png"/>
      </div>
      <transition name="selectList">
        <div v-show="open" class="select-drop-down">
          <span class="select-arrow"></span>
          <div class="select-list">

          </div>
        </div>
      </transition>
    </div>
</template>
<script>
  import Vue from 'vue'
  import './style.scss'
  import MyInput from '../input/index'
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
        showText: 'select',
        editable: false,
        iValue: '',
        open: false
      }
    },
    components: [MyInput],
    methods: {
      onclick: function () {
        this.open = !this.open
      },
      handleSelect: function (item) {
        let {value, multiple, editable, allowEmpty, callback, onChange} = this.setting
        if (!multiple) {
          if (allowEmpty) {
            let val
            if (editable) {
              val = Object.assign(item, { open: false })
            } else {
              val = value === item.value ? { value: null, name: null, open: false } : Object.assign(item, { open: false })
            }
            this.$emit('onChange', val, () => { callback && callback(val.value) })
          } else {
            onChange(Object.assign(item, { open: false }), () => { callback && callback(item.value) })
          }
        } else {
          if (!value) {
            onChange({ value: [item] }, () => { callback && callback([item.value]) })
          } else {
            // 如果value已有此项，则为取消
            if (value.some((v) => v.value === item.value)) {
              let val = { value: value.filter((v) => v.value !== item.value) }
              onChange(val, () => { callback && callback(val.map((i) => { return i.value })) })
            } else {
              let val = { value: value.concat([item]) }
              onChange(val, () => { callback && callback(val.map((i) => { return i.value })) })
            }
          }
        }
      }
    },
    created: function () {
      let {value, options, multiple, placeholder, splitter, editable} = this.setting
      this.editable = editable
      if ((value || value === 0) && options) {
        if (!multiple) {
          let option = options.filter(o => {
            return o.value === value
          })
          this.showText = option[0] ? option[0]['name'] : placeholder
        } else {
          if (!Array.isArray(value)) {
            throw Error('多选情况value必须是数组或者空值')
          }
          let activeOptions = options.filter(o => {
            return value.some((v) => {
              return o.value === v.value
            })
          })
          if (!activeOptions.length) {
            this.showText = placeholder
          } else {
            this.showText = activeOptions.map(a => a.name).join(splitter)
          }
        }
      }
    }
  })
  export default Select

</script>
