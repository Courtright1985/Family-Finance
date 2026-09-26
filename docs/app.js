(() => {
  const data = window.SEAM_BOOK;
  if (!data) return;

  const listEl = document.getElementById("entry-list");
  const countEl = document.getElementById("result-count");
  const searchEl = document.getElementById("search");
  const detailSection = document.getElementById("detail");
  const detailPanel = document.getElementById("detail-panel");
  const backBtn = document.getElementById("back-btn");
  const filterBtns = [...document.querySelectorAll(".filter")];
  const navFilters = [...document.querySelectorAll(".site-nav [data-filter]")];

  let activeFilter = "all";
  let query = "";

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function categoryLabel(id) {
    return data.categories.find((c) => c.id === id)?.label || id;
  }

  function filteredEntries() {
    const q = query.trim().toLowerCase();
    return data.entries.filter((entry) => {
      if (activeFilter !== "all" && entry.category !== activeFilter) return false;
      if (!q) return true;
      const hay = [entry.title, entry.summary, entry.when, entry.tip, entry.category]
        .concat(entry.steps.map((s) => s.text))
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }

  function renderList() {
    const entries = filteredEntries();
    countEl.textContent =
      entries.length === 1 ? "1 technique" : `${entries.length} techniques`;

    if (!entries.length) {
      listEl.innerHTML =
        '<p class="browse-lede">No entries match. Try another filter or clear the search.</p>';
      return;
    }

    listEl.innerHTML = entries
      .map(
        (entry) => `
      <button type="button" class="entry-row" data-id="${entry.id}">
        <span class="entry-thumb">
          <img src="${escapeHtml(entry.cover)}" alt="" width="320" height="214" loading="lazy" />
        </span>
        <span class="entry-text">
          <span class="entry-meta">
            <span class="pill">${escapeHtml(categoryLabel(entry.category))}</span>
          </span>
          <h3>${escapeHtml(entry.title)}</h3>
          <p>${escapeHtml(entry.summary)}</p>
        </span>
      </button>
    `
      )
      .join("");
  }

  function showDetail(id) {
    const entry = data.entries.find((e) => e.id === id);
    if (!entry) return;

    document.body.classList.add("is-detail");
    detailSection.hidden = false;
    detailPanel.innerHTML = `
      <div class="detail-copy">
        <div class="detail-meta">
          <span class="pill">${escapeHtml(categoryLabel(entry.category))}</span>
        </div>
        <h2>${escapeHtml(entry.title)}</h2>
        <p class="detail-summary">${escapeHtml(entry.summary)}</p>
        <div class="detail-section">
          <h3>When to use it</h3>
          <p>${escapeHtml(entry.when)}</p>
        </div>
        <div class="detail-section tip">
          <h3>Tip</h3>
          <p>${escapeHtml(entry.tip)}</p>
        </div>
      </div>
      <ol class="step-gallery">
        ${entry.steps
          .map(
            (step, i) => `
          <li class="step-card">
            <figure>
              <img src="${escapeHtml(step.photo)}" alt="Step ${i + 1}: ${escapeHtml(entry.title)}" width="1200" height="800" loading="lazy" />
              <figcaption>
                <span class="step-num">Step ${i + 1}</span>
                <p>${escapeHtml(step.text)}</p>
              </figcaption>
            </figure>
          </li>
        `
          )
          .join("")}
      </ol>
    `;

    history.replaceState(null, "", `#entry/${entry.id}`);
    detailSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function hideDetail() {
    document.body.classList.remove("is-detail");
    detailSection.hidden = true;
    detailPanel.innerHTML = "";
    const hash = activeFilter !== "all" ? `#browse/${activeFilter}` : "#browse";
    history.replaceState(null, "", hash);
  }

  function setFilter(next) {
    activeFilter = next;
    filterBtns.forEach((btn) => {
      const on = btn.dataset.filter === next;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
    document.body.classList.remove("is-detail");
    detailSection.hidden = true;
    detailPanel.innerHTML = "";
    renderList();
    document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", next === "all" ? "#browse" : `#browse/${next}`);
  }

  function routeFromHash() {
    const hash = location.hash.replace(/^#/, "");
    if (hash.startsWith("entry/")) {
      showDetail(hash.slice(6));
      return;
    }
    if (hash.startsWith("browse/")) {
      const cat = hash.slice(7);
      if (["joins", "hems", "finishes", "stitches", "all"].includes(cat)) {
        activeFilter = cat === "all" ? "all" : cat;
        filterBtns.forEach((btn) => {
          const on = btn.dataset.filter === activeFilter;
          btn.classList.toggle("is-active", on);
          btn.setAttribute("aria-selected", on ? "true" : "false");
        });
      }
    }
    document.body.classList.remove("is-detail");
    detailSection.hidden = true;
    renderList();
  }

  listEl.addEventListener("click", (event) => {
    const row = event.target.closest(".entry-row");
    if (!row) return;
    showDetail(row.dataset.id);
  });

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => setFilter(btn.dataset.filter));
  });

  navFilters.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      setFilter(link.dataset.filter);
    });
  });

  searchEl.addEventListener("input", () => {
    query = searchEl.value;
    if (document.body.classList.contains("is-detail")) hideDetail();
    renderList();
  });

  backBtn.addEventListener("click", hideDetail);
  window.addEventListener("hashchange", routeFromHash);
  routeFromHash();
})();
