import './styles.less'
import { AccessibleMinimodal } from './accessible-minimodal.js'

const modal = AccessibleMinimodal.init({
  multiple: true,
  multipleClosePrev: false,
  style: {
    width: 400,
    openAnimation: 'from-left'
  },
  on: {
    beforeOpen: i => {
      console.log(i.openingNode)
    }
  }
})

console.log(modal)
