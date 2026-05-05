
  // ── Nav scroll ──
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ── Hamburger ──
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
  document.getElementById('mobileClose').addEventListener('click', () => mobileMenu.classList.remove('open'));
  function closeMobile() { mobileMenu.classList.remove('open'); }

  // ── Intersection Observer for fade-up + skill bars ──
  const fadeEls = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => observer.observe(el));

  // Skill bars
  const barObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.transform = `scaleX(${bar.dataset.width})`;
          bar.classList.add('animated');
        });
        barObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skill-cat').forEach(el => barObs.observe(el));

  // ── Portfolio filter ──
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach(card => {
        if (filter === 'all' || card.dataset.cat === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ── Contact form ──
  const contactForm = document.getElementById('contactForm');
  const formResult = document.getElementById('form-result');
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type=submit]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: new FormData(contactForm)
      });
      const data = await res.json();
      if (data.success) {
        formResult.innerHTML = '<p style="color:var(--mint);margin-top:.75rem;">✅ Message sent! I\'ll get back to you soon.</p>';
        contactForm.reset();
      } else {
        formResult.innerHTML = '<p style="color:#f87171;margin-top:.75rem;">Something went wrong. Please email me directly.</p>';
      }
    } catch {
      formResult.innerHTML = '<p style="color:#f87171;margin-top:.75rem;">Network error. Please try again.</p>';
    }
    btn.textContent = 'Send Message ✉️';
    btn.disabled = false;
  });

  // ── Smooth active nav on scroll ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--white)' : '';
    });
  });




Fancybox.bind("[data-fancybox]", {
  // Your custom options
});
















// Web3Froms Ajax Form Submission
const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  console.log(formData);
  console.log(object);
  
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-green-500");
      } else {
        console.log(response);
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-red-500");
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 5000);
    });
});


