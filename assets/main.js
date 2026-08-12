// Barre d'appel collante : apparaît quand le hero sort de l'écran.
// Amélioration progressive — le site fonctionne intégralement sans JS.
(function () {
  var barre = document.querySelector(".barre-appel");
  var hero = document.querySelector(".hero");
  if (!barre || !hero || !("IntersectionObserver" in window)) return;
  new IntersectionObserver(function (entries) {
    barre.classList.toggle("visible", !entries[0].isIntersecting);
  }).observe(hero);
})();

// Formulaire « rappelez-moi » : ouvre l'application mail du visiteur avec
// un message prérempli. Aucun prestataire tiers, aucune donnée en transit
// ailleurs que dans son propre e-mail. Sans JS, le fallback est le
// action="mailto:" natif du <form>.
(function () {
  var forms = document.querySelectorAll("form.rappel");
  for (var i = 0; i < forms.length; i++) {
    forms[i].addEventListener("submit", function (e) {
      e.preventDefault();
      var f = e.currentTarget;
      var d = new FormData(f);
      var lignes = [];
      var labels = (f.dataset.labels || "Nom|Portable|Nombre de laveries").split("|");
      lignes.push(labels[0] + " : " + (d.get("nom") || ""));
      lignes.push(labels[1] + " : " + (d.get("portable") || ""));
      lignes.push(labels[2] + " : " + (d.get("laveries") || ""));
      var url = "mailto:aravinthan.krishnakumar@gmail.com" +
        "?subject=" + encodeURIComponent(f.dataset.subject || "AlloLaverie — demande de test") +
        "&body=" + encodeURIComponent(lignes.join("\n"));
      var note = f.querySelector(".note-form");
      if (note && f.dataset.confirm) note.textContent = f.dataset.confirm;
      window.location.href = url;
    });
  }
})();
