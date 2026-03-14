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

    // Initialize Whack-a-Laszlo Game
    initGame();

    // Initialize high-end "Neural Laszlo" interaction
    initNeuralLaszlo();

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

function speakLaszlo(customText = 'I am Laszlo') {
    const synth = window.speechSynthesis;
    if (synth.speaking) synth.cancel(); // Stop current speech
    
    const utterance = new SpeechSynthesisUtterance(customText);
    utterance.rate = 0.75;
    utterance.pitch = 0.5;
    utterance.volume = 1;
    
    const voices = synth.getVoices();
    // Prefer "Daniel" for a deep, clear quality if available
    const laszloVoice = voices.find(v => v.name.includes('Daniel') || v.name.includes('Alex') || v.name.includes('Fred')) || voices[0];
    if (laszloVoice) utterance.voice = laszloVoice;
    
    synth.speak(utterance);
}

function initGame() {
    const holes = document.querySelectorAll('.hole');
    const scoreBoard = document.querySelector('#score');
    const startBtn = document.querySelector('#start-game');
    let lastHole;
    let timeUp = false;
    let score = 0;

    // Create moles (round Laszlo heads)
    holes.forEach(hole => {
        const mole = document.createElement('div');
        mole.className = 'mole';
        mole.style.backgroundImage = 'url("images/hungarian_wine.png")'; // Default head
        hole.appendChild(mole);
        mole.addEventListener('click', whack);
    });

    const moles = document.querySelectorAll('.mole');

    function randomTime(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function randomHole(holes) {
        const idx = Math.floor(Math.random() * holes.length);
        const hole = holes[idx];
        if (hole === lastHole) return randomHole(holes);
        lastHole = hole;
        return hole;
    }

    function peep() {
        const time = randomTime(400, 1000);
        const hole = randomHole(holes);
        const mole = hole.querySelector('.mole');
        
        // Use ALL 67 images for the moles!
        const allImages = [
            "20141122_215239.jpg", "20141213_120748_002.jpg", "20160206_185304.jpg", "20180223_172306.jpg",
            "20180404_133810.jpg", "20180404_133812.jpg", "20180409_193626.jpg", "20180714_153823.jpg",
            "20181113_234911.jpg", "20190619_084355.jpg", "20190727_144635.jpg", "20190802_130027.jpg",
            "20190802_130158.jpg", "20191204_080426.jpg", "20191204_080456.jpg", "20191204_080511.jpg",
            "20201120_184210.jpg", "20201120_184213~2.jpg", "20201120_184214.jpg", "20210716_152122.jpg",
            "20220811_194007.jpg", "20220812_170538.jpg", "DSC00004.JPG", "DSC00007.jpg",
            "DSC00065.JPG", "DSC00067.jpg", "DSC00072.JPG", "DSC00075.JPG",
            "DSC00076(1).JPG", "DSC00076.JPG", "DSC00078.JPG", "DSC00079.JPG",
            "DSC00080.JPG", "DSC00082.JPG", "DSC00100.JPG", "DSC00142.JPG",
            "DSC00149-COLLAGE.jpg", "FB_IMG_1503810866712.jpg", "FIL10047.JPG", "FIL10168.JPG",
            "FIL10203.JPG", "FIL10494.JPG", "IMG_20170812_183633.jpg", "IMG_20170812_183646-COLLAGE.jpg",
            "IMG_20200321_104548_975.jpg", "IMG_2948.jpg", "IMG_2953.jpg", "Picture 072.jpg",
            "Screenshot_20201210-075743_OneDrive.jpg", "Screenshot_20210620-000353_Photos.jpg",
            "Screenshot_20221129-164515_Photos.jpg", "Screenshot_20221129-164945_Photos.jpg",
            "Screenshot_20240124_131301_Photos.jpg", "Screenshot_20240203_151110_Photos.jpg",
            "Screenshot_20240203_151355_Photos.jpg", "Screenshot_20240203_151405_Photos.jpg",
            "Screenshot_20240203_151420_Photos.jpg", "Screenshot_20240827_090658_OneDrive.jpg",
            "Screenshot_20240827_122235_Facebook.jpg", "Screenshot_20240926_122633_Photos.jpg",
            "Screenshot_20241119_072537_OneDrive.jpg", "Screenshot_20251014_113536_Photos.jpg",
            "Screenshot_20251115_115322_Facebook.jpg", "client_PART_1504042892051_IMG_0901.jpg",
            "client_PART_1505613262587_IMG_20170916_185220.jpg", "hungarian_wine.png", "nanao_banana_pro.png"
        ];
        
        mole.style.backgroundImage = `url("images/${allImages[Math.floor(Math.random()*allImages.length)]}")`;
        
        mole.classList.add('up');
        setTimeout(() => {
            mole.classList.remove('up');
            if (!timeUp) peep();
        }, time);
    }

    function whack(e) {
        if (!e.isTrusted) return; 
        score++;
        this.classList.remove('up');
        scoreBoard.textContent = score;
        speakLaszlo('Ouch!');
        launchConfetti();
        
        if (score === 10) speakLaszlo('Achievement Unlocked: Master Whacker!');
    }

    startBtn.addEventListener('click', () => {
        score = 0;
        scoreBoard.textContent = score;
        timeUp = false;
        peep();
        setTimeout(() => timeUp = true, 15000); // 15 second round
        startBtn.textContent = 'Keep Whacking!';
    });
}

function initNeuralLaszlo() {
    // Add a high-tech "Neural Interface" button
    const zone = document.querySelector('#story');
    const btn = document.createElement('button');
    btn.className = 'btn neural-btn';
    btn.innerHTML = '🧠 Initialize Neural Laszlo AI';
    btn.style.marginTop = '2rem';
    btn.style.display = 'block';
    btn.style.marginLeft = 'auto';
    btn.style.marginRight = 'auto';
    zone.appendChild(btn);

    const numNeuralClips = 15;
    let currentNeuralAudio = null;

    btn.addEventListener('click', () => {
        // Pick a random clip from 1 to 15
        const clipNumber = Math.floor(Math.random() * numNeuralClips) + 1;
        
        if (currentNeuralAudio) {
            currentNeuralAudio.pause();
        }
        currentNeuralAudio = new Audio(`audio/neural_${clipNumber}.mp3`);
        currentNeuralAudio.play().catch(e => console.log("Neural audio blocked until interaction", e));
        
        launchConfetti();
        btn.classList.add('pulse-glow');
        setTimeout(() => btn.classList.remove('pulse-glow'), 1000);
    });
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
    
    // Wild Party Effects
    document.body.style.animation = 'partyColors 0.5s infinite';
    document.body.classList.add('party-shake');
    
    setTimeout(() => {
        document.body.style.animation = '';
        document.body.classList.remove('party-shake');
    }, 5000);
}

// Add these to CSS dynamically if needed, but let's assume they're in styles.css or add them here
const style = document.createElement('style');
style.textContent = `
    @keyframes partyColors {
        0% { background-color: rgba(255, 46, 76, 0.2); }
        33% { background-color: rgba(30, 143, 67, 0.2); }
        66% { background-color: rgba(255, 215, 0, 0.2); }
        100% { background-color: rgba(15, 15, 17, 1); }
    }
    .party-shake {
        animation: shake 0.1s infinite;
    }
    @keyframes shake {
        0% { transform: translate(1px, 1px) rotate(0deg); }
        20% { transform: translate(-3px, 0px) rotate(1deg); }
        40% { transform: translate(1px, -1px) rotate(-1deg); }
        60% { transform: translate(-1px, 1px) rotate(0deg); }
        80% { transform: translate(3px, 1px) rotate(1deg); }
        100% { transform: translate(1px, -2px) rotate(-1deg); }
    }
`;
document.head.appendChild(style);

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

    btn.addEventListener('click', () => {
        // Achievement: First interaction!
        if (audio.paused) {
            // Big tech: Try to play with a guaranteed source
            audio.src = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; 
            audio.load();
            audio.play().then(() => {
                btn.classList.add('playing');
                btn.innerHTML = '⏸ Stop the Party';
                startParty();
                speakLaszlo('Let the party begin!');
            }).catch(e => {
                console.error("Audio playback blocked", e);
                btn.innerHTML = '⚠️ Click to UNMUTE';
            });
        } else {
            audio.pause();
            btn.classList.remove('playing');
            btn.innerHTML = '🎵 Restart Hungarian Music';
        }
    });

    // Handle unexpected pauses (browser blocking)
    audio.addEventListener('pause', () => {
        btn.classList.remove('playing');
        btn.innerHTML = '🎵 Play & Start Party';
    });
}

