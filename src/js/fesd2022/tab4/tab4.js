import OPTIONS from './options'
import SHARED from '../shared/shared'
import { isElement, getElement, getAllElements } from '../shared/utils.js'

// 第五版
class Tab4 extends HTMLElement {
  // 定義組件的初始狀態
  constructor(el, option) {
    super()
  }
  // 當組件的屬性被更改時會被呼叫
  static get observedAttributes() {
    return ['t4-active']
  }
  attributeChangedCallback(attr, oldVal, newVal){
    if(attr === 't4-active'){
      // change function
      // ...

      this.emit('change')
    }
  }
  connectedCallback() {
    // 防呆
    if (!this.classList.contains('t4-initialize')) {
      this.#create()
    }
  }
  #create(){
    const name = this.getAttribute('t4-name')
    
    this.t = {}
    // 按鈕
    this.t.tabs = []
    // 名字 配對用
    this.t.name = name
    // 內容
    this.t.tabPanels = []
    // 存放當前位置
    this.t.activeTab = 0
    // 抓值
    const { SETTINGS } = OPTIONS
    this.t.tabPanels = Array.from(this.querySelectorAll('[t4-role="tabPanel"]'))
    this.t.stepOutput = SETTINGS.stepOutput
    // 網址設定
    this.t.url = this.getAttribute('t4-url')
    // 錨點設定
    this.t.anchor = this.getAttribute('t4-anchor')
    this.t.gap = this.getAttribute('t4-gap') ?? SETTINGS.anchorGap
    // 動畫設定
    this.t.transition = {}
    this.t.transition.duration = this.getAttribute('t4-duration') ?? SETTINGS.transition.duration
    this.t.transition.timing = this.getAttribute('t4-timing') ?? SETTINGS.transition.timing
    this.t.transition.delay = this.getAttribute('t4-delay') ?? SETTINGS.transition.delay
    // 結構外
    this.t.tabGroup = this.getAttribute('t4-group') ?? SETTINGS.tabGroup
    this.t.tabs = this.#tabSet()
    this.t.step = document.querySelector(`[t4-control="${this.t.name}"]${this.t.stepOutput}`)
    // 基本設定 + 判斷
    this.t.type = this.getAttribute('t4-type') ?? SETTINGS.type
    this.t.display = this.getAttribute('t4-display') ?? SETTINGS.display
    this.t.defaultPage = parseInt(this.getAttribute('t4-defaultPage') ?? SETTINGS.defaultPage, 10)
    this.#init()
  }
  #init(){
    // 初始化設定
    // 設定預設頁面
    this.t.activeTab = this.#getDefaultPage()
    // 寫入步驟數
    // 設定防呆
    this.classList.add('t4-initialize')
    this.setActiveTab(this.t.activeTab)
  }
  #tabSet() {
    if(this.t.tabGroup === "true"){
      this.t.tabPanels.forEach((el,index)=>{
        el.setAttribute('t4-id',index)
      })
      return Array.from(document.querySelectorAll(`[t4-control="${this.t.name}"] [t4-role="tab"]`))
    }else{
      this.t.tabPanels.forEach(el => {
        if(!el.getAttribute('t4-id')){
          console.log(el,'請幫我設定id！！');
        }
      });
    }
  }
  #getTabIndex(id){
    const tabPanel = document.querySelector(`[t4-control="${this.t.name}"] [t4-role="tabPanel"] [t4-id="${id}"]`)
    const tabIndex = this.t.panel.indexOf(tabPanel);
    return tabIndex
  }
  #getTabId(index){
    const tabId = this.t.panel[index].getAttribute('t4-id');
    return tabId
  }
  #getDefaultPage(){
    let page = 0
    if(this.t.url){
      console.log('抓網址？？？？');
    }else{
      page = this.t.defaultPage
    }
    return page
  }
  /**
   * 動畫設定
   */
  // 消失動畫
  #animationHide(index) {
    // 動畫 消失 動畫 出現 搭配 settimeout 使用
    this.t.tabPanels[index].classList.add('hide')
    switch (this.t.display) {
      case 'fade':
        this.t.tabPanels[index].style['display'] = 'none'
        this.t.tabPanels[index].style['opacity'] = '0'
        break
      case 'slide':
        this.t.tabPanels[index].style['display'] = 'none'
        this.t.tabPanels[index].style['opacity'] = '0'
        this.t.tabPanels[index].style['max-height'] = 'unset'
        break
      case 'slide-swiper':
        this.t.tabPanels[index].style['display'] = 'none'
        break
      default:
        this.t.tabPanels[index].style['display'] = 'none'
        break
    }
    // this.t.tabPanels[el].hidden = true
  }
  // 出現動畫
  #animationShow(index) {
    const {duration,timing,delay} = this.t.transition
    const tabPanel = this.t.tabPanels[index]
    tabPanel.classList.remove('hide')
    tabPanel.style['transition-duration'] = duration
    tabPanel.style['transition-timing-function'] = timing
    tabPanel.style['transition-delay'] = delay
    switch (this.t.display) {
      case 'fade':
        this.t.tabPanels[index].style['display'] = 'block'
        this.t.tabPanels[index].style['opacity'] = '0'
        let timer = setTimeout(() => {
          clearInterval(timer)
          this.t.tabPanels[index].style['opacity'] = '1'
        }, 100)
        break
      case 'slide':
        this.t.tabPanels[index].style['display'] = 'block'
        const clientHeight = this.t.tabPanels[index].offsetHeight
        this.t.tabPanels[index].style['opacity'] = '1'
        this.t.tabPanels[index].style['max-height'] = '0'
        timer = setTimeout(() => {
          clearInterval(timer)
          this.t.tabPanels[index].style['max-height'] = clientHeight + 'px'
        }, 100)
        break
      case 'slide-swiper':
        this.t.tabPanels[index].style['display'] = 'block'
        console.log(this.t.display, '還沒做好啦!!!!')
        break
      default:
        this.t.tabPanels[index].style['display'] = 'block'
        console.log(this.t.display, '沒有這個效果請自己想辦法!!!!')
        break
    }
    // this.t.tabPanels[el].hidden = false
    // 動畫 消失 動畫 出現 搭配 settimeout 使用
  }
  /**
   * 錨點設定
   */
  // 移動至指定位置
  #eventAnchor() {
    const gap = parseInt(this.t.gap, 10)
    const pageYOffset = window.pageYOffset
    const targetOffset = this.getBoundingClientRect().top
    const changeOffset = targetOffset + pageYOffset - gap
    this.#goAnchor(changeOffset)
  }
  // 移動
  #goAnchor(val) {
    window.scrollTo({
      top: val,
      behavior: 'smooth',
    })
  }
  // 步驟狀態
  #step(page) {
    let current = page + 1
    this.t.step.textContent = `${current}`
    this.t.step.setAttribute('now-page', current)
  }
  #btnNextState(btn) {
    // next 按鈕狀態
    if (isElement(btn)) {
      if (this.t.tabPanels.length == 1) {
        // 只有一頁
        btn.setAttribute('disabled', '')
      } else {
        if (this.t.activeTab == this.t.tabPanels.length - 1) {
          // 最後頁
          btn.setAttribute('disabled', '')
        } else if (this.t.activeTab == 0) {
          // 第一頁
          btn.removeAttribute('disabled')
        } else {
          // 其他頁
          btn.removeAttribute('disabled')
        }
      }      
    }      
  }
  #btnPrevState(btn) {
    console.log(btn);
    // prev 按鈕狀態
    if (isElement(btn)) {
      if (this.t.tabPanels.length == 1) {
        // 只有一頁
        btn.setAttribute('disabled', '')
      } else {
        if (this.t.activeTab == this.t.tabPanels.length - 1) {
          // 最後頁
          btn.removeAttribute('disabled')
        } else if (this.t.activeTab == 0) {
          // 第一頁
          btn.setAttribute('disabled', '')
        } else {
          // 其他頁
          btn.removeAttribute('disabled')
        }
      }
    }
  }
  // 頁籤狀態
  #tabState(active) {
    if(this.tabGroup === "true"){
      this.t.tabs[active].setAttribute('aria-selected', true)
    }
  }
  // 判斷元件並執行
  #isTrue(fun, val) {
    switch (fun) {
      case 'step':
        if (isElement(this.t.step)) {
          this.#step(val)
        }
        break
      case 'eventAnchor':
        if (this.t.anchor) {
          this.#eventAnchor(val)
        }
        break
      case 'tabState':
        // 流程沒有按鈕 客制的話....
        if (this.t.type == 'normal') {
          // 頁籤按鈕狀態
          this.#tabState(val)
        }
        break
      case 'btnState':
        this.#btnNextState()
        this.#btnPrevState()
        break
      default:
        console.log('請增加判斷，謝謝')
        break
    }
  }
  //  ------------- 我是分隔線呦 -------------
  // 頁籤切換 
  tabClick(clickedTab) {
    let newTabIndex = 0
    if(this.tabGroup === "true"){
      newTabIndex = this.t.tab.indexOf(clickedTab);
    }else{
      newTabIndex = this.#getTabIndex(clickedTab.getAttribute('t4-id'))
    }
    console.log(newTabIndex);
    // 通知頁籤切換
    this.setActiveTab(newTabIndex);
    // 觸發自定義事件
    this.emit('change')
  }
  // 外部呼叫方法 $0.setActiveTab(0)
  setActiveTab(tabIndex) { 
    this.t.activeTabIndex = tabIndex
    this.t.tabPanels.forEach((panel, i) => {
      if (i === tabIndex) {
        this.#animationShow(i)
      } else {
        this.#animationHide(i)
      }
    })
    // 身外之物們
    this.#isTrue('step', tabIndex)
    this.#isTrue('btnState')
    this.#isTrue('tabState', tabIndex)
  }
  // 按鈕切換
  // 外部呼叫方法 $0.goNext()
  goNext() {
    const nextPage = Math.min(this.t.tabPanels.length - 1, this.t.activeTabIndex + 1);
    this.setActiveTab(nextPage)
  }
  // 外部呼叫方法 $0.goPrev()
  goPrev() {
    const prevPage = Math.max(0, this.t.activeTabIndex - 1);
    this.setActiveTab(prevPage)
  }
  // 外部呼叫方法 $0.t4Update()
  t4Update() {
    const nowPage = this.getAttribute('t4-active') ?? this.t.activeTab
    this.setActiveTab(nowPage)
    console.log(`你現在在頁面${this.t.activeTab}`);

    this.emit('afterUpdate')
  }
}

