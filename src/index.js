import './styles.less'
import { AccessibleMinimodal } from './accessible-minimodal.js'

const modal = AccessibleMinimodal.init({
  multiple: true,
  style: {
    width: 400,
    openAnimation: 'from-left'
  },
  classes: {
    modal: 'm'
  },
  on: {
    beforeOpen: (ins) => console.log(ins)
  }
})

console.log(modal)
