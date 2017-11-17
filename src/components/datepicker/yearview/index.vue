<template>
  <div class="year-drop-view">
    <div class="year-drop-view-switcher">
      <span class="switcher-pre" @click.stop.prevent="onclick('pre')">&lt;</span>
      <span class="view-value">{{years[0]['value']}}~{{years[8]['value']}}</span>
      <span class="switcher-next" @click.stop.prevent="onclick('next')">&gt;</span>
    </div>
    <div  class="year-view-content">
      <span v-for="item in years"
            @click.stop.prevent="onclick('onYearChange',item)"
            :class="{'active': item.isActive}">{{item.value}}</span>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import './style.scss'
  const MyYearView = Vue.component('my-year-view', {
    name: 'my-year-view',
    props: ['props'],
    methods: {
      onclick: function (name, val) {
        let {year} = this.props
        if (name === 'pre') {
          this.$emit('onYearChange', year - 9)
        }
        if (name === 'next') {
          this.$emit('onYearChange', year + 9)
        }
        if (name === 'onYearChange') {
          this.$emit('onYearChange', val.value)
        }
      }
    },
    computed: {
      years: function () {
        let {year, value} = this.props
        let results = []
        for (let i = -4; i < 5; i++) {
          results.push({value: year + i})
        }
        results.map(y => {
          y.isActive = Boolean(value && value.getFullYear() === y.value)
        })
        return results
      }
    }
  })
  export default MyYearView
</script>
