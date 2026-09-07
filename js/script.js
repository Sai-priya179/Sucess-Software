const isMobile = window.matchMedia('(max-width: 768px)').matches;

// 1. PRELOADER & TEXT ASSEMBLY
const initPreloader = () => {
    const canvas = document.getElementById('preloader-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set the canvas internal width and height to match the viewport dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const w = canvas.width;
    const h = canvas.height;
    
    let particles = [];
    
    // Use an offscreen canvas to render text at 300x150, keeping it sharp and scalable
    const offscreen = document.createElement('canvas');
    offscreen.width = 300;
    offscreen.height = 150;
    const oCtx = offscreen.getContext('2d');
    
    oCtx.font = '800 80px "Bricolage Grotesque"';
    oCtx.fillStyle = 'white';
    oCtx.textAlign = 'center';
    oCtx.textBaseline = 'middle';
    oCtx.fillText('SSA', 150, 75);
    
    const data = oCtx.getImageData(0, 0, 300, 150).data;
    
    // Scale factor: larger on desktop (e.g. 2.0x), and scalable on mobile based on viewport width
    const scale = isMobile ? Math.max(1.0, w / 350) : 2.0;
    
    for(let y = 0; y < 150; y += 4) {
        for(let x = 0; x < 300; x += 4) {
            if(data[(y*300+x)*4+3] > 128) {
                // Calculate centered target coordinates relative to the full-screen canvas
                const tx = w / 2 + (x - 150) * scale;
                const ty = h / 2 + (y - 75) * scale;
                
                particles.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    tx: tx,
                    ty: ty,
                    vx: 0,
                    vy: 0
                });
            }
        }
    }
    
    let frame = 0;
    const draw = () => {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#f0a500';
        particles.forEach(p => {
            p.x += (p.tx - p.x) * 0.1;
            p.y += (p.ty - p.y) * 0.1;
            ctx.fillRect(p.x, p.y, 2 * scale, 2 * scale);
        });
        frame++;
        if(frame < 120) requestAnimationFrame(draw);
    };
    draw();

    // Increment percentage counter
    const pctEl = document.querySelector('.pre-pct');
    let pct = 0;
    const pctInterval = setInterval(() => {
        pct += 2;
        if (pctEl) pctEl.innerText = pct + '%';
        if (pct >= 100) {
            clearInterval(pctInterval);
            if (pctEl) pctEl.innerText = '100%';
        }
    }, 40);
    
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) preloader.classList.add('split');
        initHeroAnimations();
    }, 2500);
};

// 2. CURSOR TRAIL
const initCursor = () => {
    if(isMobile) return;
    const cursor = document.getElementById('cursorDot');
    if (!cursor) return;
    const dots = [];
    for(let i = 0; i < 20; i++) {
        let d = document.createElement('div');
        d.className = 'cursor-trail';
        document.body.appendChild(d);
        dots.push({el: d, x: 0, y: 0});
    }
    let mouse = {x: window.innerWidth/2, y: window.innerHeight/2};
    
    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX; mouse.y = e.clientY;
        cursor.style.left = mouse.x + 'px';
        cursor.style.top = mouse.y + 'px';
    });
    
    document.querySelectorAll('a, button, .magnetic, .course-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%, -50%) scale(1.8)');
        el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%, -50%) scale(1)');
    });

    const animateDots = () => {
        let px = mouse.x, py = mouse.y;
        dots.forEach((dot, index) => {
            let nextDot = dots[index+1] || dots[0];
            dot.x = px; dot.y = py;
            dot.el.style.left = dot.x + 'px';
            dot.el.style.top = dot.y + 'px';
            dot.el.style.opacity = (1 - (index/20)) * 0.6;
            dot.el.style.transform = `translate(-50%, -50%) scale(${1 - index/20})`;
            px += (nextDot.x - dot.x) * 0.5;
            py += (nextDot.y - dot.y) * 0.5;
        });
        requestAnimationFrame(animateDots);
    }
    animateDots();
};

