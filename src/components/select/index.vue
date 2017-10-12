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
    <div :class="{open: setting.open}"
         class="sem-select"
         @click.stop.prevent="onclick"
    >
      <div v-if="!setting.editable" class="select-content"> {{showText}} </div>
      <div v-else>
        <my-input :value="iValue"/>
      </div>
      <div class="select-img">
        <img src="./drop_icon.png"/>
      </div>
      <transition name="selectList">
        <div v-show="setting.open" class="select-drop-down">
          <span class="select-arrow"></span>
          <div class="select-list">
            <div v-for="item in setting.options"
                 @click.stop.prevent="handleSelect(item)"
                 class="select-list-item">
              {{item.name}}
            </div>
          </div>
        </div>
      </transition>
    </div>
</template>
<script>
  import Vue from 'vue'
  import './style.scss'
  import MyInput from '../input/index'
  const Select = Vue.component('my-select', {
    props: ['setting'],
    components: [MyInput],
    methods: {
      onclick: function () {
        this.$emit('onOpen', {open: !this.setting.open})
      },
      handleSelect: function (item) {
        let {value, multiple, editable, allowEmpty} = this
        if (!multiple) {
          if (allowEmpty) {
            let val
            if (editable) {
              val = Object.assign(item, { open: false })
            } else {
              val = value === item.value ? { value: null, name: null, open: false } : Object.assign(item, { open: false })
            }
            this.$emit('onChange', val)
          } else {
            this.$emit('onChange', Object.assign(item, { open: false }))
          }
        } else {
          if (!value) {
            this.$emit('onChange', ({ value: [item] }))
          } else {
            // 如果value已有此项，则为取消
            if (value.some((v) => v.value === item.value)) {
              let val = { value: value.filter((v) => v.value !== item.value) }
              this.$emit('onChange', val)
            } else {
              let val = { value: value.concat([item]) }
              this.$emit('onChange', val)
            }
          }
        }
      }
    },
    computed: {
      showText: function () {
        let {value, options, multiple, placeholder, splitter} = this.setting
        if ((value || value === 0) && options) {
          if (!multiple) {
            let option = options.filter(o => {
              return o.value === value
            })
            return option[0] ? option[0]['name'] : placeholder
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
              return placeholder
            } else {
              return activeOptions.map(a => a.name).join(splitter)
            }
          }
        }
      }
    }
  })
  export default Select

</script>
