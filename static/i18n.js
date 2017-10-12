
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Formatter from './formatter'
import Messages from './messages'
import store from 'store'

Vue.use(VueI18n)

const locale = store.get('locale') ? store.get('locale') : 'zh-Cn'
store.set('locale', locale)
const formatter = new Formatter({ locale })

export default new VueI18n({
  locale,
  formatter,
  messages: Messages
})