// 綁定點擊事件
function changeEvent(){
  const targetElements = document.querySelectorAll('[t4-control]');

  document.addEventListener('click', function(event) {
    let isTarget = false;
    for (const targetElement of targetElements) {
      if (targetElement.contains(event.target) || event.target.closest('[t4-control]') === targetElement) {
        isTarget = true;
        break;
      }
    }
    if (isTarget) {
      // event.target 是目標元素或其子層
      const tabControl = event.target.closest('[t4-control]')
      const tabElName = tabControl.getAttribute('t4-control')
      const tabEls = document.querySelectorAll(`tab-el[t4-name="${tabElName}"]`) 
      tabEls.forEach(el=>{
        const role = tabControl.getAttribute('t4-role')
        switch (role) {
          case 'tab':
            el.tabClick(tabControl)
            break
          case 'next':
            console.log(tabControl);
            el.goNext(tabControl)
            break
          case 'prev':
            el.goPrev(tabControl)
            break
          default:
            break
        }
      })
    }
  });
}
changeEvent()

// 第四版
// class Tab4 extends HTMLElement {
//   // 定義組件的初始狀態
//   constructor(el, option) {
//     super()
//   }
//   // 在組件被插入到文件中時會被呼叫
//   connectedCallback() {
//     // 防呆
//     if (!this.classList.contains('t4-initialize')) {
//       this.#create()
//     }
//   }
//   // 當組件的屬性被更改時會被呼叫
//   // attributeChangedCallback(){}
//   // static get observedAttributes() {}
  
