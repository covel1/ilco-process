/**
* Remove focus from hamburger button only on transitions but let it work for accesibility purposes 
*/
$('#navbarResponsive').on('show.bs.collapse', function(e) {
$('.navbar-toggler').blur();
});
$('#navbarResponsive').on('hide.bs.collapse', function(e) {
$('.navbar-toggler').blur();
});

/**
* Collapse nav when click anywhere 
*/
$('#navbarResponsive').on('shown.bs.collapse', function(e) {
	addEventListener('click', function() {
		$('#navbarResponsive').collapse('hide') 
	})
});

function initLoad(){
    smoothMove();
}

$(document).ready(initLoad);

/**
* Smooth scrolling to elements linked by 'a' having 'slowmo' class (e.g. menu link to a href target on the page).
* Call navig() to record the target for feeding browser's history
*/
function smoothMove(){
    $(".slowmo").each(function() {
        $(this).on('click', function(event) {
        event.preventDefault();
        var id = $(this).attr('href');
        var oh = $(id).offset()["top"]-72;
        $('html,body').animate({
            scrollTop: oh
            }, 800);
        });	
    });	
}
/**
* Multi-player
*/
(function start(){
var cuv_ini = '<h2>scurt chestionar</h2><p>Răspunde la următoarele întrebări prin alegerea unei note între 1 si 5. "1" pentru cel mai puțin iar "5" pentru cel mai potrivit. Vei obține o indicație asupra cauzelor potențiale ale problemelor cu care te confrunți.</p> ';

var int = '<div class="qzcontainer border"><div id="qztitle">'+cuv_ini+'<button id="play" class="btn btn-success" type="button">START</button></div><div id="qzcontent"><div id="qst"></div><button id="down" data-way="down" class="btn btn-primary" type="button"><</button><button id="end" class="btn btn-danger" type="button">STOP</button><button id="up" data-way="up" class="btn btn-primary" type="button">></button></div><div id="qresults"><div id="qgrade"></div><div id="qexplain"></div></div></div>';

$('#cvmp')[0].innerHTML = int;

$.ajax({
	 url : 'https://covel1.github.io/ilco-process/config.json',
	 type : 'get',
	 dataType: 'json',
	 success : function (response) {
			use(response)
	 }
});

var qrys = [],
answrs = [],
outcm = [],
weights = [];

function use(a) {
    qrys = a.qrys;
    answrs = a.answrs;
    outcm = a.outcm;
    weights = a.weights;
}

var _pos = 0,
	_acc = [];
var _play = $('#play')[0],
_qzcontainer = $('.qzcontainer')[0],
_content = $('#qzcontent')[0],
_buttNav = $.find('#qzcontent button'),
_btnDown = _buttNav[0],
_btnUp = _buttNav[2],
_btnEnd = _buttNav[1],
_qst = $('#qst')[0],
_title = $('#qztitle')[0],
_qgrd = $('#qgrade')[0],
_qexpl = $('#qexplain')[0],
_qresults = $('#qresults')[0];

_btnEnd.style.display = 'none';
_qgrd.style.display = 'none';
_qexpl.style.display = 'none';
_play.addEventListener('click', init);
_btnEnd.addEventListener('click', compute);

function init(){
	_play.style.display = 'none';
	_title.style.display = 'none';
	_content.style.display = 'block';
	_buttNav.forEach(function(val){
		val.addEventListener('click', move);	
	});
	write(_pos);
	_btnDown.disabled=true;
}
var move =(function () {
	function drc () {
		var btn = this.getAttribute('data-way');
		if (_pos <= qrys.length){
			_btnUp.style.display ='inline-block';
		};
		if (btn === 'down') {
			_btnEnd.style.display = 'none';
			_pos--;
			write(_pos);
		};
		if (_pos == 0) {
			_btnDown.disabled=true;
			} else {
			_btnDown.disabled=false;
		};
		if (btn === 'up') {
			if(_acc[_pos]) {
				_acc.splice(_pos,1);
			};
			readValues(_pos);
			_pos++;
			if(_pos === qrys.length ){
				_qst.innerHTML = '<h4 style="padding-top:30%">Puteți revedea răspunsurile sau încheia chestionarul</h4>';
				_btnUp.style.display ='none';
				_btnDown.disabled=false;
				_btnEnd.style.display = 'inline-block';
			} else {
			write(_pos);
			_btnDown.disabled=false;
			}
		};
		if (_pos == answrs.length) {
			_btnUp.disabled=true;
		} else {
			_btnUp.disabled=false;
		};
	}
	return drc;
})();
function write (p) {
	_qst.innerHTML = '<h4>'+qrys[p]+'</h4>';
	for(i=0; i<answrs[p].length; i++){
	if (_acc[p] === undefined){
		_qst.innerHTML += answrs[p][i]+
	'<div class="btn-group btn-group-toggle btn-group-lg" data-toggle="buttons">'+
	'<label class="btn btn-secondary active">1<input type="radio" name=n'+i+' value=1 checked></label>'+
	'<label class="btn btn-secondary">2<input type="radio" name=n'+i+' value=2></label>'+
	'<label class="btn btn-secondary">3<input type="radio" name=n'+i+' value=3></label>'+
	'<label class="btn btn-secondary">4<input type="radio" name=n'+i+' value=4></label>'+
	'<label class="btn btn-secondary">5<input type="radio" name=n'+i+' value=5></label></div>'
	} else {
		var val = _acc[p][i];
		_qst.innerHTML += answrs[p][i] + fillBackAnswers(val,i);
	};
	}
}
function fillBackAnswers(k,i) {
	var result = '';
	var resultIni = '<div class="btn-group btn-group-toggle btn-group-lg" data-toggle="buttons">';
	for(j=1;j<6;j++){
		if(j === parseInt(k,10)){
			result += '<label class="btn btn-secondary active">'+j+'<input type="radio" name=n'+i+' value='+j+' '+'checked></label>';
		} else {
		result += '<label class="btn btn-secondary">'+j+'<input type="radio" name=n'+i+' value='+j+'></label>';
		}
	}
	return resultIni+result;
}	
function compute(e){
	e.preventDefault();
	_content.style.display = 'none';
	_btnEnd.style.display = 'none';
	_qexpl.style.display = 'inline';
	var a0 = 0, a1 = 0, a2 = 0;
	/*
	a0 = alternative 1
	a1 = alternative 2
	a2 = alternative 3
	*/
	for (m=0; m<outcm.length; m++){
		for (k=0; k<qrys.length; k++) {
			for (j=0; j<answrs[k].length; j++){
				switch (m) {
					case 0:
					a0+=_acc[k][j]*weights[m][k][j];
					break;
					case 1:
					a1+=_acc[k][j]*weights[m][k][j];
					break;
					case 2:
					a2+=_acc[k][j]*weights[m][k][j];
					break;
					default:
					console.log('ERROR');
				}
			}
		}
	}
	
	a0 = round(a0,2);
	a1 = round(a1,2);
	a2 = round(a2,2);
	
	var altScore = Math.max(a0, a1, a2);
	if (a0===a1&&a1===a2) {
		_qexpl.innerHTML = '<h4>Cauza probabilă este '+ outcm[0] + ' și/sau '+ outcm[1] + ' și/sau '+ outcm[2]+'<h4>';
	} else if (a0===a1&&a1 > a2) { 
		_qexpl.innerHTML = '<h4>Cauza probabilă este '+ outcm[0] + ' și/sau '+ outcm[1]+'<h4>';
	} else if (a0===a1&&a1 < a2) {
		_qexpl.innerHTML = '<h4>Cauza probabilă este '+ outcm[2]+'<h4>';
	} else if (a0 > a1&&a1===a2) {
		_qexpl.innerHTML = '<h4>Cauza probabilă este '+ outcm[0]+'<h4>';
	} else if (a0 < a1&&a1===a2) {
		_qexpl.innerHTML = '<h4>Cauza probabilă este '+ outcm[1] + ' și/sau '+ outcm[2]+'<h4>';
	} else if (a0===a2&&a0 > a1 ) {
		_qexpl.innerHTML = '<h4>Cauza probabilă este '+ outcm[0] + ' și/sau '+ outcm[2]+'<h4>';
	} else if (a0===a2&&a0 < a1 ) {
		_qexpl.innerHTML = '<h4>Cauza probabilă este '+ outcm[1]+'<h4>';
	} else {
		switch (altScore) {
			case a0:
			_qexpl.innerHTML = '<h4>Cauza probabilă este '+ outcm[0]+'<h4>';
			break;
			case a1:
			_qexpl.innerHTML = '<h4>Cauza probabilă este '+ outcm[1]+'<h4>';
			break;
			case a2:
			_qexpl.innerHTML = '<h4>Cauza probabilă este '+ outcm[2]+'<h4>';
			break;
			default:
			console.log('sorting error');
		}
	}
	var rept = _qresults.appendChild(document.createElement('I'));
	rept.className ='fa fa-repeat over';
	rept.addEventListener('click', repeat);
}
function repeat(){
	start();
}
function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
function readValues(p) {
	var tmp = [];
	var inpt = document.querySelectorAll('[type="radio"]');
	for (i=0; i<inpt.length; i++){
		if(inpt[i].checked === true){
			tmp.push(inpt[i].value);
		}	
	};
	_acc.splice(p,0,tmp);
}
})();


