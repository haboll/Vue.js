<template>
  <div class="sem-resume">
    <div class="sem-resume-nav">
      <div class="sem-resume-nav-left">logo</div>
      <div class="sem-resume-nav-center">haboll</div>
      <div class="sem-resume-nav-right">
        <my-select :setting="langSetting"
                   class="language-select"
                   @onOpen="langOnOpen"
                   @onChange="langOnChange"></my-select>
      </div>
      </div>
    <div class="sem-resume-wrap">
      <div class="sem-resume-side">
        <div class="sem-resume-side-item">基本信息</div>
        <div class="sem-resume-side-item">工作经历</div>
        <div class="sem-resume-side-item">我的作品</div>
        <div class="sem-resume-side-item">学习经历</div>
        <div class="sem-resume-side-item">兴趣爱好</div>
        <div class="sem-resume-side-item">我的生活</div>
      </div>
      <div class="sem-resume-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  import 'assets/css/resume.scss'
  import store from 'store'
  import MySelect from 'select'
  import SelectState from 'select/selectState'
  export default {
    name: 'resume',
    data: () => {
      let language = store.get('locale') || 'zh-Cn'
      let selectStates = new SelectState([
        ['lang', {open: false, value: language, options: [{name: '简体中文', value: 'zh-Cn'}, {name: 'English', value: 'en-Us'}]}]])
      return {
        selectStates: selectStates,
        isShowNav: true,
        langSetting: {}
      }
    },
    components: {MySelect},
    methods: {
      getSetting: function (val) {
        return this.selectStates.getSelect(val)
      },
      langOnOpen: function (val) {
        this.langSetSelectState('lang', val)
      },
      langOnChange: function (val) {
        this.langSetSelectState('lang', val)
        this.$i18n.locale = val.value
        store.set('locale', val.value)
      },
      langSetSelectState (key, obj, cb) {
        if (key) {
          if (Array.isArray(key)) {
            this.selectStates.editSomeSelect(key, obj)
          } else {
            this.selectStates.editSelect(key, obj)
          }
        } else {
          this.selectStates.editAllSelect(obj)
        }
        this.langSetting = this.getSetting(key)
        cb && cb()
      }
    },
    beforeMount: function () {
      this.langSetting = this.getSetting('lang')
    }
  }
</script>
