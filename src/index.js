import './styles.less'
import { AccessibleMinimodal } from './accessible-minimodal.js'

const modal = AccessibleMinimodal.init({
  style: {
    width: 400,
    openAnimation: 'from-left'
  },
  on: {
    beforeOpen: function (instance) {
      console.log('bo', instance)
    },
    afterOpen: function (instance) {
      console.log('ao', instance)
    },
    beforeClose: function (instance) {
      console.log('bc', instance)
    },
    afterClose: function (instance) {
      console.log('ac', instance)
    }
  }
})

console.log(modal)
