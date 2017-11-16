<template>
  <div class="sem-resume">
    <div class="sem-resume-nav">
        <div class="sem-resume-nav-left">logo</div>
        <div class="sem-resume-nav-right">
          <my-select :setting="langSetting"></my-select>
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
  import MySelect from 'select'
  import SelectState from 'select/selectState'
  export default {
    name: 'resume',
    data: () => {
      let selectStates = new SelectState([
        ['language', {option: [{name: '中文', value: 1}, {name: 'English', value: 2}], value: 1}]
      ])
      return {
        selectStates: selectStates,
        isShowNav: true
      }
    },
    components: {MySelect},
    methods: {}
  }
</script>
