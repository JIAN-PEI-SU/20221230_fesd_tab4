export default {
  SETTINGS: {
    // 樣式 normal / process
    type: 'normal',
    // 進場方式 fade / slide
    display: 'fade',
    // 預設頁面
    defaultPage: 0,
    // 'true' / 'false'
    anchor: {
      anchor: 'true',
      role: '.tab-title',
    },
    // 動畫設定
    transition: {
      duration: '1000ms',
      function: 'ease',
      delay: '0s',
    },
    // 按鈕綁定
    // stepBtn: {
    //   prev: '.btn_prev',
    //   next: '.btn_next',
    // },
    // 步驟狀態綁定
    stepOutput: '.step-show',
  },
}
