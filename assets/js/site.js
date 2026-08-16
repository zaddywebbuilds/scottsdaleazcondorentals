/* ==========================================================================
   Scottsdale Condominium Rentals — interactions
   ========================================================================== */
(function () {
  'use strict';
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();

  /* ======================================================================
     WHATSAPP  —  set enabled:true once the number is confirmed on WhatsApp.
     To confirm: open https://wa.me/14806999915 on a phone that has WhatsApp
     installed. If it opens a chat with the business, they are registered.
     wa.me cannot be checked programmatically — it returns the same page for
     registered and unregistered numbers alike.
     ====================================================================== */
  var WHATSAPP = {
    enabled: false,
    number : '14806999915',
    message: 'Hello — I would like to check availability for a furnished rental in Scottsdale.'
  };

  if (WHATSAPP.enabled) {
    var waHref = 'https://wa.me/' + WHATSAPP.number + '?text=' + encodeURIComponent(WHATSAPP.message);
    var waIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.09 3.2 5.07 4.48.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35M12.04 21.5h-.01c-1.75 0-3.47-.47-4.97-1.36l-.36-.21-3.7.97.99-3.6-.23-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 6.99c0 5.46-4.44 9.9-9.9 9.9M20.52 3.45A11.78 11.78 0 0 0 12.04 0C5.46 0 .1 5.35.1 11.93c0 2.1.55 4.15 1.6 5.96L0 24l6.25-1.64a11.9 11.9 0 0 0 5.79 1.47h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.19-1.24-6.19-3.5-8.45"/></svg>';

    // floating action button
    var fab = document.createElement('a');
    fab.className = 'wa-fab'; fab.href = waHref;
    fab.target = '_blank'; fab.rel = 'noopener';
    fab.setAttribute('aria-label', 'Message us on WhatsApp');
    fab.innerHTML = waIcon;
    document.body.appendChild(fab);

    // contact list entry
    var list = $('.contact-l');
    if (list) {
      var row = document.createElement('a');
      row.href = waHref; row.target = '_blank'; row.rel = 'noopener';
      row.innerHTML = '<span class="ic">💬</span><span><b>WhatsApp 480-699-9915</b>' +
                      '<span>Message us directly</span></span>';
      list.appendChild(row);
    }

    // mobile bar
    var bar = $('.mbar');
    if (bar) {
      var mb = document.createElement('a');
      mb.className = 'w'; mb.href = waHref; mb.target = '_blank'; mb.rel = 'noopener';
      mb.textContent = 'WhatsApp';
      bar.appendChild(mb);
    }

    // footer link
    var fl = $('.foot-brand .foot-links');
    if (fl) {
      var f = document.createElement('a');
      f.href = waHref; f.target = '_blank'; f.rel = 'noopener';
      f.textContent = '💬 WhatsApp 480-699-9915';
      fl.appendChild(f);
    }
  }

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

  /* ---------- booking-activity toast ----------
     ⚠ PLACEHOLDER DATA — these are not real bookings.
     Replace `spEntries` with a genuine booking feed before this site goes
     live on the client's domain. Presenting invented booking activity as
     real is deceptive to customers and is covered by the FTC Rule on
     Consumer Reviews and Testimonials. See README.md. */
  var spEntries = [
    { name: 'A corporate guest from Denver',  act: 'booked a 3 month stay at Kierland Greens', img: 'hero-pool-community.jpg', days: 2 },
    { name: 'A family from Chicago',          act: 'reserved a 2 bedroom in North Scottsdale', img: 'condo-exterior.jpg',      days: 4 },
    { name: 'A guest from Minneapolis',       act: 'checked in for the winter season',         img: 'int-living-fireplace.jpg', days: 1 },
    { name: 'A Mayo Clinic family',           act: 'booked an 8 week recovery stay',           img: 'int-bedroom.jpg',         days: 6 },
    { name: 'A golf group from Dallas',       act: 'reserved a home near Troon North',         img: 'golf-green.jpg',          days: 3 },
    { name: 'A returning winter resident',    act: 'booked the same condo for a 4th season',   img: 'pool-desert.jpg',         days: 9 },
    { name: 'A relocating family',            act: 'extended their stay in Paradise Valley',   img: 'int-kitchen.jpg',         days: 5 },
    { name: 'A guest from Seattle',           act: 'reserved a 1 bedroom in Old Town',         img: 'condo-balconies.jpg',     days: 7 }
  ];
  var spToast = $('#sp-toast'), spX = $('#sp-x');
  var spIdx = 0, spTimer, spDismissed = false;

  var showToast = function () {
    if (spDismissed || !spToast) return;
    var d = spEntries[spIdx % spEntries.length]; spIdx++;
    $('#sp-name').textContent = d.name;
    $('#sp-act').textContent  = d.act + ' · Scottsdale Condominium Rentals';
    $('#sp-when').textContent = d.days === 1 ? 'Yesterday' : d.days + ' days ago';
    var thumb = $('#sp-img');
    if (thumb && d.img) { thumb.src = 'assets/img/' + d.img; thumb.alt = ''; }
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
