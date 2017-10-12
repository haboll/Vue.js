
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
      options: [],
      open: false,
      value: '',
      multiple: false,
      allowEmpty: false
    }
    this.selects = {}
    selects.map(s => {
      this.selects[s[0]] = Object.assign({}, this.options, s[1])
    })
  }
  getSelects () {
    return this.selects
  }
  getSelect (key) {
    return this.selects[key]
  }
  editSelect (key, obj) {
    let data = this.selects[key]
    console.log(obj)
    if (obj.open) {
      this.editAllSelect({open: false})
    }
    if (data) {
      this.selects[key] = Object.assign({}, data, obj)
    }
  }
  editSomeSelect (keys, objects) {
    keys.map((item, i) => {
      let data = this.getSelect(item)
      if (data) {
        this.selects[item] = Object.assign({}, data, objects[i])
      }
    })
  }
  editAllSelect (obj) {
    for (let i in this.selects) {
      i = Object.assign({}, i, obj)
    }
    return this.selects
  }
}
