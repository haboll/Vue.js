<template>
  <div class="v-sem-modal" :class="{show: show}">
    <div class="sem-modal-body" :style="{width: width}">
      <div class="sem-modal-header" v-if="!noHeader">
        {{headText}}
        <img :src="closeIcon"
             :click.stop.prevent="onCancel"/>
      </div>
      <div class="sem-modal-content">
        <slot name="content"></slot>
      </div>
      <div class="sem-modal-footer" v-if="!noFooter">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import './style.scss'
  import Icon from '@/assets/icons'
  const propsVerify = {
    width: {
      type: [String],
      required: true
    },
    headText: {
      type: String,
      required: true
    },
    noHeader: {
      type: [Boolean, String],
      default: false
    },
    noFooter: {
      type: [Boolean, String],
      default: false
    }
  }
  const MyModal = Vue.component('my-modal', {
    name: 'my_modal',
    props: propsVerify,
    data: () => {
      return {
        closeIcon: Icon.batch,
        show: false
      }
    },
    methods: {
      onCancel: function () {
        this.$emit('onClose')
      }
    }
  })
  export default MyModal
</script>

