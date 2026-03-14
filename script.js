document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.background-particles');
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
        createParticle(container);
    }

    // Load gallery images
    loadGalleryImages();

    // Setup Music Audio (autoplay)
    setupMusicPlayer(true);

    // Floating "I am Laszlo" text (clickable with voice!)
    createFloatingTexts();

    // Setup lightbox for gallery
    setupLightbox();

    // Initialize custom glowing cursor
    initCustomCursor();

    // Initialize ScrollReveal animations
    initScrollAnimations();

    // Parallax background effect on mousemove
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        container.style.transform = `translate(${x}px, ${y}px)`;
    });
});

function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Slight delay for follower
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 50);
    });

    // Add glowing hover states to interactive elements
    const interactables = document.querySelectorAll('a, button, .gallery-item, .timeline-content');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        });
    });
}

function initScrollAnimations() {
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        easing: 'cubic-bezier(0.5, 0, 0, 1)'
    });

    sr.reveal('.section-title', { distance: '40px' });
    sr.reveal('.section-desc', { delay: 300 });
    sr.reveal('.timeline-item', { interval: 200 });
    sr.reveal('.message-card', { origin: 'top', distance: '40px', duration: 1200 });
}

function speakLaszlo() {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance('I am Laszlo');
    utterance.rate = 0.7; // Slow and deep
    utterance.pitch = 0.4; // Very deep voice
    utterance.volume = 1;
    
    // Try to find a deep male voice
    const voices = synth.getVoices();
    const deepVoice = voices.find(v => v.name.includes('Daniel') || v.name.includes('Alex') || v.name.includes('Fred')) 
                   || voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('male'))
                   || voices[0];
    if (deepVoice) utterance.voice = deepVoice;
    
    synth.speak(utterance);
}

function createFloatingTexts() {
    const phrases = ['I am Laszlo 🇭🇺', 'I am Laszlo 🍷', 'I am Laszlo! 💃'];
    const colors = ['#FF2E4C', '#1E8F43', '#FFD700'];

    // Pre-load voices
    window.speechSynthesis.getVoices();

    phrases.forEach((text, i) => {
        const el = document.createElement('div');
        el.className = 'floating-laszlo';
        el.textContent = text;
        el.style.color = colors[i % colors.length];
        el.style.fontSize = (Math.random() * 14 + 20) + 'px';
        el.style.fontWeight = '700';
        el.style.fontFamily = 'Outfit, sans-serif';
        el.style.position = 'fixed';
        el.style.zIndex = '50';
        el.style.pointerEvents = 'auto';
        el.style.cursor = 'pointer';
        el.style.textShadow = '0 0 20px rgba(255,46,76,0.5)';
        el.style.whiteSpace = 'nowrap';
        el.style.opacity = '0.75';
        el.style.userSelect = 'none';
        el.style.transition = 'transform 0.2s ease';
        document.body.appendChild(el);

        // Click to hear "I am Laszlo" in a deep voice
        el.addEventListener('click', (e) => {
            e.stopPropagation();
            speakLaszlo();
            el.style.transform = 'scale(1.8)';
            el.style.color = '#FFD700';
            setTimeout(() => { el.style.transform = 'scale(1)'; }, 400);
        });

        // Random starting position
        let x = Math.random() * (window.innerWidth - 200);
        let y = Math.random() * (window.innerHeight - 50);
        // Much slower speed: 0.3 to 0.8 pixels per frame
        let dx = (Math.random() * 0.5 + 0.3) * (Math.random() > 0.5 ? 1 : -1);
        let dy = (Math.random() * 0.5 + 0.3) * (Math.random() > 0.5 ? 1 : -1);

        function animate() {
            x += dx;
            y += dy;

            // Bounce off edges (DVD screensaver style!)
            if (x <= 0 || x >= window.innerWidth - el.offsetWidth) {
                dx = -dx;
                el.style.color = colors[Math.floor(Math.random() * colors.length)];
            }
            if (y <= 0 || y >= window.innerHeight - el.offsetHeight) {
                dy = -dy;
                el.style.color = colors[Math.floor(Math.random() * colors.length)];
            }

            el.style.left = x + 'px';
            el.style.top = y + 'px';
            requestAnimationFrame(animate);
        }
        animate();
    });
}

function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (!lightbox) return;

    // Close lightbox on click
    lightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightboxClose.addEventListener('click', (e) => {
        e.stopPropagation();
        lightbox.classList.remove('active');
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') lightbox.classList.remove('active');
    });
}

