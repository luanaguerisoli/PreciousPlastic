//menu móvel e carrossel
document.addEventListener('DOMContentLoaded', function () {
	// Menu mobile toggle
	const navToggle = document.getElementById('nav-toggle');
	const mobileMenu = document.getElementById('mobile-menu');
	const iconOpen = document.getElementById('icon-open');
	const iconClose = document.getElementById('icon-close');

	if (navToggle) {
		navToggle.addEventListener('click', function () {
			const expanded = navToggle.getAttribute('aria-expanded') === 'true';
			navToggle.setAttribute('aria-expanded', String(!expanded));
			mobileMenu.classList.toggle('hidden');
			iconOpen.classList.toggle('hidden');
			iconClose.classList.toggle('hidden');
		});
	}

	//carrossel
	const track = document.querySelector('.carousel-track');
	const slides = track ? Array.from(track.children) : [];
	const prevBtn = document.getElementById('prev');
	const nextBtn = document.getElementById('next');
	const indicators = Array.from(document.querySelectorAll('.indicator'));
	let currentIndex = 0;
	let intervalId = null;
	const slideCount = slides.length;

	function goTo(index) {
		if (!track) return;
		index = (index + slideCount) % slideCount;
		const percent = -100 * index;
		track.style.transform = `translateX(${percent}%)`;
		currentIndex = index;
		updateIndicators();
	}

	function updateIndicators() {
		indicators.forEach((btn) => btn.classList.remove('bg-white/80'));
		const active = indicators[currentIndex];
		if (active) active.classList.add('bg-white/80');
	}

	function next() { goTo(currentIndex + 1); }
	function prev() { goTo(currentIndex - 1); }

	if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetInterval(); });
	if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetInterval(); });

	indicators.forEach(btn => {
		btn.addEventListener('click', (e) => {
			const idx = Number(btn.dataset.index);
			goTo(idx);
			resetInterval();
		});
	});

	function startInterval() {
		stopInterval();
		intervalId = setInterval(next, 4000);
	}

	function stopInterval() {
		if (intervalId) { clearInterval(intervalId); intervalId = null; }
	}

	function resetInterval() { stopInterval(); startInterval(); }

	const carousel = document.getElementById('carousel');
	if (carousel) {
		carousel.addEventListener('mouseenter', stopInterval);
		carousel.addEventListener('mouseleave', startInterval);
		carousel.addEventListener('focusin', stopInterval);
		carousel.addEventListener('focusout', startInterval);
	}

	if (slideCount > 0) {
		goTo(0);
		startInterval();
	}
});

function toggleDetails(id) {
    const allDetails = document.querySelectorAll('.project-details');
    const selectedDetail = document.getElementById(id);

    // 1. Esconde todos os outros detalhes
    allDetails.forEach(detail => {
        if (detail.id !== id) {
            detail.classList.add('hidden');
        }
    });

    // 2. Alterna a visibilidade do detalhe selecionado
    selectedDetail.classList.toggle('hidden');
}
