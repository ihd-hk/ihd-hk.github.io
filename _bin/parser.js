#!/usr/bin/env node

var XLSX = require('xlsx'),
    fs = require('fs'),
    _ = require('underscore'),
    glob = require('glob');


var args = process.argv.slice(2);
var inFile = args[0];
var outFile = args[1];

console.log('input: ' + inFile);
console.log('output: ' + outFile);

var workbook = XLSX.readFile(inFile);
var worksheet = workbook.Sheets.WEBSITE;



data = {
  items: XLSX.utils.sheet_to_json(worksheet, { header: ['nda', 'project', 'date', 'title_en', 'title_ch', 'disciplines', 'codes', 'city_en', 'city_ch', 'country_en', 'country_ch', 'hotel_en', 'hotel_ch', 'desc_en', 'desc_ch'], range: 6 }),
  disciplines: [
    { key: 'A', en: 'Audio-Visual', ch: '视听' },
    { key: 'C', en: 'Acoustics', ch: '声学' },
    { key: 'E', en: 'ELV', ch: '弱电' },
    { key: 'I', en: 'IT/Communications', ch: '信息科技/通讯' },
    { key: 'P', en: 'Public Address', ch: '公共广播' },
    { key: 'S', en: 'Security', ch: '安防' },
    { key: 'T', en: 'PABX/Tel', ch: '公共广播系统/通讯' },
    { key: 'F', en: 'Future #1', ch: '未来#1' },
    { key: 'Y', en: 'Future #2', ch: '未来#2' },
  ],
  codes: [
    { key: 'H', en: 'Hotel', ch: '酒店' },
    { key: 'C', en: 'Casino', ch: '赌场' },
    { key: 'M', en: 'Mall/Retail', ch: '商店' },
    { key: 'O', en: 'Office', ch: '办公室' },
    { key: 'R', en: 'Residential', ch: '住宅' },
    { key: 'Z', en: 'Mixed-Use Deveopment', ch: '综合发展' },
    { key: 'Ú', en: 'Auditorium', ch: '礼堂' },
    { key: 'B', en: 'Bar', ch: '酒吧' },
    { key: 'N', en: 'Cinema', ch: '电影院' },
    { key: 'U', en: 'Club', ch: '会所' },
    { key: 'Y', en: 'Community Centre', ch: '社区中心' },
    { key: 'I', en: 'Corporate/Investment Banking', ch: '企业/投资银行' },
    { key: 'E', en: 'Education', ch: '教学' },
    { key: 'X', en: 'Exhibition Gallery', ch: '展馆' },
    { key: 'D', en: 'Fine Dining/Restaurant', ch: '美食/餐厅' },
    { key: 'L', en: 'Healthcare', ch: '卫生保健' },
    { key: 'S', en: 'Museum/Visitors Centre/Show-Suite', ch: '博物馆/旅客中心/展览会埸' },
    { key: 'T', en: 'Theme Park', ch: '乐园' },
    { key: 'V', en: 'Villa', ch: '别墅' },
    { key: 'W', en: 'Worship', ch: '崇拜仪式会堂' },
  ],
  countries: [],
};

data.items = data.items.filter(function(item) {
  return (item.project !== "0") && !!(item.project) && (item.nda !== 'Y') && (item.title_en !== "0");
}).sort(function(a, b) {
  return (a.title_en > b.title_en) ? 1 : ((b.title_en > a.title_en) ? -1 : 0);
});

var countriesDone = [];
data.items.forEach(function(item, index, items) {
  if (countriesDone.indexOf(item.country_en) === -1) {
    countriesDone.push(item.country_en);
    data.countries.push({
      key: item.country_en,
      en: item.country_en,
      ch: item.country_ch,
    });
  }
  items[index].files = glob.sync(item.project + '-*.jpg', {cwd: 'images/portfolio', nocase: true});
});


fs.writeFileSync(outFile, JSON.stringify(data, null, 2), 'utf-8');
