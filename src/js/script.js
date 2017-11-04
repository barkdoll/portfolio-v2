jQuery(document).ready(function($){

  // Mobile navigation animation
  $('.nav-mobile').ready(function() {

    $('.nav-toggle').click(function () {
      if(!$('.spinner').hasClass('spin')) {
        $('.spinner').addClass('spin');
        $('.label-left').css('font-size', '1.2em');
      } else {
        $('.spinner').removeClass('spin');
        $('.label-left').css('font-size', '1em');
      }
    });

    $('.nav-mobile a').click(function() {
      $('#nav-toggle').prop('checked' , false);
      $('.spinner').removeClass('spin');
      $('.label-left').css('font-size', '1em');
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
        sections.removeClass('active');

        $(this).parent().addClass('active');
        nav.find('a[href="#' + $(this).attr('id') + '"]').parent().addClass('active');
      } else if (curPos <= 100) {
        nav.find('li').removeClass('active');
      }
    });
  });

  //
  nav.find('a').click(function(e) {
    e.preventDefault();
    var el = $(this),
        id = el.attr('href'),
        target = this.hash;

    $('html, body').animate({
      scrollTop: $(id).offset().top
    }, 500, 'swing', function() {
        window.location.hash = target;
    });

    return false;
  });
}); // end $(document).ready()