// 3. HERO CANVAS BACKGROUND
class ParticleEngine {
    constructor() {
        if(isMobile) return;
        this.bg = document.getElementById('hero-bg');
        this.fg = document.getElementById('hero-fg');
        if (!this.bg || !this.fg) return;
        this.ctxBg = this.bg.getContext('2d');
        this.ctxFg = this.fg.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        this.stars = Array(90).fill().map(() => ({
            x: Math.random()*this.w, y: Math.random()*this.h, s: Math.random()*2
        }));
        
        this.nodes = Array(55).fill().map(() => ({
            x: Math.random()*this.w, y: Math.random()*this.h,
            vx: (Math.random()-0.5)*0.5, vy: (Math.random()-0.5)*0.5,
            phase: Math.random()*Math.PI*2
        }));
        this.mouse = {x:-1000, y:-1000};
        window.addEventListener('mousemove', e => {
            this.mouse.x = e.clientX; this.mouse.y = e.clientY;
        });
        this.time = 0;
        this.active = true;
        this.running = false;
        this.visibilityObserver = new IntersectionObserver(([entry]) => {
            this.active = entry.isIntersecting;
            if (this.active) this.animate();
        }, { threshold: 0.01 });
        this.visibilityObserver.observe(document.getElementById('home'));
        this.animate();
    }
    resize() {
        this.w = this.bg.width = this.fg.width = window.innerWidth;
        this.h = this.bg.height = this.fg.height = window.innerHeight;
    }
    drawBg() {
        this.ctxBg.clearRect(0, 0, this.w, this.h);
        // Stars
        this.ctxBg.fillStyle = 'rgba(255,255,255,0.92)';
        this.stars.forEach(s => {
            s.y -= 0.2; if(s.y < 0) s.y = this.h;
            this.ctxBg.fillRect(s.x, s.y, s.s, s.s);
        });
        // Nebulas
        const rad1 = 400 + Math.sin(this.time*0.01)*50;
        const g1 = this.ctxBg.createRadialGradient(this.w*0.2, this.h*0.3, 0, this.w*0.2, this.h*0.3, rad1);
        g1.addColorStop(0, 'rgba(10, 15, 46, 0.8)'); g1.addColorStop(1, 'transparent');
        this.ctxBg.fillStyle = g1; this.ctxBg.fillRect(0, 0, this.w, this.h);
        
        const rad2 = 500 + Math.cos(this.time*0.01)*50;
        const g2 = this.ctxBg.createRadialGradient(this.w*0.8, this.h*0.7, 0, this.w*0.8, this.h*0.7, rad2);
        g2.addColorStop(0, 'rgba(240, 165, 0, 0.05)'); g2.addColorStop(1, 'transparent');
        this.ctxBg.fillStyle = g2; this.ctxBg.fillRect(0, 0, this.w, this.h);
    }
    drawFg() {
        this.ctxFg.clearRect(0, 0, this.w, this.h);
        this.ctxFg.fillStyle = '#ffffff';
        this.ctxFg.strokeStyle = 'rgba(255,255,255,0.2)';
        
        this.nodes.forEach(n => {
            n.x += n.vx; n.y += n.vy; n.phase += 0.02;
            if(n.x<0||n.x>this.w) n.vx*=-1; if(n.y<0||n.y>this.h) n.vy*=-1;
            
            let dx = this.mouse.x - n.x, dy = this.mouse.y - n.y;
            let dist = Math.sqrt(dx*dx+dy*dy);
            if(dist < 100) { n.x -= dx*0.02; n.y -= dy*0.02; }
            
            let r = 1.5 + Math.sin(n.phase);
            this.ctxFg.beginPath(); this.ctxFg.arc(n.x, n.y, Math.max(0.1, r), 0, Math.PI*2); this.ctxFg.fill();
        });
        
        for(let i = 0; i < this.nodes.length; i++) {
            for(let j = i + 1; j < this.nodes.length; j++) {
                let dx = this.nodes[i].x - this.nodes[j].x, dy = this.nodes[i].y - this.nodes[j].y;
                let dist = Math.sqrt(dx*dx+dy*dy);
                if(dist < 140) {
                    this.ctxFg.globalAlpha = 1 - (dist/140);
                    this.ctxFg.beginPath();
                    this.ctxFg.moveTo(this.nodes[i].x, this.nodes[i].y);
                    this.ctxFg.lineTo(this.nodes[j].x, this.nodes[j].y);
                    this.ctxFg.stroke();
                }
            }
        }
        this.ctxFg.globalAlpha = 1;
    }
    animate() {
        if (this.running) return;
        this.running = true;
        const frame = () => {
            if (!this.active) {
                this.running = false;
                return;
            }
            this.time++;
            this.drawBg(); this.drawFg();
            requestAnimationFrame(frame);
        };
        frame();
    }
}

