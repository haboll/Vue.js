<template>
  <div class="month-drop-view">
    <div class="month-drop-view-switcher">
      <span class="switcher-pre" @click.stop.prevent="onclick('pre')">&lt;</span>
      <span class="view-value" @click.stop.prevent="onclick('openYearView')">{{props.year}}年</span>
      <span class="switcher-next" @click.stop.prevent="onclick('next')">&gt;</span>
    </div>
    <div  class="month-view-content">
      <span v-for="item in months"
            @click.stop.prevent="onclick('onMonthChange',item)"
            :class="{'active': item.isActive}">{{item.value}}月</span>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import './style.scss'
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const MyMonthView = Vue.component('my-month-view', {
    name: 'my-month-view',
    props: ['props'],
    methods: {
      onclick: function (name, val) {
        let {year} = this.props
        if (name === 'pre') {
          this.$emit('onYearChange', year - 1)
        }
        if (name === 'next') {
          this.$emit('onYearChange', year + 1)
        }
        if (name === 'openYearView') {
          this.$emit('openYearView')
        }
        if (name === 'onMonthChange') {
          this.$emit('onMonthChange', val.value)
        }
      }
    },
    computed: {
      months: function () {
        let {month} = this.props
        let results = []
        arr.map(a => {
          results.push({
            value: a,
            isActive: Boolean(month && month === a)
          })
        })
        return results
      }
    }
  })
  export default MyMonthView
</script>
