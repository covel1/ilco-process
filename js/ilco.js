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
        $(this).on('click', function(event) {
        event.preventDefault();
        var id = $(this).attr('href');
        var oh = $(id).offset()["top"]-72;
        $('html,body').animate({
            scrollTop: oh
            }, 800);
		//navig(this);suspended until a solution for server-side redirect to home is found
        });	
    });	
}

/**
* Feed browser's history as such to be used by 'back' and 'forward' buttons of the browser


window.onpopstate = function(event) {
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

function navig (p){
    if (p!==undefined){
        var a = p;
        var b = a.hash;
		var c = b.slice(1);
        history.pushState({i:b},'',c);    
    }       
}
*/
          

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