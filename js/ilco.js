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


