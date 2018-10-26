console.log('I came from defered ilco.js');

var cuv_ini = `<h2>scurt chestionar</h2><p>Răspunde la următoarele întrebări prin alegerea unei note
între 1 si 5. "1" pentru cel mai puțin iar "5" pentru cel mai potrivit. Vei obține o indicație asupra cauzelor potențiale ale problemelor cu care te confrunți.</p> `;

var int = `<div class="qzcontainer border">
			<div id="qztitle">
				${cuv_ini}
				<button id="play" class="btn btn-success" type="button">START</button>
			</div>	
			<div id="qzcontent">
				<div id="qst"></div>
				<button id="down" data-way="down" class="btn btn-primary" type="button"><</button>
				<button id="end" class="btn btn-danger" type="button">STOP</button>
				<button id="up" data-way="up" class="btn btn-primary" type="button">></button>	
			</div>
			<div id="qresults">
				<div id="qgrade"></div>
				<div id="qexplain"></div>
				
			</div>
		</div>`;
		
document.getElementById('cvmp').innerHTML = int;
fetch('https://covel1.github.io/ilco-process/config.json').then(res => {return res.json()}).then(jsn => {use(jsn)});

var qrys = [],
answrs = [],
outcm = [],
weights = [];
function use(a) {
    console.log(a);
    qrys = a.qrys;
    answrs = a.answrs;
    outcm = a.outcm;
    weights = a.weights;
}
let _pos = 0,
	_acc = [];
	const _play = document.getElementById('play'),
	_qzcontainer = document.querySelector('.qzcontainer');
	_content = document.getElementById('qzcontent'),
	_buttNav = document.querySelectorAll('#qzcontent button'),
	_btnDown = document.getElementById('down'),
	_btnUp = document.getElementById('up'),
	_btnEnd = document.getElementById('end'),
	_qst = document.getElementById('qst'),
	_title = document.getElementById('qztitle'),
	_qgrd = document.getElementById('qgrade'),
	_qexpl = document.getElementById('qexplain');
	_btnEnd.style.display = 'none';
	_qgrd.style.display = 'none';
	_qexpl.style.display = 'none';
	_play.addEventListener('click', init);
	_btnEnd.addEventListener('click', compute);
	_qzcontainer.addEventListener('animationend', listener);
function init(){
	_play.style.display = 'none';
	_title.style.display = 'none';
	_qzcontainer.className = 'qzcontainer border expand';
}
function listener() { //helps animation
	_content.style.display = 'block';
	console.log('pozitia initiala: ' + _pos);
	_buttNav.forEach(function(val){
		val.addEventListener('click', move);	
	});
	write(_pos);
	_btnDown.disabled=true;
}
let move =(function () {
	function drc () {
		let btn = this.getAttribute('data-way');
		if (_pos <= qrys.length){
			_btnUp.style.display ='inline-block';
		};
		if (btn === 'down') {
			_btnEnd.style.display = 'none';
			_pos--;
			console.log('minus da: '+ _pos);
			write(_pos);
		};
		if (_pos == 0) {
			_btnDown.disabled=true;
			} else {
			_btnDown.disabled=false;
		};
		if (btn === 'up') {
			if(_acc[_pos]) {
				console.log("remove from position "+_pos+" these values "+_acc[_pos]);
				_acc.splice(_pos,1);
				console.log("new _acc");
				console.log(_acc);
			};
			readValues(_pos);
			_pos++;
			console.log('plus da: '+ _pos);
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
	let result = '';
	const resultIni = '<div class="btn-group btn-group-toggle btn-group-lg" data-toggle="buttons">';
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
	_qgrd.style.display = 'block';
	_qexpl.style.display = 'block';
	console.log("SUBMITED");
	let a0 = 0;//alternative 1
	let a1 = 0;//alternative 2
	let a2 = 0;//alternative 3
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
	console.log('a0 este: '+a0);
	console.log('a1 este: '+a1);
	console.log('a2 este: '+a2);
	
	a0 = round(a0,2);
	a1 = round(a1,2);
	a2 = round(a2,2);
	
	console.log('a0 este: '+a0);
	console.log('a1 este: '+a1);
	console.log('a2 este: '+a2);
	
	let altScore = Math.max(a0, a1, a2);
	console.log('altScore is: '+ altScore);
	//_qgrd.innerHTML = 'Scor: '+ altScore;
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
}
function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
function readValues(p) {
	let tmp = [];
	let inpt = document.querySelectorAll('[type="radio"]');
	for (i=0; i<inpt.length; i++){
		if(inpt[i].checked === true){
			tmp.push(inpt[i].value);
		}	
	};
	_acc.splice(p,0,tmp);
	console.log(_acc);
}