/* ══════════════════════════════════════
   PROJECT DATA
════════════════════════════════════════ */
const PROJECTS = {
  1: {
    id: 1,
    cat: "UI/UX Design",
    title: "UI/UX Design —\nApp Solution",
    titleHtml: "UI/UX Design — <em>App Solution</em>",
    sub: "A complete UI/UX design project including wireframes, user flows, and high-fidelity prototypes. Focused on creating intuitive, accessible, and visually refined mobile app interfaces.",
    heroGradient: "linear-gradient(135deg,#0f0c29 0%,#302b63 50%,#24243e 100%)",
    heroEmoji: "📱",
    filter: "design",
    meta: [
      {label:"Category",   value:"UI/UX Design"},
      {label:"Tools",      value:"Figma, Adobe XD"},
      {label:"Type",       value:"Mobile App"},
      {label:"Status",     value:"Completed"},
      {label:"Year",       value:"2024"},
    ],
    overview: `This project involved designing a complete mobile application from the ground up — starting with extensive user research and persona mapping, through to low-fidelity wireframes, interactive prototypes, and a final polished high-fidelity UI system.
    
The design process focused on creating a seamless user experience with clear information architecture, accessible color contrasts, and micro-interactions that feel natural and delightful.`,
    features: [
      "Full user research & persona definition",
      "Low-fidelity wireframes & user flow diagrams",
      "High-fidelity screens in Figma (30+ screens)",
      "Interactive prototype with transition animations",
      "Design system: components, tokens, typography",
      "Accessibility audit — WCAG 2.1 AA compliant",
    ],
    challenge: `The core challenge was balancing feature density with simplicity. Users needed access to complex data without feeling overwhelmed. The solution was a progressive disclosure pattern — showing essential info first with deeper layers accessible on demand.`,
    result: `Delivered a 30-screen Figma prototype that reduced user task completion time by an estimated 35% compared to the previous design. The client approved the design in the first review cycle.`,
    tech: ["Figma","Adobe XD","Principle","Zeplin","FigJam"],
    highlights: ["hi","","","",""],
    stats: [{k:"Screens Designed",v:"30+"},{k:"Prototype Flows",v:"8"},{k:"Components",v:"60+"},{k:"Review Cycles",v:"1"}],
    palette: ["#302b63","#7B6CF6","#C8F04A","#E2DFD8","#080A0F"],
    liveUrl: "#", githubUrl: null,
    images: ["📱","🎨","📐","🔷"],
  },
  2: {
    id: 2,
    cat: "Web Development",
    title: "Botanic —\nPlant Website",
    titleHtml: "Botanic — <em>Plant Website</em>",
    sub: "A plant e-commerce website featuring clean design, smooth scroll interactions, a fresh green color palette, and a seamless shopping experience.",
    heroGradient: "linear-gradient(135deg,#134e5e 0%,#71b280 100%)",
    heroEmoji: "🌿",
    filter: "web",
    meta: [
      {label:"Category",   value:"Web Development"},
      {label:"Tools",      value:"HTML, CSS, JS"},
      {label:"Type",       value:"E-Commerce"},
      {label:"Live",       value:"doyelroydeveloper.github.io"},
      {label:"Year",       value:"2024"},
    ],
    overview: `Botanic is a front-end plant e-commerce website built with pure HTML, CSS and JavaScript. The project focuses on delivering a visually fresh, nature-inspired shopping experience with smooth animations and a clean layout that puts the products first.`,
    features: [
      "Responsive layout — works across all screen sizes",
      "Smooth scroll reveal animations throughout",
      "Product grid with hover interactions",
      "Nature-inspired green color palette",
      "Clean navigation with sticky header",
      "Optimized images for fast page load",
    ],
    challenge: `Translating the organic feel of plants into a digital interface required careful typography and whitespace decisions. Heavy use of green risked feeling dated — the solution was using green only as an accent against a clean white/cream base.`,
    result: `A polished, live website deployed on GitHub Pages that demonstrates strong front-end fundamentals and an eye for clean, modern e-commerce design.`,
    tech: ["HTML5","CSS3","JavaScript","GitHub Pages"],
    highlights: ["hi","hi","",""],
    stats: [{k:"Pages",v:"5"},{k:"Animations",v:"12+"},{k:"Load Time",v:"<1.2s"},{k:"Responsive",v:"Yes"}],
    palette: ["#134e5e","#71b280","#f7f5f0","#2d3748","#C8F04A"],
    liveUrl: "https://doyelroydeveloper.github.io/botanic/", githubUrl: "#",
    images: ["🌿","🛒","🌱","🌾"],
  },
  3: {
    id: 3,
    cat: "Graphic Design",
    title: "Brand & Social\nMedia Creatives",
    titleHtml: "Brand & Social <em>Media Creatives</em>",
    sub: "A collection of graphic design work including posters, banners, brochures, and social media creatives — focused on clean aesthetics and strong visual communication.",
    heroGradient: "linear-gradient(135deg,#f7971e 0%,#e040fb 60%,#e96c6c 100%)",
    heroEmoji: "🎨",
    filter: "graphic",
    meta: [
      {label:"Category",   value:"Graphic Design"},
      {label:"Tools",      value:"Photoshop, Illustrator"},
      {label:"Type",       value:"Branding / Social Media"},
      {label:"Formats",    value:"Print + Digital"},
      {label:"Year",       value:"2024"},
    ],
    overview: `This project encompasses a range of graphic design deliverables produced for various clients — from social media campaigns and branded post templates to print-ready brochures and banner designs.

Each piece was created with a clear visual hierarchy, consistent brand language, and an understanding of the target audience's expectations.`,
    features: [
      "Social media post templates (Instagram, Facebook)",
      "Print-ready brochure design (A4 & trifold)",
      "Brand guideline adherence across all assets",
      "Custom typography and iconography",
      "High-resolution export for print (300 DPI)",
      "Web-optimized versions for digital use",
    ],
    challenge: `Working across multiple clients meant adapting quickly to different brand voices and visual identities while maintaining design quality and meeting fast turnaround deadlines.`,
    result: `Delivered 20+ design assets across multiple client accounts. Several social media creatives achieved above-average engagement rates on their respective platforms.`,
    tech: ["Adobe Photoshop","Adobe Illustrator","Canva Pro","Adobe InDesign"],
    highlights: ["hi","hi","",""],
    stats: [{k:"Assets Created",v:"20+"},{k:"Clients Served",v:"5"},{k:"Formats",v:"Print + Web"},{k:"Revisions",v:"Fast"}],
    palette: ["#f7971e","#ffd200","#e040fb","#e96c6c","#080A0F"],
    liveUrl: "#", githubUrl: null,
    images: ["🎨","🖼️","📄","📱"],
  },
  4: {
    id: 4,
    cat: "Web Development",
    title: "Yama-Yoga\nWebsite",
    titleHtml: "Yama-Yoga <em>Website</em>",
    sub: "A yoga wellness website featuring a calm, clean design language, smooth page transitions, and a mindful user experience that reflects the brand's philosophy.",
    heroGradient: "linear-gradient(135deg,#667eea 0%,#764ba2 50%,#f093fb 100%)",
    heroEmoji: "🧘",
    filter: "web",
    meta: [
      {label:"Category",   value:"Web Development"},
      {label:"Tools",      value:"HTML, CSS, JS"},
      {label:"Type",       value:"Wellness / Lifestyle"},
      {label:"Live",       value:"GitHub Pages"},
      {label:"Year",       value:"2024"},
    ],
    overview: `Yama-Yoga is a front-end wellness website built to reflect the calm, mindful philosophy of yoga. The design uses generous whitespace, soft gradients, and fluid typography to create an experience that feels as relaxing to browse as the practice itself.`,
    features: [
      "Calming color palette with soft gradients",
      "Fluid typography that scales beautifully",
      "Class schedule section with clean card layout",
      "Instructor profiles with hover animations",
      "Newsletter subscription section",
      "Fully responsive — mobile and desktop",
    ],
    challenge: `Wellness websites often fall into clichés — generic stock photos and overused sans-serifs. The goal was to create something that felt genuinely peaceful and premium without looking like every other yoga site.`,
    result: `A beautiful, live front-end site that stands out in the wellness space. The restrained palette and intentional whitespace create the mindful feeling the client was looking for.`,
    tech: ["HTML5","CSS3","JavaScript","GitHub Pages"],
    highlights: ["hi","hi","",""],
    stats: [{k:"Sections",v:"6"},{k:"Animations",v:"10+"},{k:"Mobile Score",v:"98/100"},{k:"Live",v:"Yes"}],
    palette: ["#667eea","#764ba2","#f093fb","#f5f5f5","#2d3748"],
    liveUrl: "https://doyelroydeveloper.github.io/botanic/", githubUrl: "#",
    images: ["🧘","🌸","🕊️","🌿"],
  },
  5: {
    id: 5,
    cat: "App Design · Figma",
    title: "Coffee App —\nUI/UX Design",
    titleHtml: "Coffee App — <em>UI/UX Design</em>",
    sub: "A specialty coffee ordering app UI designed in Figma — featuring a warm, immersive dark theme, intuitive ordering flows, and a loyalty rewards system.",
    heroGradient: "linear-gradient(135deg,#3d1f00 0%,#7b4a1e 50%,#c8803a 100%)",
    heroEmoji: "☕",
    filter: "design",
    meta: [
      {label:"Category",   value:"App UI/UX Design"},
      {label:"Tool",       value:"Figma"},
      {label:"Type",       value:"Mobile App"},
      {label:"Theme",      value:"Dark — Warm"},
      {label:"Year",       value:"2024"},
    ],
    overview: `The Coffee App UI/UX project explores the world of specialty coffee through a rich, dark-themed mobile interface. The design centers around a warm, tactile aesthetic that evokes the warmth of a coffee shop — deep browns, burnt oranges, and cream whites.

The ordering flow was designed to minimize friction while showcasing the coffee products beautifully. A loyalty rewards card adds engagement and retention.`,
    features: [
      "Warm dark theme — browns, oranges and cream",
      "Product discovery screen with immersive cards",
      "Custom drink builder with modifier selection",
      "Cart & checkout with saved payment methods",
      "Loyalty points dashboard with reward milestones",
      "Order history and re-order with one tap",
    ],
    challenge: `Dark themes in food apps are uncommon — most use white to convey cleanliness. The challenge was making dark feel premium and warm rather than cold or heavy. The answer was a carefully calibrated brown-orange palette with cream typography.`,
    result: `A complete 25-screen Figma design file with a reusable component library. The design was praised for feeling unique and premium compared to competitor apps.`,
    tech: ["Figma","Auto Layout","Component Library","Figma Prototyping"],
    highlights: ["hi","hi","hi",""],
    stats: [{k:"Screens",v:"25"},{k:"Components",v:"45+"},{k:"User Flows",v:"6"},{k:"Prototype",v:"Interactive"}],
    palette: ["#3d1f00","#7b4a1e","#c8803a","#f5ead0","#1a0f00"],
    liveUrl: "#", githubUrl: null,
    images: ["☕","🧋","🍰","📱"],
  },
  6: {
    id: 6,
    cat: "Graphic Design · Logo",
    title: "Roamly —\nLogo Design",
    titleHtml: "Roamly — <em>Logo Design</em>",
    sub: "A travel brand logo created in Adobe Photoshop — combining wanderlust, adventure, and modern minimalism into a single mark that works across all media.",
    heroGradient: "linear-gradient(135deg,#0f2027 0%,#203a43 50%,#2c5364 100%)",
    heroEmoji: "✦",
    filter: "graphic",
    meta: [
      {label:"Category",   value:"Logo Design"},
      {label:"Tools",      value:"Adobe Photoshop"},
      {label:"Type",       value:"Brand Identity"},
      {label:"Industry",   value:"Travel"},
      {label:"Year",       value:"2024"},
    ],
    overview: `Roamly is a travel brand that needed a logo that felt adventurous yet clean and modern. The brief was to create a mark that works in a single color, scales from a 16px favicon to a billboard, and communicates movement and exploration.

The final logo uses a geometric compass-inspired mark combined with a clean wordmark in a custom-modified typeface.`,
    features: [
      "Primary logo mark — wordmark + icon combination",
      "Secondary mark — icon-only for app/favicon use",
      "Full color, monochrome, and reversed versions",
      "Clear space and minimum size guidelines",
      "Color palette — primary blues and accent gold",
      "Delivered as PNG, JPG, and PDF",
    ],
    challenge: `Travel logos often default to planes, maps or globes. The challenge was creating something distinctive and ownable that felt fresh. The compass rose concept was deconstructed into a modern geometric form.`,
    result: `A logo system that the client immediately connected with — calling it 'exactly the right balance of adventurous and professional.' Delivered all assets within the agreed 48-hour turnaround.`,
    tech: ["Adobe Photoshop","Adobe Illustrator","PDF Export","Brand Guidelines"],
    highlights: ["hi","hi","",""],
    stats: [{k:"Logo Versions",v:"4"},{k:"File Formats",v:"PNG/JPG/PDF"},{k:"Turnaround",v:"48 hrs"},{k:"Revisions",v:"1"}],
    palette: ["#0f2027","#2c5364","#f0c040","#ffffff","#1a2a35"],
    liveUrl: "#", githubUrl: null,
    images: ["✦","🗺️","🧭","🌍"],
  },
};

