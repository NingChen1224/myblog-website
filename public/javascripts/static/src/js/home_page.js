$(function(){
	function initLeftBar(){
		var $_window = $(window),
			_height = $_window.height();
		$('.nav-leftbar').height(_height - 100);
	}
	initLeftBar();
});