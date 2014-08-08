$(document).ready(function () {

	var x = 'x',
		o = 'o',
		count = 0,
		x_win = 0,
		o_win = 0,
		users = {
			x_name: "X-Anonym",
			o_name: "O-Anonym"
		};

	$('div>a.btn-start').click(function (){
		users.x_name = prompt('The X-player name');
		users.o_name = prompt('The O-player name');

		if (!users.x_name) {
			users.x_name = "X-Anonym";
		}
		if (!users.o_name) {
			users.o_name = "O-Anonym";
		}

		$('.win-times').css('width', '41px');

		$('#under-x-name').prepend('<span id="x-name" class="add-on user-name"></span>');
		$('#under-y-name').prepend('<span id="o-name" class="add-on user-name"></span>');

		$('.win-text').css('width', '37px');
		$('.user-name').css('width','65px');

		$('#x-name').text(users.x_name);
		$('#o-name').text(users.o_name);
		$('#reset').text('Restart game');
	});

	$('#game li').click(function (){

		if (checkClass(x)) {
			alert(users.x_name + ' has won the game. Wanna start a new game?');
			handlerClassRemover();

		} else if (checkClass(o)) {
			alert(users.o_name + ' has won the game. Wanna start a new game?');
			handlerClassRemover();

		} else if (count === 9) {
			alert('Its a tie. Restart is coming');
			handlerClassRemover();
			count = 0;

		} else if ($(this).hasClass('disable')) {
			alert('Already selected. You should choose the another one');

		} else if (count%2 === 0) {
			count += 1;
			$(this).text(x);
			$(this).addClass('disable x btn-primary');
				if (checkClass(x)) {
					alert(users.x_name + ' has won the game.');
					localSave(users.x_name, x_win);
					count = 0;
					x_win += 1;
					$('#x-win').text(x_win);
				}

		} else {
			count += 1;
			$(this).text(o);
			$(this).addClass('disable o btn-info');
				if (checkClass(o)) {
					alert(users.o_name + ' has won the game.');
					localSave(users.o_name, o_win);
					count = 0;
					o_win += 1;
					$('#o-win').text(o_win);
				}
		}
	});

	$('#reset').click(function () {
		handlerClassRemover();
		count = 0;
	});

	$('#clean').click(function() {
		window.localStorage.clear();
		$('#x-win').text(x_win);
		$('#o-win').text(o_win);
		window.location.reload();
		return false;
	});

	function checkClass(param) {
		return	$('#one').hasClass(param) && $('#two').hasClass(param) && $('#three').hasClass(param) ||
			$('#four').hasClass(param) && $('#five').hasClass(param) && $('#six').hasClass(param) ||
			$('#seven').hasClass(param) && $('#eight').hasClass(param) && $('#nine').hasClass(param) ||
			$('#one').hasClass(param) && $('#four').hasClass(param) && $('#seven').hasClass(param) ||
			$('#two').hasClass(param) && $('#five').hasClass(param) && $('#eight').hasClass(param) ||
			$('#three').hasClass(param) && $('#six').hasClass(param) && $('#nine').hasClass(param) ||
			$('#one').hasClass(param) && $('#five').hasClass(param) && $('#nine').hasClass(param) ||
			$('#three').hasClass(param) && $('#five').hasClass(param) && $('#seven').hasClass(param);
	}
	function localSave(name, value) {
		value += 1;
		try {
			window.localStorage.setItem(name, value);
		} catch (e) {
			if (e === QUOTA_EXCEEDED_ERR) {
				alert('Oops... Your Web Storage is full! You should press CLEAN SCORE button to clean it');
			}
		}
	}
	function handlerClassRemover() {
		$('#game li').text('+');
		$('#game li').removeClass('disable');
		$('#game li').removeClass('x');
		$('#game li').removeClass('o');
		$('#game li').removeClass('btn-primary');
		$('#game li').removeClass('btn-info');
	}

	(function isLocalStorageAvailable() {
		    try {
	    	    return 'localStorage' in window && window.localStorage !== null;
	    	} catch (e) {
	        	alert('I beg your pardon, but you cant save your score on your device');
	        	return false;
	    	}
		}());
});

