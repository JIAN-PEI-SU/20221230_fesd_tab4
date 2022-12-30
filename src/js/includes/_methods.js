export const methods = {
  // iOS 回上一頁空白修正
  appleDebug() {
    window.onpageshow = function (event) {
      if (event.persisted) {
        window.location.reload();
      }
    };
  },

  detectMacOSVersion() {
    const userAgent = navigator.userAgent;
    return {
      BigSurUP:
        /Mac OS X 10.15/.test(userAgent) ||
        /Mac OS X 10_15_7/.test(userAgent) ||
        /Mac OS X 10_15_8/.test(userAgent) ||
        /Mac OS X 10_15_9/.test(userAgent) ||
        /Mac OS X 11_/.test(userAgent) ||
        /Mac OS X 12_/.test(userAgent),
    };
  },

  // 點擊開關class
  // clickToggleClass(點擊目標,加上cls名稱)
  clickToggleClass(target, className) {
    $(target).on('click', function () {
      $(this).toggleClass(className);
    });
  },

  // 點擊切換active
  // clickSwitchClass(點擊目標,加上cls名稱)
  clickSwitchClass(target, className) {
    $(target).on('click', function () {
      $(target).not(this).removeClass(className);
      $(this).addClass(className);
    });
  },

  // 倒數計時
  // 搭配以下結構使用
  // .countdown(data-seconds="600")  data-seconds 填入欲倒數秒數
  // clearInterval(_g.interval[?]) 可以暫停
  countDown() {
    window._g.interval = [];
    const countdowns = $('.countdown');
    countdowns.each((i, el) => {
      const set_seconds = Number($(el).attr('data-seconds')) + 1;
      let set_time = Math.floor(set_seconds / 60) + ':' + (set_seconds % 60);
      window._g.interval[i] = setInterval(function () {
        var timer = set_time.split(':');
        var minutes = parseInt(timer[0], 10);
        var seconds = parseInt(timer[1], 10);
        --seconds;
        minutes = seconds < 0 ? --minutes : minutes;
        minutes = minutes < 10 ? (minutes = '0' + minutes) : minutes;
        if (minutes == 0 && seconds == 0) clearInterval(window._g.interval[i]);
        seconds = seconds < 0 ? 59 : seconds;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        $(el).html(minutes + ':' + seconds);
        set_time = minutes + ':' + seconds;
      }, 1000);
    });
  },

  // 計算手機100vh
  fixMobile100vh() {
    const init = function () {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', vh + 'px');
    };
    init();
    $(window).on('resize', function () {
      init();
    });
  },

  // 文字切割
  // target(String) => 目標物件('.xxx')
  // isWrap => 是否要每個單字再包一層
  // delayStartTime(Number) => 第一個的延遲時間(若為'random'則隨機)
  // delaySpace(Number) => 每一個字元延遲的間隔時間
  // randomTransTime => 隨機transition Max time
  wordAnimation(target, isWrap, delayStartTime, delaySpace, randomTransTime) {
    const word = $(target).html();
    const removeBr = word.split('<br>');
    let newText = '';
    let index = 0;
    removeBr.forEach((words, s) => {
      if (s !== 0) newText += `<br>`;
      const letters = words.split('');
      letters.forEach((letter, i) => {
        if (isWrap) {
          if (i === 0) newText += `<span class="letter-wrap" style="display: inline-block">`;
          if (letter === ' ')
            newText += '</span> <span class="letter-wrap" style="display: inline-block">';
          else {
            newText += `<span class="letter"${
              randomTransTime || delayStartTime
                ? ` style="${
                    randomTransTime
                      ? `transition: ${methods.formatFloat(Math.random(), 2) * randomTransTime}s;`
                      : ''
                  }${
                    delayStartTime
                      ? delayStartTime === 'random'
                        ? `transition-delay: ${methods.formatFloat(Math.random(), 2)}s;`
                        : `transition-delay: ${delayStartTime + index * delaySpace}s;`
                      : ''
                  }"`
                : ''
            }>${letter}</span>`;
            index++;
          }
          if (i === words.length - 1) newText += `</span>`;
        } else {
          if (letter === ' ') newText += ' ';
          else {
            newText += `<span class="letter"${
              randomTransTime || delayStartTime
                ? ` style="${
                    randomTransTime
                      ? `transition: ${methods.formatFloat(Math.random(), 2) * randomTransTime}s;`
                      : ''
                  }${
                    delayStartTime
                      ? delayStartTime === 'random'
                        ? `transition-delay: ${methods.formatFloat(Math.random(), 2)}s;`
                        : `transition-delay: ${delayStartTime + index * delaySpace}s;`
                      : ''
                  }"`
                : ''
            }>${letter}</span>`;
            index++;
          }
        }
      });
    });
    $(target).html(newText);
  },

  // 小數點後第N位四捨五入
  formatFloat(num, pos) {
    var size = Math.pow(10, pos);
    return Math.round(num * size) / size;
  },

  // 抓SliderIndex
  getSlideDataIndex(swiper) {
    let activeIndex = swiper.activeIndex;
    let slidesLen = swiper.slides.length;
    if (swiper.params.loop) {
      switch (swiper.activeIndex) {
        case 0:
          activeIndex = slidesLen - 3;
          break;
        case slidesLen - 1:
          activeIndex = 0;
          break;
        default:
          --activeIndex;
      }
    }
    return activeIndex;
  },

  // 判斷Swiper輪播數量
  getSlidesCount(swiper, disableNum) {
    const container = swiper.$el;
    const gridRows = swiper.params.grid.rows;
    const disableCount = disableNum ? disableNum : swiper.params.slidesPerView * gridRows;
    const slidesCount = () => {
      if (swiper.loopedSlides) return swiper.slides.length - swiper.loopedSlides * 2;
      else return swiper.slides.length;
    };
    if (slidesCount() <= disableCount) {
      container.addClass('swiper-no-swiping');
      $(swiper.params.navigation.nextEl).hide();
      $(swiper.params.navigation.prevEl).hide();
      $(swiper.params.pagination.el).hide();
      swiper.params.autoplay.enabled = false;
      swiper.autoplay.stop();
    } else {
      container.removeClass('swiper-no-swiping');
      $(swiper.params.navigation.nextEl).show();
      $(swiper.params.navigation.prevEl).show();
      $(swiper.params.pagination.el).show();
      if (swiper.params.autoplay.enabled) {
        swiper.autoplay.start();
      }
    }
  },

  // 判斷當前輪播是否為影片
  isVideo(swiper) {
    const container = swiper.$el;
    const activeSlide = container.find('.swiper-slide-active');
    const video = $(activeSlide).find('video').get(0);
    const allVideo = container.find('.swiper-slide video');
    swiper.autoplay.stop();
    $(video).off('ended');
    if (video) {
      allVideo.forEach((el) => {
        el.currentTime = 0;
      });
      $(video).on('ended', function () {
        swiper.slideNext();
      });
      video.play();
    } else {
      if (swiper.params.autoplay.enabled) {
        swiper.autoplay.start();
      }
    }
  },

  // 要用之前記得引用 common/layouts/_growAnimate.sass
  // 數字從0跑到9
  // 結構 <div class="number-grow" data-num="12345"></div>
  numberGrow() {
    $('.number-grow').each(function (index, el) {
      const ele = $(el);
      const num = ele.attr('data-num');
      const comma = num.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
      const splitNum = comma.split('');
      const zeroToNine = () => {
        let text = '';
        for (var i = 0; i <= 9; i++) {
          text += String(i) + '<br>';
        }
        return text;
      };
      $(splitNum).each(function (i, el) {
        const dom = () => {
          if (el !== ',')
            return `<div class="num" data-final-num="${el}"><div><br>${zeroToNine()}<br>${zeroToNine()}</div></div>`;
          else return `<div class="comma">${el}</div>`;
        };
        ele.append(dom);
      });
    });
  },

  // 英文從A跑到Z(只能大寫)
  // 結構 <div class="letter-grow" data-num="ABCDE"></div>
  letterGrow() {
    $('.letter-grow').each(function (index, el) {
      const ele = $(el);
      const letter = ele.attr('data-letter');
      const splitLetter = letter.split('');
      const a_z = [];
      const aToZ = () => {
        let text = '';
        for (let i = 65; i <= 90; i++) {
          a_z.push(String.fromCharCode(i));
          text += String.fromCharCode(i) + '<br>';
        }
        return text;
      };
      $(splitLetter).each(function (i, el) {
        const dom = `<div class="letter" data-final-letter="${el}"><div><br>${aToZ()}<br>${aToZ()}</div></div>`;
        ele.append(dom);
      });
    });
  },

  // 取得 target 的 transformX
  getTransformX(target) {
    const transform = getComputedStyle(target).transform;
    let mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) return parseFloat(mat[1].split(', ')[12]);
    mat = transform.match(/^matrix\((.+)\)$/);
    return mat ? parseFloat(mat[1].split(', ')[4]) : 0;
  },

  // 取得 target 的 transformY
  getTransformY(target) {
    const transform = getComputedStyle(target).transform;
    let mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) return parseFloat(mat[1].split(', ')[13]);
    mat = transform.match(/^matrix\((.+)\)$/);
    return mat ? parseFloat(mat[1].split(', ')[5]) : 0;
  },
};
