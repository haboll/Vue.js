<template>
  <div>
    <Button content="this is a button" :thin="thin" :hasImg="hasImg" :imgSrc="imgSrc"></Button>
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
    }
  }
</script>
