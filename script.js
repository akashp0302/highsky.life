(function () {
  'use strict';

  window.addEventListener('load', function () {
    setTimeout(function () {
      var ls = document.getElementById('loading-screen');
      if (ls) ls.classList.add('phase2');
    }, 900);
    setTimeout(function () {
      var ls = document.getElementById('loading-screen');
      if (ls) ls.classList.add('hidden');
    }, 2400);
  });

  window.addEventListener('scroll', function () {
    var total = document.documentElement.scrollHeight - window.innerHeight;
    var pct = total > 0 ? (window.scrollY / total) * 100 : 0;
    var bar = document.getElementById('scroll-progress');
    if (bar) bar.style.width = pct + '%';
  }, { passive: true });

  window.scrollToId = function (id) {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  document.querySelectorAll('[data-scroll]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      window.scrollToId(btn.dataset.scroll);
      var mn = document.getElementById('mobile-nav');
      if (mn) mn.classList.remove('open');
      var mt = document.getElementById('mobile-toggle');
      if (mt) mt.textContent = '☰';
    });
  });

  var navLogo = document.getElementById('nav-logo');
  if (navLogo) {
    navLogo.addEventListener('click', function (e) {
      var hero = document.getElementById('hero');
      if (hero) {
        e.preventDefault();
        window.scrollToId('hero');
      }
    });
  }


  var mobileNav = document.getElementById('mobile-nav');
  var mToggle = document.getElementById('mobile-toggle');
  if (mToggle) {
    mToggle.addEventListener('click', function () {
      var open = mobileNav.classList.toggle('open');
      mToggle.textContent = open ? '✕' : '☰';
    });
  }

  (function initParticles() {
    var canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var pts = [];
    var mouseX = -9999;
    var mouseY = -9999;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    for (var i = 0; i < 80; i++) {
      pts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.24,
        r: Math.random() * 2 + 0.5,
        o: Math.random() * 0.5 + 0.1
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (var k = 0; k < pts.length; k++) {
        var p = pts[k];
        var dx = mouseX - p.x;
        var dy = mouseY - p.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < 200 && d > 0) {
          p.vx += (dx / d) * 0.008;
          p.vy += (dy / d) * 0.008;
        }

        var sp = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (sp > 1.2) {
          p.vx = (p.vx / sp) * 1.2;
          p.vy = (p.vy / sp) * 1.2;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(59,130,246,' + p.o + ')';
        ctx.fill();
      }

      for (var a = 0; a < pts.length; a++) {
        for (var b = a + 1; b < pts.length; b++) {
          var ex = pts[a].x - pts[b].x;
          var ey = pts[a].y - pts[b].y;
          var ed = Math.sqrt(ex * ex + ey * ey);
          if (ed < 140) {
            ctx.beginPath();
            ctx.moveTo(pts[a].x, pts[a].y);
            ctx.lineTo(pts[b].x, pts[b].y);
            ctx.strokeStyle = 'rgba(59,130,246,' + (0.08 * (1 - ed / 140)) + ')';
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
  })();

  function buildSplit(id, text, baseDelay) {
    var el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = text.split('').map(function (ch, i) {
      var c = ch === ' ' ? '\u00A0' : ch;
      return '<span class="split-char" style="transition-delay:' + (baseDelay + i * 0.03) + 's">' + c + '</span>';
    }).join('');

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        el.querySelectorAll('.split-char').forEach(function (s) {
          s.classList.add('visible');
        });
      });
    });
  }

  setTimeout(function () {
    buildSplit('split-first', 'Akash', 0.3);
    buildSplit('split-last', 'Panwar', 0.6);
  }, 1900);

  (function () {
    var strings = ['Business Analysis', 'Workflow Thinking', 'Power Platform', 'Product Quality Notes', 'Digital Problem Solving'];
    var el = document.getElementById('typed-text');
    if (!el) return;

    var idx = 0;
    var charIdx = 0;
    var deleting = false;

    function tick() {
      var cur = strings[idx % strings.length];
      if (!deleting) {
        charIdx++;
        el.textContent = cur.slice(0, charIdx);
        if (charIdx === cur.length) {
          deleting = true;
          setTimeout(tick, 2200);
          return;
        }
        setTimeout(tick, 70);
      } else {
        charIdx--;
        el.textContent = cur.slice(0, charIdx);
        if (charIdx === 0) {
          deleting = false;
          idx++;
          setTimeout(tick, 200);
          return;
        }
        setTimeout(tick, 35);
      }
    }

    setTimeout(tick, 2000);
  })();

  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal-section').forEach(function (s) {
    revealObs.observe(s);
  });

  var statsObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      document.querySelectorAll('.stat-item').forEach(function (item, i) {
        item.style.transitionDelay = (i * 0.12) + 's';
        item.classList.add('visible');
        var counter = item.querySelector('.counter');
        var target = parseInt(item.dataset.target, 10);
        if (!counter || isNaN(target)) return;
        var cur = 0;
        var step = target / (2000 / 16);
        var id = setInterval(function () {
          cur += step;
          if (cur >= target) {
            counter.textContent = target;
            clearInterval(id);
          } else {
            counter.textContent = Math.floor(cur);
          }
        }, 16);
      });
      statsObs.unobserve(e.target);
    });
  }, { threshold: 0.2 });

  var sg = document.getElementById('stats-grid');
  if (sg) statsObs.observe(sg);

  var skillsObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.skill-bar').forEach(function (bar) {
        var delay = parseFloat(bar.style.transitionDelay) || 0;
        setTimeout(function () {
          bar.style.width = bar.dataset.pct + '%';
        }, delay * 1000);
      });
      skillsObs.unobserve(e.target);
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.skill-card').forEach(function (c) {
    skillsObs.observe(c);
  });

  document.querySelectorAll('.tilt-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = 'perspective(800px) rotateY(' + (x * 10) + 'deg) rotateX(' + (-y * 10) + 'deg) scale3d(1.03,1.03,1.03)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
    });
  });

  (function handleFormNotice() {
    var notice = document.getElementById('form-notice');
    if (!notice) return;

    var params = new URLSearchParams(window.location.search);
    var status = params.get('status');
    var msg = params.get('msg');

    if (status && msg) {
      notice.className = 'form-notice ' + (status === 'success' ? 'success' : 'error');
      notice.textContent = msg;

      var cleanUrl = window.location.origin + window.location.pathname + window.location.hash;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  })();
})();
