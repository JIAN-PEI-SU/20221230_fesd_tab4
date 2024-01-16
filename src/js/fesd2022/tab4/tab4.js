import OPTIONS from './options'
import SHARED from '../shared/shared'
import { isElement, getElement, getAllElements } from '../shared/utils.js'

// 第六版
class Tab4 extends HTMLElement {
  // 定義組件的初始狀態
  constructor(el, option) {
    super()
  }
  // 當組件的屬性被更改時會被呼叫
  static get observedAttributes() {
    return ['t4-active']
  }
  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === 't4-active') {
      // change function
      if (oldVal !== newVal) {
        this.#stateChange(newVal)
      }
    }
  }
  connectedCallback() {
    // 防呆
    if (!this.classList.contains('t4-initialize')) {
      this.#create()
    }
  }
  #create() {
    const name = this.getAttribute('t4-name');

    // 防呆！
    if (document.querySelectorAll(`tab-el[t4-name=${name}]`).length > 1) {
      console.warn('名字有重複喔！！！');
    }

    this.t = {
      tabs: [],
      name: name,
      tabPanels: [...this.children],
      activeTab: '',
      recordUrl: this.getAttribute('t4-url') || OPTIONS.SETTINGS.recordUrl,
      stepOutput: OPTIONS.SETTINGS.stepOutput,
      type: this.getAttribute('t4-type') || OPTIONS.SETTINGS.type,
      display: this.getAttribute('t4-display') || OPTIONS.SETTINGS.display,
      defaultPage: this.getAttribute('t4-defaultPage') || OPTIONS.SETTINGS.defaultPage,
      anchor: this.getAttribute('t4-anchor'),
      gap: this.getAttribute('t4-gap') || OPTIONS.SETTINGS.anchorGap,
      transition: {
        duration: this.getAttribute('t4-duration') || OPTIONS.SETTINGS.transition.duration,
        timing: this.getAttribute('t4-timing') || OPTIONS.SETTINGS.transition.timing,
        delay: this.getAttribute('t4-delay') || OPTIONS.SETTINGS.transition.delay,
      },
      tabGroup: this.getAttribute('t4-group') || OPTIONS.SETTINGS.tabGroup,
    };
    this.__events__ = {}
    this.t.tabs = this.#tabSet();
    this.t.step = document.querySelector(`[t4-control="${this.t.name}"]${this.t.stepOutput}`);
    this.#init();
  }

  #init() {
    // 初始化設定
    this.t.activeTab = this.t.defaultPage
    if (this.t.display === 'swiper') {
      this.#createSwiper();
    }
    if (this.t.recordUrl) {
      const params = new URLSearchParams(document.location.search);
      const val = params.get(this.t.name);

      // 如果網址中有對應的參數 載入對應的頁籤
      if (val) {
        this.setActiveTab(val);
      } else {
        this.setActiveTab(this.t.activeTab);
      }
    } else {
      // 沒有啟用網址紀錄功能
      this.setActiveTab(this.t.activeTab);
    }
    // 設定防呆
    this.classList.add('t4-initialize')
  }
  // 第一關 判斷數量以及id設定
  #tabSet() {
    const { t } = this;
    const tabs = Array.from(document.querySelectorAll(`[t4-control="${t.name}"][t4-role="tab"]`));
    // 防呆
    if (t.display === "normal" && t.tabGroup === "true") {
      // 是頁籤且是群組 判斷數量是否相符
      if (t.tabPanels.length !== tabs.length) {
        console.warn('按鈕與內容數量不同喔', t.tabPanels, tabs);
      }
    }
    if (t.tabGroup === "true") {
      // 流水號
      t.tabPanels.forEach((el, index) => el.setAttribute('t4-id', index));
    } else {
      // 單一頁籤
      t.tabPanels.forEach(el => {
        if (!el.getAttribute('t4-id')) {
          console.warn(el, '請幫我設定id！！');
        }
      });
    }
    return tabs;
  }
  // 第二關 id命名提醒
  #getTabIndex(id) {
    const { t } = this;
    const tabPanelsWithId = t.tabPanels.filter(panel =>
      panel.getAttribute('t4-id') === id
    )
    // 防呆！
    if (tabPanelsWithId.length > 1) {
      console.warn('有兩個相同id設定', tabPanelsWithId);
    }

    // 取得頁籤本人
    const tabPanel = tabPanelsWithId[0];
    if (tabPanel) {
      const tabIndex = t.tabPanels.indexOf(tabPanel);
      return tabIndex;
    } else {
      console.warn(`找不到t4-id為${id}的頁籤`);
      return 0;
    }
  }

  #createSwiper() {
    const swiperContainer = document.createElement('div');
    swiperContainer.classList.add('swiper-container');

    const swiperWrapper = document.createElement('div');
    swiperWrapper.classList.add('swiper-wrapper');

    this.t.tabPanels.forEach((slide) => {
      swiperWrapper.appendChild(slide.cloneNode(true));
    });

    // 更新 t.tabPanels
    this.t.tabPanels = [...swiperWrapper.children]

    swiperContainer.appendChild(swiperWrapper);
    this.innerHTML = ''; // 清空原有的內容
    this.appendChild(swiperContainer);
    // 執行 Swiper 效果的相關初始化
    this.#initSwiper()
  }
  #initSwiper() {
    const sContainer = this.querySelector('.swiper-container');
    const sWrapper = this.querySelector('.swiper-wrapper');
    const tabPanels = this.t.tabPanels;

    // 設定容器和 wrapper 的樣式
    sContainer.style.overflow = 'hidden';
    sWrapper.style.display = 'flex';

    // 設定 wrapper 的寬度
    const totalWidth = tabPanels.length * 100 + '%';
    sWrapper.style.width = totalWidth;
  }

  #addUrl(panel) {
    const { t } = this;

    if (t.recordUrl === 'true') {
      const params = new URLSearchParams(document.location.search);
      params.set(t.name, panel);
      const newUrl = `${window.location.pathname}?${params.toString()}`;

      // 使用 replaceState 修改瀏覽器歷史記錄
      history.replaceState({ t4Id: panel }, '', newUrl);
    }
  }

  // 執行函式
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
  #step(val) {
    let current = parseInt(val, 10) + 1
    this.t.step.textContent = `${current}`
    this.t.step.setAttribute('now-page', current)
  }
  // next 按鈕狀態
  #btnNextState(newPage) {
    const next = document.querySelectorAll(`[t4-role="next"][t4-control="${this.t.name}"]`);

    const isSinglePage = this.t.tabPanels.length === 1;
    const isLastPage = newPage === this.t.tabPanels.length - 1;

    next.forEach((btn) => {
      if (isSinglePage || isLastPage) {
        btn.setAttribute('disabled', '');
      } else {
        btn.removeAttribute('disabled');
      }
    });
  }
  // prev 按鈕狀態
  #btnPrevState(newPage) {
    const prev = document.querySelectorAll(`[t4-role="prev"][t4-control="${this.t.name}"]`);

    const isSinglePage = this.t.tabPanels.length === 1;
    const isFirstPage = newPage === 0;

    prev.forEach((btn) => {
      if (isSinglePage || isFirstPage) {
        btn.setAttribute('disabled', '');
      } else {
        btn.removeAttribute('disabled');
      }
    });
  }
  // 頁籤狀態
  #tabState(newPage, tabId) {
    if (this.t.tabGroup === "true") {
      this.t.tabs.forEach((tab, i) => {
        if (i == newPage) {
          tab.setAttribute('aria-selected', true)
        } else {
          tab.setAttribute('aria-selected', false)
        }
      })
    } else {
      // 自訂 id 的話...
      this.t.tabs.forEach((tab, i) => {
        if (tab.getAttribute('t4-id') === tabId) {
          tab.setAttribute('aria-selected', true)
        } else {
          tab.setAttribute('aria-selected', false)
        }
      })
    }
  }
  // 第三關各種元件判斷 及 執行
  #isTrue(fun, val, val2) {
    switch (fun) {
      case 'step':
        if (isElement(this.t.step)) {
          this.#step(val)
        }
        break
      case 'eventAnchor':
        if (this.t.anchor) {
          this.#eventAnchor()
        }
        break
      case 'tabState':
        // 流程沒有按鈕 客制的話....
        if (this.t.type == 'normal') {
          // 頁籤按鈕狀態
          this.#tabState(val, val2)
        }
        break
      case 'btnState':
        this.#btnNextState(val)
        this.#btnPrevState(val)
        break
      case 'tabUrl':
        if (this.t.recordUrl === 'true') {
          this.#addUrl(val)
        }
        break
      default:
        console.warn('請增加判斷，謝謝')
        break
    }
  }
  // 消失動畫
  #animationHide(index) {
    const { t } = this;
    const { duration, timing, delay } = this.t.transition;
    const tabPanel = t.tabPanels[index];
    // 動畫 消失 動畫 出現 搭配 settimeout 使用
    tabPanel.classList.add('hide');
    switch (t.display) {
      case 'fade':
        tabPanel.style.cssText = 'display: none; opacity: 0;';
        break;
      case 'slide':
        tabPanel.style.cssText = 'display: none; opacity: 0; max-height: unset;';
        break;
      case 'swiper':
        break;
      default:
        tabPanel.style.display = 'none';
        break;
    }
  }
  // 出現動畫
  #animationShow(index) {
    const { duration, timing, delay } = this.t.transition;
    const tabPanel = this.t.tabPanels[index];
    let timer;

    tabPanel.classList.remove('hide');
    tabPanel.style.transition = `opacity ${duration}ms ${timing} ${delay}ms`;
    tabPanel.style.display = 'block';

    switch (this.t.display) {
      case 'fade':
        tabPanel.style.opacity = '0';
        timer = setTimeout(() => {
          clearTimeout(timer);
          tabPanel.style.opacity = '1';
        }, 100);
        break;
      case 'slide':
        console.warn(this.t.display, '抱歉，好像壞掉了...');
        const clientHeight = tabPanel.offsetHeight;
        tabPanel.style.opacity = '1';
        tabPanel.style.maxHeight = '0';
        timer = setTimeout(() => {
          clearTimeout(timer);
          tabPanel.style.maxHeight = clientHeight + 'px';
        }, 100);
        break;
      case 'swiper':
        tabPanel.style.opacity = '1';
        const sWrapper = this.querySelector('.swiper-wrapper');
        const slideWidth = this.t.tabPanels[0].offsetWidth;
        const translateValue = -index * slideWidth;

        sWrapper.style.transition = `transform ${duration}ms ${timing} ${delay}ms`;
        sWrapper.style.transform = `translateX(${translateValue}px)`;
        break;
      default:
        console.warn(this.t.display, '沒有這個效果請自己想辦法!!!!');
        break;
    }
  }
  // 狀態
  #stateChange(tabId) {
    const newTabIndex = this.#getTabIndex(tabId)
    // 通知狀態改變 
    this.#isTrue("step", newTabIndex)
    this.#isTrue("btnState", newTabIndex)
    this.#isTrue("tabState", newTabIndex, tabId)
    this.#isTrue("tabUrl", tabId)
    // 觸發自定義事件
    this.emit('change')
  }
  //  ------------- 我是分隔線呦 -------------
  // 頁籤切換 
  tabClick(clickedTab) {
    const { t } = this;
    const newTabId = t.tabGroup === "true" ? String(t.tabs.indexOf(clickedTab)) : clickedTab.getAttribute('t4-id');

    // 通知頁籤切換
    this.setActiveTab(newTabId);

    // 錨點滑動動畫
    let timer
    clearTimeout(timer)
    timer = setTimeout(() => {
      this.#isTrue("eventAnchor")
    }, t.transition.duration);
  }
  // 外部呼叫方法 $0.setActiveTab(0)
  setActiveTab(id) {
    const { t } = this;
    const defaultID = id === '' ? t.tabPanels[0].getAttribute('t4-id') : id;
    t.activeTab = defaultID;
    this.setAttribute('t4-active', defaultID);

    const newTabIndex = this.#getTabIndex(defaultID);

    t.tabPanels.forEach((panel, i) => {
      i === newTabIndex ? this.#animationShow(i) : this.#animationHide(i);
    });
  }
  // 外部呼叫方法 $0.goNext()
  goNext() {
    const tabIndex = this.#getTabIndex(this.t.activeTab)
    const nextPage = Math.min(this.t.tabPanels.length - 1, tabIndex + 1);
    const nextPageId = this.t.tabPanels[nextPage].getAttribute('t4-id')
    this.setActiveTab(nextPageId)
  }
  // 外部呼叫方法 $0.goPrev()
  goPrev() {
    const tabIndex = this.#getTabIndex(this.t.activeTab)
    const prevPage = Math.max(0, tabIndex - 1);
    const prevPageId = this.t.tabPanels[prevPage].getAttribute('t4-id')
    this.setActiveTab(prevPageId)
  }
}

// 綁定點擊事件
function changeEvent() {
  const targetElements = document.querySelectorAll('[t4-control]');

  document.addEventListener('click', function (event) {
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
      const role = tabControl.getAttribute('t4-role')
      tabEls.forEach(el => {
        switch (role) {
          case 'tab':
            el.tabClick(tabControl)
            break
          case 'next':
            el.goNext(tabControl)
            break
          case 'prev':
            el.goPrev(tabControl)
            break
          default:
            console.warn('你是誰？？', tabControl);
            break
        }
      })
    }
  });
}
changeEvent()

Object.assign(Tab4.prototype, SHARED)

if (!customElements.get('tab-el')) {
  customElements.define('tab-el', Tab4)
}

export default Tab4
