$(document).ready(function() {
	$.getJSON('info.json', function(json, textStatus) {
		$("img").attr('hre', 'value');
		console.log(json);
	});
});