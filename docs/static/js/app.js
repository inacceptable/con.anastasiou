(function () {
	var root = document.documentElement;
	var themeToggle = document.getElementById('theme-toggle');
	var themeIcon = document.getElementById('theme-icon');
	var navToggle = document.getElementById('nav-toggle');
	var navLinks = document.getElementById('nav-links');

	/* Theme -------------------------------------------------- */
	function applyTheme(theme) {
		root.setAttribute('data-theme', theme);
		themeIcon.textContent = theme === 'dark' ? '☀' : '☾';
		try { localStorage.setItem('theme', theme); } catch (e) {}
	}

	var storedTheme;
	try { storedTheme = localStorage.getItem('theme'); } catch (e) {}
	var prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
	applyTheme(storedTheme || (prefersLight ? 'light' : 'dark'));

	themeToggle.addEventListener('click', function () {
		applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
	});

	/* Mobile nav ------------------------------------------- */
	function closeNav() { navLinks.classList.remove('open'); }

	navToggle.addEventListener('click', function (e) {
		e.stopPropagation();
		navLinks.classList.toggle('open');
	});

	var links = navLinks.querySelectorAll('a');
	links.forEach(function (link) {
		link.addEventListener('click', closeNav);
	});

	document.addEventListener('click', function (e) {
		if (navLinks.classList.contains('open') && !navLinks.contains(e.target)) {
			closeNav();
		}
	});

	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape') { closeNav(); }
	});

	/* Scroll-spy on nav ----------------------------------- */
	var spyIds = ['home', 'work', 'skills', 'contact'];
	var sections = spyIds
		.map(function (id) { return document.getElementById(id); })
		.filter(Boolean);

	if ('IntersectionObserver' in window && sections.length) {
		var linkFor = function (id) { return navLinks.querySelector('a[href="#' + id + '"]'); };
		var spy = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (!entry.isIntersecting) { return; }
				links.forEach(function (l) { l.classList.remove('active'); });
				var link = linkFor(entry.target.id);
				if (link) { link.classList.add('active'); }
			});
		}, { rootMargin: '-45% 0px -50% 0px' });
		sections.forEach(function (s) { spy.observe(s); });
	}

	/* Reveal on scroll ----------------------------------- */
	var revealTargets = document.querySelectorAll('[data-reveal]');
	if ('IntersectionObserver' in window && revealTargets.length) {
		var reveal = new IntersectionObserver(function (entries, obs) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('in');
					obs.unobserve(entry.target);
				}
			});
		}, { rootMargin: '0px 0px -10% 0px' });
		revealTargets.forEach(function (t) { reveal.observe(t); });
	} else {
		revealTargets.forEach(function (t) { t.classList.add('in'); });
	}
})();
