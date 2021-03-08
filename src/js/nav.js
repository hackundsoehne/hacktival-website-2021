function getScrollPosition() {
  return document.documentElement.scrollTop || document.body.scrollTop;
}

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

function updateNavBg() {
  const navEl = document.getElementById("nav");
  const navRect = navEl.getBoundingClientRect();
  const scrollPosition = getScrollPosition();
  const navBottomOffset = navRect.bottom;
  if (scrollPosition > navBottomOffset) {
    navEl.classList.add("nav-with-bg");
  } else {
    navEl.classList.remove("nav-with-bg");
  }
}

function onScrollDone(callback) {
  var isScrolling;
  window.addEventListener(
    "scroll",
    function (event) {
      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(callback, 70);
    },
    false
  );
}

function onResizeDone(callback) {
  var isResizing;
  window.addEventListener(
    "resize",
    function (event) {
      window.clearTimeout(isResizing);
      isResizing = setTimeout(callback, 70);
    },
    false
  );
}

(function () {
  const navEl = document.getElementById("nav");
  const navButtonEl = document.getElementById("nav-button");
  const sectionTargetElements = document.querySelectorAll(".section-target");
  var navOpen = false;

  navButtonEl.addEventListener("click", function () {
    navOpen = !navOpen;
    console.log("CLICKED");
    if (navOpen) {
      navEl.classList.add("nav-open");
    } else {
      navEl.classList.remove("nav-open");
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const hash = this.getAttribute("href");

      document.querySelector(hash).scrollIntoView({
        behavior: "smooth",
      });

      focusSection(hash);
    });
  });

  onResizeDone(function () {
    const hash = window.location.hash;
    if (hash) {
      moveIndicator(hash);
    }
  });

  onScrollDone(function () {
    const scrollPosition = getScrollPosition();
    var sectionTargetId = null;

    sectionTargetElements.forEach((sectionTarget) => {
      if (sectionTarget.offsetTop <= scrollPosition) {
        sectionTargetId = sectionTarget.id;
      }
    });

    const hash = "#" + sectionTargetId;
    if (!sectionTargetId) {
      return;
    }

    focusSection(hash);
  });

  onScrollDone(updateNavBg);
})();
