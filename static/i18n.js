
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Formatter from './formatter'
import Messages from './messages'

Vue.use(VueI18n)

const locale = 'zh-Cn'
const formatter = new Formatter({ locale })

export default new VueI18n({
  locale,
  formatter,
  messages: Messages
})
