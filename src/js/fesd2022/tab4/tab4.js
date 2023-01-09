import OPTIONS from './options'
import SHARED from '../shared/shared'
import { isElementExist, getElement, getAllElements } from '../shared/utils.js'

// [data-change-parent] 外層
// [data-change-btn]  控制按鈕
// [data-change-id]  頁籤按鈕
// [data-change-page]  本人

// 第一版
// export default class Tab4 {
//   constructor(element) {
//     this.el = typeof element === 'string' ? document.querySelector(element) : element
//     this.titleEl = this.el.querySelector('.tab-title')
//     this.contentEl = this.el.querySelector('.tab-content')
//     this.type = this.el.getAttribute('type')
//     this.display = this.el.getAttribute('display')

//     if (true) {
//       this.#init()
//     }
//   }
//   // 初始化設定
//   #init() {
//     const self = this
//     // console.log(this)
//     console.log(this)
//     if (self.type == 'process') {
//       console.log('notReady!!!!!')
//       this.#stepChange(self.el)
//     } else {
//       this.#pageChange(self.el)
//     }
//     // 分離物件綁定
//     // const id = this.getAttribute('tab4-id')
//     // const allBtn = document.querySelectorAll(`[tab4-target="${id}"]`)

//     // this.#event()
//   }
//   // 事件整理
//   // #event(){

//   //   btn.addEventListener('click',function(){

//   //   })

//   // }
//   // 頁籤切換 data-change-parent
//   #pageChange(parentBox) {
//     console.log(this)
//     let parent = $(parentBox)
//     let all_id = parent.find('[data-change-id]')
//     let now_id = parent.find('[data-change-id].active').attr('data-change-id')
//     $(`[data-change-page=${now_id}]`).addClass('active')
//     $(`[data-change-page=${now_id}]`).siblings().removeClass('active').css('display', 'none')

//     // 點擊事件綁定
//     this.#clickEventListen(all_id, this.display)
//   }
//   // 點擊切換事件
//   #clickEventListen(btn, display) {
//     // 點擊
//     btn.on('click', function () {
//       const $this = $(this)
//       let now_id = $this.attr('data-change-id')
//       let now_page = $(`[data-change-page = ${now_id}]`)
//       // 隱藏其他人
//       now_page.siblings().removeClass('active').hide()
//       $this.siblings().removeClass('active')
//       // 顯示自己
//       $this.addClass('active')
//       // 判斷顯示方式
//       if (display == 'slide') {
//         now_page.addClass('active').slideDown(800)
//       } else {
//         now_page.addClass('active').fadeIn(800)
//       }
//       console.log('change')
//     })
//   }

//   // Tab4.pageStep(2)
//   // 頁籤直接呼叫 123456
//   pageStep(page) {
//     let target_page = $(`[data-change-page = ${page}]`)
//     let target_id = $(`[data-change-id = ${page}]`)
//     let target_step = $(`[data-change-step = ${page}]`)
//     target_page.siblings().removeClass('active').hide()
//     target_page.addClass('active').fadeIn(400)
//     target_id.siblings().removeClass('active')
//     target_id.addClass('active')
//     target_step.siblings().removeClass('active')
//     target_step.prevAll().addClass('active')
//     target_step.addClass('active')
//   }

//   // 步驟切換
//   #stepChange(parentBox) {
//     console.log(parentBox)
//   }

//   // callback
//   attributeChangedCallback(attr, oldVal, newVal) {
//     const d4 = this
//     switch (attr) {
//       case 'd4-status':
//         if (newVal === 'open' || newVal === 'close') {
//           d4.emit(newVal)
//         }
//         break
//     }
//   }
// }
// 第二版
class Tab4 extends HTMLElement {
  constructor() {
    super()
  }

  static get observedAttributes() {
    return ['type', 'display', 'defaultPage']
  }

  // callback
  // attributeChangedCallback(){}
  // connectedCallback(){}

  // 初始化設定
  #init() {}

  // 事件整理
  #event() {}

  // 頁籤切換 data-change-parent
  #pageChange() {}

  // 點擊切換事件
  #clickEventListen() {}

  // 步驟切換
  #stepChange() {}

  // 可直接呼叫
  // 頁面切換
  pageStep() {}
}

// define custom element
if (!customElements.get('tab-el')) {
  customElements.define('tab-el', Tab4)
}

export default Tab4
