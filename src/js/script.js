jQuery(document).ready(function($){

  // Mobile navigation animation
  $('.nav-mobile').ready(function() {

    $('.nav-toggle').click(function () {
      if(!$('.spinner').hasClass('spin')) {
        $('.spinner').addClass('spin');
        // Keeps smaller font for smaller screens
        if ($(window).width() > 360) {
          $('.label-left').css('font-size', '1.2em');
        }
      } else {
        $('.spinner').removeClass('spin');
        // Keeps smaller font for smaller screens
        if ($(window).width() > 360) {
          $('.label-left').css('font-size', '1em');
        }
      }
    });

    $('.nav-mobile a').click(function(e) {
      e.preventDefault();

      $('#nav-toggle').prop('checked' , false);
      $('.spinner').removeClass('spin');
      $('.label-left').css('font-size', '1em');

      var id = $(this).attr('href'),
          target = this.hash;

      $('html, body').animate({
        scrollTop: $(id).offset().top
      }, 500, 'swing', function() {
          // Uncomment this to add
          // hash IDs (e.g. - #about) to page URLs
          // window.location.hash = target;
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

    $('html, body').animate({
      scrollTop: $(id).offset().top
    }, 500, 'swing', function() {
        // Uncomment this to add
        // hash IDs (e.g. - #about) to page URLs
        // window.location.hash = target;
    });

    return false;
  });
}); // end $(document).ready()