// 4. HERO TEXT ANIMATIONS
const initHeroAnimations = () => {
    setTimeout(() => {
        const badge = document.getElementById('hero-badge');
        if (badge) {
            badge.style.transition = 'all 0.8s ease';
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0)';
        }
    }, 500);

    // Title Split
    setTimeout(() => {
        const title = document.getElementById('heroTitle');
        if (!title) return;
        const text = title.innerText;
        title.innerHTML = '';
        let delay = 0;
        text.split(', ').forEach((part, i) => {
            const span = document.createElement('span');
            span.className = 'line';
            part.split('').forEach(char => {
                const c = document.createElement('span');
                c.className = 'ch';
                c.innerText = char === ' ' ? '\u00A0' : char;
                c.style.transition = 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.8s, filter 0.8s';
                c.style.transitionDelay = `${delay}ms`;
                span.appendChild(c);
                delay += 40;
            });
            if(i==0) {
                const comma = document.createElement('span');
                comma.className = 'ch'; comma.innerText = ',';
                comma.style.transition = `all 0.8s ${delay}ms`;
                span.appendChild(comma); delay+=40;
            }
            title.appendChild(span);
        });
        
        setTimeout(() => {
            document.querySelectorAll('.hero h1 .ch').forEach(c => {
                c.classList.add('show');
            });
        }, 50);
    }, 800);

    // Typewriter
    setTimeout(() => {
        const sub = document.getElementById('tw');
        if (!sub) return;
        const text = "Professional IT Training for Real-World Careers";
        let i = 0;
        sub.innerHTML = '';
        const type = setInterval(() => {
            sub.innerHTML = text.substring(0, i);
            i++;
            if(i > text.length) clearInterval(type);
        }, 40);
    }, 1500);

    // Actions
    setTimeout(() => {
        const actions = document.getElementById('hero-actions');
        if (actions) {
            actions.style.transition = 'all 0.8s ease';
            actions.style.opacity = '1';
            actions.style.transform = 'translateY(0)';
        }
    }, 2000);
};

