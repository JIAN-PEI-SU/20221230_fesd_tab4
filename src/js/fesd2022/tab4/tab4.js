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
  // 定義組件的初始狀態
  constructor() {
    super()
  }

  // 在組件被插入到文件中時會被呼叫
  connectedCallback() {
    // 防呆
    if (!this.classList.contains('t4-initialize')) {
      console.log(this, 'connectedCallback')
      // this.#create()
    }
  }
  // 當組件的屬性被更改時會被呼叫
  // attributeChangedCallback(){}
  // static get observedAttributes() {}

  // 建立元件
  #create() {
    // this.s.all_id = this.querySelector('.select-display')
    // this.s.dropdownEl = this.querySelector('.dropdown')
    // this.s.selectType = this.hasAttribute('multiple') ? 'multiple' : 'single'

    // const options = {
    //   type: this.getAttribute('t4-type'),
    //   display: this.getAttribute('t4-display'),
    //   defaultPage: this.getAttribute('t4-defaultPage'),
    // }
    this.t = {}
    this.t.event = {}
    this.t.options = {}
    // 抓值
    this.t.child = this.querySelectorAll('.tab-pane')
    // 分離物件綁定
    this.t.id = this.getAttribute('tab4-id')
    // this.t.allBtn = document.querySelectorAll(`[tab4-target="${id}"]`)

    // console.log(this, 'create')
    this.#init()
  }
  // 初始化設定
  #init() {
    // 判斷設定 否則設定預設
    if (!this.hasAttribute('t4-type')) {
      this.setAttribute('t4-type', 'basic')
    }
    if (!this.hasAttribute('t4-display')) {
      this.setAttribute('t4-display', 'fade')
    }
    if (!this.hasAttribute('t4-defaultPage')) {
      this.setAttribute('t4-defaultPage', '1')
    }
    // console.log(this, 'init')
    // 防呆
    this.classList.add('t4-initialize')
    this.#event()
  }

  // 事件整理
  #event() {
    // console.log(this, 'event')
    // btn.addEventListener('click',function(){})
    this.#pageChange()
  }

  // 頁籤切換 data-change-parent
  #pageChange() {
    // console.log(this)
    // 點擊事件綁定
    this.#clickEventListen()
  }

  // 點擊切換事件
  #clickEventListen() {
    // 點擊
    // btn.on('click', function () {
    //   const $this = $(this)
    // let now_id = $this.attr('data-change-id')
    // let now_page = $(`[data-change-page = ${now_id}]`)
    // // 隱藏其他人
    // now_page.siblings().removeClass('active').hide()
    // $this.siblings().removeClass('active')
    // // 顯示自己
    // $this.addClass('active')
    // // 判斷顯示方式
    // if (display == 'slide') {
    //   now_page.addClass('active').slideDown(800)
    // } else {
    //   now_page.addClass('active').fadeIn(800)
    // }
    // })
    // console.log('change')
  }

  // 步驟切換
  #stepChange() {}

  // 可直接呼叫
  // Tab4.pageStep(2)
  // 頁面切換
  pageStep() {
    // let target_page = $(`[data-change-page = ${page}]`)
    // let target_id = $(`[data-change-id = ${page}]`)
    // let target_step = $(`[data-change-step = ${page}]`)
    // target_page.siblings().removeClass('active').hide()
    // target_page.addClass('active').fadeIn(400)
    // target_id.siblings().removeClass('active')
    // target_id.addClass('active')
    // target_step.siblings().removeClass('active')
    // target_step.prevAll().addClass('active')
    // target_step.addClass('active')
  }
}

Object.assign(Tab4.prototype, SHARED)

// define custom element
if (!customElements.get('tab-el')) {
  customElements.define('tab-el', Tab4)
}

export default Tab4

// 第三版
class TabbedContent extends HTMLElement {
  constructor() {
    super()
    this.tabs = []
    this.tabPanels = []
    this.activeTab = 0
  }
  connectedCallback() {
    this.tabs = Array.from(this.querySelectorAll('[role="tab"]'))
    this.tabPanels = Array.from(this.querySelectorAll('[role="tabPanel"]'))
    this.tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        this.setActiveTab(index)
      })
    })
    this.setActiveTab(this.activeTab)
  }

  setActiveTab(index) {
    console.log(index)
    this.tabs.forEach((tab, i) => {
      if (i === index) {
        tab.setAttribute('aria-selected', true)
        this.tabPanels[i].hidden = false
      } else {
        tab.setAttribute('aria-selected', false)
        this.tabPanels[i].hidden = true
      }
    })
  }
}

if (!customElements.get('tab-component')) {
  customElements.define('tab-component', TabbedContent)
}

// 這段程式會建立一個叫做 'tab-component' 的 Web Components，它會在連接到文件時找到所有帶有 'role' 屬性的元素並設定事件監聽器，當使用者點擊某個標籤時，會呼叫 setActiveTab() 方法。

// setActiveTab() 方法接收一個索引值並遍歷所有標籤和面板。如果索引值等於活動標籤的索引值，則將該標籤設為活動標籤並顯示對應的面板，否則將其設為非活動標籤並隱藏對應的面板。
