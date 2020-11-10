#!/usr/bin/env node

const fetch = require('node-fetch'),
      fs = require('fs'),
      neatCsv = require('neat-csv');

const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTBE580s_uVwLbxBc00K5cXkvNJu-mHBQXMr_N0ZIDj1rhgDRUFalQ2WjKvtlHqmAZXQQrzstzzwMKu/pub?gid=1750717702&single=true&output=csv';

(async () => {

  const response = await fetch(csvUrl);
  const responseText = await response.text();

  const data = await neatCsv(responseText, {
    skipLines: 8,
    headers: [
      'ref_row',
      '_', // Empty columns
      '_',
      '_',
      'project_number',
      'award_date',
      'name_en',
      'name_ch',
      'disciplines',
      'codes',
      'city_en',
      'city_ch',
      'country_en',
      'country_ch',
      'hotel_name_en',
      'hotel_name_ch',
      '_', // Description EN (both are empty)
      '_', // Description CH
    ]
  });

  const cleaned = data.reduce((acc, v) => {
    // Skip rows with invalid project numbers.
    if (v['project_number'] == '0' || v['project_number'] == 'z') {
      return acc;
    }
    // Get rid of empty column
    delete v['_'];
    Object.keys(v).forEach(k => {
      if (v[k] == '0') {
        v[k] = '';
      }
      v[k] = v[k].trim();
    });

    // Convert these keys into nested translation hashes.
    ['name', 'country', 'city', 'hotel_name'].forEach(k => {
      v[k] = {
        en: v[k + '_en'],
        ch: v[k + '_ch']
      };
      delete v[k + '_en']
      delete v[k + '_ch']
    });

    acc.push(v);
    return acc;
  }, []);

  // console.log(JSON.stringify(cleaned, null, 4));

  fs.writeFileSync('../_data/full_projects.json', JSON.stringify(cleaned), 'utf-8');

})();
