<article id="contact">
  <h1>Contact Jesse</h1>
  <form class="contact-me" action="mail.php" method="post">
    <h3>Name</h3> <input type="text" name="name" required>
    <h3>Email</h3> <input type="text" name="email" required>
    <h3>Subject</h3> <input type="text" name="subject" placeholder="(Optional)">
    <h3>Message</h3><textarea rows="8" cols="40" name="message" required></textarea>

    <!-- reCAPTCHA -->
    <div class="g-recaptcha" data-sitekey="6LfULTsUAAAAAJYyY1gS1i3kLjFjvFpikFmgXWZa"></div>
    <div id="feedback"></div>

    <input type="submit" value="Send" style="margin: .5rem .5rem 0 0">
    <input type="reset" value="Clear" style="margin-top: .5rem">
  </form>
</article>
