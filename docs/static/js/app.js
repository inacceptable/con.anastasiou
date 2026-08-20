(function () {
	var root = document.documentElement;
	var themeToggle = document.getElementById('theme-toggle');
	var themeIcon = document.getElementById('theme-icon');
	var navToggle = document.getElementById('nav-toggle');
	var navLinks = document.getElementById('nav-links');

	function applyTheme(theme) {
		root.setAttribute('data-theme', theme);
		themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
		localStorage.setItem('theme', theme);
	}

	var storedTheme = localStorage.getItem('theme');
	var prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
	applyTheme(storedTheme || (prefersLight ? 'light' : 'dark'));

	themeToggle.addEventListener('click', function () {
		var current = root.getAttribute('data-theme');
		applyTheme(current === 'dark' ? 'light' : 'dark');
	});

	navToggle.addEventListener('click', function () {
		navLinks.classList.toggle('open');
	});

	var links = navLinks.querySelectorAll('a');
	links.forEach(function (link) {
		link.addEventListener('click', function () {
			navLinks.classList.remove('open');
		});
	});

	if ('IntersectionObserver' in window) {
		var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
		var linkFor = function (id) {
			return navLinks.querySelector('a[href="#' + id + '"]');
		};

		var observer = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				var link = linkFor(entry.target.id);
				if (!link) { return; }
				if (entry.isIntersecting) {
					links.forEach(function (l) { l.classList.remove('active'); });
					link.classList.add('active');
				}
			});
		}, { rootMargin: '-45% 0px -50% 0px' });

		sections.forEach(function (section) { observer.observe(section); });
	}
})();
