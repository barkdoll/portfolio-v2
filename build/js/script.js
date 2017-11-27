function portfolio(parentContainer, jsonPath) {
	function createNode(element) {
		return document.createElement(element);
	}

	function append(parent, el) {
		return parent.appendChild(el);
	}

	var PortfolioSection = document.getElementById(parentContainer);

	fetch(jsonPath).then(function (response) {
		var contentType = response.headers.get("content-type");
		if (contentType && contentType.includes("application/json")) {
			return response.json();
		}
		throw new TypeError("Oops, we haven't got JSON!");
	}).then(function (Projects) {
		/* process your JSON further */
		Projects.map(proj => {
			var column = createNode('div');
			column.className = 'column is-12-tablet is-4-desktop';
			append(PortfolioSection, column);

			var header = createNode('h2');
			header.className = 'title';
			header.textContent = proj.name;
			append(column, header);

			if (proj.subtitle !== '') {
				var subtitle = createNode('h3');
				subtitle.className = 'subtitle';
				subtitle.textContent = proj.subtitle;
				append(column, subtitle);
			}

			var card = createNode('div');
			card.className = 'card portfolio-item';
			// card.id = proj.projID;
			append(column, card);

			var imgContainer = createNode('div');
			imgContainer.className = 'img-cont';
			append(card, imgContainer);

			var liveLink = createNode('a');
			liveLink.className = 'live-link';
			liveLink.target = '_blank';
			if (proj.liveUrl) liveLink.href = proj.liveUrl;else liveLink.href = proj.gitLink;
			append(imgContainer, liveLink);

			var thumbnail = createNode('img');
			thumbnail.className = 'card-thumbnail';
			thumbnail.src = proj.image;
			append(liveLink, thumbnail);
			var overlay = createNode('div');
			overlay.className = 'overlay';
			append(liveLink, overlay);
			var overlayTxt = createNode('div');
			overlayTxt.className = 'overlay-text';
			overlayTxt.textContent = 'View Project';
			append(overlay, overlayTxt);

			var detail = createNode('div');
			detail.className = 'card-detail';
			append(card, detail);

			var description = createNode('p');
			description.className = 'description';
			description.textContent = proj.description;
			append(detail, description);

			var stack = createNode('div');
			stack.className = 'stack';
			proj.stack.forEach(tech => {
				var icon = createNode('i');
				icon.className = 'devicon-' + tech + '-plain';
				icon.title = tech;
				stack.append(icon);
			});
			append(detail, stack);

			var linkCell = createNode('a');
			linkCell.className = 'link-wrap';
			linkCell.target = '_blank';
			var gitLink = createNode('div');
			gitLink.className = 'button git-link';

			if (proj.publicSrc === true) {
				linkCell.href = proj.gitLink;
				linkCell.target = '_blank';
				gitLink.textContent = 'View the Code';
				if (proj.gitLink.match(/github/)) gitLink.className += ' github';else if (proj.gitLink.match(/gitlab/)) gitLink.className += ' gitlab';
			} else {
				linkCell.href = proj.liveUrl;
				gitLink.className += ' project';
				gitLink.textContent = 'View Project';
			} // endif;
			append(detail, linkCell);
			append(linkCell, gitLink);
		});
	}).catch(function (error) {
		var column = createNode('div');
		column.className = 'column';
		column.style.marginTop = '0';
		column.style.paddingTop = '0';
		var Problem = createNode('p');
		Problem.style.color = 'red';
		Problem.style.fontWeight = 'bold';
		Problem.textContent = 'It looks like Jesse\'s site is having trouble grabbing his portfolio data. He may be aware of the problem, but feel free to contact him about it if you are feeling like the hero-type today.';
		append(PortfolioSection, column);
		append(column, Problem);
		// console.log(error);
	});
} // end portfolio()

portfolio('pf-container', './portfolio.json');
jQuery(document).ready(function ($) {

  // Mobile navigation animation
  $('.nav-mobile').ready(function () {

    var label = $('label.nav-toggle'),
        navHeight = label.height();

    $('.nav-toggle').click(function () {
      if (!label.hasClass('opened')) {
        label.addClass('opened');

        if ($(window).width() > 400) {
          $('.label-left').css('font-size', '1.2em');
        }

        $('.spinner').addClass('spin');
      } else {
        label.removeClass('opened');
        $('.spinner').removeClass('spin');

        if ($(window).width() > 400) {
          $('.label-left').css('font-size', '1em');
        }
      }
    }); // end $(.nav-toggle)


    // $(window).resize(function () {
    //   // Compensates extra height on
    //   // #primary content section for mobile navbar
    //   if ($(window).width() > 768) {
    //     $('#primary').css('top', '0');
    //   } else {
    //     $('#primary').css('top', navHeight.toString() + 'px');
    //   }
    // });

    $('.nav-mobile a').click(function (e) {
      e.preventDefault();

      $('#nav-toggle').prop('checked', false);
      label.removeClass('opened');
      $('.spinner').removeClass('spin');
      $('.label-left').css('font-size', '1em');

      var id = $(this).attr('href'),
          target = this.hash,

      // Grabs # of pixels = mobile navbar height
      scrollPosition = $(id).offset().top - navHeight;

      if ($(window).width() <= 768) {
        $('html, body').animate({ scrollTop: scrollPosition }, 500, 'swing', function () {
          // Adds hash IDs (e.g. - #about) to page URL
          // window.location.hash = target;
        });
      }
    });
  }); // end $(.nav-mobile) animations

  var sections = $('article'),
      nav = $('nav');
  // Scroll tracking for active link in nav
  $(window).on('scroll', function () {
    var curPos = $(this).scrollTop();

    sections.each(function () {
      var top = $(this).offset().top,
          bottom = top + $(this).outerHeight();

      // The (top/btm - 100) offsets the active class
      // to execute 100px above the section from the top of the window
      if (curPos >= top - 100 && curPos <= bottom - 100) {
        nav.find('li').removeClass('active');
        nav.find('a[href="#' + $(this).attr('id') + '"]').parent().addClass('active');
      } else if (curPos <= 100) {
        nav.find('li').removeClass('active');
      }
    });
  });

  // Scroll to section when clicking hash links
  $('a[href^="#"]').click(function (e) {
    e.preventDefault();
    var id = $(this).attr('href'),
        target = this.hash;

    if ($(window).width() > 768) {
      $('html, body').animate({
        scrollTop: $(id).offset().top + 10
      }, 500, 'swing', function () {
        // This line adds hash IDs (e.g. - #about) to the page URL
        // window.location.hash = target;
      });
    }

    return false;
  });
}); // end $(document).ready()