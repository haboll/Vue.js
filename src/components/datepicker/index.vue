<template>
  <div class="date-content" :class="{isMini: props.isMini}" @click.stop.prevent="handleClick">
    <div class="date-text">{{showText}}</div>
    <img src="./calender_icon.png" class="date-img"/>
    <transition name="dateList">
      <div v-show="props.open" class="datepicker-drop">
        <my-date-view :props="props"
                      @onYearChange="handleYearChange"
                      @onMonthChange="handleMonthChange"
                      @onValueChange="handleValueChange"
                      @openMonthView="handleViewChange('month')"
                      v-if="showView('day')"></my-date-view>
        <my-month-view :props="props"
                       @onYearChange="handleYearChange"
                       @onMonthChange="handleMonthChange"
                       @openYearView="handleViewChange('year')"
                       v-if="showView('month')"></my-month-view>
        <my-year-view :props="props"
                      @onYearChange="handleYearChange"
                      v-if="showView('year')"></my-year-view>
      </div>
    </transition>
  </div>
</template>
<script>
  import './style.scss'
  import Vue from 'vue'
  import * as staticType from '@/utils/staticType'
  import moment from 'moment'
  import MyDateView from './dateview/index.vue'
  import MyMonthView from './monthview/index.vue'
  import MyYearView from './yearview/index.vue'

  const propsVerify = {
    setting: {
      type: Object,
      required: true
    }
  }
  const DatePicker = Vue.component('my-date-select', {
    name: 'my-date-select',
    components: { MyDateView, MyMonthView, MyYearView },
    props: propsVerify,
    data: () => {
      return {
        view: null
      }
    },
    methods: {
      showView: function (val) {
        return this.view === staticType.dateSelectShowType[val]
      },
      handleClick: function () {
        this.$emit('onChange', {open: !this.props.open})
      },
      handleYearChange: function (year, sectionChange) {
        let {month, day, endWith} = this.props
        this.$emit('onChange', {value: new Date(year, month - 1, day)})
        if (sectionChange) return 0
        if (endWith === staticType.dateSelectShowType['year']) {
          this.handleValueChange(new Date(year, month - 1, day))
        } else {
          if (this.view === staticType.dateSelectShowType['year']) {
            this.view = staticType.dateSelectShowType['month']
          }
        }
      },
      handleMonthChange: function (val) {
        let {year, day, endWith} = this.props
        if (val > 12) {
          this.$emit('onChange', {value: new Date(year + 1, 0, day)})
        } else if (val < 1) {
          this.$emit('onChange', {value: new Date(year - 1, 11, day)})
        } else {
          this.$emit('onChange', {value: new Date(year, val - 1, day)})
        }
        if (endWith === staticType.dateSelectShowType['month']) {
          this.handleValueChange(new Date(year, val - 1, 1))
        } else {
          if (this.view === staticType.dateSelectShowType['month']) {
            this.view = staticType.dateSelectShowType['day']
          }
        }
      },
      handleValueChange: function (val) {
        this.$emit('onChange', {value: val, open: false})
      },
      handleViewChange: function (val) {
        this.view = staticType.dateSelectShowType[val]
      }
    },
    computed: {
      props: function () {
        let value = this.setting.value
        let obj = {
          year: value.getFullYear(),
          month: value.getMonth() + 1,
          day: value.getDate()
        }
        return Object.assign({}, this.setting, obj)
      },
      showText: function () {
        let showValue
        let {endWith, value, isMini} = this.props
        if (value instanceof Date && !isNaN(value.getTime())) {
          if (isMini) {
            switch (endWith) {
              case 0:
                showValue = moment(value).format('YYYY年')
                break
              case 1:
                showValue = moment(value).format('YYYY年MM月')
                break
              case 3:
                showValue = moment(value).format('YYYY年MM月DD日 HH:mm:ss')
                break
              default:
                showValue = moment(value).format('YYYY年MM月DD日')
            }
          } else {
            switch (endWith) {
              case 0:
                showValue = moment(value).format('YYYY')
                break
              case 1:
                showValue = moment(value).format('YYYY-MM')
                break
              case 3:
                showValue = moment(value).format('YYYY-MM-DD HH:mm:ss')
                break
              default:
                showValue = moment(value).format('YYYY-MM-DD')
            }
          }
        }
        return showValue
      }
    },
    created: function () {
      this.view = this.setting.endWith
    }
  })
  export default DatePicker
</script>
