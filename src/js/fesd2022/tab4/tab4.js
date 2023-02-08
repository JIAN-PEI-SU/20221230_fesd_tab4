import OPTIONS from './options'
import SHARED from '../shared/shared'
import { isElementExist, getElement, getAllElements } from '../shared/utils.js'

// [data-change-parent] 外層
// [data-change-btn]  控制按鈕
// [data-change-id]  頁籤按鈕
// [data-change-page]  本人

// 第一版
// const list = document.querySelectorAll('.tab-title .item')
// const changeBox = document.querySelectorAll('.tab-content')

// for (var i = 0; i < list.length; i++) {
//   list[i].addEventListener('click', function () {
//     showContent(this)
//   })
// }

// function showContent(active) {
//   for (let i = 0; i < list.length; i++) {
//     if (list[i] == active) {
//       list[i].classList.add('active')
//       changeBox[i].classList.remove('hide')
//     } else {
//       list[i].classList.remove('active')
//       changeBox[i].classList.add('hide')
//     }
//   }
// }

// 第二版
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

// 第三版
// class Tab4 extends HTMLElement {
//   // 定義組件的初始狀態
//   constructor() {
//     super()
//   }

//   // 在組件被插入到文件中時會被呼叫
//   connectedCallback() {
//     // 防呆
//     if (!this.classList.contains('t4-initialize')) {
//       console.log(this, 'connectedCallback')
//       // this.#create()
//     }
//   }
//   // 當組件的屬性被更改時會被呼叫
//   // attributeChangedCallback(){}
//   // static get observedAttributes() {}

//   // 建立元件
//   #create() {
//     // this.s.all_id = this.querySelector('.select-display')
//     // this.s.dropdownEl = this.querySelector('.dropdown')
//     // this.s.selectType = this.hasAttribute('multiple') ? 'multiple' : 'single'

//     // const options = {
//     //   type: this.getAttribute('t4-type'),
//     //   display: this.getAttribute('t4-display'),
//     //   defaultPage: this.getAttribute('t4-defaultPage'),
//     // }
//     this.t = {}
//     this.t.event = {}
//     this.t.options = {}
//     // 抓值
//     this.t.child = this.querySelectorAll('.tab-pane')
//     // 分離物件綁定
//     this.t.id = this.getAttribute('tab4-id')
//     // this.t.allBtn = document.querySelectorAll(`[tab4-target="${id}"]`)

//     // console.log(this, 'create')
//     this.#init()
//   }
//   // 初始化設定
//   #init() {
//     // 判斷設定 否則設定預設
//     if (!this.hasAttribute('t4-type')) {
//       this.setAttribute('t4-type', 'basic')
//     }
//     if (!this.hasAttribute('t4-display')) {
//       this.setAttribute('t4-display', 'fade')
//     }
//     if (!this.hasAttribute('t4-defaultPage')) {
//       this.setAttribute('t4-defaultPage', '1')
//     }
//     // console.log(this, 'init')
//     // 防呆
//     this.classList.add('t4-initialize')
//     this.#event()
//   }

//   // 事件整理
//   #event() {
//     // console.log(this, 'event')
//     // btn.addEventListener('click',function(){})
//     this.#pageChange()
//   }

//   // 頁籤切換 data-change-parent
//   #pageChange() {
//     // console.log(this)
//     // 點擊事件綁定
//     this.#clickEventListen()
//   }

//   // 點擊切換事件
//   #clickEventListen() {
//     // 點擊
//     // btn.on('click', function () {
//     //   const $this = $(this)
//     // let now_id = $this.attr('data-change-id')
//     // let now_page = $(`[data-change-page = ${now_id}]`)
//     // // 隱藏其他人
//     // now_page.siblings().removeClass('active').hide()
//     // $this.siblings().removeClass('active')
//     // // 顯示自己
//     // $this.addClass('active')
//     // // 判斷顯示方式
//     // if (display == 'slide') {
//     //   now_page.addClass('active').slideDown(800)
//     // } else {
//     //   now_page.addClass('active').fadeIn(800)
//     // }
//     // })
//     // console.log('change')
//   }

//   // 步驟切換
//   #stepChange() {}

//   // 可直接呼叫
//   // Tab4.pageStep(2)
//   // 頁面切換
//   pageStep() {
//     // let target_page = $(`[data-change-page = ${page}]`)
//     // let target_id = $(`[data-change-id = ${page}]`)
//     // let target_step = $(`[data-change-step = ${page}]`)
//     // target_page.siblings().removeClass('active').hide()
//     // target_page.addClass('active').fadeIn(400)
//     // target_id.siblings().removeClass('active')
//     // target_id.addClass('active')
//     // target_step.siblings().removeClass('active')
//     // target_step.prevAll().addClass('active')
//     // target_step.addClass('active')
//   }
// }

