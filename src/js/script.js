jQuery(document).ready(function($){

  // Add smooth scrolling to all links
  $(".nav-menu a").click(function(e) {

    $('.nav-menu li').removeClass('active');
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      e.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (600) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 600, function(){
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if

    // Takes out the unique part from the base URL
    var target = $('.sidebar a[href="' + this.hash + '"]');
    // Add active class to target link
    target.parent().addClass('active');

    // Prevents click-through to the page you are on by disabling default hyperlink behavior for active links
    target.bind('click', function(e){
        e.preventDefault();
    });
  }); // end .sidebar a

  // Changes header height to match mobile navigation bar
  $('.nav-mobile').ready(function() {
    // var navPad = $('label.nav-toggle').height();
    // $('body').css('margin-top', navPad);
    //
    // $(window).resize(function() {
    //   if ($(this).width() <= 768) {
    //     var navPaddd = $('label.nav-toggle').height();
    //     $('body').css('margin-top', navPaddd);
    //   } else {
    //     $('body').css('margin-top', 0);
    //   }
    // });
    // Closes menu after clicking a nav link
    $('.nav-mobile a').click(function() {
      $('#nav-toggle').prop('checked' , false);
    });
  }); // end $(.nav-mobile).ready()
}); // end document.ready($)
