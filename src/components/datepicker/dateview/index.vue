<template>
  <div class="date-drop-view">
    <div class="date-drop-view-switcher">
      <span class="switcher-pre" @click.stop.prevent="onclick('pre')">&lt;</span>
      <span class="view-value" @click.stop.prevent="onclick('openMonthView')">{{props.year}}年{{props.month}}月</span>
      <span class="switcher-next" @click.stop.prevent="onclick('next')">&gt;</span>
    </div>
    <div class="weekend">
      <span>日</span>
      <span>一</span>
      <span>二</span>
      <span>三</span>
      <span>四</span>
      <span>五</span>
      <span>六</span>
    </div>
    <div  class="date-view-content">
      <span v-for="item in days"
            @click.stop.prevent="onclick('onValueChange',item)"
            :class="{'fade': item.fade, 'active': item.isToday}">{{item.text}}</span>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import './style.scss'
  const MyDateView = Vue.component('my-date-view', {
    name: 'my-date-view',
    props: ['props'],
    methods: {
      onclick: function (name, val) {
        let {month} = this.props
        if (name === 'pre') {
          this.$emit('onMonthChange', month - 1)
        }
        if (name === 'next') {
          this.$emit('onMonthChange', month + 1)
        }
        if (name === 'openMonthView') {
          this.$emit('openMonthView')
        }
        if (name === 'onValueChange') {
          if (!val.fade) {
            this.$emit('onValueChange', new Date(val.val))
          }
        }
      }
    },
    computed: {
      days: function () {
        let {year, month, day, date} = this.props
        let _cloneDate = function (d) {
          return new Date(d.getTime())
        }
        let beginDate = new Date(year, month - 1, 1)
        let endDate = new Date(new Date(_cloneDate(beginDate).setMonth(_cloneDate(beginDate).getMonth() + 1)).setDate(0))
        let thisMonthDays = endDate.getDate() - beginDate.getDate() + 1
        let results = []
        let theDay = thisMonthDays + 1
        let theMonth
        let theYear
        if (date) {
          if (date === 'default') {
            theDay = new Date().getDate()
            theMonth = new Date().getMonth()
            theYear = new Date().getFullYear()
          } else {
            theDay = new Date(date).getDate()
            theMonth = new Date(date).getMonth()
            theYear = new Date(date).getFullYear()
          }
        }
        for (let i = 1; i <= thisMonthDays; i++) {
          if (new Date(year, month - 1, i) >= new Date(theYear, theMonth, theDay)) {
            results.push({
              text: i,
              val: new Date(year, month - 1, i).getTime(),
              fade: true
            })
          } else {
            results.push({
              text: i,
              val: new Date(year, month - 1, i).getTime()
            })
          }
        }
        let lastMonthEndDate = new Date(_cloneDate(beginDate).setDate(0))
        for (let i = 0, l = lastMonthEndDate.getDate(), j = beginDate.getDay(); i < j; i++) {
          results.unshift({
            text: l - i,
            val: new Date(year, month - 2, i).getTime(),
            fade: true
          })
        }
        for (let i = 1, j = endDate.getDay() + 1; j <= 6; j++, i++) {
          results.push({
            text: i,
            val: new Date(year, month, i).getTime(),
            fade: true
          })
        }
        results.map(d => {
          let valDate = new Date(d.val)
          d.isToday = Boolean(valDate.getFullYear() === year && valDate.getMonth() + 1 === month && valDate.getDate() === day)
        })
        return results
      }
    }
  })
  export default MyDateView
</script>
