requirejs(['jquery', 'bootstrap/util', 'bootstrap/modal'], function ($, Util, bsModal) {
  'use strict';

  $('#portfolio_description_modal').on('show.bs.modal', function (event) {
    console.log(event);
    var button = $(event.relatedTarget) // Button that triggered the modal
    var modal = $(this)
    modal.find('.modal-title').text(button.data('title'));
    modal.find('.modal-body').text(button.data('body'))
  })
});
