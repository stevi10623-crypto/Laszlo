document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.background-particles');
    
    // Create more floating particles for a livelier background
    for (let i = 0; i < 35; i++) {
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

    // Initialize custom glowing cursor with sparkle trail
    initCustomCursor();

    // Typewriter effect for hero subtitle
    initTypewriter();

    // Initialize ScrollReveal animations with premium distances
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
    
    let lastX = 0;
    let lastY = 0;

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Fluid follower
        follower.style.transform = `translate(-50%, -50%) translate(${e.clientX}px, ${e.clientY}px)`;
        
        // Sparkle trail if moved significantly
        const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
        if (dist > 15) {
            createSparkle(e.clientX, e.clientY);
            lastX = e.clientX;
            lastY = e.clientY;
        }
    });

    // Ripple effect on click
    document.addEventListener('click', (e) => {
        createRipple(e.clientX, e.clientY);
    });

    const interactables = document.querySelectorAll('a, button, .gallery-item, .timeline-content, .floating-laszlo, .floating-photo, .comedy-card');
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

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    const colors = ['#FF2E4C', '#1E8F43', '#FFD700', '#FFFFFF'];
    sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
}

function createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.position = 'fixed';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = '2px';
    ripple.style.height = '2px';
    ripple.style.border = '1px solid rgba(255, 46, 76, 0.5)';
    ripple.style.borderRadius = '50%';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '9997';
    document.body.appendChild(ripple);

    ripple.animate([
        { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
        { transform: 'translate(-50%, -50%) scale(100)', opacity: 0 }
    ], {
        duration: 1000,
        easing: 'out-quad'
    }).onfinish = () => ripple.remove();
}

function initTypewriter() {
    const subtitle = document.querySelector('.subtitle');
    if (!subtitle) return;
    
    const messages = [
        "Loves wine, water polo, and hiding candy.",
        "Master of the house-shaking sneeze.",
        "Official curb-kissing driving legend.",
        "The best Hungarian dad/grandpa/friend there is.",
        "Lovely Jubbly! Del Boy's secret mentor."
    ];
    
    let msgIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    
    function type() {
        const currentMsg = messages[msgIdx];
        if (isDeleting) {
            subtitle.textContent = currentMsg.substring(0, charIdx - 1);
            charIdx--;
        } else {
            subtitle.textContent = currentMsg.substring(0, charIdx + 1);
            charIdx++;
        }
        
        subtitle.classList.add('typewriter-cursor');
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIdx === currentMsg.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            msgIdx = (msgIdx + 1) % messages.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    subtitle.innerHTML = '';
    type();
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
    const laszloVoice = voices.find(v => v.name.includes('Daniel') || v.name.includes('Alex') || v.name.includes('Fred')) || voices[0];
    if (laszloVoice) utterance.voice = laszloVoice;
    
    synth.speak(utterance);
}

function createFloatingTexts() {
    const phrases = ['I am Laszlo 🍷', 'I am Laszlo 🕺', 'I am Laszlo! 🇭🇺', 'I AM LASZLO 🥂'];
    const colors = ['#FF2E4C', '#1E8F43', '#ffa07a', '#ffffff'];

    phrases.forEach((text, i) => {
        const el = document.createElement('div');
        el.className = 'floating-laszlo';
        el.textContent = text;
        el.style.color = colors[i % colors.length];
        el.style.fontSize = (Math.random() * 20 + 20) + 'px';
        el.style.fontWeight = '700';
        el.style.position = 'fixed';
        el.style.zIndex = '100';
        el.style.cursor = 'pointer';
        el.style.userSelect = 'none';
        el.style.textShadow = '0 0 15px rgba(255,46,76,0.5)';
        document.body.appendChild(el);

        // Click to hear Laszlo speak!
        el.addEventListener('click', () => {
            speakLaszlo();
            el.style.transform = 'scale(1.5)';
            setTimeout(() => el.style.transform = 'scale(1)', 300);
        });

        let x = Math.random() * (window.innerWidth - 200);
        let y = Math.random() * (window.innerHeight - 50);
        let dx = (Math.random() * 1.5 + 0.5) * (Math.random() > 0.5 ? 1 : -1);
        let dy = (Math.random() * 1.5 + 0.5) * (Math.random() > 0.5 ? 1 : -1);

        function animate() {
            x += dx;
            y += dy;

            if (x <= 0 || x >= window.innerWidth - el.offsetWidth) dx = -dx;
            if (y <= 0 || y >= window.innerHeight - el.offsetHeight) dy = -dy;

            el.style.left = x + 'px';
            el.style.top = y + 'px';
            requestAnimationFrame(animate);
        }
        animate();
    });
}

function startParty() {
    launchConfetti();
    createEmojiRain();
}

function createEmojiRain() {
    const emojis = ['🍷', '🕺', '🍰', '🇭🇺', '🍖', '⛳️', '🏎️', '🍭'];
    const container = document.getElementById('emoji-rain');
    if (!container) { // Create container if it doesn't exist
        const newContainer = document.createElement('div');
        newContainer.id = 'emoji-rain';
        newContainer.style.position = 'fixed';
        newContainer.style.top = '0';
        newContainer.style.left = '0';
        newContainer.style.width = '100%';
        newContainer.style.height = '100%';
        newContainer.style.pointerEvents = 'none';
        newContainer.style.overflow = 'hidden';
        newContainer.style.zIndex = '9998';
        document.body.appendChild(newContainer);
    }
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.className = 'falling-emoji';
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.position = 'absolute';
            emoji.style.top = '-50px'; // Start above the screen
            emoji.style.left = Math.random() * 100 + 'vw';
            emoji.style.fontSize = (Math.random() * 20 + 20) + 'px';
            emoji.style.opacity = Math.random() * 0.7 + 0.3;
            emoji.style.transform = `rotate(${Math.random() * 360}deg)`;
            emoji.style.transition = `transform ${Math.random() * 0.5 + 0.5}s linear, top ${Math.random() * 2 + 3}s linear, opacity ${Math.random() * 0.5 + 0.5}s linear`;
            
            document.getElementById('emoji-rain').appendChild(emoji);
            
            // Animate falling
            requestAnimationFrame(() => {
                emoji.style.top = '100%';
                emoji.style.opacity = '0';
                emoji.style.transform = `rotate(${Math.random() * 360 + 720}deg)`; // Spin more
            });

            emoji.addEventListener('transitionend', () => emoji.remove());
        }, i * 150);
    }
}

