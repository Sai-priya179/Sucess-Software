import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface TimelineElements {
  section: HTMLElement;
  viewport: HTMLElement;
  videos: (HTMLElement | null)[];
  metadataRefs: {
    headline: HTMLElement | null;
    subline: HTMLElement | null;
    category: HTMLElement | null;
    desc: HTMLElement | null;
    activeVideoNumber: HTMLElement | null;
  };
  signalLine: HTMLElement | null;
  counterNumbers: HTMLElement | null;
  onProgress?: (progress: number) => void;
  prefersReducedMotion?: boolean;
}

export const buildYoutubeTimeline = ({
  section,
  viewport,
  videos,
  metadataRefs,
  signalLine,
  counterNumbers,
  onProgress,
  prefersReducedMotion = false
}: TimelineElements) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // ----------------------------------------------------
  // ACCESSIBILITY: REDUCED MOTION FALLBACK
  // ----------------------------------------------------
  if (prefersReducedMotion) {
    gsap.set(videos, {
      autoAlpha: 1,
      scale: 1,
      x: 0,
      y: 0,
      z: 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      position: 'relative',
      display: 'inline-block',
      margin: '16px'
    });
    if (videos[0]?.parentElement) {
      gsap.set(videos[0].parentElement, {
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        padding: '120px 24px 60px',
        pointerEvents: 'auto'
      });
    }
    gsap.set(viewport, { height: 'auto', overflow: 'visible' });
    return gsap.timeline();
  }

  // Scroll distance: 8500px Desktop (~850vh), 5000px Mobile (~500vh)
  const scrollDistance = isMobile ? 5200 : 8800;

  const master = gsap.timeline({
    scrollTrigger: {
      id: 'the-signal-master',
      trigger: section,
      start: 'top top',
      end: `+=${scrollDistance}`,
      pin: viewport,
      scrub: isMobile ? 0.7 : 1.0,
      anticipatePin: 1,
      fastScrollEnd: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        onProgress?.(self.progress);
        // Direct update to scrub bar and beacon
        if (signalLine) {
          const bar = signalLine.querySelector('.signal-scrub-bar') as HTMLElement | null;
          const beacon = signalLine.querySelector('.signal-beacon') as HTMLElement | null;
          if (bar) bar.style.transform = `scaleX(${self.progress})`;
          if (beacon) beacon.style.left = `${self.progress * 100}%`;
        }
      }
    }
  });

  const { headline, subline, category, desc, activeVideoNumber } = metadataRefs;
  const counterEl = counterNumbers?.querySelector('.counter-numbers') as HTMLElement | null;

  // ----------------------------------------------------
  // INITIAL PHYSICAL STATES
  // ----------------------------------------------------
  // DORMANT: scale .65, opacity .25, translateZ(-150px)
  gsap.set(videos, {
    autoAlpha: 0,
    scale: 0.65,
    z: -300,
    x: 0,
    y: 0,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    pointerEvents: 'none'
  });

  gsap.set([headline, subline, category, desc], { autoAlpha: 0, y: 40 });
  gsap.set('.signal-aurora', { rotation: -20, scale: 0.8, autoAlpha: 0.3 });
  gsap.set('.signal-orbit', { scale: 0.7, rotation: -15, autoAlpha: 0.3 });

  // Mobile counter step height (40px) vs Desktop (56px)
  const stepHeight = isMobile ? 40 : 56;

  // ====================================================
  // MOBILE COMPOSITION TIMELINE
  // ====================================================
  if (isMobile) {
    master
      .addLabel('intro', 0)
      .to([headline, subline, category], { autoAlpha: 1, y: 0, duration: 2, ease: 'power2.out' }, 'intro')
      .fromTo(videos[0], 
        { autoAlpha: 0, y: '30vh', scale: 0.8 }, 
        { autoAlpha: 1, y: '0vh', scale: 1, pointerEvents: 'auto', duration: 3, ease: 'power3.out' }, 
        'intro+=0.5'
      )
      .addLabel('scene01', 3)
      .to(videos[0], { y: '0vh', duration: 2 }, 'scene01')

      .addLabel('transition-01', 5)
      .to(videos[0], { autoAlpha: 0.25, y: '-28vh', scale: 0.7, duration: 3, ease: 'power2.inOut' }, 'transition-01')
      .fromTo(videos[1],
        { autoAlpha: 0, y: '35vh', scale: 0.8 },
        { autoAlpha: 1, y: '0vh', scale: 1, pointerEvents: 'auto', duration: 3, ease: 'power2.out' },
        'transition-01+=0.8'
      )
      .to(counterEl, { y: -stepHeight, duration: 1.5, ease: 'power2.inOut' }, 'transition-01+=1')

      .addLabel('scene02', 8)
      .to(videos[1], { y: '0vh', duration: 2 }, 'scene02')

      .addLabel('transition-02', 10)
      .to(videos[1], { autoAlpha: 0.2, y: '-30vh', scale: 0.65, duration: 3, ease: 'power2.inOut' }, 'transition-02')
      .to(videos[0], { autoAlpha: 0, y: '-50vh', duration: 2 }, 'transition-02')
      .fromTo(videos[2],
        { autoAlpha: 0, y: '35vh', scale: 0.8 },
        { autoAlpha: 1, y: '0vh', scale: 1, pointerEvents: 'auto', duration: 3, ease: 'power2.out' },
        'transition-02+=0.8'
      )
      .to(counterEl, { y: -stepHeight * 2, duration: 1.5, ease: 'power2.inOut' }, 'transition-02+=1')

      .addLabel('scene03', 13)
      .to(videos[2], { y: '0vh', duration: 2 }, 'scene03')

      .addLabel('constellation', 15)
      .to([videos[0], videos[1], videos[2]], { autoAlpha: 0.35, scale: 0.6, y: '-15vh', duration: 3 }, 'constellation')
      .fromTo(videos[3], { autoAlpha: 0, y: '20vh', scale: 0.7 }, { autoAlpha: 1, y: '5vh', scale: 0.95, pointerEvents: 'auto', duration: 3 }, 'constellation+=0.5')
      .to(counterEl, { y: -stepHeight * 3, duration: 1.5 }, 'constellation')

      .addLabel('featured', 18)
      .to(videos[3], { scale: 1.05, y: '0vh', autoAlpha: 1, duration: 3 }, 'featured')

      .addLabel('archive', 21)
      .to(videos, { autoAlpha: 0, y: '-40vh', duration: 2.5 }, 'archive');

    return master;
  }

  // ====================================================
  // DESKTOP ADVANCED CINEMATIC MASTER TIMELINE
  // ====================================================

  // 01 — INTRO
  master.addLabel('intro', 0)
    .to('.signal-aurora', { rotation: 30, scale: 1.2, autoAlpha: 0.6, duration: 4, ease: 'sine.inOut' }, 'intro')
    .to('.signal-orbit', { rotation: 40, scale: 1, autoAlpha: 0.5, duration: 4, ease: 'power2.out' }, 'intro')
    .to([headline, category], { autoAlpha: 1, y: 0, duration: 2.5, ease: 'power3.out' }, 'intro')
    .to(subline, { autoAlpha: 0.6, y: 0, duration: 2, ease: 'power3.out' }, 'intro+=0.4')
    .to(desc, { autoAlpha: 0.75, y: 0, duration: 2, ease: 'power3.out' }, 'intro+=0.6')

    // 08 — VIDEO 01: Enters from offset to dominant center
    .fromTo(videos[0],
      { x: '24vw', y: '16vh', z: -450, rotateY: 16, rotateX: -6, scale: 0.7, autoAlpha: 0 },
      { x: '4vw', y: '0vh', z: 0, rotateY: 0, rotateX: 0, scale: 1, autoAlpha: 1, pointerEvents: 'auto', duration: 3.5, ease: 'power3.inOut' },
      'intro+=0.8'
    )

    // 01 / VIDEO Dominant Scene
    .addLabel('video-01', 3.5)
    .to(videos[0], { x: '0vw', duration: 2.5, ease: 'none' }, 'video-01')

    // 09 & 10 — TRANSFORMATION 01: Video 01 Fragments and recedes while Video 02 Enters
    .addLabel('transition-01', 6)
    // Video 01 Fragmentation
    .to(videos[0]?.querySelectorAll('.frag-layer-1') || [], { autoAlpha: 0.85, x: '-20vw', y: '-5vh', rotateZ: -5, duration: 2, ease: 'power2.inOut' }, 'transition-01')
    .to(videos[0]?.querySelectorAll('.frag-layer-2') || [], { autoAlpha: 0.85, x: '0vw', y: '12vh', rotateZ: 2, duration: 2, ease: 'power2.inOut' }, 'transition-01+=0.2')
    .to(videos[0]?.querySelectorAll('.frag-layer-3') || [], { autoAlpha: 0.85, x: '20vw', y: '-8vh', rotateZ: 6, duration: 2, ease: 'power2.inOut' }, 'transition-01+=0.4')
    
    // Video 01 moves into depth archive
    .to(videos[0], {
      x: '-32vw',
      y: '-12vh',
      z: -450,
      rotateY: -16,
      rotateZ: -6,
      scale: 0.6,
      autoAlpha: 0.35,
      duration: 3.5,
      ease: 'power2.inOut'
    }, 'transition-01+=0.8')

    // Typography transformation (Opposing movement)
    .to(headline, { x: '-15vw', scale: 0.8, rotateZ: -2, autoAlpha: 0.25, duration: 2.5, ease: 'power2.in' }, 'transition-01')
    .fromTo(headline, 
      { x: '18vw', scale: 0.8, rotateZ: 2, autoAlpha: 0 }, 
      { x: '0vw', scale: 1, rotateZ: 0, autoAlpha: 1, duration: 2.5, ease: 'power3.out' }, 
      'transition-01+=2.2'
    )
    .to(counterEl, { y: -stepHeight, duration: 1.5, ease: 'power3.inOut' }, 'transition-01+=1')

    // Video 02 Enters dominant
    .fromTo(videos[1],
      { x: '35vw', y: '24vh', z: -600, rotateY: 20, rotateX: 8, scale: 0.65, autoAlpha: 0 },
      { x: '0vw', y: '0vh', z: 0, rotateY: 0, rotateX: 0, scale: 1, autoAlpha: 1, pointerEvents: 'auto', duration: 3.5, ease: 'power3.inOut' },
      'transition-01+=1.2'
    )

    // VIDEO 02 Active Scene
    .addLabel('video-02', 9.5)
    .to(videos[1], { x: '-2vw', duration: 2.5, ease: 'none' }, 'video-02')

    // TRANSFORMATION 02: Video 02 Fragments while Video 03 Enters
    .addLabel('transition-02', 12)
    .to(videos[1]?.querySelectorAll('.frag-layer-1') || [], { autoAlpha: 0.8, x: '-18vw', y: '8vh', rotateZ: -4, duration: 2, ease: 'power2.inOut' }, 'transition-02')
    .to(videos[1]?.querySelectorAll('.frag-layer-2') || [], { autoAlpha: 0.8, x: '5vw', y: '-10vh', rotateZ: 3, duration: 2, ease: 'power2.inOut' }, 'transition-02+=0.2')
    .to(videos[1]?.querySelectorAll('.frag-layer-3') || [], { autoAlpha: 0.8, x: '22vw', y: '10vh', rotateZ: -5, duration: 2, ease: 'power2.inOut' }, 'transition-02+=0.4')
    
    // Video 02 moves to archive position
    .to(videos[1], {
      x: '34vw',
      y: '14vh',
      z: -420,
      rotateY: 18,
      rotateZ: 5,
      scale: 0.62,
      autoAlpha: 0.35,
      duration: 3.5,
      ease: 'power2.inOut'
    }, 'transition-02+=0.8')

    // Video 01 pushed deeper
    .to(videos[0], { x: '-40vw', y: '-20vh', z: -800, autoAlpha: 0.2, duration: 3 }, 'transition-02+=0.5')
    .to(counterEl, { y: -stepHeight * 2, duration: 1.5, ease: 'power3.inOut' }, 'transition-02+=1')

    // Video 03 enters dominant
    .fromTo(videos[2],
      { x: '-32vw', y: '28vh', z: -550, rotateY: -22, scale: 0.65, autoAlpha: 0 },
      { x: '0vw', y: '0vh', z: 0, rotateY: 0, scale: 1.05, autoAlpha: 1, pointerEvents: 'auto', duration: 3.5, ease: 'power3.inOut' },
      'transition-02+=1.2'
    )

    // VIDEO 03 Active Scene
    .addLabel('video-03', 15.5)
    .to(videos[2], { scale: 1, duration: 2.5, ease: 'none' }, 'video-03')

    // 15 & 16 — VIDEO CONSTELLATION FORMATION
    .addLabel('constellation', 18)
    .to(headline, { y: '-14vh', scale: 0.7, autoAlpha: 0.4, duration: 3, ease: 'power2.inOut' }, 'constellation')
    .to(subline, { autoAlpha: 0.9, y: '-12vh', textContent: 'SPATIAL CONSTELLATION', duration: 2 }, 'constellation')
    .to(counterEl, { y: -stepHeight * 3, duration: 2, ease: 'power3.inOut' }, 'constellation')

    // Video 03 shrinks into constellation position
    .to(videos[2], { x: '24vw', y: '-18vh', z: -350, rotateZ: -5, rotateY: -10, scale: 0.7, autoAlpha: 0.6, duration: 3, ease: 'power2.inOut' }, 'constellation')
    
    // Spread all 8 videos into the 3D constellation
    .to(videos[0], { x: '-36vw', y: '-20vh', z: -480, rotateZ: -8, scale: 0.58, autoAlpha: 0.45, pointerEvents: 'auto', duration: 3 }, 'constellation')
    .to(videos[1], { x: '-16vw', y: '16vh', z: -280, rotateZ: 4, scale: 0.72, autoAlpha: 0.65, pointerEvents: 'auto', duration: 3 }, 'constellation')
    .fromTo(videos[3], 
      { x: '0vw', y: '0vh', z: -1000, scale: 0.5, autoAlpha: 0 },
      { x: '0vw', y: '0vh', z: 40, scale: 1.0, rotateZ: 0, autoAlpha: 0.95, pointerEvents: 'auto', duration: 3 },
      'constellation+=0.3'
    )
    .fromTo(videos[4],
      { x: '35vw', y: '18vh', z: -1200, autoAlpha: 0 },
      { x: '35vw', y: '18vh', z: -320, rotateZ: 6, scale: 0.68, autoAlpha: 0.6, pointerEvents: 'auto', duration: 3 },
      'constellation+=0.5'
    )
    .fromTo(videos[5],
      { x: '-14vw', y: '-26vh', z: -1400, autoAlpha: 0 },
      { x: '-14vw', y: '-26vh', z: -550, rotateZ: -7, scale: 0.55, autoAlpha: 0.45, pointerEvents: 'auto', duration: 3 },
      'constellation+=0.7'
    )
    .fromTo(videos[6],
      { x: '16vw', y: '26vh', z: -1500, autoAlpha: 0 },
      { x: '16vw', y: '26vh', z: -500, rotateZ: 5, scale: 0.58, autoAlpha: 0.5, pointerEvents: 'auto', duration: 3 },
      'constellation+=0.9'
    )
    .fromTo(videos[7],
      { x: '-34vw', y: '20vh', z: -1600, autoAlpha: 0 },
      { x: '-34vw', y: '20vh', z: -600, rotateZ: -4, scale: 0.5, autoAlpha: 0.4, pointerEvents: 'auto', duration: 3 },
      'constellation+=1.1'
    )

    // 16 — Controlled constellation drift
    .to(videos[1], { x: '-20vw', y: '12vh', rotationZ: 7, duration: 3 }, 'constellation+=2')
    .to(videos[4], { x: '38vw', y: '14vh', rotationZ: 9, duration: 3 }, 'constellation+=2')

    // 17 — FEATURED VIDEO TAKEOVER
    .addLabel('featured', 22)
    .to(videos[3], {
      scale: 1.18,
      z: 220,
      x: '0vw',
      y: '2vh',
      rotateY: 0,
      rotateX: 0,
      autoAlpha: 1,
      duration: 3,
      ease: 'power3.out'
    }, 'featured')
    // Others retreat deeply into the background
    .to([videos[0], videos[1], videos[2], videos[4], videos[5], videos[6], videos[7]], {
      scale: 0.45,
      z: -700,
      autoAlpha: 0.15,
      duration: 3,
      ease: 'power2.inOut'
    }, 'featured')
    .to(headline, { y: '-22vh', autoAlpha: 0.8, textContent: 'FEATURED / THE SIGNAL', duration: 2 }, 'featured')

    // 42 — FINAL ARCHIVE DISSOLVE
    .addLabel('archive', 26)
    .to(videos, {
      z: '+=400',
      autoAlpha: 0,
      scale: 0.3,
      duration: 3.5,
      ease: 'power2.in'
    }, 'archive')
    .to('.signal-aurora', { scale: 1.6, rotation: 180, autoAlpha: 0.9, duration: 3 }, 'archive')
    .to([headline, subline, desc], { autoAlpha: 0, y: -40, duration: 2 }, 'archive');

  return master;
};
