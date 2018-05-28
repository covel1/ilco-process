/**
* Remove focus from hamburger button only on transitions but let it work for accesibility purposes 
*/
$('#navbarResponsive').on('show.bs.collapse', (e) => {
$('.navbar-toggler').blur();
});
$('#navbarResponsive').on('hide.bs.collapse', (e) => {
$('.navbar-toggler').blur();
});

/**
* Collapse nav when click anywhere 
*/
$('#navbarResponsive').on('shown.bs.collapse', (e) => {
	addEventListener('click', ()=>{
		$('#navbarResponsive').collapse('hide') 
	})
});

function initLoad(){
    //b2top();
    smoothMove();
}

$(document).ready(initLoad);

/**
* Smooth scrolling to elements linked by 'a' having 'slowmo' class (e.g. menu link to a href target on the page).
* Call navig() to record the target for feeding browser's history
*/
function smoothMove(){
    $(".slowmo").each(function() {
        $(this).on('click',(event) => {
        event.preventDefault();
        var id = $(this).attr('href');
        var oh = $(id).offset()["top"]-72;
        $('html,body').animate({
            scrollTop: oh
            }, 800);
		navig(this);
        });	
    });	
}

/**
* Feed browser's history as such to be used by 'back' and 'forward' buttons of the browser
*/
function navig (p){
    if (p!==undefined){
        var a = p;
        var b = a.hash;
        history.pushState({i:b},'',b);    
    }       
}
window.onpopstate = (event) => {
    if(event.state!==null){
    var el = event.state.i;
    //console.log(el);
    var hi = $(el).offset().top-72;
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


          

/* Register events listeners */
//$('#mynav > ul > li > a').on('click',function(){var that=this; mycollapse(that);});//navigation
//$('#my_form').on('submit',function(){submitForm();return false;});//submit contact form
/*------*/
/* BACK TO TOP 
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
*/

/* COLLAPSE NAVBAR IN MOBILE VIEW AFTER CLICKING AN ITEM. CALL NAVIG HISTORY
function mycollapse(v){
    var el = v;
    if ($(window).width()<767){
        document.getElementById('mynav').getAttributeNode('class').value = 'navbar-collapse collapse';
    }
    navig(el);  
}
*/