//   #create() {
//     this.t = {}
//     // 按鈕
//     this.t.tabs = []
//     // 名字 配對用
//     this.t.name = this.getAttribute('t4-name')
//     // 內容
//     this.t.tabPanels = []
//     // 存放當前位置
//     this.t.activeTab = 0

//     // 抓值
//     this.t.tabPanels = Array.from(this.querySelectorAll('[t4-role="tabPanel"]'))
//     const { SETTINGS } = OPTIONS
//     // 基本設定 + 判斷
//     this.t.stepOutput = SETTINGS.stepOutput
//     this.t.type = this.getAttribute('t4-type') ?? SETTINGS.type
//     this.t.display = this.getAttribute('t4-display') ?? SETTINGS.display
//     this.t.defaultPage = parseInt(this.getAttribute('t4-defaultPage') ?? SETTINGS.defaultPage, 10)
//     // 多層設定
//     this.t.multiple = this.getAttribute('t4-multiple')
//     // 錨點設定
//     this.t.anchor = this.getAttribute('t4-anchor')
//     this.t.gap = this.getAttribute('t4-gap') ?? SETTINGS.anchorGap
//     // 動畫設定
//     this.t.transition = {}
//     this.t.transition.duration = this.getAttribute('t4-duration') ?? SETTINGS.transition.duration
//     this.t.transition.timing = this.getAttribute('t4-timing') ?? SETTINGS.transition.timing
//     this.t.transition.delay = this.getAttribute('t4-delay') ?? SETTINGS.transition.delay
//     // 結構外
//     this.t.tabs = this.t.type == "customize" ? Array.from(document.querySelectorAll(`[t4-role="tab"][t4-id]`)) : Array.from(document.querySelectorAll(`[t4-control="${this.t.name}"] [t4-role="tab"]`))
//     this.t.next = document.querySelectorAll(`[t4-control="${this.t.name}"][t4-role="next"]`)
//     this.t.prev = document.querySelectorAll(`[t4-control="${this.t.name}"][t4-role="prev"]`)
//     this.t.step = document.querySelector(`[t4-control="${this.t.name}"]${this.t.stepOutput}`)
//     this.#init()
//   }
//   // 初始化設定
//   #init() {
//     // console.log(this);
//     // 設定預設頁面
//     if (this.t.defaultPage > this.t.tabPanels.length) {
//       this.t.defaultPage = 0
//       console.log('預設數字太大囉~~',this.t.defaultPage)
//     } else {
//       this.setActiveTab(this.t.defaultPage)
//     }
//     // 寫入步驟數
//     this.#isTrue('step', this.t.activeTab)
//     // 設定防呆
//     switch (this.t.type) {
//       case 'normal':
//         // 頁籤啟用
//         if (this.t.tabPanels.length != this.t.tabs.length) {
//           console.log('按鈕數量與內容不一樣喔!!!!' , this.t.tabPanels , this.t.tabs);
//           console.log('若要客製按鈕請使用"customize"，謝謝配合！')
//         } else {
//           this.classList.add('t4-initialize')
//           this.#event()
//         }
//         break;
//       case 'process':
//         // 流程啟用
//         this.classList.add('t4-initialize')
//         this.#event()
//         break;
//       case 'customize':
//         // 客製啟用
//         this.classList.add('t4-initialize')
//         // this.#event()
//         // 按鈕切換
//         this.t.tabs.forEach((tab, index) => {
//           tab.addEventListener('click', () => {
//             let currentName = tab.getAttribute('t4-id')
//             this.#tabName(currentName)
//             this.#panelName(currentName)
//           })
//         })
//         // 左右切換
//         break;
//       default:
//         console.log('請設定正確t4-type！！',this.t.type);
//         break;
//     }
//   }
//   #defaultPage(page) {
//   }
//   // 步驟狀態
//   #step(page) {
//     let current = page + 1
//     this.t.step.textContent = `${current}`
//     this.t.step.setAttribute('now-page', current)
//   }
//   // 頁籤狀態
//   #tabState(currentPageNum) {
//     this.t.tabs.forEach((tab, i) => {
//       if (i === currentPageNum) {
//         tab.setAttribute('aria-selected', true)
//       } else {
//         tab.setAttribute('aria-selected', false)
//       }
//     })
//   }
//   #panelState(currentPageNum) {
//     this.t.tabPanels.forEach((panel, i) => {
//       if (i === currentPageNum) {
//         this.#animationShow(i)
//       } else {
//         this.#animationHide(i)
//       }
//     })
//   }
//   // NAME
//   #tabName(currentPageName) {
//     this.t.tabs.forEach((tab, i) => {
//       let current = tab.getAttribute('t4-id')
//       if (current === currentPageName) {
//         tab.setAttribute('aria-selected', true)
//       } else {
//         tab.setAttribute('aria-selected', false)
//       }
//     })
//   }
//   #panelName(currentPageName) {
//     this.t.tabPanels.forEach((panel, i) => {
//       let current = panel.getAttribute('t4-id')
//       if (current === currentPageName) {
//         this.#animationShow(i)
//       } else {
//         this.#animationHide(i)
//       }
//     })
//   }
//   #btnNextState() {
//     // next 按鈕狀態
//     this.t.next.forEach((btn, i) => {
//       if (isElement(btn)) {
//         if (this.t.tabPanels.length == 1) {
//           // 只有一頁
//           btn.setAttribute('disabled', '')
//         } else {
//           if (this.t.activeTab == this.t.tabPanels.length - 1) {
//             // 最後頁
//             btn.setAttribute('disabled', '')
//           } else if (this.t.activeTab == 0) {
//             // 第一頁
//             btn.removeAttribute('disabled')
//           } else {
//             // 其他頁
//             btn.removeAttribute('disabled')
//           }
//         }
//       }
//     })
      
