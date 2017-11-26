jQuery(document).ready(function($){

  // Mobile navigation animation
  $('.nav-mobile').ready(function() {


    var label = $('label.nav-toggle'),
        navHeight = label.height().toString();

    $('#primary').css('top', navHeight + 'px');

    $('.nav-toggle').click(function () {
      if(!label.hasClass('opened')) {
        label.addClass('opened');

        if ($(window).width() > 400 ) {
          $('.label-left').css('font-size', '1.2em');
        }

        $('.spinner').addClass('spin');
      } else {
        label.removeClass('opened');
        $('.spinner').removeClass('spin');

        if ($(window).width() > 400 ) {
          $('.label-left').css('font-size', '1em');
        }

      }
    });

    $('.nav-mobile a').click(function(e) {
      e.preventDefault();

      $('#nav-toggle').prop('checked' , false);
      label.removeClass('opened');
      $('.spinner').removeClass('spin');
      $('.label-left').css('font-size', '1em');

      var id = $(this).attr('href'),
          target = this.hash,
          // Grabs # of pixels = mobile navbar height
          top = $(id).offset().top - navHeight;

      $('html').animate({
        scrollTop: top
      }, 500, 'swing', function() {
          // Adds hash IDs (e.g. - #about) to page URL
          // Doesn't seem to work here, only on nav link click below (see ~ line 81-82)
          window.location.hash = target;
      });

    });
  }); // end $(nav-mobile) animations

  var sections = $('article'),
      nav = $('nav');
  // Scroll tracking for active link in nav
  $(window).on('scroll', function() {
    var curPos = $(this).scrollTop();

    sections.each(function() {
      var top = $(this).offset().top,
          bottom = top + $(this).outerHeight();

      // The (top/btm - 100) offsets the active class
      // to execute 100px above the section from the top of the window
      if (  (curPos >= top - 100)
      &&    (curPos <= bottom - 100)  ) {
        nav.find('li').removeClass('active');
        nav.find('a[href="#' + $(this).attr('id') + '"]').parent().addClass('active');
      } else if (curPos <= 100) {
        nav.find('li').removeClass('active');
      }
    });
  });

  // Scroll to section when clicking hash links
  $('a[href^="#"]').click(function(e) {
    e.preventDefault();
    var id = $(this).attr('href'),
        target = this.hash;

    $('html').animate({
      scrollTop: $(id).offset().top
    }, 500, 'swing', function() {
        // This line adds hash IDs (e.g. - #about) to the page URL
        window.location.hash = target;
    });

    return false;
  });
}); // end $(document).ready()


//////////////////////////////////////////////////////////////////////
// Get the height of the header
// var headerHeight = $("div#header").height();
// // Attach the click event
// $('a[href*=#]').bind("click", function(e) {
//
//     var target = $(this).attr("href"); //Get the target
//     var scrollToPosition = $(target).offset().top - headerHeight;
//
//     $('html').animate({
//       'scrollTop': scrollToPosition
//     }, 600, function(target){
//         window.location.hash = target;
//     });
//
//     e.preventDefault();
// });
//////////////////////////////////////////////////////////////////////
