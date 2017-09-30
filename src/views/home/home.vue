<template>
  <div>
    <div>
      按钮：
      <my-button :thin="true"
                 :hasImg="true"
                 :imgSrc="imgSrc"
                 @onclick="click"
      >
        {{$t('message.hello')}}
      </my-button>
      <my-button
                 :hasImg="hasImg"
                 :imgSrc="imgSrc"
                 @onclick="click('middle-img')">
      </my-button>
      <my-button :thin="true"
                 @onclick="click('thin')"
      >
      </my-button>
      <my-button @onclick="click('middle')"
      >
      </my-button>
      <my-button :fat="fat"
                 @onclick="click('fat')"
      >
      </my-button>
    </div>
   <div></div>

  </div>
</template>

  <script>
  import MyButton from '@/components/button'
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
    components: [MyButton],
    methods: {
      click: function (msg) {
        console.log(msg)
        this.thin = !this.thin
      }
    },
    created: function () {
      console.log('c')
    },
    mounted: function () {
      console.log('m')
    },
    updated: function () {
      console.log('u')
    },
    destroyed: function () {
      console.log('d')
    }
  }
</script>
