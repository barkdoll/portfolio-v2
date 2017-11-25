<!DOCTYPE html>
<html>
  <?php
  $page_title = 'Jesse Barkdoll';
  include 'templates/head.php'; ?>

  <body>
  <div id="top">
    <?php include 'templates/nav.htm'; ?>
    <header class="header">
      <img src="img/IMG_9744-45-site_banner-1.jpg" id="banner"/>
    </header>
    <section id="main">
      <?php include 'templates/about.htm'; ?>
      <?php include 'templates/now.htm'; ?>
      <?php include 'templates/portfolio.htm'; ?>
      <?php include 'templates/contact.htm'; ?>

    <div class="top-btn">
      <a href="#top">FROM THE TOP <i class="fa fa-arrow-up" aria-hidden="true"></i></a>
    </div>

  </section> <!-- #main -->
  <script
  src="https://code.jquery.com/jquery-3.2.1.min.js"
  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  crossorigin="anonymous"></script>
  <script src="js/script.js"></script>
</div> <!-- #top -->
</body>
</html>
