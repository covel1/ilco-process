/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function initLoad(){
    b2top();
    smoothMove();
}          
$(document).ready(initLoad);
/* Register events listeners */
$('#mynav > ul > li > a').on('click',function(){var that=this; mycollapse(that);});//navigation
$('.thumbnail > p > button').on('click',function(){var that=this; loadm(that);});//DETALII button click
//$(window).on('load',function(){handleGoogleCalendar();});//CHECK GOOGLE CALENDAR EVENTS
$('#my_form').on('submit',function(){submitForm();return false;});//submit contact form
/*------*/
/* BACK TO TOP */
function b2top(){
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });
    $('#back-to-top').on('click',function (event) {
        event.preventDefault();
        $('#back-to-top').css('display','none');
        $('html,body').animate({
            scrollTop: 0
        }, 800);
    });
    $('#back-to-top').css('display','block');
}
/*------*/
/* SMOOTH SCROLLING TO ELEMENTS LINKED FROM a element W/ CLASS slowmo; e.g menu link to href target on the page */
function smoothMove(){
    $(".slowmo").each(function(){
        $(this).on('click',function(event){
        event.preventDefault();
        var id = $(this).attr('href');
        var oh = $(id).offset()["top"];
        $('html,body').animate({
            scrollTop: (oh-68)
            }, 800);  
        });
    });
}
/*------*/
/* COLLAPSE NAVBAR IN MOBILE VIEW AFTER CLICKING AN ITEM. CALL NAVIG HISTORY*/
function mycollapse(v){
    var el = v;
    if ($(window).width()<767){
        document.getElementById('mynav').getAttributeNode('class').value = 'navbar-collapse collapse';
    }
    navig(el);  
}
/*------*/
/* USE BROWSER HISTORY TO ALLOW NAVIG IN A SINGLE PAGE APP */
function navig (p){
    if (p!==undefined){
        var a = p;
        var b = a.hash;
        history.pushState({i:b},'',b);    
    }       
}
window.onpopstate = function(event) {
    //console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
    if(event.state!==null){
    var el = event.state.i;
    //console.log(el);
    var hi = $(el).offset().top;
    $('html,body').animate({
      scrollTop: hi
      }, 800);
    }
    else {
        $('html,body').animate({
              scrollTop: 0
          }, 800);
    }
};
/*------*/
/* RETRIEVE LEARNING MODULES PREZENTATIONS FROM SERVERS AND SHOW THEM IN #PLAYER DIV */
function loadm(mod) {
    var lMod = mod;//module passed when DETALII button is clicked
    var t = $($(lMod).parents()[1]).children()[0];
    $(t).show();//show spinner.gif
    var modId = lMod.getAttribute('id');
    var x = $('#player').offset().top;
    if (window.XMLHttpRequest) {
            var ajax = new XMLHttpRequest();
    }
    else {
            var ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    ajax.onreadystatechange = function () {
        if (ajax.readyState === 4 && ajax.status === 200) {
            if (ajax.responseText !== 'Acest modul nu exista') {
                var intr = JSON.parse(ajax.responseText);
                var arrin = [];
                for (elem in intr) {
                        arrin.push(intr[elem]);
                }
                fillplayer(arrin,x,modId,t);      
            } 
            else {
                alert('A apărut o eroare. Contactați-ne!');
            }
        }
    };
    ajax.open("GET", "loadimg.php?q="+modId) ;
    ajax.send();
}
function fillplayer(a,b,c,d) {
    $('#player').hide();
    var lA = a;
    var lB = b;
    var lC = c;
    var lD = d;
    var car1 = '<div id="carouselpp" class="carousel" data-ride="carousel"><div style="right:3%;top:3%;position:absolute;z-index:1000;color:red;font-size:2em;" data-mod="'+lC+'" onclick="closeP(this)"><span class="glyphicon glyphicon-remove-circle" style="cursor:pointer"></span></div><!-- Indicators --><ol class="carousel-indicators"><li data-target="#carouselpp" data-slide-to="0" class="active"></li><li data-target="#carouselpp" data-slide-to="1"></li><li data-target="#carouselpp" data-slide-to="2"></li></ol><!-- Wrapper for slides --><div class="carousel-inner" role="listbox">';
    var car3 = '</div><!-- Controls --><a class="left carousel-control" href="#carouselpp" role="button" data-slide="prev"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="right carousel-control" href="#carouselpp" role="button" data-slide="next"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span></a></div>';
    var car2='';
    lA.forEach(checkIfFirst);
    function checkIfFirst(item){
        var prim = item.split('_');
        if (prim[1] === '01.JPG'){
            car2 = '<div id ="cont" class="item active"><img class="img-responsive" src="./repo/modules/'+item+'" alt="modul"><div class="carousel-caption"></div></div>';
        }
        else {
            car2 += '<div class="item"><img class="img-responsive" src="./repo/modules/'+item+'" alt="modul"><div class="carousel-caption"></div></div>'; 
        }
    }
    $('#player').html(car1+car2+car3);
    var checkI = setInterval(myTimer,20);
    var nbr = 0;
    function myTimer() {
        if ($('#cont').children()[0].complete){
            clearInterval(checkI);
            $('#player').show();
            $(lD).hide();
        } 
        else {
            nbr++;
            if (nbr === 250){//5s timeout for loading carousel images
                    clearInterval(checkI);
                    alert('A apărut o eroare. Încercați mai târziu!');
            }
        }
    }
    $('html,body').animate({
        scrollTop: lB
        }, 800);  
}
function closeP(a) {
    var lA = a;
    var modId = lA.getAttribute('data-mod');
    var y = $('#'+modId).offset().top;
    var z = $('#player').height();
    var d = parseInt($($('#'+modId).parents()[1]).css('height'));
    var s = parseInt(y) - d - parseInt(z);
    $('html,body').animate({
    scrollTop: s
    }, 800); 
    $('#player').html('');
}


