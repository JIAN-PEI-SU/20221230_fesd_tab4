const eventHandler = {}

eventHandler.lightBoxListener = function () {
  $('.lightbox-btn').on('click', function () {
    eventHandler.lightBox()
  })
}

eventHandler.lightBox = function () {
  Modal4.open({
    target: 'ajax-modal',
    route: './ajax.html',
    on: {
      open() {
        _g.scrollLock()
        const aost4 = new Aost4('[data-aost]', {
          scroll: '.os-viewport',
        })
        const anchors = new Anchor4('[data-anchor-target]')

        let removeIng
        clearTimeout(removeIng)
        removeIng = setTimeout(() => {
          Anchor4.run({
            target: '.ajax-se2',
            container: '.scroll',
            speed: 1000,
            gap: '200',
            on: {
              afterScroll() {
                alert('Finish!!!!')
              },
            },
          })
        }, 500)
      },
      close(modal) {
        modal.destroy()
        _g.scrollUnlock()
      },
    },
  })
}

eventHandler.dropdown = function () {
  const dropdownEl = document.querySelector('dropdown-el')
  dropdownEl.on('change', function () {
    console.log('change!!')
  })
}

eventHandler.all = function () {
  this.lightBoxListener()
  this.dropdown()
}

$(() => {
  eventHandler.all()
  _g.imagePreview('.pic-box .btn')
  //   _g.categorySlider('.category .category-slider', { breakpoint: 1200 })
  _g.categorySlider('.category .category-slider')
})

// Modal4.defineMethods({
//     useOpen(modal) {
//         console.log('open!!!')

//         // _g.ajaxUpdate()
//         const aost4 = new Aost4('[data-aost]')
//         // aost4.update()

//         // const anchors = new Anchor4('[data-anchor-target]')
//         // anchors.update()

//         Anchor4.run({
//             target: '.ajax-se2',
//             container: '.scroll',
//             speed: 1000,
//             gap: '200',
//             on: {
//                 afterScroll() {
//                     alert('Finish!!!!')
//                 },
//             },
//         })
//     },
// })
