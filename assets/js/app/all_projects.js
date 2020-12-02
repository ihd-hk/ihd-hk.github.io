requirejs(['jquery', 'select2'], function ($, Shuffle, select2, _) {
  'use strict';

  var $selects = $('#all_projects_filters select');
  var $rows = $('#all_projects_grid tbody tr');
  var $noResultsRow = $('#no-results');
  console.log($noResultsRow);

  $selects.select2({
    allowClear: true,
    theme: 'bootstrap4'
  });

  var updateTable = function(e) {
    var filters = [];
    $selects.each(function(i, el) {
      var d = $(el).select2('data');
      if (el.dataset.filterTarget == 'location') {
        // @TODO!
        if (d[0].selected && d[0].id !== '') {
          filters.push({ filter: 'country', value: d[0].id });
        }
      }
      else {
        if (d[0].selected && d[0].id !== '') {
          filters.push({ filter: el.dataset.filterTarget, value: d[0].id });
        }
      }
    });

    var count = 0;
    $rows.each(function(i, el) {
      var show = filters.reduce(function(show, f) {
        if (show) {
          if (el.dataset[f.filter] && el.dataset[f.filter].indexOf(f.value) !== -1) {
            return true
          }
        }
        return false;
      }, true);

      if (show) {
        el.classList.remove("d-none");
        count++;
      } else {
        el.classList.add("d-none");
      }
    });

    if (count > 0) {
      $noResultsRow.addClass('d-none');
    } else {
      $noResultsRow.removeClass('d-none');
    }
  };

  $selects.on('change.select2', updateTable);
});
