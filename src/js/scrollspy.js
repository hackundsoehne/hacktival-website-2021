function moveIndicator(hash) {
  const selector = `.nav-text[href="${hash}"]`;
  const navTextEl = document.querySelector(selector);

  if (!navTextEl) {
    return;
  }

  const navEl = document.getElementById("nav");
  const navRect = navEl.getBoundingClientRect();

  const navTextRect = navTextEl.getBoundingClientRect();
  const navTextCenter = navTextRect.width / 2;
  const navTextLeftRelativeToNav = navTextRect.left - navRect.left;

  const indicatorEl = document.getElementById("nav-indicator");
  const indicatorRect = indicatorEl.getBoundingClientRect();
  const indicatorCenter = indicatorRect.width / 2;

  const indicatorLeftRelativeToNav =
    navTextLeftRelativeToNav + navTextCenter - indicatorCenter;
  indicatorEl.style.left = `${indicatorLeftRelativeToNav}px`;
}

function updateURLHash(hash) {
  // Set the URL hash without scrolling to it
  history.replaceState(undefined, undefined, hash);
}

function focusSection(hash) {
  moveIndicator(hash);
  updateURLHash(hash);
}

(function () {
  const sectionTargetElements = document.querySelectorAll(".section-target");
  const sectionTargets = {};

  sectionTargetElements.forEach((sectionTarget) => {
    sectionTargets[sectionTarget.id] = sectionTarget.offsetTop;
  });

  window.onscroll = function () {
    const scrollPosition =
      document.documentElement.scrollTop || document.body.scrollTop;

    var sectionTargetId = null;
    for (const [id, offset] of Object.entries(sectionTargets)) {
      if (offset <= scrollPosition) {
        sectionTargetId = id;
      }
    }

    const hash = "#" + sectionTargetId;
    const currentHash = window.location.hash;
    if (hash === currentHash) {
      return;
    }

    focusSection(hash);
  };

  window.onhashchange = function () {
    const hash = window.location.hash;
    focusSection(hash);
  };
})();
