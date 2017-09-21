import Vue from 'vue'
import './style.scss'

const Button = Vue.component('Button', {
  props: ['content', 'hasImg', 'disabled', 'thin', 'imgSrc', 'imgClass'],
  template: '<button class="sem-btn" ' +
  'v-on:click.stop.prevent="onclick"' +
  'v-bind:class="[{disabled: disabled, thin: thin}]">' +
  '<img v-if="hasImg" class="btn-img" :src="imgSrc"/>' +
  '{{content}}</button>',
  methods: {
    onclick: function () {
      this.$emit('onclick')
    }
  }
})

export default Button
