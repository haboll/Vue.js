import SelectState from '../select/selectState'
export default class DateSelectState extends SelectState {
  constructor (selects) {
    super(...arguments)
    this.options = {
      onChange: (d) => {},
      placeholder: '选择日期',
      value: new Date(),
      autoClose: false,
      open: false,
      endWith: 'day',
      isMini: false
    }
    selects = selects.map(i => [i[0], Object.assign({}, this.options, i[1])])
    this.selects = new Map(selects)
  }
}
