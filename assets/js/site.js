/* ==========================================================================
   Scottsdale Condominium Rentals — interactions
   ========================================================================== */
(function () {
  'use strict';
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- ticker loop ---------- */
  var ticker = $('#ticker');
  if (ticker && !reduced) ticker.innerHTML += ticker.innerHTML;

  /* ---------- nav ---------- */
  var nav = $('#nav');
  var onScroll = function () { nav.classList.toggle('solid', window.scrollY > 40); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var burger = $('#burger'), mnav = $('#mnav');
  var closeNav = function () {
    burger.classList.remove('on'); mnav.classList.remove('on');
    burger.setAttribute('aria-expanded', 'false'); document.body.style.overflow = '';
  };
  if (burger && mnav) {
    burger.addEventListener('click', function () {
      var open = burger.classList.toggle('on');
      mnav.classList.toggle('on', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    $$('a', mnav).forEach(function (a) { a.addEventListener('click', closeNav); });
  }

  /* ---------- reveal ---------- */
  var rvs = $$('.rv');
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
    rvs.forEach(function (el) { io.observe(el); });
  } else { rvs.forEach(function (el) { el.classList.add('in'); }); }

  /* ---------- counters ---------- */
  var runCounter = function (el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduced) { el.textContent = target + suffix; return; }
    var dur = 1400, t0 = null;
    var step = function (ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  var counters = $$('[data-count]');
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { runCounter(e.target); cio.unobserve(e.target); } });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  } else { counters.forEach(runCounter); }

  /* ---------- tabs (scoped per group) ---------- */
  $$('[data-tabs]').forEach(function (group) {
    var section = group.closest('section') || document;
    $$('.tab', group).forEach(function (tab) {
      tab.addEventListener('click', function () {
        var panel = document.getElementById(tab.getAttribute('data-panel'));
        if (!panel) return;
        $$('.tab', group).forEach(function (t) { t.classList.remove('on'); });
        $$('.panel', section).forEach(function (p) { p.classList.remove('on'); });
        tab.classList.add('on'); panel.classList.add('on');
      });
    });
  });

  /* ---------- FAQ ---------- */
  $$('.fq').forEach(function (item) {
    var q = $('.fq-q', item), a = $('.fq-a', item);
    if (!q || !a) return;
    q.setAttribute('aria-expanded', 'false');
    q.addEventListener('click', function () {
      var open = item.classList.contains('on');
      $$('.fq').forEach(function (o) {
        o.classList.remove('on');
        var oa = $('.fq-a', o), oq = $('.fq-q', o);
        if (oa) oa.style.maxHeight = null;
        if (oq) oq.setAttribute('aria-expanded', 'false');
      });
      if (!open) {
        item.classList.add('on');
        a.style.maxHeight = a.scrollHeight + 'px';
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- lightbox: every photograph on the page is enlargeable ---------- */
  var lb = $('#lb'), lbi = $('#lbi'), lbc = $('#lbc'), idx = 0;
  // photo panels only — excludes the logo, flag and promo graphic
  var photos = $$('.ph img').filter(function (im) {
    return !/logo|flag|promo/.test(im.getAttribute('src') || '');
  });
  photos.forEach(function (im) { im.parentNode.style.cursor = 'zoom-in'; });

  var show = function (i) {
    if (!photos.length) return;
    idx = (i + photos.length) % photos.length;
    var im = photos[idx];
    lbi.src = im.src; lbi.alt = im.alt || '';
    lbc.textContent = im.alt || '';
  };
  var lbClose = function () { lb.classList.remove('on'); document.body.style.overflow = ''; };
  photos.forEach(function (im, i) {
    im.addEventListener('click', function () {
      show(i); lb.classList.add('on'); document.body.style.overflow = 'hidden';
    });
  });
  if (lb) {
    $('#lbx').addEventListener('click', lbClose);
    $('#lbp').addEventListener('click', function (e) { e.stopPropagation(); show(idx - 1); });
    $('#lbn').addEventListener('click', function (e) { e.stopPropagation(); show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lbClose(); });
  }

  /* ---------- popup ---------- */
  var pp = $('#pp');
  var ppOpen = function () { if (pp) { pp.classList.add('on'); document.body.style.overflow = 'hidden'; } };
  var ppClose = function () { if (pp) { pp.classList.remove('on'); document.body.style.overflow = ''; } };
  $$('.js-pop').forEach(function (el) {
    el.addEventListener('click', function (e) { e.preventDefault(); closeNav(); ppOpen(); });
  });
  if (pp) {
    $('#ppx').addEventListener('click', ppClose);
    pp.addEventListener('click', function (e) { if (e.target === pp) ppClose(); });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (pp && pp.classList.contains('on')) ppClose();
      else if (lb && lb.classList.contains('on')) lbClose();
      else if (mnav && mnav.classList.contains('on')) closeNav();
    }
    if (lb && lb.classList.contains('on')) {
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    }
  });

  /* ---------- 3D tilt ---------- */
  if (!reduced && window.matchMedia('(hover:hover)').matches) {
    $$('.tilt').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var dx = (e.clientX - r.left) / r.width - 0.5;
        var dy = (e.clientY - r.top) / r.height - 0.5;
        card.style.transition = 'transform .08s';
        card.style.transform = 'perspective(760px) rotateY(' + (dx * 6) + 'deg) rotateX(' + (-dy * 6) + 'deg) translateY(-5px)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transition = 'transform .5s';
        card.style.transform = '';
      });
    });
  }

  /* ---------- forms → mailto ---------- */
  var mail = function (fields, name, email) {
    var body = fields.join('\n');
    var subject = 'Rental Enquiry — ' + name;
    window.location.href = 'mailto:info@scottsdaleazcondorentals.com?subject='
      + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  };

  var main = $('#enquiry');
  if (main) {
    main.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (id) { var el = $('#' + id); return el ? el.value.trim() : ''; };
      if (!v('name')) { $('#name').focus(); return; }
      if (!v('email')) { $('#email').focus(); return; }
      mail([
        'Property Type: ' + (v('ptype') || '—'),
        'Bedrooms: ' + (v('beds') || '—'),
        'Reason for Visit: ' + (v('reason') || '—'),
        'Arrival: ' + (v('arrive') || '—'),
        'Departure: ' + (v('depart') || '—'), '',
        'Name: ' + v('name'), 'Email: ' + v('email'), 'Phone: ' + (v('phone') || '—'), '',
        'Message:', v('msg') || '—'
      ], v('name'), v('email'));
    });
  }

  var ppForm = $('#pp-form');
  if (ppForm) {
    ppForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (id) { var el = $('#' + id); return el ? el.value.trim() : ''; };
      if (!v('pp-name')) { $('#pp-name').focus(); return; }
      if (!v('pp-email')) { $('#pp-email').focus(); return; }
      var nm = v('pp-name');
      mail([
        'Arrival: ' + (v('pp-in') || '—'),
        'Departure: ' + (v('pp-out') || '—'),
        'Bedrooms: ' + (v('pp-beds') || '—'),
        'Reason: ' + (v('pp-reason') || '—'), '',
        'Name: ' + nm, 'Email: ' + v('pp-email'), 'Phone: ' + (v('pp-phone') || '—')
      ], nm, v('pp-email'));
      $('#pp-body').innerHTML =
        '<div class="pp-thanks">' +
        '<div class="big">🌵</div>' +
        '<p class="eyebrow lt c">Request Received</p>' +
        '<h2>We\'ll be <em>in touch shortly</em></h2>' +
        '<p class="pp-desc">Thank you, ' + nm.replace(/[<>&]/g, '') + '. We\'ll confirm availability and send a custom rate quote. ' +
        'Prefer to talk now? Call <a href="tel:+14806999915" style="color:var(--pink)">480-699-9915</a>.</p>' +
        '</div>';
    });
  }

  /* ---------- availability toast ----------
     Each entry below is a factual statement about the portfolio, drawn from the
     company's own property listings. See README.md before replacing these with
     booking-activity messages. */
  var spEntries = [
    { name: 'Kierland Greens · North Scottsdale', act: '1, 2 and 3 bedroom villas on the 9th hole', when: '30 day minimum' },
    { name: 'Extended-stay monthly rates',        act: 'Quoted for your actual dates — call to ask', when: 'Ask when you call' },
    { name: 'Troon North Golf Casita',            act: 'Sleeps 6–8 among the boulders at Pinnacle Peak', when: 'In the portfolio' },
    { name: 'Minutes from Mayo Clinic',           act: 'Quiet residences for treatment and recovery stays', when: 'North Scottsdale' },
    { name: 'No third-party booking fees',        act: 'You book direct with the agent, not a portal', when: 'Always' },
    { name: 'Plaza Residences · Old Town',        act: 'One bedroom units, walk to Fashion Square', when: 'In the portfolio' },
    { name: 'Studio to 4 bedrooms',               act: 'Condominiums, townhomes, apartments and homes', when: '7 areas served' },
    { name: 'Private homes sleeping 8–10',        act: 'Grayhawk, Troon and Coyote Canyon', when: 'In the portfolio' }
  ];
  var spToast = $('#sp-toast'), spX = $('#sp-x');
  var spIdx = 0, spTimer, spDismissed = false;

  var showToast = function () {
    if (spDismissed || !spToast) return;
    var d = spEntries[spIdx % spEntries.length]; spIdx++;
    $('#sp-name').textContent = d.name;
    $('#sp-act').textContent  = d.act;
    $('#sp-when').textContent = d.when;
    spToast.classList.add('show');
    clearTimeout(spTimer);
    spTimer = setTimeout(function () { spToast.classList.remove('show'); }, 5500);
  };
  if (spX) {
    spX.addEventListener('click', function () {
      spToast.classList.remove('show'); clearTimeout(spTimer); spDismissed = true;
    });
  }
  if (spToast && !reduced) {
    setTimeout(function () { showToast(); setInterval(showToast, 13000); }, 4500);
  }

  /* ---------- anchor offset ---------- */
  $$('a[href^="#"]').forEach(function (a) {
    if (a.classList.contains('js-pop')) return;
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      var t = document.querySelector(id); if (!t) return;
      e.preventDefault();
      var h = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 70;
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - h + 1, behavior: reduced ? 'auto' : 'smooth' });
    });
  });
})();