const IDS = [1,2,3,4,5,6];
let currentId = null;

/* ── OPEN PROJECT ─────────────────────── */
function openProject(id) {
  currentId = id;
  renderDetail(id);
  const el = document.getElementById('project-detail');
  el.classList.add('open');
  document.body.style.overflow = 'hidden';
  el.scrollTop = 0;
  updateNavBtns();
  // trigger scroll reveals inside detail
  setTimeout(() => initDetailReveal(), 100);
}

/* ── CLOSE PROJECT ────────────────────── */
function closeProject() {
  document.getElementById('project-detail').classList.remove('open');
  document.body.style.overflow = '';
  currentId = null;
}

/* ── NAVIGATE PREV/NEXT ───────────────── */
function navigateProject(dir) {
  const idx = IDS.indexOf(currentId);
  const next = idx + dir;
  if (next < 0 || next >= IDS.length) return;
  currentId = IDS[next];
  renderDetail(currentId);
  document.getElementById('project-detail').scrollTop = 0;
  updateNavBtns();
  setTimeout(() => initDetailReveal(), 100);
}

function updateNavBtns() {
  const idx = IDS.indexOf(currentId);
  document.getElementById('btn-prev').disabled = idx === 0;
  document.getElementById('btn-next').disabled = idx === IDS.length - 1;
}