// 5. SCROLL REVEAL & NAV TRACKER
const initScrollObserver = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if(e.isIntersecting) {
                e.target.classList.add('in');
                
                // Stats Counter
                if(e.target.id === 'stats-trigger') {
                    document.querySelectorAll('.stat-num').forEach(c => {
                        const target = parseFloat(c.getAttribute('data-target'));
                        const decimals = c.getAttribute('data-decimal') ? 1 : 0;
                        const suffix = c.getAttribute('data-suffix') || '';
                        let val = 0;
                        const inc = target / 60;
                        const update = () => {
                            val += inc;
                            if(val >= target) {
                                c.innerText = target.toFixed(decimals) + suffix;
                            } else {
                                c.innerText = val.toFixed(decimals) + suffix;
                                requestAnimationFrame(update);
                            }
                        };
                        update();
                    });
                    
                    // Activate stat rings
                    document.querySelectorAll('.stat-ring').forEach(ring => {
                        ring.classList.add('go');
                    });
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    
    const statsTrig = document.getElementById('stats-trigger');
    if (statsTrig) observer.observe(statsTrig);
    
    // About reveal-clip paragraph
    const pObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if(e.isIntersecting) {
                e.target.classList.add('in');
                pObs.unobserve(e.target);
            }
        });
    }, {threshold: 0.2});
    document.querySelectorAll('.reveal-clip').forEach((p, i) => {
        p.style.transitionDelay = `${i*200}ms`;
        pObs.observe(p);
    });

    // Nav tracking
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(sec => {
            if(window.scrollY >= sec.offsetTop - 200) current = sec.getAttribute('id');
        });
        navLinks.forEach(l => {
            l.classList.remove('active');
            if(l.getAttribute('href') === `#${current}`) l.classList.add('active');
        });
        
        // Navbar style on scroll
        const nav = document.getElementById('nav');
        if (nav) {
            if(window.scrollY > 80) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        }
    });
};

// 6. MAGNETIC BUTTONS & TILT CARDS
const initInteractions = () => {
    if(isMobile) return;
    document.querySelectorAll('.magnetic').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width/2;
            const y = e.clientY - rect.top - rect.height/2;
            btn.style.transform = `translate(${x*0.3}px, ${y*0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width/2;
            const y = e.clientY - rect.top - rect.height/2;
            card.style.transform = `perspective(1000px) rotateX(${-y*0.05}deg) rotateY(${x*0.05}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
        });
    });
    
    const hero = document.getElementById('heroContent');
    const heroSection = document.getElementById('home');
    if (hero && heroSection) {
        heroSection.addEventListener('mousemove', e => {
            const x = (e.clientX / window.innerWidth - 0.5) * 16;
            const y = (e.clientY / window.innerHeight - 0.5) * -16;
            hero.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
        });
        heroSection.addEventListener('mouseleave', () => {
            hero.style.transform = `rotateY(0) rotateX(0)`;
        });
    }
};

// 7. REVIEWS SLIDER
const initReviewsSlider = () => {
    const wrap = document.getElementById('testiWrap');
    if (!wrap) return;
    const slides = wrap.querySelectorAll('.testi');
    const dotsContainer = document.getElementById('testiDots');
    const dots = dotsContainer ? dotsContainer.querySelectorAll('button') : [];
    const prevBtn = document.getElementById('prevT');
    const nextBtn = document.getElementById('nextT');
    
    let curSlide = 1;
    
    const updateSlides = () => {
        slides.forEach((s, i) => {
            s.classList.remove('active');
            if(i === curSlide) s.classList.add('active');
        });
        dots.forEach((d, i) => {
            d.classList.remove('active');
            if(i === curSlide) d.classList.add('active');
        });
    };
    
    const nextSlide = () => {
        curSlide = (curSlide + 1) % slides.length;
        updateSlides();
    };
    
    const prevSlide = () => {
        curSlide = (curSlide - 1 + slides.length) % slides.length;
        updateSlides();
    };
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((d, i) => {
        d.addEventListener('click', () => {
            curSlide = i;
            updateSlides();
        });
    });
    
    let auto = setInterval(nextSlide, 5000);
    wrap.addEventListener('mouseenter', () => clearInterval(auto));
    wrap.addEventListener('mouseleave', () => auto = setInterval(nextSlide, 5000));
};

