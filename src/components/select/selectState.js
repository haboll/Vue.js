
/* selectState类
options:
type key
open 是否显示下拉框
value 值
multiple 是否多选
allowEmpty  是否允许为空 */

export default class SelectState {
  constructor (selects) {
    this.options = {
      type: '',
      open: false,
      value: '',
      multiple: false,
      allowEmpty: false
    }
    selects = selects.map(s => [s[0], Object.assign({}, this.options, s[1])])
    this.selects = new Map(selects)
    console.log(this.selects)
  }
  getSelects () {
    return this.selects
  }
  getSelectLength () {
    let selectArr = [...this.selects.entries()]
    return selectArr.length
  }
  getSelect (key) {
    return this.selects.get(key)
  }
  editSomeSelect (keys, objs) {
    keys.map((item, i) => {
      let data = this.getSelect(item)
      if (data) {
        this.selects.set(item, Object.assign({}, data, objs[i]))
      }
    })
  }
  editSelect (key, obj) {
    let data = this.getSelect(key)
    if (obj.open) {
      this.editAllSelect({open: false})
    }
    if (data) {
      this.selects.set(key, Object.assign({}, data, obj))
    }
  }
  editAllSelect (obj) {
    [...this.selects.entries()].map(i => this.selects.set(i[0], Object.assign({}, i[1], obj)))
  }
  subMap (map) {
    this.selects = new Map([...this.selects.entries(), ...map.entries()])
  }
}
