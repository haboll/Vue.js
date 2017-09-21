<template>
  <div>
   按钮：  <Button content="查询" :thin="thin" :hasImg="hasImg" v-on:onclick="console" :imgSrc="imgSrc"></Button>
  </div>
</template>

  <script>
  import Button from '@/components/button'
  import icon from '@/assets/icons'
  export default {
    name: 'btn',
    components: [Button],
    data: () => {
      return {
        thin: false,
        hasImg: true,
        imgSrc: icon.batch
      }
    },
    methods: {
      console: () => {
        console.log('父组件点击事件')
      }
    }
  }
</script>