function loadGalleryImages() {
    const gallery = document.getElementById('photo-gallery');
    if (!gallery) return;

    // Hardcoded array of image names found in the directory
    const images = [
        "20141122_215239.jpg", "20141213_120748_002.jpg", "20160206_185304.jpg", "20180223_172306.jpg",
        "20180404_133810.jpg", "20180404_133812.jpg", "20180409_193626.jpg", "20180714_153823.jpg",
        "20181113_234911.jpg", "20190619_084355.jpg", "20190727_144635.jpg", "20190802_130027.jpg",
        "20190802_130158.jpg", "20191204_080426.jpg", "20191204_080456.jpg", "20191204_080511.jpg",
        "20201120_184210.jpg", "20201120_184213~2.jpg", "20201120_184214.jpg", "20210716_152122.jpg",
        "20220811_194007.jpg", "20220812_170538.jpg", "DSC00004.JPG", "DSC00007.jpg",
        "DSC00065.JPG", "DSC00067.jpg", "DSC00072.JPG", "DSC00075.JPG",
        "DSC00076(1).JPG", "DSC00076.JPG", "DSC00078.JPG", "DSC00079.JPG",
        "DSC00080.JPG", "DSC00082.JPG", "DSC00100.JPG", "DSC00142.JPG",
        "DSC00149-COLLAGE.jpg", "FB_IMG_1503810866712.jpg", "FIL10047.JPG", "FIL10168.JPG",
        "FIL10203.JPG", "FIL10494.JPG", "IMG_20170812_183633.jpg", "IMG_20170812_183646-COLLAGE.jpg",
        "IMG_20200321_104548_975.jpg", "IMG_2948.jpg", "IMG_2953.jpg", "Picture 072.jpg",
        "Screenshot_20201210-075743_OneDrive.jpg", "Screenshot_20210620-000353_Photos.jpg",
        "Screenshot_20221129-164515_Photos.jpg", "Screenshot_20221129-164945_Photos.jpg",
        "Screenshot_20240124_131301_Photos.jpg", "Screenshot_20240203_151110_Photos.jpg",
        "Screenshot_20240203_151355_Photos.jpg", "Screenshot_20240203_151405_Photos.jpg",
        "Screenshot_20240203_151420_Photos.jpg", "Screenshot_20240827_090658_OneDrive.jpg",
        "Screenshot_20240827_122235_Facebook.jpg", "Screenshot_20240926_122633_Photos.jpg",
        "Screenshot_20241119_072537_OneDrive.jpg", "Screenshot_20251014_113536_Photos.jpg",
        "Screenshot_20251115_115322_Facebook.jpg", "client_PART_1504042892051_IMG_0901.jpg",
        "client_PART_1505613262587_IMG_20170916_185220.jpg", "hungarian_wine.png", "nanao_banana_pro.png"
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

function initHungarianTranslator() {
    const interactiveBoxes = document.querySelectorAll('.timeline-content, .comedy-card, .message-card');
    
    // Massive dictionary to map English identifiers to fully translated Hungarian PARAGRAPHS
    const translations = {
        "Roots in Hungary": "Egyenesen Magyarországról jött, azzal a vastag, felejthetetlen akcentussal, amit mindannyian imádunk.",
        "A Passion for Wine": "A bor és a konyak szerelmese. Igazi bormester elit diplomával, no meg a konyak... szigorúan három lime-mal!",
        "The Infinite Sneeze": "A brutális tüsszentés. Lászlóé a világ legnagyobb tüsszentése. Beleremeg a ház, megijednek a szomszédok, utána meg jön a jól megszokott elégedett vigyor.",
        "Legendary Candy Stash": "A legendás édességraktár. Állandóan azt mondja, hogy 'semmi édesség', aztán meg varázsütésre előkerülnek a csokipapírok. Ő a nassolás nagymestere.",
        "Master of the Grill": "A grill királya. Adj neki egy darab húst meg egy grillt, és csodát tesz. A titkos recept? Egy kis konyak és rengeteg magyar virtus.",
        "Driving Curb": "A padkák réme. László nem csak vezet, ő érzésből tájékozódik. Ha nem padkázza le a kereket, az a kanyar meg sem történt.",
        "Golfing Legend": "A golflegenda, legalábbis ő ezt hiszi. Elüti a labdát... valahova. Leginkább egy fa vagy egy mókus felé, de mindezt profi arccal és úriember módjára.",
        "Building Connections": "A kapcsolatépítő. Személyi titkárként mindig szervezkedik és imád az emberekkel foglalkozni.",
        "Bar Scene": "A bárvilág. Imádott bárokat nyitott Long Beachen és Redondo Beachen, összehozva az embereket egy jó bulira.",
        "Business Brilliance": "Üzleti zseni. Sikeres üzletkötőként és cégfelvásárlási szakértőként is bizonyított.",
        "A Life Well Lived": "Egy igazán tartalmas élet. A House of Blues oszlopos tagja. Versenyszerű vizilabdázó, parkettördög táncos és lelkes golfozó... mellette sosem unalmas az élet!",
        "(Terrible) Driver": "A kriminális sofőr. Valljuk be őszintén... borzalmasan vezet. Titokban mindannyian nagyon örülünk, hogy letette a jogsit!",
        "Sweet Tooth": "Édesszájú. Hatalmas gyengéje a cukorka és a csokis nápolyi! De vigyázat, ha túleszi magát, jönnek a tüsszögőrohamok!",
        "Hungarian Verdict": "A magyar mérce. László mindent aszerint ítél meg, hogy elég magyar-e. Ha hiányzik a magyaros szikra, jön a klasszikus fintor.",
        "Water Polo": "A hajnali 3 órás vizilabda meccs. Egyszer egy étteremben a só és borsszórókkal magyarázta el a vizilabdát. Máig sem tudjuk ki nyert, de az asztal nagyon jól meg lett fűszerezve.",
        "A Good Laugh": "Egy jóízű nevetés. Imádja a klasszikus vígjátékokat. Nincs is jobb, mint a Mr. Bean vagy a Két pasi meg egy kicsi.",
        "Mr. Bean": "Mr. Bean. Neki sincs szüksége szavakra ahhoz, hogy ő legyen a legviccesebb, pont mint Lászlónak, amikor kicserél egy villanykörtét!",
        "Fools and Horses": "Szeszélyes évszakok. Bárkit képes meggyőzni arról, hogy egy húszéves autó olyan, mintha most gurult volna ki a szalonból.",
        "Laszlo Wince": "A tipikus László fintor. Az a bizonyos arc, amit akkor vág, amikor a bor nem elég magyar... a csalódás és az értetlenség tökéletes keveréke.",
        "A note for Laszlo": "Üzenet Lászlónak. Rengeteg szeretetet és erőt küldünk neked. Olyan sok ember életét tetted szebbé, ma és mindig téged ünneplünk!"
    };

    let currentHungarianAudio = null;

    interactiveBoxes.forEach(box => {
        box.style.cursor = 'help';
        box.setAttribute('title', 'Kattints ide a magyar fordításért! (Click for Hungarian translation)');
        
        box.addEventListener('click', (e) => {
            const innerText = box.innerText;
            let audioPath = "audio/fallback.mp3"; // Default fallback
            
            // Find the matching translation based on English keywords
            for (const key of Object.keys(translations)) {
                if (innerText.includes(key)) {
                    audioPath = "audio/" + key.replace(/[^a-zA-Z0-9]/g, '_') + ".mp3";
                    break;
                }
            }
            
            if (currentHungarianAudio) {
                currentHungarianAudio.pause();
            }
            currentHungarianAudio = new Audio(audioPath);
            currentHungarianAudio.play().catch(e => console.log("Hungarian audio blocked until interaction", e));
            
            // Visual feedback
            const originalColor = box.style.borderColor;
            const originalBg = box.style.backgroundColor;
            box.style.borderColor = '#1E8F43'; // Hungarian Green
            box.style.backgroundColor = 'rgba(30, 143, 67, 0.2)'; 
            
            setTimeout(() => {
                box.style.borderColor = originalColor;
                box.style.backgroundColor = originalBg;
            }, 1000);
        });
    });
}

function speakLaszlo(customText = 'I am Laszlo') {
    const synth = window.speechSynthesis;
    if (synth.speaking) synth.cancel();

    // English Web Speech API
    const utterance = new SpeechSynthesisUtterance(customText);
    utterance.lang = 'en-US'; 
    utterance.volume = 1;

    const voices = synth.getVoices();
    utterance.rate = 0.85;
    utterance.pitch = 0.5;
    const selectedVoice = voices.find(v => v.name.includes('Daniel') || v.name.includes('Alex') || v.name.includes('Fred'));

    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

    synth.speak(utterance);
}

// Boat Honk and Pulsing initialization
document.addEventListener('DOMContentLoaded', () => {
    const boat = document.querySelector('.boat');
    if (boat) {
        boat.addEventListener('click', () => {
            const honk = new Audio('https://www.soundjay.com/transportation/sounds/ship-horn-1.mp3');
            honk.volume = 0.4;
            honk.play().catch(() => {});
            
            // Play native generated Hungarian audio
            new Audio('audio/boat.mp3').play().catch(() => {});
        });
    }
    
    initHungarianTranslator();
    
    // Pulsing title glow
    const title = document.querySelector('.title');
    if (title) {
        setInterval(() => {
            title.style.textShadow = '0 0 40px rgba(255,46,76,0.8)';
            setTimeout(() => title.style.textShadow = '', 1500);
        }, 3000);
    }
});
