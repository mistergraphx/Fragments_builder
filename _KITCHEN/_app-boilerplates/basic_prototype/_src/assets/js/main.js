


$(document).ready(function(){
  
 
    // Initialize menu 
    $(".cssmenu").menumaker({
        format: "multitoggle",
        sticky: false, // we do the job in styles ;-)
        breakpoint:800
    });
    

    
    /**
    @see http://refills.bourbon.io/components/
    */
    $('.js-accordion-trigger').bind('click', function(e){
        jQuery(this).parent().find('.submenu').slideToggle('fast');  // apply the toggle to the ul
        jQuery(this).parent().toggleClass('is-expanded');
        e.preventDefault();
    });

   
});

