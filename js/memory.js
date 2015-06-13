'use strict';
/*Initiate AppMemory*/
var appmemory = new SR.AppMemory();
	appmemory.save('list',[
		'AAPL/assets',
		'ARI/assets',
		'Z/assets',
		'GOOG/netincome',
		'AA/epsbase',
		'AA/goodwill',
		'A/goodwill',
		'TSLA/goodwill',
		'TSLA/netincome',
		'AAPL/netincome',
		]).then(function () {});
/*Variables*/
var lists = {
	id: {},
	ticker: {},
	ticks: {},
	types: {}
}
/**
 * Add values to the memo-list
 * @param {String} item 
 */
function addToList (item) {
	$('table')[0].list.push(item);
	return appmemory.save('list', $('table').list)
}
/**
 * Load the data from SR backend
 * @param  {String} ticker 
 * @param  {String} type   
 * @return {Promise}        
 */
function loadData(ticker, type) {
	return new Promise(function (res, rej) {
		SR.AppData.v1.direct.GET(ticker, type, {from:"2013-01-01"}).then(function(data){
			console.log('\n>',ticker, type,data);
			res(((data&&data.response&&data.response.data.length > 0)?data.response.data[0][1]:'NA'));
		})	
	})
}