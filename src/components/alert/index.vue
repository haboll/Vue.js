<template>
  <div class="none-width-height">
    <div v-for="item in alerts" class="none-width-height">
      <div :id="'modal-'+item.key" :key="item.key">

        <my-modal v-if="item.type === modalType['alert']"
                  :headText="item.title"
                  width="20rem">

          <div slot="content" class="text-center">{{item.content}}</div>

          <my-button slot="footer" size="thin" @onclick="onClose(item, true)">

            {{item.confirmText}}<span>({{item.time}})</span>

          </my-button>

        </my-modal>

        <my-modal v-if="item.type === modalType['confirm']"
                  :headText="item.title"
                  width="20rem">

          <div slot="content" class="text-center">{{item.content}}</div>

          <my-button slot="footer" class="modal-button" @onclick="onClose(item, false)">
            {{item.cancelText}}
          </my-button>

          <my-button slot="footer" class="modal-button right" @onclick="onClose(item, true)">
            {{item.confirmText}}
          </my-button>

        </my-modal>

        <my-modal v-if="item.type === modalType['loading']"
                  :headText="item.title"
                  :noFooter="true"
                  :noHeader="true"
                  width="20rem">
          <div slot="content" class="text-center">

            {{item.loadingContent || "正在处理，请稍等..."}}

            <span>{{item.time}}</span>

          </div>
        </my-modal>
      </div>
    </div>
  </div>
</template>
<script>
  import './style.scss'
  import MyModal from '@/components/modal'
  import MyButton from '@/components/button'
  import * as staticType from '@/utils/staticType'
  import AlertManager from '@/components/alert/alert'
  import $ from 'jquery'
  export default {
    name: 'alert',
    data: () => {
      return {
        t: null,
        alerts: [],
        modalType: staticType.modalType,
        alertManager: new AlertManager()
      }
    },
    components: [MyModal, MyButton],
    computed: {},
    methods: {
      onClose: function (item, val) {
        if (typeof item.onConfirm === 'function' && val) {
          item.onConfirm()
        }
        if (typeof item.onCancel === 'function' && val === false) {
          item.onCancel()
        }
        this.alertManager.deleteAlert(item.key)
      },
      getAllAlert: function () {
        return this.alertManager.getAllAlert()
      }
    },
    beforeMount: function () {
      window.alert = (content) => {
        this.alertManager.addAlert({content: content, type: this.modalType['alert']})
        this.alerts = this.getAllAlert()
      }
      window.confirm = (options) => {
        this.alertManager.addAlert(Object.assign({}, options, {type: this.modalType['confirm']}))
        this.alerts = this.getAllAlert()
      }
      window.modalLoading = (options) => {
        this.alertManager.addAlert(Object.assign({}, options, {type: this.modalType['loading']}))
        this.alerts = this.getAllAlert()
      }
      window.closeLoading = (key) => {
        this.alertManager.deleteAlert(key)
        this.alerts = this.getAllAlert()
      }
    },
    beforeUpdate: function () {
      if (this.alerts.length > 0) {
        this.alerts.map(i => {
          if (!i.show) {
            let $Modal = $(`#${i.key}`)
            $Modal.find('.v-sem-modal').height()
            $Modal.find('.v-sem-modal').addClass('show')
            this.alertManager.editAlert(i.key, {show: true})
          }
        })
        this.t = setTimeout(() => {
          this.alerts.map(i => {
            if (i.time > 1) {
              this.alertManager.editAlert(i.key, {time: i.time - 1})
            } else {
              this.alertManager.deleteAlert(i.key)
            }
          })
          this.alerts = this.getAllAlert()
        }, 1000)
      }
    },
    beforeDestroy: function () {
      this.t && clearTimeout(this.t)
    }
  }
</script>