//   }
//   #btnPrevState() {
//     // prev 按鈕狀態
//     this.t.prev.forEach((btn, i) => {
//       if (isElement(btn)) {
//         if (this.t.tabPanels.length == 1) {
//           // 只有一頁
//           btn.setAttribute('disabled', '')
//         } else {
//           if (this.t.activeTab == this.t.tabPanels.length - 1) {
//             // 最後頁
//             btn.removeAttribute('disabled')
//           } else if (this.t.activeTab == 0) {
//             // 第一頁
//             btn.setAttribute('disabled', '')
//           } else {
//             // 其他頁
//             btn.removeAttribute('disabled')
//           }
//         }
//       }
//     })
//   }
//   // 動畫設定
//   // 消失動畫
//   #animationHide(index) {
//     // 動畫 消失 動畫 出現 搭配 settimeout 使用
//     this.t.tabPanels[index].classList.add('hide')
//     switch (this.t.display) {
//       case 'fade':
//         this.t.tabPanels[index].style['display'] = 'none'
//         this.t.tabPanels[index].style['opacity'] = '0'
//         break
//       case 'slide':
//         this.t.tabPanels[index].style['display'] = 'none'
//         this.t.tabPanels[index].style['opacity'] = '0'
//         this.t.tabPanels[index].style['max-height'] = 'unset'
//         break
//       case 'slide-swiper':
//         this.t.tabPanels[index].style['display'] = 'none'
//         break
//       default:
//         this.t.tabPanels[index].style['display'] = 'none'
//         break
//     }
//     // this.t.tabPanels[el].hidden = true
//   }
//   // 出現動畫
//   #animationShow(index) {
//     const {duration,timing,delay} = this.t.transition
//     const tabPanel = this.t.tabPanels[index]
//     tabPanel.classList.remove('hide')
//     tabPanel.style['transition-duration'] = duration
//     tabPanel.style['transition-timing-function'] = timing
//     tabPanel.style['transition-delay'] = delay
//     switch (this.t.display) {
//       case 'fade':
//         this.t.tabPanels[index].style['display'] = 'block'
//         this.t.tabPanels[index].style['opacity'] = '0'
//         let timer = setTimeout(() => {
//           clearInterval(timer)
//           this.t.tabPanels[index].style['opacity'] = '1'
//         }, 100)
//         break
//       case 'slide':
//         this.t.tabPanels[index].style['display'] = 'block'
//         const clientHeight = this.t.tabPanels[index].offsetHeight
//         this.t.tabPanels[index].style['opacity'] = '1'
//         this.t.tabPanels[index].style['max-height'] = '0'
//         timer = setTimeout(() => {
//           clearInterval(timer)
//           this.t.tabPanels[index].style['max-height'] = clientHeight + 'px'
//         }, 100)
//         break
//       case 'slide-swiper':
//         this.t.tabPanels[index].style['display'] = 'block'
//         console.log(this.t.display, '還沒做好啦!!!!')
//         break
//       default:
//         this.t.tabPanels[index].style['display'] = 'block'
//         console.log(this.t.display, '沒有這個效果請自己想辦法!!!!')
//         break
//     }
//     // this.t.tabPanels[el].hidden = false
//     // 動畫 消失 動畫 出現 搭配 settimeout 使用
//   }
//   // 移動至指定位置
//   #eventAnchor() {
//     const gap = parseInt(this.t.gap, 10)
//     const pageYOffset = window.pageYOffset
//     const targetOffset = this.getBoundingClientRect().top
//     const change = targetOffset + pageYOffset - gap
//     this.#goAnchor(change)
//   }
//   // 移動
//   #goAnchor(val) {
//     window.scrollTo({
//       top: val,
//       behavior: 'smooth',
//     })
//   }
//   // 事件綁定
//   #event() {
//     this.#isTrue('eventTab')
//     // Next按鈕
//     this.#isTrue('eventNext')
//     // Prev按鈕
//     this.#isTrue('eventPrev')
//   }
//   // 判斷元件並執行
//   #isTrue(fun, val) {
//     switch (fun) {
//       case 'step':
//         if (isElement(this.t.step)) {
//           this.#step(val)
//         }
//         break
//       case 'eventAnchor':
//         if (this.t.anchor) {
//           this.#eventAnchor(val)
//         }
//         break
//       case 'tabState':
//         // 流程沒有按鈕 客制的話....
//         if (this.t.type == 'normal') {
//           // 頁籤按鈕狀態
//           this.#tabState(val)
//         }
//         break
//       case 'btnState':
//         this.#btnNextState()
//         this.#btnPrevState()
//         break
//       case 'eventTab':
//         this.t.tabs.forEach((tab, index) => {
//           if (isElement(tab)) {
//             tab.addEventListener('click', () => {
//               this.setActiveTab(index)
//               this.#isTrue('eventAnchor')
//             })
//           }
//         })
//         break
//       case 'eventNext':
//         this.t.next.forEach((next) => {
//           if (isElement(next)) {
//             next.addEventListener('click', () => {
//               this.goNext()
//             })
//           }
//         })
//         break
//       case 'eventPrev':
//         this.t.prev.forEach((prev) => {
//           if (isElement(prev)) {
//             prev.addEventListener('click', () => {
//               this.goPrev()
//             })
//           }
//         })
//         break
//       default:
//         console.log('請增加判斷，謝謝')
//         break
//     }
//   }
//   //  ------------- 我是分隔線呦 -------------
//   // 頁籤切換
//   // 外部呼叫方法 $0.setActiveTab(0)
//   setActiveTab(index) {
//     this.t.activeTab = index
//     this.#panelState(index)
//     // 身外之物們
//     this.#isTrue('step', index)
//     this.#isTrue('btnState')
//     this.#isTrue('tabState', index)

//   }
//   goPageId(name) {
//     this.#tabName(name)
//     this.#panelName(name)
//   }
//   // 按鈕切換
//   // 外部呼叫方法 $0.goNext()
//   goNext() {
//     this.t.activeTab =
//       this.t.activeTab + 1 > this.t.tabPanels.length - 1 ? this.t.tabPanels.length - 1 : this.t.activeTab + 1
//     this.setActiveTab(this.t.activeTab)
//     this.#isTrue('btnState')
//   }
//   // 外部呼叫方法 $0.goPrev()
//   goPrev() {
//     this.t.activeTab = this.t.activeTab - 1 < 0 ? 0 : this.t.activeTab - 1
//     this.setActiveTab(this.t.activeTab)
//     this.#isTrue('btnState')
//   }
//   // 外部呼叫方法 $0.t4Update()
//   t4Update() {
//     this.setActiveTab(this.t.activeTab)
//     console.log(`你現在在頁面${this.t.activeTab}`);
//   }
// }

Object.assign(Tab4.prototype, SHARED)

if (!customElements.get('tab-el')) {
  customElements.define('tab-el', Tab4)
}

export default Tab4
