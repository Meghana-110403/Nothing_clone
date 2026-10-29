/* =============================================================
   NOTHING — Sound Without Limits
   Vanilla JS: 3D interactions, configurator, bag
   ============================================================= */
(() => {
  "use strict";

  /* ---------------- Helpers ---------------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const money = (n) => "$" + n.toLocaleString("en-US");
  const reducedMotion = document.documentElement.classList.contains("reduce-motion");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const plusIcon =
    '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';

  /* ---------------- Product data ---------------- */
  const PRODUCTS = [
    {
      id: "ear-3",
      name: "Nothing Ear (3)",
      group: "nothing",
      type: "earbuds",
      typeLabel: "True wireless earbuds",
      price: 179,
      badge: "New",
      hot: true,
      tag: "Flagship sound. Zero noise.",
      colors: [
        { name: "Black", hex: "#2b2b2f", img: "Ear3-black.webp" },
        { name: "White", hex: "#e9e9eb", img: "Ear3-white_9c7c5465-3f29-4bb9-a438-7883444a6bad.webp" },
      ],
      specs: { "Noise cancellation": "45 dB", Playback: "40 h", Driver: "12 mm", Codec: "LDAC" },
    },
    {
      id: "ear-2",
      name: "Nothing Ear (2)",
      group: "nothing",
      type: "earbuds",
      typeLabel: "True wireless earbuds",
      price: 129,
      badge: "Icon",
      tag: "The one that started the quiet.",
      colors: [
        { name: "White", hex: "#eeeeef", img: "0000s_0023_Ear-white.webp" },
        { name: "Black", hex: "#1e1e22", img: "0000s_0024_Ear-black.webp" },
      ],
      specs: { "Noise cancellation": "40 dB", Playback: "36 h", Driver: "11.6 mm", Codec: "LHDC 5.0" },
    },
    {
      id: "ear-a",
      name: "Nothing Ear (a)",
      group: "nothing",
      type: "earbuds",
      typeLabel: "True wireless earbuds",
      price: 99,
      badge: "Best seller",
      hot: true,
      tag: "Playful colour. Serious sound.",
      colors: [
        { name: "Black", hex: "#232327", img: "product-thumbnail-black.webp" },
        { name: "White", hex: "#ececee", img: "product-thumbnail-white.webp" },
        { name: "Yellow", hex: "#f2c62c", img: "product-thumbnail-yellow.webp" },
        { name: "Pink", hex: "#ef5795", img: "product-thumbnail-pink.webp" },
      ],
      specs: { "Noise cancellation": "45 dB", Playback: "42.5 h", Driver: "11 mm", Codec: "LDAC" },
    },
    {
      id: "ear-open",
      name: "Nothing Ear (open)",
      group: "nothing",
      type: "earbuds",
      typeLabel: "Open-ear earbuds",
      price: 149,
      badge: "Open-ear",
      tag: "Nothing between you and the world.",
      colors: [{ name: "White", hex: "#e7e7e9", img: "0000s_0028_Ear-_open_-white.webp" }],
      specs: { "Noise cancellation": "Open-ear", Playback: "40 h", Driver: "14.2 mm", Codec: "AAC" },
    },
    {
      id: "headphone-1",
      name: "Nothing Headphone (1)",
      group: "nothing",
      type: "headphones",
      typeLabel: "Over-ear headphones",
      price: 299,
      badge: "Flagship",
      tag: "Studio detail, all-day comfort.",
      colors: [
        { name: "Black", hex: "#2a2a2e", img: "headphone-1-pro-black.webp" },
        { name: "White", hex: "#dcdcdf", img: "headphone-1-pro-white.webp" },
      ],
      specs: { "Noise cancellation": "42 dB", Playback: "80 h", Driver: "40 mm", Codec: "LDAC" },
    },
    {
      id: "headphone-a",
      name: "Nothing Headphone (a)",
      group: "nothing",
      type: "headphones",
      typeLabel: "Over-ear headphones",
      price: 199,
      badge: "New",
      hot: true,
      tag: "Colour outside the lines.",
      colors: [
        { name: "Black", hex: "#2a2a2c", img: "headphone-a-black-3_4-view-thumbnail.webp" },
        { name: "Pink", hex: "#f4a7bd", img: "headphone-a-pink-3_4-view-thumbnail.webp" },
        { name: "White", hex: "#ededee", img: "headphone-a-white-3_4-view-thumbnail_3ede899e-d741-4d53-aceb-3a722d449271.webp" },
        { name: "Yellow", hex: "#f3d02a", img: "headphone-a-yellow-3_4-view-thumbnail.webp" },
      ],
      specs: { "Noise cancellation": "40 dB", Playback: "70 h", Driver: "40 mm", Codec: "LDAC" },
    },
    {
      id: "buds-pro-2",
      name: "CMF Buds Pro 2",
      group: "cmf",
      type: "earbuds",
      typeLabel: "CMF by Nothing",
      price: 59,
      badge: "CMF",
      tag: "Noise down. Volume up.",
      colors: [
        { name: "Orange", hex: "#ff5b2e", img: "0000s_0069_CMF-Buds-Pro-2-case-orange.webp" },
        { name: "Light grey", hex: "#d6d3cc", img: "0000s_0070_CMF-Buds-Pro-2-case-lightgrey.webp" },
        { name: "Blue", hex: "#5f7dff", img: "0000s_0071_CMF-Buds-Pro-2-case-blue.webp" },
        { name: "Black", hex: "#2d2d31", img: "0000s_0072_CMF-Buds-Pro-2-case-black.webp" },
      ],
      specs: { "Noise cancellation": "50 dB", Playback: "43 h", Driver: "11 mm", Codec: "LDAC" },
    },
    {
      id: "buds-2",
      name: "CMF Buds 2",
      group: "cmf",
      type: "earbuds",
      typeLabel: "CMF by Nothing",
      price: 49,
      badge: "CMF",
      tag: "Big sound, small footprint.",
      colors: [
        { name: "Orange", hex: "#ff6a34", img: "0000s_0076_CMF-Buds-2-case-orange.webp" },
        { name: "Light green", hex: "#b7e3a1", img: "0000s_0077_CMF-Buds-2-case-lightgreen.webp" },
        { name: "Dark grey", hex: "#4a4a50", img: "0000s_0078_CMF-Buds-2-case-darkgrey.webp" },
      ],
      specs: { "Noise cancellation": "48 dB", Playback: "35.5 h", Driver: "12.4 mm", Codec: "AAC" },
    },
    {
      id: "buds-2-plus",
      name: "CMF Buds 2 Plus",
      group: "cmf",
      type: "earbuds",
      typeLabel: "CMF by Nothing",
      price: 45,
      badge: "CMF",
      tag: "Quiet, without the price.",
      colors: [
        { name: "Light grey", hex: "#d9d6cf", img: "0000s_0079_CMF-Buds-2-Plus-case-lightgrey.webp" },
        { name: "Blue", hex: "#7fa7ff", img: "0000s_0080_CMF-Buds-2-Plus-case-blue.webp" },
      ],
      specs: { "Noise cancellation": "50 dB", Playback: "55 h", Driver: "12.4 mm", Codec: "LDAC" },
    },
    {
      id: "buds-2a",
      name: "CMF Buds 2a",
      group: "cmf",
      type: "earbuds",
      typeLabel: "CMF by Nothing",
      price: 35,
      badge: "CMF",
      tag: "Small buds. Big sound.",
      colors: [
        { name: "Orange", hex: "#ff5a2b", img: "0000s_0073_CMF-Buds-2a-case-orange.webp" },
        { name: "Light grey", hex: "#d9d6d0", img: "0000s_0074_CMF-Buds-2a-case-lightgrey.webp" },
        { name: "Black", hex: "#2c2c30", img: "0000s_0075_CMF-Buds-2a-case-black.webp" },
      ],
      specs: { "Noise cancellation": "42 dB", Playback: "37 h", Driver: "12 mm", Codec: "AAC" },
    },
    {
      id: "headphone-pro",
      name: "CMF Headphone Pro",
      group: "cmf",
      type: "headphones",
      typeLabel: "CMF by Nothing",
      price: 79,
      badge: "CMF",
      hot: true,
      tag: "Pro sound. Everyday price.",
      colors: [
        { name: "Dark grey", hex: "#4b4b52", img: "cmf-headphone-pro-dark-grey-3_4-view-thumbnail.webp" },
        { name: "Light green", hex: "#a8d8c8", img: "cmf-headphone-pro-light-green-3_4-view-thumbnail.webp" },
        { name: "Light grey", hex: "#d5d3cf", img: "cmf-headphone-pro-light-grey-3_4-view-thumbnail.webp" },
      ],
      specs: { "Noise cancellation": "40 dB", Playback: "100 h", Driver: "40 mm", Codec: "LDAC" },
    },
  ];

  const byId = (id) => PRODUCTS.find((p) => p.id === id);
  const EAR3 = byId("ear-3");

  const setMask = (el, src) => {
    if (!el) return;
    const url = new URL(src, document.baseURI).href;
    el.style.setProperty("--mask-img", `url("${url}")`);
  };

  /* ---------------- Loader ---------------- */
  const loader = $("#loader");
  const loaderBar = $("#loaderBar");
  const loaderPct = $("#loaderPct");
  let loaderProgress = 0;
  let loaderDone = false;

  if (loader) {
    const tick = setInterval(() => {
      loaderProgress = Math.min(loaderProgress + 6 + Math.random() * 14, 94);
      loaderBar.style.width = loaderProgress + "%";
      loaderPct.textContent = Math.round(loaderProgress) + "%";
    }, 110);

    const finish = () => {
      if (loaderDone) return;
      loaderDone = true;
      clearInterval(tick);
      loaderBar.style.width = "100%";
      loaderPct.textContent = "100%";
      setTimeout(() => {
        loader.classList.add("is-done");
        document.body.classList.remove("is-loading");
        setTimeout(() => document.body.classList.add("is-ready"), 500);
      }, 320);
    };

    window.addEventListener("load", () => setTimeout(finish, 420));
    setTimeout(finish, 3200); // safety net for slow fonts or images
  } else {
    document.body.classList.remove("is-loading");
    document.body.classList.add("is-ready");
  }

  /* ---------------- Scroll: nav, progress, glow ---------------- */
  const nav = $("#nav");
  const progressFill = $("#scrollProgress");
  let scrollTicking = false;

  const onScrollFrame = () => {
    const y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle("is-scrolled", y > 24);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progressFill) progressFill.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
    scrollTicking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(onScrollFrame);
      }
    },
    { passive: true }
  );
  onScrollFrame();

  // Pointer glow
  const glow = $("#pointerGlow");
  if (glow && finePointer) {
    let gx = 0, gy = 0, glowTicking = false;
    window.addEventListener(
      "pointermove",
      (e) => {
        gx = e.clientX;
        gy = e.clientY;
        document.body.classList.add("has-pointer");
        if (!glowTicking) {
          glowTicking = true;
          requestAnimationFrame(() => {
            glow.style.transform = `translate3d(${gx - 260}px, ${gy - 260}px, 0)`;
            glowTicking = false;
          });
        }
      },
      { passive: true }
    );
  }

  /* ---------------- Reveal on scroll ---------------- */
  const revealEls = $$("[data-reveal]");
  if ("IntersectionObserver" in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ---------------- Newsletter ---------------- */
  const joinForm = $("#joinForm");
  const joinNote = $("#joinNote");
  const emailInput = $("#email");
  if (joinForm) {
    joinNote.setAttribute("aria-live", "polite");
    joinForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const value = (emailInput.value || "").trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
      if (!valid) {
        joinNote.textContent = "That email doesn't look quite right — try again.";
        joinNote.classList.add("is-error");
        joinNote.classList.remove("is-ok");
        emailInput.focus();
        return;
      }
      joinNote.textContent = "You're on the list. Watch your inbox.";
      joinNote.classList.remove("is-error");
      joinNote.classList.add("is-ok");
      emailInput.value = "";
      showToast("Welcome to the drop list");
    });
  }

  /* ---------------- Toast ---------------- */
  const toast = $("#toast");
  let toastTimer;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
  }

  /* ---------------- Hero tilt + idle sway ---------------- */
  const heroVisual = $(".hero__visual");
  const heroProduct = $("#heroProduct");
  if (heroVisual && heroProduct && !reducedMotion) {
    let targetY = 0;
    let targetX = 0;
    let curY = 0;
    let curX = 0;
    let hovering = false;

    // JS drives the transform every frame, so drop the CSS transition.
    heroProduct.style.transition = "none";

    if (finePointer) {
      heroVisual.addEventListener("pointermove", (e) => {
        const rect = heroVisual.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        hovering = true;
        targetY = x * 22;
        targetX = -y * 18;
      });
      heroVisual.addEventListener("pointerleave", () => {
        hovering = false;
      });
    }

    const heroLoop = (now) => {
      if (!hovering) {
        targetY = Math.sin(now / 2800) * 7;
        targetX = Math.sin(now / 3600 + 0.8) * 3.5;
      }
      curY += (targetY - curY) * 0.055;
      curX += (targetX - curX) * 0.055;
      heroProduct.style.transform = `rotateY(${curY.toFixed(2)}deg) rotateX(${curX.toFixed(2)}deg)`;
      requestAnimationFrame(heroLoop);
    };
    requestAnimationFrame(heroLoop);
  }

  /* ---------------- Sticky 3D showcase ---------------- */
  const showcase = $("#showcase") || $(".showcase");
  const stageProduct = $("#stageProduct");
  const stageImg = $("#stageImg");
  const stageIndex = $("#stageIndex");
  const panelProgress = $("#panelProgress");
  const panels = $$(".panel");
  const stageSpec = $("#stageSpec");
  const stageSpecValue = $(".stage__spec-value");
  const stageSpecLabel = $(".stage__spec-label");

  const PANEL_META = [
    { index: "01", value: "45 dB", label: "Noise cancelled" },
    { index: "02", value: "12 mm", label: "Ceramic driver" },
    { index: "03", value: "40 h", label: "Total playback" },
  ];

  let stageRY = -30;
  let stageRX = 12;
  let stageMouseX = 0;
  let stageMouseY = 0;
  let activePanel = 0;
  let specSwapTimer;

  const stackedQuery = window.matchMedia("(max-width: 980px) and (max-height: 720px)");
  let showcaseStacked = stackedQuery.matches;

  const syncPanelAria = () => {
    panels.forEach((panel, i) => {
      panel.setAttribute("aria-hidden", showcaseStacked || i === activePanel ? "false" : "true");
    });
  };
  syncPanelAria();

  stackedQuery.addEventListener?.("change", (event) => {
    showcaseStacked = event.matches;
    syncPanelAria();
  });

  if (showcase && stageProduct) {
    setMask(stageProduct, EAR3.colors[0].img);

    const stageWrap = $(".showcase__stage-wrap");
    if (stageWrap && finePointer && !reducedMotion) {
      stageWrap.addEventListener("pointermove", (e) => {
        const r = stageWrap.getBoundingClientRect();
        stageMouseX = ((e.clientX - r.left) / r.width - 0.5) * 2;
        stageMouseY = ((e.clientY - r.top) / r.height - 0.5) * 2;
      });
      stageWrap.addEventListener("pointerleave", () => {
        stageMouseX = 0;
        stageMouseY = 0;
      });
    }

    let stageColorIndex = 0;
    let colorCyclePaused = false;
    let colorCycleResume;
    let lastColorCycle = performance.now();
    const stageColorsWrap = $("#stageColors");

    const applyStageColor = (i) => {
      const color = EAR3.colors[i];
      if (!color || !stageColorsWrap) return;
      stageColorIndex = i;
      $$(".color-dot", stageColorsWrap).forEach((btn, bi) => {
        btn.classList.toggle("is-active", bi === i);
        btn.setAttribute("aria-pressed", String(bi === i));
      });
      switchStageImage(color.img);
    };

    const pauseColorCycle = (ms) => {
      colorCyclePaused = true;
      clearTimeout(colorCycleResume);
      if (ms) {
        colorCycleResume = setTimeout(() => {
          colorCyclePaused = false;
          lastColorCycle = performance.now();
        }, ms);
      }
    };

    const resumeColorCycle = () => {
      clearTimeout(colorCycleResume);
      colorCyclePaused = false;
      lastColorCycle = performance.now();
    };

    const buildStageColors = () => {
      if (!stageColorsWrap) return;
      stageColorsWrap.innerHTML = EAR3.colors
        .map(
          (c, i) =>
            `<button class="color-dot ${i === 0 ? "is-active" : ""}" type="button" style="--sw:${c.hex}" data-stage-color="${i}" aria-label="Ear (3) in ${c.name}" aria-pressed="${i === 0}" title="${c.name}"></button>`
        )
        .join("");

      stageColorsWrap.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-stage-color]");
        if (!btn) return;
        const i = Number(btn.dataset.stageColor);
        if (btn.classList.contains("is-active")) return;
        applyStageColor(i);
        pauseColorCycle(9000);
      });
    };

    const switchStageImage = (src) => {
      if (!stageImg || stageImg.getAttribute("src") === src) return;
      stageImg.style.opacity = "0";
      const preload = new Image();
      preload.onload = () => {
        stageImg.src = src;
        setMask(stageProduct, src);
        requestAnimationFrame(() => {
          stageImg.style.opacity = "1";
        });
      };
      preload.src = src;
    };

    buildStageColors();

    // Hovering the stage holds the current colourway; leaving resumes the cycle.
    const stageZone = $(".showcase__stage-wrap") || $(".stage");
    if (stageZone && finePointer) {
      stageZone.addEventListener("pointerenter", () => pauseColorCycle());
      stageZone.addEventListener("pointerleave", resumeColorCycle);
    }

    const updatePanels = (p) => {
      const idx = p < 0.34 ? 0 : p < 0.68 ? 1 : 2;
      if (idx === activePanel) return;
      activePanel = idx;
      panels.forEach((panel, i) => {
        panel.classList.toggle("is-active", i === idx);
      });
      syncPanelAria();
      if (stageIndex) stageIndex.textContent = PANEL_META[idx].index;
      if (stageSpec) {
        stageSpec.classList.add("is-swap");
        clearTimeout(specSwapTimer);
        specSwapTimer = setTimeout(() => {
          if (stageSpecValue) stageSpecValue.textContent = PANEL_META[idx].value;
          if (stageSpecLabel) stageSpecLabel.textContent = PANEL_META[idx].label;
          stageSpec.classList.remove("is-swap");
        }, 200);
      }
    };

    let lastFrameTime = 0;

    const stageFrame = (snap = false) => {
      const rect = showcase.getBoundingClientRect();
      const inView = rect.bottom > -300 && rect.top < window.innerHeight + 300;
      if (inView) {
        const total = showcase.offsetHeight - window.innerHeight;
        const p = showcaseStacked
          ? clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0, 1)
          : total > 0
            ? clamp(-rect.top / total, 0, 1)
            : 0;

        const now = performance.now();

        if (!reducedMotion) {
          // Scroll drives the pose; a slow drift keeps the product alive at rest.
          const idleRY = Math.sin(now / 2400) * 9;
          const idleRX = Math.sin(now / 3300 + 1.1) * 4;
          const idleY = Math.sin(now / 2000 + 0.4) * 9;
          const targetRY = -32 + p * 64 + stageMouseX * 7 + idleRY;
          const targetRX = 14 - p * 26 + stageMouseY * -5 + idleRX;
          const scale = 0.94 + p * 0.12;
          const ease = snap ? 1 : 0.09;
          stageRY += (targetRY - stageRY) * ease;
          stageRX += (targetRX - stageRX) * ease;
          stageProduct.style.transform = `translateY(${idleY.toFixed(2)}px) rotateX(${stageRX.toFixed(2)}deg) rotateY(${stageRY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        }

        if (!colorCyclePaused && !document.hidden && now - lastColorCycle > 5500) {
          lastColorCycle = now;
          applyStageColor((stageColorIndex + 1) % EAR3.colors.length);
        }

        if (panelProgress) panelProgress.style.width = (p * 100).toFixed(1) + "%";
        updatePanels(p);
      }
    };

    const stageLoop = () => {
      lastFrameTime = performance.now();
      stageFrame(false);
      requestAnimationFrame(stageLoop);
    };
    requestAnimationFrame(stageLoop);
    // Fallback for throttled frames: snap while scrolling if the frame loop is stalled.
    const onStageScroll = () => stageFrame(performance.now() - lastFrameTime > 140);
    window.addEventListener("scroll", onStageScroll, { passive: true });
    window.addEventListener("resize", onStageScroll, { passive: true });
  }

  /* ---------------- Lineup ---------------- */
  const grid = $("#productGrid");
  const gridStatus = $("#gridStatus");
  const filterButtons = $$(".filter");
  let currentFilter = "all";

  const matchesFilter = (product, filter) => {
    if (filter === "all") return true;
    if (filter === "cmf") return product.group === "cmf";
    return product.type === filter;
  };

  const cardTemplate = (product, i) => {
    const first = product.colors[0];
    return `
      <article class="card" data-id="${product.id}" data-type="${product.type}" data-group="${product.group}" data-color="0" style="animation-delay:${Math.min(i * 0.04, 0.4)}s">
        <div class="card__inner">
          <div class="card__glow"></div>
          <div class="card__top">
            <span class="badge${product.hot ? " badge--hot" : ""}">${product.badge}</span>
            <span class="card__index mono">${String(i + 1).padStart(2, "0")}</span>
          </div>
          <div class="card__media">
            <img src="${first.img}" alt="${product.name} in ${first.name}" width="600" height="600" loading="lazy" decoding="async" />
          </div>
          <div class="card__body">
            <h3 class="card__name">${product.name}</h3>
            <p class="card__sub">${product.typeLabel}</p>
            <div class="card__row">
              <div class="swatches" role="group" aria-label="${product.name} colours">
                ${product.colors
                  .map(
                    (c, ci) =>
                      `<button class="swatch${ci === 0 ? " is-active" : ""}" type="button" style="--sw:${c.hex}" data-color-index="${ci}" aria-label="${c.name}" aria-pressed="${ci === 0}" title="${c.name}"></button>`
                  )
                  .join("")}
              </div>
              <span class="price">${money(product.price)}</span>
            </div>
            <button class="card__add" type="button" data-add="${product.id}">
              <span>Add to bag</span>
              ${plusIcon}
            </button>
          </div>
        </div>
      </article>`;
  };

  function renderGrid() {
    if (!grid) return;
    grid.innerHTML = PRODUCTS.map(cardTemplate).join("");
    applyFilter(currentFilter, false);
  }

  function applyFilter(filter, announce = true) {
    currentFilter = filter;
    filterButtons.forEach((btn) => {
      const active = btn.dataset.filter === filter;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });

    let visible = 0;
    $$(".card", grid).forEach((card) => {
      const product = byId(card.dataset.id);
      const show = matchesFilter(product, filter);
      card.classList.toggle("is-hidden", !show);
      if (show) {
        visible += 1;
        card.style.animation = "none";
        void card.offsetWidth;
        card.style.animation = "";
      }
    });

    if (announce && gridStatus) {
      gridStatus.textContent = `Showing ${visible} ${visible === 1 ? "product" : "products"}.`;
    }
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => applyFilter(btn.dataset.filter));
  });

  // Deep-link nav labels to filters
  $$('a[href="#lineup"]').forEach((link) => {
    const label = link.textContent.trim().toLowerCase();
    link.addEventListener("click", () => {
      if (label.includes("headphone")) applyFilter("headphones", false);
      else if (label.includes("earbud")) applyFilter("earbuds", false);
      else if (label.includes("all products")) applyFilter("all", false);
    });
  });

  // Card interactions (delegated)
  if (grid) {
    grid.addEventListener("click", (e) => {
      const swatch = e.target.closest(".swatch");
      if (swatch) {
        const card = swatch.closest(".card");
        const product = byId(card.dataset.id);
        const index = Number(swatch.dataset.colorIndex);
        const color = product.colors[index];
        const img = $(".card__media img", card);
        if (img && color) {
          img.style.opacity = "0";
          const pre = new Image();
          pre.onload = () => {
            img.src = color.img;
            img.alt = `${product.name} in ${color.name}`;
            img.style.opacity = "1";
          };
          pre.src = color.img;
          card.dataset.color = String(index);
          $$(".swatch", card).forEach((s) => {
            const active = s === swatch;
            s.classList.toggle("is-active", active);
            s.setAttribute("aria-pressed", String(active));
          });
        }
        return;
      }

      const addBtn = e.target.closest("[data-add]");
      if (addBtn) {
        const card = addBtn.closest(".card");
        const product = byId(addBtn.dataset.add);
        const colorIndex = Number(card.dataset.color || 0);
        addToBag(product, colorIndex);
        addBtn.classList.add("is-added");
        const label = $("span", addBtn);
        if (label) {
          const original = label.textContent;
          label.textContent = "Added";
          setTimeout(() => {
            label.textContent = original;
            addBtn.classList.remove("is-added");
          }, 1300);
        }
      }
    });

    // 3D tilt on cards
    if (finePointer && !reducedMotion) {
      grid.addEventListener(
        "pointermove",
        (e) => {
          const card = e.target.closest(".card");
          if (!card) return;
          const inner = $(".card__inner", card);
          const rect = card.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width;
          const py = (e.clientY - rect.top) / rect.height;
          card.classList.add("is-tilting");
          inner.style.setProperty("--rx", ((0.5 - py) * 7).toFixed(2) + "deg");
          inner.style.setProperty("--ry", ((px - 0.5) * 9).toFixed(2) + "deg");
          inner.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
          inner.style.setProperty("--my", (py * 100).toFixed(1) + "%");
        },
        { passive: true }
      );

      grid.addEventListener(
        "pointerout",
        (e) => {
          const card = e.target.closest(".card");
          if (!card || card.contains(e.relatedTarget)) return;
          const inner = $(".card__inner", card);
          card.classList.remove("is-tilting");
          inner.style.setProperty("--rx", "0deg");
          inner.style.setProperty("--ry", "0deg");
        },
        { passive: true }
      );
    }
  }

  /* ---------------- Explorer / configurator ---------------- */
  const explorerProduct = $("#explorerProduct");
  const explorerImg = $("#explorerImg");
  const picker = $("#picker");
  const exName = $("#exName");
  const exTag = $("#exTag");
  const exPrice = $("#exPrice");
  const exSpecs = $("#exSpecs");
  const exColors = $("#exColors");
  const exColorName = $("#exColorName");
  const exAdd = $("#exAdd");

  const exState = { id: "ear-3", color: 0, rotY: -18, rotX: 6, restY: -18, restX: 6, dragging: false, startX: 0, startRot: 0, moved: false };

  const exProduct = () => byId(exState.id);

  const applyExplorerTransform = () => {
    if (!explorerProduct || reducedMotion) return;
    explorerProduct.style.transform = `rotateX(${exState.rotX}deg) rotateY(${exState.rotY}deg)`;
  };

  function renderPicker() {
    if (!picker) return;
    picker.innerHTML = PRODUCTS.map(
      (p) =>
        `<button class="picker__chip${p.id === exState.id ? " is-active" : ""}" type="button" aria-pressed="${p.id === exState.id}" data-pick="${p.id}">${p.name.replace("Nothing ", "").replace("CMF ", "")}</button>`
    ).join("");
  }

  function renderExplorer() {
    const product = exProduct();
    if (!product) return;
    exState.color = clamp(exState.color, 0, product.colors.length - 1);
    const color = product.colors[exState.color];

    if (exName) exName.textContent = product.name;
    if (exTag) exTag.textContent = product.tag;
    if (exPrice) exPrice.textContent = money(product.price);
    if (exColorName) exColorName.textContent = color.name;

    if (exSpecs) {
      exSpecs.innerHTML = Object.entries(product.specs)
        .map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`)
        .join("");
    }

    if (exColors) {
      exColors.innerHTML = product.colors
        .map(
          (c, i) =>
            `<button class="swatch${i === exState.color ? " is-active" : ""}" type="button" style="--sw:${c.hex}" data-ex-color="${i}" aria-label="${c.name}" aria-pressed="${i === exState.color}" title="${c.name}"></button>`
        )
        .join("");
    }

    if (explorerImg) explorerImg.alt = `${product.name} in ${color.name}`;
    setMask(explorerProduct, color.img);
  }

  function selectProduct(id) {
    const product = byId(id);
    if (!product || id === exState.id) return;

    exState.id = id;
    exState.color = 0;
    $$(".picker__chip", picker).forEach((chip) => {
      const active = chip.dataset.pick === id;
      chip.classList.toggle("is-active", active);
      chip.setAttribute("aria-pressed", String(active));
    });

    const color = product.colors[0];
    if (explorerProduct) explorerProduct.classList.add("is-swapping");

    setTimeout(() => {
      if (explorerImg) {
        explorerImg.src = color.img;
        explorerImg.alt = `${product.name} in ${color.name}`;
      }
      renderExplorer();
      exState.rotY = -18;
      exState.restY = -18;
      exState.restX = 6;
      applyExplorerTransform();
      if (explorerProduct) explorerProduct.classList.remove("is-swapping");
    }, 200);
  }

  if (explorerProduct && explorerImg) {
    renderPicker();
    renderExplorer();
    applyExplorerTransform();
    setMask(explorerProduct, exProduct().colors[0].img);

    picker.addEventListener("click", (e) => {
      const chip = e.target.closest("[data-pick]");
      if (chip) selectProduct(chip.dataset.pick);
    });

    exColors.addEventListener("click", (e) => {
      const swatch = e.target.closest("[data-ex-color]");
      if (!swatch) return;
      const i = Number(swatch.dataset.exColor);
      if (i === exState.color) return;
      exState.color = i;
      const product = exProduct();
      const color = product.colors[i];
      explorerImg.style.opacity = "0";
      const pre = new Image();
      pre.onload = () => {
        explorerImg.src = color.img;
        explorerImg.alt = `${product.name} in ${color.name}`;
        setMask(explorerProduct, color.img);
        requestAnimationFrame(() => {
          explorerImg.style.opacity = "1";
        });
      };
      pre.src = color.img;
      renderExplorer();
    });

    // Drag to rotate
    explorerProduct.style.touchAction = "pan-y";
    explorerProduct.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      exState.dragging = true;
      exState.moved = false;
      exState.startX = e.clientX;
      exState.startRot = exState.rotY;
      explorerProduct.classList.add("is-dragging");
      explorerProduct.setPointerCapture?.(e.pointerId);
    });

    explorerProduct.addEventListener("pointermove", (e) => {
      if (!exState.dragging) return;
      const dx = e.clientX - exState.startX;
      if (Math.abs(dx) > 3) exState.moved = true;
      exState.rotY = exState.startRot + dx * 0.45;
      applyExplorerTransform();
    });

    const endDrag = (e) => {
      if (!exState.dragging) return;
      exState.dragging = false;
      exState.restY = exState.rotY;
      exState.restX = exState.rotX;
      explorerProduct.classList.remove("is-dragging");
      explorerProduct.releasePointerCapture?.(e.pointerId);
    };
    explorerProduct.addEventListener("pointerup", endDrag);
    explorerProduct.addEventListener("pointercancel", endDrag);

    // Idle sway when the product isn't being dragged.
    if (!reducedMotion) {
      const explorerLoop = (now) => {
        if (!exState.dragging) {
          const targetY = exState.restY + Math.sin(now / 3000) * 9;
          const targetX = exState.restX + Math.sin(now / 4000 + 0.7) * 3;
          exState.rotY += (targetY - exState.rotY) * 0.04;
          exState.rotX += (targetX - exState.rotX) * 0.04;
          applyExplorerTransform();
        }
        requestAnimationFrame(explorerLoop);
      };
      requestAnimationFrame(explorerLoop);
    }

    // Keyboard rotation
    explorerProduct.setAttribute("tabindex", "0");
    explorerProduct.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        exState.rotY += e.key === "ArrowLeft" ? -18 : 18;
        exState.restY = exState.rotY;
        applyExplorerTransform();
      }
    });

    exAdd.addEventListener("click", () => {
      addToBag(exProduct(), exState.color);
    });
  }

  /* ---------------- Bag ---------------- */
  const BAG_KEY = "nothing.bag.v1";
  const bagDrawer = $("#bagDrawer");
  const bagBtn = $("#bagBtn");
  const bagClose = $("#bagClose");
  const bagItemsEl = $("#bagItems");
  const bagTotalEl = $("#bagTotal");
  const bagSummaryEl = $("#bagSummary");
  const bagCountEl = $("#bagCount");
  const overlay = $("#overlay");
  const checkoutBtn = $("#checkoutBtn");
  const bagClear = $("#bagClear");

  let bag = [];

  try {
    const raw = localStorage.getItem(BAG_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) {
      bag = parsed.filter((item) => item && byId(item.id) && typeof item.qty === "number");
    }
  } catch {
    bag = [];
  }

  const saveBag = () => {
    try {
      localStorage.setItem(BAG_KEY, JSON.stringify(bag));
    } catch {
      /* storage unavailable — cart stays in memory */
    }
  };

  const bagCount = () => bag.reduce((sum, item) => sum + item.qty, 0);
  const bagTotal = () => bag.reduce((sum, item) => sum + item.price * item.qty, 0);

  function addToBag(product, colorIndex = 0) {
    if (!product) return;
    const color = product.colors[colorIndex] || product.colors[0];
    const key = `${product.id}::${color.name}`;
    const existing = bag.find((item) => item.key === key);

    if (existing) {
      existing.qty = Math.min(existing.qty + 1, 9);
    } else {
      bag.push({
        key,
        id: product.id,
        name: product.name,
        color: color.name,
        img: color.img,
        price: product.price,
        qty: 1,
      });
    }

    saveBag();
    renderBag();
    showToast(`${product.name} — ${color.name} added to bag`);
    if (bagCountEl) {
      bagCountEl.classList.remove("is-bump");
      void bagCountEl.offsetWidth;
      bagCountEl.classList.add("is-bump");
    }
  }

  function renderBag() {
    const count = bagCount();

    if (bagCountEl) bagCountEl.textContent = String(count);
    if (bagSummaryEl) bagSummaryEl.textContent = `${count} ${count === 1 ? "item" : "items"}`;
    if (bagTotalEl) bagTotalEl.textContent = money(bagTotal());
    if (bagClear) bagClear.style.display = bag.length ? "block" : "none";
    if (checkoutBtn) checkoutBtn.disabled = bag.length === 0;

    if (!bagItemsEl) return;

    if (!bag.length) {
      bagItemsEl.innerHTML = `
        <div class="bag__empty">
          <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
          <strong>Your bag is empty</strong>
          <p>Nothing in here yet. Add a little silence to your day.</p>
        </div>`;
      return;
    }

    bagItemsEl.innerHTML = bag
      .map(
        (item) => `
        <div class="bag-item" data-key="${item.key}">
          <div class="bag-item__thumb"><img src="${item.img}" alt="${item.name} in ${item.color}" width="120" height="120" loading="lazy" /></div>
          <div class="bag-item__main">
            <p class="bag-item__name">${item.name}</p>
            <p class="bag-item__meta">${item.color}</p>
            <div class="bag-item__qty">
              <button type="button" data-action="dec" aria-label="Decrease quantity of ${item.name}">−</button>
              <span>${item.qty}</span>
              <button type="button" data-action="inc" aria-label="Increase quantity of ${item.name}">+</button>
            </div>
          </div>
          <div>
            <p class="bag-item__price">${money(item.price * item.qty)}</p>
            <button class="bag-item__remove" type="button" data-action="remove" aria-label="Remove ${item.name} from bag">Remove</button>
          </div>
        </div>`
      )
      .join("");
  }

  if (bagItemsEl) {
    bagItemsEl.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;
      const row = btn.closest("[data-key]");
      if (!row) return;
      const item = bag.find((entry) => entry.key === row.dataset.key);
      if (!item) return;

      if (btn.dataset.action === "inc") item.qty = Math.min(item.qty + 1, 9);
      if (btn.dataset.action === "dec") item.qty -= 1;
      if (btn.dataset.action === "remove") item.qty = 0;

      if (item.qty <= 0) bag = bag.filter((entry) => entry !== item);
      saveBag();
      renderBag();
    });
  }

  let bagTrigger = null;

  function openBag() {
    if (!bagDrawer) return;
    bagTrigger = document.activeElement;
    if (overlay) {
      overlay.hidden = false;
      void overlay.offsetWidth;
      overlay.classList.add("is-visible");
    }
    bagDrawer.classList.add("is-open");
    bagDrawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    setTimeout(() => bagClose?.focus(), 120);
  }

  function closeBag() {
    if (!bagDrawer || !bagDrawer.classList.contains("is-open")) return;
    bagDrawer.classList.remove("is-open");
    bagDrawer.setAttribute("aria-hidden", "true");
    if (overlay) {
      overlay.classList.remove("is-visible");
      setTimeout(() => {
        if (!bagDrawer.classList.contains("is-open")) overlay.hidden = true;
      }, 450);
    }
    document.body.classList.remove("no-scroll");
    if (bagTrigger && typeof bagTrigger.focus === "function") bagTrigger.focus();
  }

  bagBtn?.addEventListener("click", openBag);
  bagClose?.addEventListener("click", closeBag);
  overlay?.addEventListener("click", closeBag);
  checkoutBtn?.addEventListener("click", () => {
    if (!bag.length) return;
    showToast("Checkout is a demo — no payment was taken.");
  });
  bagClear?.addEventListener("click", () => {
    bag = [];
    saveBag();
    renderBag();
    showToast("Bag cleared");
  });

  // Focus trap inside drawer
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (bagDrawer?.classList.contains("is-open")) closeBag();
      closeMobileMenu();
    }

    if (e.key === "Tab" && bagDrawer?.classList.contains("is-open")) {
      const focusables = $$(
        'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        bagDrawer
      ).filter((el) => el.offsetParent !== null);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  renderBag();

  /* ---------------- Mobile menu ---------------- */
  const burger = $("#burger");
  const mobileMenu = $("#mobileMenu");

  function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add("is-open");
    mobileMenu.setAttribute("aria-hidden", "false");
    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", "Close menu");
    document.body.classList.add("no-scroll");
  }

  function closeMobileMenu() {
    if (!mobileMenu || !mobileMenu.classList.contains("is-open")) return;
    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("no-scroll");
  }

  burger?.addEventListener("click", () => {
    if (mobileMenu.classList.contains("is-open")) closeMobileMenu();
    else openMobileMenu();
  });

  $$("a", mobileMenu || document.createElement("div")).forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  /* ---------------- Stats counters ---------------- */
  const counters = $$("[data-count]");
  if (counters.length) {
    const animateCount = (el) => {
      const target = Number(el.dataset.count);
      const duration = 1500;
      const start = performance.now();
      const step = (now) => {
        const t = clamp((now - start) / duration, 0, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = String(Math.round(target * eased));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if ("IntersectionObserver" in window && !reducedMotion) {
      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              counterObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach((el) => counterObserver.observe(el));
    } else {
      counters.forEach((el) => (el.textContent = el.dataset.count));
    }
  }

  /* ---------------- Motion preference ---------------- */
  const motionPill = $("#motionPill");
  const motionToggle = $("#motionToggle");
  const motionState = $("#motionState");

  if (motionPill) motionPill.classList.toggle("is-visible", reducedMotion);
  if (motionToggle) motionToggle.setAttribute("aria-pressed", String(!reducedMotion));
  if (motionState) motionState.textContent = reducedMotion ? "Off" : "On";

  const setMotion = (enabled) => {
    try {
      localStorage.setItem("nothing.motion", enabled ? "on" : "off");
      sessionStorage.setItem("nothing.scroll", String(window.scrollY));
    } catch {
      /* storage unavailable */
    }
    window.location.reload();
  };

  motionPill?.addEventListener("click", () => setMotion(true));
  motionToggle?.addEventListener("click", () => setMotion(reducedMotion));

  /* ---------------- Preload product images ---------------- */
  setTimeout(() => {
    PRODUCTS.forEach((product) => {
      product.colors.forEach((color) => {
        const img = new Image();
        img.src = color.img;
      });
    });
  }, 1800);

  /* ---------------- Init ---------------- */
  renderGrid();
  if (gridStatus) gridStatus.textContent = "Showing 11 products.";
})();