function launchConfetti() {
    // Simple canvas-free confetti using DOM elements
    for (let i = 0; i < 50; i++) {
        const c = document.createElement('div');
        c.style.position = 'fixed';
        c.style.left = '50%';
        c.style.top = '50%';
        c.style.width = '10px';
        c.style.height = '10px';
        c.style.backgroundColor = ['#FF2E4C', '#1E8F43', '#FFD700', '#ffffff'][Math.floor(Math.random() * 4)];
        c.style.zIndex = '10000';
        c.style.borderRadius = '50%';
        document.body.appendChild(c);

        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 300 + 100;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;

        c.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
            { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`, opacity: 0 }
        ], {
            duration: 1000 + Math.random() * 500,
            easing: 'cubic-bezier(0, .9, .57, 1)'
        }).onfinish = () => c.remove();
    }
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
            startParty(); // Trigger party effects on play!
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

        // Funny tooltips on hover
        const funnyCaptions = [
            "Laszlo planning his next candy heist.",
            "The wince of a true wine connoisseur.",
            "0.1 seconds before a house-shaking sneeze.",
            "Thinking about gulyás.",
            "Master navigating a curb.",
            "Golfing pro (don't check the scorecard)."
        ];
        
        item.setAttribute('title', funnyCaptions[Math.floor(Math.random() * funnyCaptions.length)]);

        // Apply 3D VanillaTilt effect to the gallery item
        VanillaTilt.init(item, {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.4,
            scale: 1.05
        });
    });

    // Re-trigger scroll reveal for newly added dynamic elements
    ScrollReveal().reveal('.gallery-item', { 
        origin: 'bottom',
        distance: '50px',
        interval: 100,
        duration: 800
    });

    // Create floating thumbnail images from a selection of gallery photos
    createFloatingImages(images);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Randomize properties
    const size = Math.random() * 15 + 5;
    const posX = Math.random() * 100;
    const delay = Math.random() * 10;
    const duration = Math.random() * 10 + 10;
    
    // Red, green, gold, and white dots
    const colors = ['#FF2E4C', '#1E8F43', '#FFD700', '#FFFFFF'];
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

// Floating thumbnail images that drift around the screen
function createFloatingImages(images) {
    // Pick 5 random images to float
    const shuffled = [...images].sort(() => Math.random() - 0.5);
    const picks = shuffled.slice(0, 5);

    picks.forEach((imgSrc, i) => {
        const el = document.createElement('img');
        el.src = `images/${imgSrc}`;
        el.className = 'floating-photo';
        el.style.position = 'fixed';
        el.style.zIndex = '40';
        el.style.pointerEvents = 'auto';
        el.style.cursor = 'pointer';
        const size = Math.random() * 40 + 60; // 60-100px
        el.style.width = size + 'px';
        el.style.height = size + 'px';
        el.style.objectFit = 'cover';
        el.style.borderRadius = '50%';
        el.style.border = '2px solid rgba(255,46,76,0.5)';
        el.style.boxShadow = '0 4px 20px rgba(255,46,76,0.3)';
        el.style.opacity = '0.7';
        el.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        document.body.appendChild(el);

        // Click to enlarge in lightbox
        el.addEventListener('click', (e) => {
            e.stopPropagation();
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            if (lightbox && lightboxImg) {
                lightboxImg.src = el.src;
                lightbox.classList.add('active');
            }
        });

        // Hover effect
        el.addEventListener('mouseenter', () => {
            el.style.opacity = '1';
            el.style.transform = 'scale(1.3)';
        });
        el.addEventListener('mouseleave', () => {
            el.style.opacity = '0.7';
            el.style.transform = 'scale(1)';
        });

        let x = Math.random() * (window.innerWidth - 120);
        let y = Math.random() * (window.innerHeight - 120);
        let dx = (Math.random() * 0.4 + 0.2) * (Math.random() > 0.5 ? 1 : -1);
        let dy = (Math.random() * 0.4 + 0.2) * (Math.random() > 0.5 ? 1 : -1);

        function animate() {
            x += dx;
            y += dy;
            if (x <= 0 || x >= window.innerWidth - el.offsetWidth) {
                dx = -dx;
            }
            if (y <= 0 || y >= window.innerHeight - el.offsetHeight) {
                dy = -dy;
            }
            el.style.left = x + 'px';
            el.style.top = y + 'px';
            requestAnimationFrame(animate);
        }
        animate();
    });
}

// Confetti burst effect
function launchConfetti() {
    const colors = ['#FF2E4C', '#1E8F43', '#FFD700', '#FF69B4', '#00BFFF', '#FFA07A'];
    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        confetti.style.width = (Math.random() * 8 + 4) + 'px';
        confetti.style.height = (Math.random() * 8 + 4) + 'px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        document.body.appendChild(confetti);

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 400 + 200;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        const rotation = Math.random() * 720;

        confetti.animate([
            { transform: 'translate(-50%, -50%) rotate(0deg)', opacity: 1 },
            { transform: `translate(calc(-50% + ${vx}px), calc(-50% + ${vy}px)) rotate(${rotation}deg)`, opacity: 0 }
        ], {
            duration: 1500 + Math.random() * 1000,
            easing: 'cubic-bezier(0, .9, .57, 1)'
        }).onfinish = () => confetti.remove();
    }
}

// Attach confetti to the hero button
document.addEventListener('DOMContentLoaded', () => {
    const heroBtn = document.querySelector('.btn');
    if (heroBtn) {
        heroBtn.addEventListener('click', (e) => {
            e.preventDefault();
            launchConfetti();
            speakLaszlo();
        });
    }

    // Pulsing glow on the title
    const title = document.querySelector('.title');
    if (title) {
        setInterval(() => {
            title.style.textShadow = '0 0 40px rgba(255,46,76,0.6), 0 10px 30px rgba(0,0,0,0.5)';
            setTimeout(() => {
                title.style.textShadow = '0 10px 30px rgba(0,0,0,0.5)';
            }, 1500);
        }, 3000);
    }
});