// 8. COURSE CLICK SELECTOR Helper
const initCourseSelector = () => {
    document.querySelectorAll('.course-card').forEach(card => {
        const courseNameEl = card.querySelector('.course-name');
        if (courseNameEl) {
            const name = courseNameEl.innerText.trim();
            card.addEventListener('click', (e) => {
                // Prevent default anchor jumping behavior if clicking the link
                e.preventDefault();
                
                const select = document.getElementById('cCourse');
                if (select) {
                    select.value = name;
                    select.classList.add('has-value');
                }
                
                // Perform a premium smooth scroll to the contact form section
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    });
};

const initCourseDiscovery = () => {
    const cards = [...document.querySelectorAll('.course-card')];
    const search = document.getElementById('courseSearch');
    const count = document.getElementById('courseCount');
    const filters = document.querySelectorAll('.course-filter');
    if (!cards.length || !search || !count) return;
    let category = 'all';

    const render = () => {
        const query = search.value.trim().toLowerCase();
        let visible = 0;
        cards.forEach(card => {
            const matchesCategory = category === 'all' || card.dataset.category === category;
            const matchesQuery = !query || card.innerText.toLowerCase().includes(query);
            const shouldShow = matchesCategory && matchesQuery;
            card.classList.toggle('is-hidden', !shouldShow);
            if (shouldShow) visible += 1;
        });
        count.textContent = `${visible} course${visible === 1 ? '' : 's'}`;
    };
    search.addEventListener('input', render);
    filters.forEach(filter => filter.addEventListener('click', () => {
        category = filter.dataset.filter;
        filters.forEach(item => item.classList.toggle('active', item === filter));
        render();
    }));
    render();
};

const initScrollProgress = () => {
    const progress = document.getElementById('scrollProgress');
    if (!progress) return;
    const update = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
};

const initGalleryLightbox = () => {
    const items = document.querySelectorAll('.gallery-item');
    if (!items.length) return;
    const close = () => document.querySelector('.gallery-modal')?.remove();
    items.forEach(item => item.addEventListener('click', () => {
        const art = item.querySelector('.gallery-art');
        const caption = item.querySelector('figcaption')?.innerHTML || '';
        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        modal.innerHTML = `<div class="gallery-modal-inner" role="dialog" aria-modal="true" aria-label="Gallery preview"><button type="button" class="gallery-modal-close" aria-label="Close gallery preview">×</button><div class="gallery-modal-art ${art.className.replace('gallery-art', '')}"></div><div class="gallery-modal-caption">${caption}</div></div>`;
        modal.addEventListener('click', event => { if (event.target === modal || event.target.closest('.gallery-modal-close')) close(); });
        document.body.appendChild(modal);
    }));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
};

// Locked, smooth scroll control for the original video timeline.
const initHeroVideoScroll = () => {
    const hero = document.getElementById('home');
    const video = document.getElementById('heroVideo');
    if (!hero || !video) return;

    let locked = false;
    let firstPassComplete = false;
    let lastTouchY = 0;
    const unlock = () => {
        locked = false;
        document.documentElement.classList.remove('hero-locked');
    };
    const startFirstPass = event => {
        if (locked || firstPassComplete || window.scrollY > 4) return;
        event?.preventDefault();
        locked = true;
        document.documentElement.classList.add('hero-locked');
        window.scrollTo(0, 0);
        video.currentTime = 0;
        // video.loop = false;
        video.play().catch(unlock);
    };
    const onWheel = event => {
        if (locked) {
            event.preventDefault();
            return;
        }
        const delta = event.deltaMode === 1 ? event.deltaY * 16 : event.deltaY;
        if (delta > 0) startFirstPass(event);
    };
    const onTouchStart = event => { lastTouchY = event.touches[0].clientY; };
    const onTouchMove = event => {
        const currentTouchY = event.touches[0].clientY;
        if (lastTouchY - currentTouchY > 0 || locked) startFirstPass(event);
        lastTouchY = currentTouchY;
    };
    video.pause();
    // video.loop = false;
    video.addEventListener('ended', () => {
        if (!locked) return;
        firstPassComplete = true;
        video.loop = true;
        unlock();
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    video.addEventListener('loadedmetadata', () => { video.currentTime = 0; }, { once: true });
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
};

const initFloatingDots = () => {
    const container = document.getElementById('floatingDots');
    if (!container) return;
    const fragment = document.createDocumentFragment();
    for (let index = 0; index < 24; index += 1) {
        const dot = document.createElement('span');
        dot.style.setProperty('--x', `${Math.random() * 100}%`);
        dot.style.setProperty('--y', `${Math.random() * 100}%`);
        dot.style.setProperty('--size', `${1 + Math.random() * 3}px`);
        dot.style.setProperty('--delay', `${Math.random() * -8}s`);
        dot.style.setProperty('--duration', `${6 + Math.random() * 8}s`);
        fragment.appendChild(dot);
    }
    container.appendChild(fragment);
};

// 9. MOBILE MENU
const initMobileMenu = () => {
    const burger = document.getElementById('burger');
    const links = document.getElementById('navLinks');
    if (!burger || !links) return;
    burger.addEventListener('click', () => {
        const isOpen = burger.classList.toggle('open');
        links.classList.toggle('open', isOpen);
        burger.setAttribute('aria-expanded', String(isOpen));
        burger.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });
    links.querySelectorAll('a').forEach(l => {
        l.addEventListener('click', () => {
            burger.classList.remove('open');
            links.classList.remove('open');
            burger.setAttribute('aria-expanded', 'false');
            burger.setAttribute('aria-label', 'Open navigation');
        });
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && links.classList.contains('open')) burger.click();
    });
};

// 10. FORM SUBMISSION API BINDING
const initFormSubmission = () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('submitBtn');
            const status = document.getElementById('formStatus');
            const originalText = submitBtn.innerHTML;
            if (!/^\+?[0-9\s-]{10,15}$/.test(document.getElementById('cPhone').value.trim())) {
                if (status) status.textContent = 'Please enter a valid phone number.';
                document.getElementById('cPhone').focus();
                return;
            }
            if (status) status.textContent = 'Sending your enquiry...';
            submitBtn.innerHTML = 'Sending...';
            submitBtn.classList.add('loading');
            
            const payload = {
                name: document.getElementById('cName').value,
                phone: document.getElementById('cPhone').value,
                course: document.getElementById('cCourse').value,
                message: document.getElementById('cMsg').value
            };
            
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                
                submitBtn.classList.remove('loading');
                if (response.ok) {
                    submitBtn.innerHTML = '';
                    submitBtn.classList.add('success');
                    if (status) status.textContent = 'Thanks. We will contact you shortly.';
                    contactForm.reset();
                    document.getElementById('cCourse').classList.remove('has-value');
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.classList.remove('success');
                    }, 3000);
                } else {
                    if (status) status.textContent = 'We could not send this yet. Please try again.';
                    submitBtn.innerHTML = 'Error! Try Again';
                    setTimeout(() => submitBtn.innerHTML = originalText, 3000);
                }
            } catch (err) {
                console.error(err);
                if (status) status.textContent = 'Connection failed. Please call us directly.';
                submitBtn.classList.remove('loading');
                submitBtn.innerHTML = 'Connection Failed';
                setTimeout(() => submitBtn.innerHTML = originalText, 3000);
            }
        });
    }
};

// BOOT
window.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initCursor();
    initScrollObserver();
    initInteractions();
    initReviewsSlider();
    initCourseSelector();
    initCourseDiscovery();
    initScrollProgress();
    initGalleryLightbox();
    // initHeroVideoScroll();
    initFloatingDots();
    initMobileMenu();
    initFormSubmission();
});


// Custom Cursor Logic
const cursor = document.querySelector('.custom-cursor');


document.querySelectorAll('a, button, input, .course-card, .video-feature').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); });
});


// Magnetic Buttons
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;;
  });
  btn.addEventListener('mouseleave', function() {
    this.style.transform = 'translate(0px, 0px)';
  });
});








