---
title: Prog fonctionnelle
icon: fa-code-branch
order: 6
---

<form method="post" action="https://formspree.io/{{ site.email }}">
  <div class="row">
    <div class="6u 12u$(mobile)"><input type="text" name="name" placeholder="Nom" /></div>
    <div class="6u$ 12u$(mobile)"><input type="text" name="email" placeholder="Email" /></div>
    <div class="12u$">
      <textarea name="message" placeholder="Message"></textarea>
    </div>
    <div class="12u$">
      <input type="submit" value="Envoyer" />
    </div>
  </div>
</form>