// Object.assign(Tab4.prototype, SHARED)

// // define custom element
// if (!customElements.get('tab-el')) {
//   customElements.define('tab-el', Tab4)
// }

// export default Tab4

// 第四版

// [tab-el] 外層
// [t4-role="btn_prev"]  控制按鈕
// [t4-role="tab"]  頁籤按鈕
// [t4-role="tabPanel"]  本人

// 選項
// [t4-type= 'normal' / 'process']
// [t4-display = 'fade' / 'slide']
// [t4-defaultPage = number]
// [t4-aost = true / false]

class Tab4 extends HTMLElement {
  // 定義組件的初始狀態
  constructor(el, option) {
    super()
  }
  // 在組件被插入到文件中時會被呼叫
  connectedCallback() {
    this.t = []
    // 按鈕
    this.t.tabs = []
    // 名字 配對用
    this.t.name = this.getAttribute('t4-name')
    // 內容
    this.t.tabPanels = []
    // 存放當前位置
    this.t.activeTab = 0

    // 防呆
    if (!this.classList.contains('t4-initialize')) {
      console.log(this, 'connectedCallback')
      this.#create()
    }
  }
  // 當組件的屬性被更改時會被呼叫
  // attributeChangedCallback(){}
  // static get observedAttributes() {}

  #create() {
    // 抓值
    this.t.tabPanels = Array.from(this.querySelectorAll('[t4-role="tabPanel"]'))
    const { SETTINGS } = OPTIONS
    // + 判斷
    this.t.stepOutput = SETTINGS.stepOutput
    this.t.anchor = SETTINGS.anchor
    this.t.type = this.getAttribute('t4-type') ?? SETTINGS.type
    this.t.display = this.getAttribute('t4-display') ?? SETTINGS.display
    this.t.defaultPage = parseInt(this.getAttribute('t4-defaultPage'), 10) ?? SETTINGS.defaultPage
    this.t.transition = {}
    this.t.transition.duration = this.getAttribute('t4-duration') ?? SETTINGS.transition.duration
    this.t.transition.function = this.getAttribute('t4-function') ?? SETTINGS.transition.function
    this.t.transition.delay = this.getAttribute('t4-delay') ?? SETTINGS.transition.delay
    // 結構外
    this.t.tabs = Array.from(document.querySelectorAll(`[t4-control="${this.t.name}"] [t4-role="tab"]`))
    this.t.next = document.querySelector(`[t4-role="btn_next"][t4-control="${this.t.name}"]`)
    this.t.prev = document.querySelector(`[t4-role="btn_prev"][t4-control="${this.t.name}"]`)
    this.t.step = document.querySelector(`${this.t.stepOutput}[t4-control="${this.t.name}"]`)
    this.t.anchor = document.querySelector(`${this.t.anchor.role}[t4-control="${this.t.name}"]`)
    console.log(this)
    this.#init()
  }
  // 初始化設定
  #init() {
    // 設定預設頁面
    if (this.t.defaultPage > this.t.tabPanels.length) {
      this.t.defaultPage = 0
    } else {
      this.setActiveTab(this.t.defaultPage)
    }
    // 寫入步驟數
    if (this.t.step) {
      this.#sept(this.t.activeTab)
    }
    // 設定防呆
    this.classList.add('t4-initialize')
    this.#event()
  }
  // 步驟狀態
  #sept(page) {
    let current = page + 1
    this.t.step.textContent = `${current}`
  }
  // 按鈕狀態
  #btnCurrent() {
    if (this.t.tabPanels.length == 1) {
      this.t.next.setAttribute('disabled', '')
      this.t.prev.setAttribute('disabled', '')
    } else {
      if (this.t.activeTab == this.t.tabPanels.length - 1) {
        this.t.next.setAttribute('disabled', '')
        this.t.prev.removeAttribute('disabled')
      } else if (this.t.activeTab == 0) {
        this.t.prev.setAttribute('disabled', '')
        this.t.next.removeAttribute('disabled')
      } else {
        this.t.next.removeAttribute('disabled')
        this.t.prev.removeAttribute('disabled')
      }
    }
  }
  // 動畫設定
  // 消失動畫
  #animationHide(el) {
    // 動畫 消失 動畫 出現 搭配 settimeout 使用
    this.t.tabPanels[el].classList.add('hide')
    switch (this.t.display) {
      case 'fade':
        this.t.tabPanels[el].style['display'] = 'none'
        this.t.tabPanels[el].style['opacity'] = '0'
        break
      case 'slide':
        this.t.tabPanels[el].style['display'] = 'none'
        this.t.tabPanels[el].style['max-height'] = 'unset'
        break
      case 'slide-swiper':
        this.t.tabPanels[el].style['display'] = 'none'
        break
      default:
        this.t.tabPanels[el].style['display'] = 'none'
        break
    }
    // this.t.tabPanels[el].hidden = true
  }
  // 出現動畫
  #animationShow(el) {
    this.t.tabPanels[el].classList.remove('hide')
    this.t.tabPanels[el].style['transition-duration'] = this.t.transition.duration
    this.t.tabPanels[el].style['transition-timing-function'] = this.t.transition.function
    this.t.tabPanels[el].style['transition-delay'] = this.t.transition.delay
    switch (this.t.display) {
      case 'fade':
        this.t.tabPanels[el].style['display'] = 'block'
        this.t.tabPanels[el].style['opacity'] = '0'
        let timer = setTimeout(() => {
          clearInterval(timer)
          this.t.tabPanels[el].style['opacity'] = '1'
        }, 100)
        break
      case 'slide':
        this.t.tabPanels[el].style['display'] = 'block'
        const clientHeight = this.t.tabPanels[el].offsetHeight
        this.t.tabPanels[el].style['max-height'] = '0'
        timer = setTimeout(() => {
          clearInterval(timer)
          this.t.tabPanels[el].style['max-height'] = clientHeight + 'px'
        }, 100)
        break
      case 'slide-swiper':
        this.t.tabPanels[el].style['display'] = 'block'
        console.log(this.t.display, '還沒做好啦!!!!')
        break
      default:
        this.t.tabPanels[el].style['display'] = 'block'
        console.log(this.t.display, '沒有這個效果請自己想辦法!!!!')
        break
    }
    // this.t.tabPanels[el].hidden = false
    // 動畫 消失 動畫 出現 搭配 settimeout 使用
  }
  // 事件綁定
  #event() {
    console.log(this)
    this.t.tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        this.setActiveTab(index)
      })
    })
    this.t.next.addEventListener('click', () => {
      this.goNext()
    })
    this.t.prev.addEventListener('click', () => {
      this.goPrev()
    })
  }

  // 流程切換
  setActiveSept() {}

  // 頁籤切換
  // 外部呼叫方法 $0.setActiveTab(0)
  setActiveTab(index) {
    this.t.tabs.forEach((tab, i) => {
      if (i === index) {
        tab.setAttribute('aria-selected', true)
        this.#animationShow(i)
      } else {
        tab.setAttribute('aria-selected', false)
        this.#animationHide(i)
      }
    })
    this.t.activeTab = index
    this.#btnCurrent()
  }

  // 按鈕切換
  // 外部呼叫方法 $0.goNext()
  goNext() {
    this.t.activeTab =
      this.t.activeTab + 1 > this.t.tabPanels.length - 1 ? this.t.tabPanels.length - 1 : this.t.activeTab + 1
    // console.log(this, this.t.activeTab, 'next')

    if (this.t.type == 'process') {
      this.#animationHide(this.t.activeTab - 1)
      this.#animationShow(this.t.activeTab)
      // 寫入步驟數
      if (this.t.step) {
        this.#sept(this.t.activeTab)
      }
    } else {
      // 預設樣式 - normal
      this.setActiveTab(this.t.activeTab)
    }
    this.#btnCurrent()
  }
  // 外部呼叫方法 $0.goPrev()
  goPrev() {
    this.t.activeTab = this.t.activeTab - 1 < 0 ? 0 : this.t.activeTab - 1
    // console.log(this, this.t.activeTab, 'prev')

    if (this.t.type == 'process') {
      this.#animationHide(this.t.activeTab + 1)
      this.#animationShow(this.t.activeTab)
      // 寫入步驟數
      if (this.t.step) {
        this.#sept(this.t.activeTab)
      }
    } else {
      // 預設樣式 - normal
      this.setActiveTab(this.t.activeTab)
    }
    this.#btnCurrent()
  }
}

Object.assign(Tab4.prototype, SHARED)

if (!customElements.get('tab-el')) {
  customElements.define('tab-el', Tab4)
}

export default Tab4
