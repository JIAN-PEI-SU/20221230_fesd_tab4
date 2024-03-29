export default {
  SETTINGS: {
    // 樣式 normal / process
    type: 'normal',
    // 進場方式 fade / slide
    display: 'fade',
    // 預設頁面
    defaultPage: '',
    // 滑動扣除高度
    anchorGap: 0,
    tabGroup: 'true',
    recordUrl: 'false',
    // 動畫設定
    transition: {
      duration: 300,
      timing: 'ease',
      delay: 0,
    },
    // 步驟狀態綁定
    stepOutput: '.step-show',
  },
}