function setupMusicPlayer(autoplay) {
    const audio = document.getElementById('bg-music');
    const btn = document.getElementById('music-btn');

    if (!btn || !audio) return;

    // Start playing state since autoplay is on
    let isPlaying = true;
    btn.classList.add('playing');

    // If autoplay was blocked by browser, update the button
    audio.addEventListener('pause', () => {
        if (!audio.ended) {
            isPlaying = false;
            btn.classList.remove('playing');
            btn.innerHTML = '🎵 Play Hungarian Music';
        }
    });

    audio.addEventListener('play', () => {
        isPlaying = true;
        btn.classList.add('playing');
        btn.innerHTML = '⏸ Pause Music';
    });

    btn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });
}

function loadGalleryImages() {
    const gallery = document.getElementById('photo-gallery');
    if (!gallery) return;

    // Hardcoded array of image names found in the directory
    const images = [
        "hungarian_wine.png", "nanao_banana_pro.png",
        "DSC00076.JPG", "Screenshot_20221129-164945_Photos.jpg", "DSC00100.JPG", "Picture 072.jpg", 
        "IMG_2953.jpg", "20191204_080456.jpg", "DSC00075.JPG", "20180409_193626.jpg", 
        "20201120_184213~2.jpg", "DSC00065.JPG", "20220811_194007.jpg", "Screenshot_20240926_122633_Photos.jpg", 
        "20180223_172306.jpg", "Screenshot_20201210-075743_OneDrive.jpg", "DSC00072.JPG", "Screenshot_20251115_115322_Facebook.jpg", 
        "DSC00067.jpg", "IMG_20170812_183646-COLLAGE.jpg", "Screenshot_20240203_151420_Photos.jpg", "20180714_153823.jpg", 
        "20220812_170538.jpg", "Screenshot_20240827_090658_OneDrive.jpg", "Screenshot_20210620-000353_Photos.jpg", "20141122_215239.jpg", 
        "20180404_133812.jpg", "FIL10203.JPG", "DSC00007.jpg", "Screenshot_20221129-164515_Photos.jpg", 
        "20191204_080426.jpg", "20180404_133810.jpg", "DSC00004.JPG", "20190802_130027.jpg", 
        "FB_IMG_1503810866712.jpg", "IMG_20170812_183633.jpg", "DSC00142.JPG", "Screenshot_20241119_072537_OneDrive.jpg", 
        "20210716_152122.jpg", "20190619_084355.jpg", "20160206_185304.jpg", "Screenshot_20251014_113536_Photos.jpg", 
        "IMG_20200321_104548_975.jpg", "20181113_234911.jpg", "FIL10168.JPG", "20190802_130158.jpg", 
        "Screenshot_20240203_151110_Photos.jpg", "Screenshot_20240827_122235_Facebook.jpg", "DSC00149-COLLAGE.jpg", "DSC00080.JPG", 
        "Screenshot_20240203_151405_Photos.jpg", "20141213_120748_002.jpg", "20201120_184214.jpg", "client_PART_1504042892051_IMG_0901.jpg", 
        "DSC00082.JPG", "FIL10047.JPG", "FIL10494.JPG", "client_PART_1505613262587_IMG_20170916_185220.jpg", 
        "DSC00078.JPG", "20190727_144635.jpg", "Screenshot_20240124_131301_Photos.jpg", "DSC00079.JPG", 
        "20201120_184210.jpg", "DSC00076(1).JPG", "IMG_2948.jpg", "Screenshot_20240203_151355_Photos.jpg", "20191204_080511.jpg"
    ];

    // Clear placeholder
    gallery.innerHTML = '';

    images.forEach((imgSrc, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        
        // Let ScrollReveal handle the entrance instead of custom CSS
        
        const img = document.createElement('img');
        img.src = `images/${imgSrc}`;
        img.alt = `Memory with Laszlo ${index + 1}`;
        img.className = 'gallery-image';
        img.loading = 'lazy'; // Improve performance

        item.appendChild(img);
        gallery.appendChild(item);

        // Click to enlarge in lightbox
        item.addEventListener('click', () => {
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            if (lightbox && lightboxImg) {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
            }
        });

        // Apply 3D VanillaTilt effect to the gallery item
        VanillaTilt.init(item, {
            max: 8,
            speed: 400,
            glare: true,
            "max-glare": 0.3,
            scale: 1.02
        });
    });

    // Re-trigger scroll reveal for newly added dynamic elements
    ScrollReveal().reveal('.gallery-item', { 
        origin: 'bottom',
        distance: '50px',
        interval: 100,
        duration: 800
    });
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Randomize properties
    const size = Math.random() * 15 + 5; // 5px to 20px
    const posX = Math.random() * 100; // 0% to 100%
    const delay = Math.random() * 10; // 0s to 10s
    const duration = Math.random() * 10 + 10; // 10s to 20s
    
    // Red, green, or white dots
    const colors = ['#CE2939', '#477050', '#FFFFFF'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}vw`;
    particle.style.background = color;
    particle.style.opacity = Math.random() * 0.4 + 0.1;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    
    container.appendChild(particle);
}
