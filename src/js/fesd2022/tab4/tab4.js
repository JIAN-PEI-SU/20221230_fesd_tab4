//tab4

// [data-change-parent] 外層
// [data-change-btn]  控制按鈕
// [data-change-id]  頁籤按鈕
// [data-change-page]  本人

const tabEvent = {
  // 頁籤切換 data-change-parent
  pageChange: function (parentBox) {
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
  },

  // 頁籤直接呼叫 123456
  pageStep: function (page) {
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
  },

  // 步驟切換
  pageControl: function (state) {},

  // callback
}

// 使用
tabEvent.pageChange('[data-change-parent]')

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

// 第三版
class Tab4 {
  constructor(type) {
    this.type = type
  }
}
// new Tab4('step')
// new Tab4('next')
