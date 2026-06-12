---
title: "Form Submitted"
date: 2026-06-11
draft: false
sitemap:
  disable: true
---

<div id="form-status">
  <p>Thank you &mdash; your submission has been received. A member of the
  OpenPOWER Foundation team will be in touch soon.</p>
  <p><a href="/">Return to the homepage</a></p>
</div>

<script>
(function () {
  var params = new URLSearchParams(window.location.search);
  if (params.has('error')) {
    var raw = params.get('message') || 'There was a problem with your submission.';
    var msg = raw.replace(/[<>&"]/g, '');
    document.getElementById('form-status').innerHTML =
      '<p><strong>We could not process your submission:</strong> ' + msg + '</p>' +
      '<p>Please go back and try again. If the problem persists, contact us directly.</p>' +
      '<p><a href="/">Return to the homepage</a></p>';
  }
})();
</script>
