'use strict';
$(document).ready(function(){
	/*Load Idlist*/
	SR.AppData.v1.idlist.GET('j').then(function (idlist) {
		SR.AppData.v1.Tickerlist.GET('j').then(function (tickerlist) {
			idlist.response.map(function (val) {
				lists.id[val.type] = {
					name		: val.name,
					description	: val.description
				};
				lists.types[(val.name!=="NA"?val.name:val.type)] = val.type;
			});
			tickerlist.response.map(function (val) {
				lists.ticker[val.ticker] = {
					name		: val.name || val.ticker,
					description	: val.description,
					industry 	: val.industry,
					sector		: val.sector
				};
				lists.ticks[val.ticker+'/'+(val.name || val.ticker)] = val.ticker;
			});
			loadTable();
			thInit();
			$('.loading').css({width:0,opacity:0});
		});
	});
	/*Add to function*/
	$('#addToTable')[0].onclick = function(){ 
		if(lists.ticks[$('#ticker').val()] && lists.types[$('#type').val()])	{
			addToTable(
				lists.ticks[$('#ticker').val()] + '/' +
				lists.types[$('#type').val()]
				); 
		}	else	{
			alert('Wrong input!');
		}
	}
});
