'use strict';
$(document).ready(function(){
	/*Hide extras*/
	$('#addToTable').hide();
	$('.alert-success').hide();
	$('.alert-danger').hide();
	/*Load Idlist*/
	SR.AppData.v1.idlist.GET('j').then(function (idlist) {
		/*Load Tickerlist*/
		SR.AppData.v1.Tickerlist.GET('j').then(function (tickerlist) {
			/*Analyze idlist*/
			idlist.response.map(function (val) {
				lists.dt[val.dataset.split('/')[0]] = lists.dt[val.dataset.split('/')[0]]||{};
				lists.dt[val.dataset.split('/')[0]][val.dataset.split('/')[1]] = lists.dt[val.dataset.split('/')[0]][val.dataset.split('/')[1]]||[];
				lists.dt[val.dataset.split('/')[0]][val.dataset.split('/')[1]].push(val);
				lists.id[val.type] = {
					name		: val.name,
					description	: val.description
				};
				lists.types[(val.name!=="NA"?val.name:val.type)] = val.type;
			});
			/*Analyze tickerlist*/
			tickerlist.response.map(function (val) {
				lists.ticker[val.ticker] = {
					name		: val.name || val.ticker,
					description	: val.description,
					industry 	: val.industry,
					sector		: val.sector
				};
				lists.ticks[val.ticker+'/'+(val.name || val.ticker)] = val.ticker;
			});
			/*Load dropdown*/
			loadDropdown();
			/*load table*/
			loadTable();
			/*Initiate table*/
			thInit();
			/*Disable loading...*/
			$('.loading').css({width:0,opacity:0});
		});
	});
	/*Add to function*/
	$('#addToTable')[0].onclick = function(){ 
		var dataset = $('#sel-dataset')[0].secret.split('.');
		if(lists.ticks[$('#ticker').val()])	{
			addToTable(
				lists.ticks[$('#ticker').val()] + '/' +
				dataset[1]
				); 
		}	else	{
			alert('Wrong input!');
		}
	}
});
