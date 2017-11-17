<template>
  <div class="v-sem-modal">
    <div class="sem-modal-body">
      <div class="sem-modal-header">
        {{headText}}
        <img :src="closeIcon"/>
      </div>
      <div class="sem-modal-content">{{content}}</div>
      <div class="sem-modal-footer">
        <my-button class="modal-button">{{text.cancel}}</my-button>
        <my-button class="modal-button right">{{text.confirm}}</my-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import './style.scss'
  import Icon from '@/assets/icons'
  import MyButton from '@/components/button'
  const propsVerify = {
    headText: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  }
  const MyModal = Vue.component('my-modal', {
    name: 'my_modal',
    props: propsVerify,
    data: () => {
      return {
        closeIcon: Icon.batch
      }
    },
    components: [MyButton],
    computed: {
      text: function () {
        return {
          confirm: this.$t(`message.confirm`),
          cancel: this.$t(`message.cancel`)
        }
      }
    }
  })
  export default MyModal
</script>

