requirejs(['jquery', 'shuffle', 'select2', 'underscore'], function ($, Shuffle, select2, _) {
  'use strict';
  var $list = $('#porfolio_grid'),
      $locationFilter = $('#portfolio_filters select[name="location"]'),
      $disciplineFilter = $('#portfolio_filters select[name="discipline"]'),
      $typeFilter = $('#portfolio_filters select[name="type"]'),
      $search = $('#portfolio_filters input[name="search"]');

  var filterData = {
    locations: {},
    disciplines: {},
    types: {},
  };

  $list.find('.project').each(function(i, el) {
    ['locations', 'disciplines', 'types'].forEach(function(facet) {
      el.dataset[facet].split(',').forEach(function(value) {
        if (filterData[facet][value] === undefined) {
          filterData[facet][value] = { id: value, text: value }
        }
      })
    })
  });

  $locationFilter.select2({
    data: Object.values(filterData.locations).sort(function(a, b) { return a.text > b.text }),
    placeholder: 'All Countries',
    minimumResultsForSearch: Infinity,
    theme: 'bootstrap4'
  });

  $disciplineFilter.select2({
    data: Object.values(filterData.disciplines).sort(function(a, b) { return a.text > b.text }),
    placeholder: 'All Disciplines',
    minimumResultsForSearch: Infinity,
    theme: 'bootstrap4'
  });
  $typeFilter.select2({
    data: Object.values(filterData.types).sort(function(a, b) { return a.text > b.text }),
    placeholder: 'All Types',
    minimumResultsForSearch: Infinity,
    theme: 'bootstrap4'
  });

  var shuffle = new Shuffle($list[0], {
    itemSelector: '.project'
  });


  var updateFilter = function() {
    var selectedLocations = [],
        selectedDisciplines = [],
        selectedTypes = [],
        searchText = $search.val().toLocaleLowerCase();

    var v;
    if (!!(v = $locationFilter.val()) && (v !== '-1')) {
      selectedLocations.push(v);
    }
    if (!!(v = $disciplineFilter.val()) && (v !== '-1')) {
      selectedDisciplines.push(v);
    }
    if (!!(v = $typeFilter.val()) && (v !== '-1')) {
      selectedTypes.push(v);
    }

    if (searchText.length + selectedLocations.length + selectedDisciplines.length + selectedTypes.length > 0 ) {
      shuffle.filter(function(el) {
        return (searchText.length   === 0    || el.dataset['titleEn'].toLocaleLowerCase().indexOf(searchText) !== -1   ||   el.dataset['titleCh'].toLocaleLowerCase().indexOf(searchText) !== -1) &&
               (selectedLocations   === null ||  _.intersection(el.dataset['locations'  ].split(','), selectedLocations  ).length === selectedLocations.length) &&
               (selectedDisciplines === null ||  _.intersection(el.dataset['disciplines'].split(','), selectedDisciplines).length === selectedDisciplines.length) &&
               (selectedTypes       === null ||  _.intersection(el.dataset['types'      ].split(','), selectedTypes      ).length === selectedTypes.length);
      });
    }
    else {
      shuffle.filter(Shuffle.ALL_ITEMS);
    }
  };

  $('#portfolio_filters').on('change', 'select', updateFilter);
  $search.on('change keyup', updateFilter);
});
