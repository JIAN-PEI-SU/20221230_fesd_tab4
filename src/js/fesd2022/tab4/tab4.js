class Tab4 extends HTMLElement {
  constructor() {
    super()
  }
  static get observedAttributes() {
    return []
  }

  // 頁籤切換 data-change-parent
  pageChange(parentBox) {
    let parent = $(parentBox)
    let all_id = parent.find('[data-change-id]')
    let now_id = parent.find('[data-change-id].active').attr('data-change-id')
    parent.find(`[data-change-page=${now_id}]`).addClass('active')
    parent.find(`[data-change-page=${now_id}]`).siblings().css('display', 'none')
    // 點擊
    all_id.on('click.pageChange', function () {
      const $this = $(this)
      let now_id = $this.attr('data-change-id')
      let now_page = $(`[data-change-page = ${now_id}]`)
      now_page.siblings().removeClass('active').hide()
      now_page.addClass('active').fadeIn(400)
      $this.siblings().removeClass('active')
      $this.addClass('active')
    })
  }

  // 頁籤直接呼叫 123456
  pageStep(page) {
    let target_page = $(`[data-change-page = ${page}]`)
    let target_id = $(`[data-change-id = ${page}]`)
    let target_step = $(`[data-change-step = ${page}]`)
    target_page.siblings().removeClass('active').hide()
    target_page.addClass('active').fadeIn(400)
    target_id.siblings().removeClass('active')
    target_id.addClass('active')
    target_step.siblings().removeClass('active')
    target_step.prevAll().addClass('active')
    target_step.addClass('active')
  }

  // 步驟切換
  pageControl(state) {}

  // callback
}

// define custom element
if (!customElements.get('tab-box')) {
  customElements.define('tab-box', Tab4)
}

export default Tab4
