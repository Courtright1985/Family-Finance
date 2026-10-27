(function () {
  "use strict";

  var appsRoot = document.getElementById("apps");
  var clockEl = document.getElementById("clock");
  var dateEl = document.getElementById("date");
  var taglineEl = document.getElementById("tagline");
  var hintEl = document.getElementById("hint");

  var tiles = [];
  var focusIndex = 0;
  var onTv = typeof tizen !== "undefined" && tizen.application;

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function updateClock() {
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    clockEl.textContent = pad(h) + ":" + pad(m);
    dateEl.textContent = now.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric"
    });
  }

  function findInstalledId(pref, installed) {
    var i;
    var j;
    var app;
    var name;
    var id;

    for (i = 0; i < installed.length; i++) {
      app = installed[i];
      name = app.name || "";
      id = app.id || "";
      for (j = 0; j < pref.match.length; j++) {
        if (pref.match[j].test(name)) {
          return id;
        }
      }
      for (j = 0; j < pref.ids.length; j++) {
        if (id === pref.ids[j]) {
          return id;
        }
      }
    }

    return pref.ids[0] || null;
  }

  function buildTiles(resolved) {
    appsRoot.innerHTML = "";
    tiles = [];

    resolved.forEach(function (item, index) {
      var btn = document.createElement("button");
      var face = document.createElement("div");
      var mark = document.createElement("span");
      var label = document.createElement("p");
      var sub = document.createElement("p");

      btn.type = "button";
      btn.className = "tile";
      btn.setAttribute("data-id", item.key);
      btn.setAttribute("data-app-id", item.appId || "");
      btn.setAttribute("aria-label", item.name);

      if (!item.found) {
        btn.className += " is-missing";
      }

      face.className = "face";
      mark.className = "mark";
      mark.textContent = item.mark;
      label.className = "label";
      label.textContent = item.name;
      sub.className = "sub";
      sub.textContent = item.found ? "Open" : (onTv ? "Not installed" : "Preview");

      face.appendChild(label);
      face.appendChild(sub);
      btn.appendChild(mark);
      btn.appendChild(face);

      btn.addEventListener("click", function () {
        focusIndex = index;
        syncFocus(true);
        openFocused();
      });

      appsRoot.appendChild(btn);
      tiles.push(btn);
    });

    syncFocus(false);
  }

  function syncFocus(announce) {
    var i;
    var tile;
    var offset;

    for (i = 0; i < tiles.length; i++) {
      tile = tiles[i];
      if (i === focusIndex) {
        tile.classList.add("is-focused");
      } else {
        tile.classList.remove("is-focused");
      }
    }

    if (!tiles.length) {
      return;
    }

    // Keep focused tile near the left third of the rail.
    offset = Math.max(0, focusIndex - 1) * (tiles[0].offsetWidth + tiles[0].offsetWidth * 0.08);
    appsRoot.style.webkitTransform = "translateX(" + -offset + "px)";
    appsRoot.style.transform = "translateX(" + -offset + "px)";

    if (announce && taglineEl) {
      taglineEl.textContent = tiles[focusIndex].getAttribute("aria-label");
    }
  }

  function openFocused() {
    var tile = tiles[focusIndex];
    var appId;

    if (!tile) {
      return;
    }

    appId = tile.getAttribute("data-app-id");

    if (!onTv) {
      hintEl.textContent = "Preview only — install on the TV to open " + tile.getAttribute("aria-label");
      return;
    }

    if (!appId) {
      hintEl.textContent = tile.getAttribute("aria-label") + " is not installed on this TV";
      return;
    }

    try {
      tizen.application.launch(
        appId,
        function () {
          hintEl.textContent = "Opening " + tile.getAttribute("aria-label") + "…";
        },
        function (err) {
          hintEl.textContent = "Could not open app (" + (err && err.message ? err.message : "error") + ")";
        }
      );
    } catch (e) {
      hintEl.textContent = "Launch failed";
    }
  }

  function move(delta) {
    if (!tiles.length) {
      return;
    }
    focusIndex = (focusIndex + delta + tiles.length) % tiles.length;
    syncFocus(true);
  }

  function onKey(e) {
    var key = e.keyCode || e.which;

    // Tizen / browser arrow + Enter / Return
    if (key === 37 || key === 4 /* Left */) {
      e.preventDefault();
      move(-1);
    } else if (key === 39 || key === 5 /* Right */) {
      e.preventDefault();
      move(1);
    } else if (key === 13 || key === 29443 /* Enter */) {
      e.preventDefault();
      openFocused();
    } else if (key === 10009 || key === 8 /* Return */) {
      // Stay on home; ignore
      e.preventDefault();
    }
  }

  function resolveFromInstalled(installed) {
    return window.TV_HOME_APPS.map(function (pref) {
      var matched = null;
      var i;
      var app;
      var j;

      for (i = 0; i < installed.length; i++) {
        app = installed[i];
        for (j = 0; j < pref.match.length; j++) {
          if (pref.match[j].test(app.name || "")) {
            matched = app.id;
            break;
          }
        }
        if (matched) {
          break;
        }
        for (j = 0; j < pref.ids.length; j++) {
          if (app.id === pref.ids[j]) {
            matched = app.id;
            break;
          }
        }
        if (matched) {
          break;
        }
      }

      return {
        key: pref.key,
        name: pref.name,
        mark: pref.mark,
        appId: matched || findInstalledId(pref, installed),
        found: !!matched
      };
    });
  }

  function startPreview() {
    var resolved = window.TV_HOME_APPS.map(function (pref) {
      return {
        key: pref.key,
        name: pref.name,
        mark: pref.mark,
        appId: pref.ids[0],
        found: true
      };
    });
    buildTiles(resolved);
    hintEl.textContent = "Browser preview · On the TV, arrows move · OK opens";
  }

  function startOnTv() {
    tizen.application.getAppsInfo(
      function (list) {
        buildTiles(resolveFromInstalled(list || []));
        hintEl.textContent = "Arrows move · OK opens · Put Home first in Smart Hub";
      },
      function () {
        startPreview();
        hintEl.textContent = "Could not read installed apps — using defaults";
      }
    );

    try {
      tizen.tvinputdevice.registerKey("MediaPlayPause");
      tizen.tvinputdevice.registerKey("ColorF0Red");
    } catch (e) {
      // Optional keys; ignore
    }
  }

  document.addEventListener("keydown", onKey, true);
  updateClock();
  setInterval(updateClock, 15000);

  if (onTv) {
    startOnTv();
  } else {
    startPreview();
  }

  window.addEventListener("resize", function () {
    syncFocus(false);
  });
})();