/* ── RENDER DETAIL ────────────────────── */
function renderDetail(id) {
  const p = PROJECTS[id];

  // hero
  document.getElementById('d-bg').style.background = p.heroGradient;
  document.getElementById('d-cat').textContent = p.cat;
  document.getElementById('d-title').innerHTML = p.titleHtml.replace('\n','<br>');
  document.getElementById('d-sub').textContent = p.sub;

  // meta
  document.getElementById('d-meta').innerHTML = p.meta.map(m =>
    `<div class="meta-item"><div class="meta-label">${m.label}</div><div class="meta-value">${m.value}</div></div>`
  ).join('');

  // main content
  document.getElementById('d-main').innerHTML = `
    <div class="detail-section sr">
      <div class="detail-section-title">Overview</div>
      ${p.overview.trim().split('\n\n').map(para=>`<p>${para.trim()}</p>`).join('')}
    </div>

    <div class="detail-section sr d1">
      <div class="detail-section-title">Key Features</div>
      <ul class="feature-list">
        ${p.features.map(f=>`<li>${f}</li>`).join('')}
      </ul>
    </div>

    <div class="detail-section sr d2">
      <div class="detail-section-title">The Challenge</div>
      <p>${p.challenge}</p>
    </div>

    <div class="detail-section sr d3">
      <div class="detail-section-title">Result</div>
      <p>${p.result}</p>
    </div>

    <div class="detail-section sr d1">
      <div class="detail-section-title">Project Visuals</div>
      <div class="detail-gallery">
        <div class="gallery-img wide">${p.heroEmoji + ' ' + p.images[0]}</div>
        <div class="gallery-img">${p.images[1]}</div>
        <div class="gallery-img">${p.images[2]}</div>
      </div>
    </div>
  `;

  // aside
  const liveBtn = p.liveUrl && p.liveUrl !== '#'
    ? `<a href="${p.liveUrl}" target="_blank" class="aside-cta">View Live Site ↗</a>`
    : `<a href="#" class="aside-cta" style="opacity:.4;pointer-events:none;">No Live URL</a>`;
  const ghBtn = p.githubUrl
    ? `<a href="${p.githubUrl}" target="_blank" class="aside-cta ghost">GitHub Repo →</a>`
    : '';

  document.getElementById('d-aside').innerHTML = `
    <div class="aside-widget sr">
      <div class="widget-title">Tech / Tools Used</div>
      <div class="tech-grid">
        ${p.tech.map((t,i)=>`<span class="tech-tag ${p.highlights[i]||''}">${t}</span>`).join('')}
      </div>
    </div>

    <div class="aside-widget sr d1">
      <div class="widget-title">Project Stats</div>
      ${p.stats.map(s=>`<div class="stat-row"><span class="stat-k">${s.k}</span><span class="stat-v">${s.v}</span></div>`).join('')}
    </div>

    <div class="aside-widget sr d2">
      <div class="widget-title">Color Palette</div>
      <div class="palette">
        ${p.palette.map(c=>`
          <div>
            <div class="swatch" style="background:${c}"></div>
            <div class="swatch-info">${c}</div>
          </div>`).join('')}
      </div>
    </div>

    <div class="sr d2" style="margin-top:24px">
      ${liveBtn}
      ${ghBtn}
    </div>
  `;

  // related — all except current, max 3
  const related = IDS.filter(rid => rid !== id).slice(0,3);
  document.getElementById('d-related').innerHTML = related.map(rid => {
    const rp = PROJECTS[rid];
    return `
      <div class="related-card" onclick="openProject(${rid}); document.getElementById('project-detail').scrollTop=0">
        <div class="related-thumb" style="background:${rp.heroGradient}">
          <span style="font-size:2rem">${rp.heroEmoji}</span>
        </div>
        <div class="related-info">
          <div class="related-name">${rp.title.replace('\n',' ')}</div>
          <div class="related-cat">${rp.cat}</div>
        </div>
      </div>`;
  }).join('');
}

/* ── SCROLL REVEAL (inside detail) ───── */
function initDetailReveal() {
  const items = document.querySelectorAll('#project-detail .sr');
  items.forEach(el => el.classList.remove('vis'));
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('vis'); });
  }, { threshold: 0.08, root: document.getElementById('project-detail') });
  items.forEach(el => obs.observe(el));
  // also immediately show items already in view
  setTimeout(() => items.forEach(el => {
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight) el.classList.add('vis');
  }), 50);
}

/* ── FILTER BUTTONS ───────────────────── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      const match = f === 'all' || card.dataset.cat === f;
      card.classList.toggle('hidden', !match);
    });
  });
});

/* ── ESC KEY TO CLOSE ─────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && currentId) closeProject();
  if (e.key === 'ArrowRight' && currentId) navigateProject(1);
  if (e.key === 'ArrowLeft' && currentId) navigateProject(-1);
});