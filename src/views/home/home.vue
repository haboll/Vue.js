<template>
  <div>
    按钮：
    <my-button content="查 询"
               :thin="thin"
               :hasImg="hasImg"
               :imgSrc="imgSrc"
               v-on:onclick="console('thin-img')"
    >
    </my-button>
    <my-button content="查 询"
               :hasImg="hasImg"
               :imgSrc="imgSrc"
               v-on:onclick="console('middle-img')">
    </my-button>

    <my-button content="查 询"
               :thin="thin"
               v-on:onclick="console('thin')"
    >
    </my-button>
    <my-button content="查 询"
               v-on:onclick="console('middle')"
               >
    </my-button>

    <my-button content="查 询"
               :fat="fat"
               v-on:onclick="console('fat')"
    >
    </my-button>

  </div>
</template>

  <script>
  import '@/components/button'
  import icon from '@/assets/icons'
  import './home.scss'
  export default {
    name: 'btn',
    data: () => {
      return {
        thin: true,
        fat: true,
        hasImg: true,
        imgSrc: icon.batch
      }
    },
    methods: {
      console: (text) => {
        console.log(text)
      }
    }
  }
</script>
