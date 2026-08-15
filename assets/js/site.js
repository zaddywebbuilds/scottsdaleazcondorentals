/* ==========================================================================
   Scottsdale Condominium Rentals — interactions
   ========================================================================== */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- year ---------- */
  var yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- ticker: duplicate content for a seamless loop ---------- */
  var ticker = $('#ticker');
  if (ticker && !reduced) ticker.innerHTML += ticker.innerHTML;

  /* ---------- nav solid on scroll ---------- */
  var nav = $('#nav');
  var onScroll = function () {
    if (window.scrollY > 40) nav.classList.add('solid');
    else nav.classList.remove('solid');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile nav ---------- */
  var burger = $('#burger'), mnav = $('#mnav');
  if (burger && mnav) {
    var closeNav = function () {
      burger.classList.remove('on');
      mnav.classList.remove('on');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
    burger.addEventListener('click', function () {
      var open = burger.classList.toggle('on');
      mnav.classList.toggle('on', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    $$('a', mnav).forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mnav.classList.contains('on')) closeNav();
    });
  }

  /* ---------- reveal on scroll ---------- */
  var revealables = $$('.rv');
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- animated counters ---------- */
  var counters = $$('[data-count]');
  var runCounter = function (el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduced) { el.textContent = target + suffix; return; }
    var dur = 1500, t0 = null;
    var step = function (ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { runCounter(en.target); cio.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(runCounter);
  }

  /* ---------- tab groups ---------- */
  $$('[data-tabs]').forEach(function (group) {
    var tabs = $$('.tab', group);
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var id = tab.getAttribute('data-panel');
        var panel = document.getElementById(id);
        if (!panel) return;
        // siblings within the same section
        var section = group.closest('section') || document;
        $$('.tab', group).forEach(function (t) { t.classList.remove('on'); });
        $$('.panel', section).forEach(function (p) { p.classList.remove('on'); });
        tab.classList.add('on');
        panel.classList.add('on');
      });
    });
  });

  /* ---------- FAQ accordion ---------- */
  $$('.fq').forEach(function (item) {
    var q = $('.fq-q', item), a = $('.fq-a', item);
    if (!q || !a) return;
    q.setAttribute('aria-expanded', 'false');
    q.addEventListener('click', function () {
      var open = item.classList.contains('on');
      $$('.fq').forEach(function (other) {
        other.classList.remove('on');
        var oa = $('.fq-a', other), oq = $('.fq-q', other);
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

  /* ---------- gallery filter ---------- */
  var galItems = $$('#gal .gi');
  $$('.gal-f').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-f');
      $$('.gal-f').forEach(function (b) { b.classList.remove('on'); });
      btn.classList.add('on');
      galItems.forEach(function (item) {
        var show = (f === 'all') || item.getAttribute('data-c') === f;
        item.classList.toggle('hide', !show);
      });
    });
  });

  /* ---------- lightbox ---------- */
  var lb = $('#lb'), lbi = $('#lbi'), lbc = $('#lbc');
  var idx = 0;

  var visibleItems = function () {
    return galItems.filter(function (i) { return !i.classList.contains('hide'); });
  };
  var show = function (i) {
    var items = visibleItems();
    if (!items.length) return;
    idx = (i + items.length) % items.length;
    var item = items[idx];
    var img = $('img', item);
    var cap = $('.cap b', item);
    var kind = $('.cap span', item);
    lbi.src = img.src;
    lbi.alt = img.alt || '';
    lbc.textContent = (kind ? kind.textContent + ' — ' : '') + (cap ? cap.textContent : '');
  };
  var open = function (i) {
    show(i);
    lb.classList.add('on');
    document.body.style.overflow = 'hidden';
  };
  var close = function () {
    lb.classList.remove('on');
    document.body.style.overflow = '';
  };

  galItems.forEach(function (item) {
    item.addEventListener('click', function () {
      open(visibleItems().indexOf(item));
    });
  });
  if (lb) {
    $('#lbx').addEventListener('click', close);
    $('#lbp').addEventListener('click', function (e) { e.stopPropagation(); show(idx - 1); });
    $('#lbn').addEventListener('click', function (e) { e.stopPropagation(); show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('on')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  }

  /* ---------- hero parallax ---------- */
  var heroImg = $('.hero-bg img');
  if (heroImg && !reduced) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y < window.innerHeight) {
          heroImg.style.transform = 'scale(1.06) translateY(' + (y * 0.22) + 'px)';
        }
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- enquiry form → mailto ---------- */
  var form = $('#enquiry'), fok = $('#fok');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (id) { var el = $('#' + id); return el ? el.value.trim() : ''; };

      var name = v('name'), email = v('email');
      if (!name || !email) {
        if (!name) $('#name').focus(); else $('#email').focus();
        return;
      }

      var lines = [
        'Property Type: ' + (v('ptype') || '—'),
        'Bedrooms: '      + (v('beds')  || '—'),
        'Reason for Visit: ' + (v('reason') || '—'),
        'Arrival: '       + (v('arrive') || '—'),
        'Departure: '     + (v('depart') || '—'),
        '',
        'Name: '  + name,
        'Email: ' + email,
        'Phone: ' + (v('phone') || '—'),
        '',
        'Message:',
        v('msg') || '—'
      ].join('\n');

      var subject = 'Rental Enquiry — ' + name + (v('arrive') ? ' — arriving ' + v('arrive') : '');
      var href = 'mailto:info@scottsdaleazcondorentals.com'
               + '?subject=' + encodeURIComponent(subject)
               + '&body='    + encodeURIComponent(lines);

      if (fok) fok.classList.add('on');
      window.location.href = href;
    });
  }

  /* ---------- smooth anchor offset for sticky nav ---------- */
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 74;
      var top = target.getBoundingClientRect().top + window.scrollY - navH + 1;
      window.scrollTo({ top: top, behavior: reduced ? 'auto' : 'smooth' });
    });
  });
})();
