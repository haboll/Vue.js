
export default class AlertManager {
  constructor () {
    this.alertMap = new Map()
    this.key = 0
    this.options = {
      content: '',
      title: '提示',
      confirmText: '确定',
      cancelText: '取消',
      time: 9,
      show: false
    }
  }
  addAlert (obj) {
    !obj.key && this.key++
    let key = obj.key || this.key
    this.alertMap.set(key, Object.assign({key: key}, this.options, obj))
  }
  deleteAlert (key) {
    this.alertMap.delete(key)
  }
  getAlert (key) {
    return this.alertMap.get(key)
  }
  getAllAlert () {
    return [...this.alertMap.values()]
  }
  editAlert (key, obj) {
    let data = this.getAlert(key)
    if (data) {
      if (data.hasOwnProperty(key)) return
      this.alertMap.set(key, Object.assign({}, data, obj))
    }
  }
  initAlert (params) {
    if (Array.isArray(params)) {
      params.map(i => {
        this.addAlert(i)
      })
    } else {
      this.addAlert(params)
    }
  }
}
