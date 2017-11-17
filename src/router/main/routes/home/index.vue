<template>
  <div>
    <div>
      按钮：
      <my-button :thin="true"
                 :yarnhasImg="true"
                 :imgSrc="imgSrc"
                 @onclick="click"
      >
        {{$t('message.hello')}}
      </my-button>
    </div>
    <my-modal headText="1" content="2"></my-modal>
   </div>
</template>

  <script>
  import MyButton from '@/components/button'
  import MyModal from '@/components/modal'
  import icon from '@/assets/icons'
  import './home.scss'
  export default {
    name: 'btn',
    data: () => {
      return {
        imgSrc: icon.batch,
        text: 'header'
      }
    },
    components: [MyButton, MyModal],
    methods: {
      click: function (msg) {
        console.log(msg)
        this.value = 'sss'
      }
    }
  }
</script>
