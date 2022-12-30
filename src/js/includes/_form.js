// flatpickr
import flatpickr from 'flatpickr';
import 'flatpickr/dist/l10n/zh.js';

// 卷軸
import OverlayScrollbars from 'overlayscrollbars';
export const form = {
  // 日曆
  datepicker() {
    flatpickr('.datepicker-input', {
      locale: 'zh',
    });
    flatpickr('.timepicker-input', {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      time_24hr: true,
    });
  },
  // 更換檔名
  updateFiles() {
    $('.wdd-form .file-wrap input[type="file"]')
      .off('change.fileChange')
      .on('change.fileChange', function (e) {
        if (e.target.files.length <= 0) return;
        const fileInput = $(this);
        const fakeUploadWrap = fileInput.siblings('.fake-file-upload');
        const defaultText = fakeUploadWrap.attr('data-default');
        const $fileName = fakeUploadWrap.find('.file-name');
        const fileLimit = Number(fileInput.attr('data-limit'));
        const file = e.target.files[0];
        const fileSize = file.size / 1024 / 1024;
        const originalName = file.name;
        if (fileSize > fileLimit) {
          //超過檔案大小限制
          fileInput.parents('.form-group').removeClass('is-upload').addClass('over-limit');
          $fileName.text(defaultText);
        } else {
          //符合檔案大小限制
          fileInput.parents('.form-group').addClass('is-upload').removeClass('over-limit');
          $fileName.text(originalName);
          const fileInputTemp = fileInput.clone();
          fileInputTemp.removeAttr('form-field field-type data-limit');
          fakeUploadWrap.find('input[type="file"]').remove();
          fakeUploadWrap.append(fileInputTemp);
        }
      });
  },
  textareaBindScrollbar() {
    const scroller = document.querySelector('textarea.textarea-scrollbar');
    OverlayScrollbars(scroller, {});
  },
  // 清除全部選項
  clear() {
    $('.form-clear')
      .off('click.clear')
      .on('click.clear', function () {
        const form = $(this).parents('.wdd-form');
        const input = form.find('input');
        const textarea = form.find('textarea');
        const checkbox = form.find('input[type="checkbox"]');
        const fileUpload = form.find('fake-file-upload');
        const dropdown = form.find('dropdown-el');
        input.val('');
        textarea.val('');
        checkbox.prop('checked', false);
        fileUpload.each((index, el) => {
          let defaultText = $(el).attr('data-default');
          $(el).find('.file-name').removeClass('is-upload').text(defaultText);
        });
        dropdown.attr('d4-selected', '');
        form.find('dropdown-el[control-elements]').each((index, el) => {
          const disabledEl = [...$(el).attr('control-elements').split(',')];
          $(disabledEl).each((index, el) => {
            $(el).addClass('disabled');
          });
        });
      });
  },
  all() {
    form.datepicker();
    form.updateFiles();
    form.textareaBindScrollbar();
    form.clear();
  },
};
