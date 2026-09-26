(() => {
  const data = window.SEAM_BOOK;
  if (!data) return;

  const listEl = document.getElementById("entry-list");
  const countEl = document.getElementById("result-count");
  const searchEl = document.getElementById("search");
  const detailSection = document.getElementById("detail");
  const detailPanel = document.getElementById("detail-panel");
  const backBtn = document.getElementById("back-btn");
  const filterBtns = () => [...document.querySelectorAll(".filters .filter")];

  let activeFilter = "all";
  let query = "";
  let currentEntryId = null;

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

  function syncFilterButtons() {
    filterBtns().forEach((btn) => {
      const on = btn.dataset.filter === activeFilter;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
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

  function showBrowse() {
    currentEntryId = null;
    document.body.classList.remove("is-detail");
    detailSection.hidden = true;
    detailPanel.innerHTML = "";
    syncFilterButtons();
    renderList();
  }

  function showDetail(id, { historyMode = "push" } = {}) {
    const entry = data.entries.find((e) => e.id === id);
    if (!entry) return;

    currentEntryId = id;
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

    const url = `#entry/${entry.id}`;
    if (historyMode === "push") history.pushState({ view: "entry", id }, "", url);
    else if (historyMode === "replace") history.replaceState({ view: "entry", id }, "", url);

    detailSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function hideDetail({ historyMode = "push" } = {}) {
    showBrowse();
    const hash = activeFilter !== "all" ? `#browse/${activeFilter}` : "#browse";
    if (historyMode === "push") history.pushState({ view: "browse", filter: activeFilter }, "", hash);
    else if (historyMode === "replace") {
      history.replaceState({ view: "browse", filter: activeFilter }, "", hash);
    }
  }

  function setFilter(next, { historyMode = "push", scroll = true } = {}) {
    activeFilter = next;
    showBrowse();
    if (scroll) {
      document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" });
    }
    const hash = next === "all" ? "#browse" : `#browse/${next}`;
    if (historyMode === "push") history.pushState({ view: "browse", filter: next }, "", hash);
    else if (historyMode === "replace") {
      history.replaceState({ view: "browse", filter: next }, "", hash);
    }
  }

  function routeFromHash() {
    const hash = location.hash.replace(/^#/, "");
    if (hash.startsWith("entry/")) {
      showDetail(hash.slice(6), { historyMode: "none" });
      return;
    }
    if (hash.startsWith("browse/")) {
      const cat = hash.slice(7);
      if (["joins", "hems", "finishes", "stitches", "all"].includes(cat)) {
        activeFilter = cat === "all" ? "all" : cat;
      }
    }
    showBrowse();
  }

  listEl.addEventListener("click", (event) => {
    const row = event.target.closest(".entry-row");
    if (!row) return;
    showDetail(row.dataset.id, { historyMode: "push" });
  });

  document.querySelector(".filters")?.addEventListener("click", (event) => {
    const btn = event.target.closest(".filter");
    if (!btn) return;
    setFilter(btn.dataset.filter, { historyMode: "push" });
  });

  document.querySelector(".site-nav")?.addEventListener("click", (event) => {
    const link = event.target.closest("[data-filter]");
    if (!link) return;
    event.preventDefault();
    setFilter(link.dataset.filter, { historyMode: "push" });
  });

  function onSearch() {
    query = searchEl.value;
    if (currentEntryId) hideDetail({ historyMode: "replace" });
    else renderList();
  }

  searchEl.addEventListener("input", onSearch);
  searchEl.addEventListener("search", onSearch);
  searchEl.addEventListener("keyup", onSearch);

  backBtn.addEventListener("click", (event) => {
    event.preventDefault();
    hideDetail({ historyMode: "push" });
    document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" });
  });

  window.addEventListener("popstate", routeFromHash);
  window.addEventListener("hashchange", routeFromHash);

  routeFromHash();
})();
