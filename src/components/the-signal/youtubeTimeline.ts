import gsap from 'gsap';

export const buildYoutubeTimeline = (
  section: HTMLElement,
  viewport: HTMLElement,
  videos: (HTMLElement | null)[],
  textRefs: Record<string, HTMLElement | null>,
  signalLine: HTMLElement | null,
  counterNumbers: HTMLElement | null,
  onProgress: (p: number) => void,
  prefersReducedMotion: boolean = false
) => {
  if (prefersReducedMotion) {
    gsap.set(videos, { autoAlpha: 1, z: 0, scale: 1, position: 'relative', display: 'inline-block', margin: '20px' });
    if (videos[0] && videos[0].parentElement) {
        gsap.set(videos[0].parentElement, { position: 'relative', textAlign: 'center', paddingTop: '200px', pointerEvents: 'auto' });
    }
    gsap.set(viewport, { height: 'auto', overflow: 'visible' });
    // Simplify section into just a static grid
    return gsap.timeline();
  }

  const scrollDistance = window.matchMedia('(max-width: 767px)').matches ? 8500 : 14000;
  const master = gsap.timeline({
    scrollTrigger: {
      id: 'the-signal-master',
      trigger: section,
      start: 'top top',
      end: `+=${scrollDistance}`,
      pin: viewport,
      scrub: 0.85,
      anticipatePin: 1,
      fastScrollEnd: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => onProgress(self.progress)
    }
  });

  const { tHeadline, tSubline, tCurrentCat } = textRefs;

  // Initialize States
  gsap.set(videos, { autoAlpha: 0, z: -1000, scale: 0.8 });
  gsap.set([tHeadline, tSubline, tCurrentCat], { autoAlpha: 0, y: 50 });
  gsap.set('.signal-aurora', { rotation: -15, scale: 0.8, autoAlpha: 0.45 });
  gsap.set('.signal-orbit', { scale: 0.7, rotation: -20, autoAlpha: 0.25 });
  gsap.set('.signal-scanline', { yPercent: -100 });
  if (signalLine) gsap.set(signalLine, { strokeDashoffset: 100 });
  if (counterNumbers) gsap.set(counterNumbers, { y: 0 });

  // ----------------------------------------------------
  // SCENE 1: INTRO -> VIDEO 01
  // ----------------------------------------------------
  master.addLabel('scene01', 0)
    .to('.signal-aurora', { rotation: 25, scale: 1.15, autoAlpha: 0.75, duration: 6, ease: 'sine.inOut' }, 'scene01')
    .to('.signal-orbit', { rotation: 35, scale: 1, autoAlpha: 0.55, duration: 6, ease: 'power2.out' }, 'scene01')
    .to('.signal-scanline', { yPercent: 100, duration: 5, ease: 'none' }, 'scene01')
    .to(tHeadline, { autoAlpha: 1, y: 0, duration: 2, ease: 'power2.out' }, 'scene01')
    .to(tSubline, { autoAlpha: 0.6, y: 0, duration: 2, ease: 'power2.out' }, 'scene01+=0.5')
    .fromTo(videos[0], 
      { x: '10vw', y: '10vh', z: -1000, rotateY: 15, autoAlpha: 0 },
      { x: '0vw', y: '0vh', z: 0, rotateY: 0, autoAlpha: 1, scale: 1, duration: 3, ease: 'power2.inOut' },
      'scene01+=1'
    )
    .to(tCurrentCat, { autoAlpha: 1, y: 0, duration: 1.5, ease: 'power2.out' }, 'scene01+=2');

  // ----------------------------------------------------
  // SCENE 2: VIDEO 01 -> VIDEO 02 (Transformation & Fragmentation)
  // ----------------------------------------------------
  master.addLabel('scene02', 4)
    // Signal line extending
    .to(signalLine, { strokeDashoffset: 60, duration: 4, ease: 'none' }, 'scene02')
    // Fragmentation of Video 01
    .to(videos[0].querySelectorAll('.frag-layer-3'), { autoAlpha: 1, x: -30, y: -20, scale: 1.05, duration: 2, ease: 'power2.inOut' }, 'scene02')
    .to(videos[0].querySelectorAll('.frag-layer-2'), { autoAlpha: 1, x: -15, y: -10, scale: 1.02, duration: 2, ease: 'power2.inOut' }, 'scene02+=0.2')
    .to(videos[0], { x: '-35vw', y: '-15vh', z: -800, rotateZ: -10, rotateY: -15, autoAlpha: 0.4, duration: 3.5, ease: 'power2.inOut' }, 'scene02+=1')
    
    // Typography shifts
    .to(tCurrentCat, { y: -30, autoAlpha: 0, duration: 1 }, 'scene02+=1')
    .to(tHeadline, { x: '-10vw', duration: 3, ease: 'power1.inOut' }, 'scene02+=1')
    
    // Video 02 enters from deep space
    .fromTo(videos[1],
      { x: '40vw', y: '30vh', z: -1500, rotateY: -25, rotateX: 10, autoAlpha: 0, scale: 0.8 },
      { x: '5vw', y: '0vh', z: 0, rotateY: -5, rotateX: 0, autoAlpha: 1, scale: 1, duration: 3.5, ease: 'power3.inOut' },
      'scene02+=1.5'
    )
    // Counter updates
    .to(counterNumbers ? counterNumbers.querySelector('.counter-numbers') : null, { y: -24, duration: 1, ease: 'power2.inOut' }, 'scene02+=2');

  // ----------------------------------------------------
  // SCENE 3: VIDEO 02 -> VIDEO 03
  // ----------------------------------------------------
  master.addLabel('scene03', 9)
    .to(signalLine, { strokeDashoffset: 30, duration: 4, ease: 'none' }, 'scene03')
    
    // Fragment Video 02
    .to(videos[1].querySelectorAll('.frag-layer-3'), { autoAlpha: 1, x: 20, y: 30, scale: 1.05, duration: 2, ease: 'power2.inOut' }, 'scene03')
    .to(videos[1].querySelectorAll('.frag-layer-2'), { autoAlpha: 1, x: 10, y: 15, scale: 1.02, duration: 2, ease: 'power2.inOut' }, 'scene03+=0.2')
    .to(videos[1], { x: '35vw', y: '-25vh', z: -1000, rotateZ: 15, rotateY: 20, autoAlpha: 0.3, duration: 3.5, ease: 'power2.inOut' }, 'scene03+=1')
    
    // Video 01 gets pushed deeper
    .to(videos[0], { x: '-45vw', y: '-30vh', z: -1500, autoAlpha: 0.1, duration: 3.5, ease: 'power2.inOut' }, 'scene03+=1')
    
    // Video 03 enters as dominant
    .fromTo(videos[2],
      { x: '-30vw', y: '40vh', z: -1000, rotateY: 30, rotateZ: -5, autoAlpha: 0, scale: 0.8 },
      { x: '-5vw', y: '5vh', z: 0, rotateY: 5, rotateZ: 0, autoAlpha: 1, scale: 1.1, duration: 3.5, ease: 'power3.inOut' },
      'scene03+=1.5'
    )
    .to(counterNumbers ? counterNumbers.querySelector('.counter-numbers') : null, { y: -48, duration: 1, ease: 'power2.inOut' }, 'scene03+=2');

  // ----------------------------------------------------
  // SCENE 4: CONSTELLATION FORMATION
  // ----------------------------------------------------
  master.addLabel('scene04', 14)
    .to(signalLine, { strokeDashoffset: 0, duration: 4, ease: 'none' }, 'scene04')
    
    // Video 03 shrinks into constellation position
    .to(videos[2], { x: '-20vw', y: '10vh', z: -500, rotateY: 10, scale: 0.9, duration: 3, ease: 'power2.inOut' }, 'scene04')
    
    // Rest of the videos reveal dynamically in 3D space
    .fromTo(videos[3], { x: '30vw', y: '25vh', z: -1200, rotateY: -15, autoAlpha: 0 }, { autoAlpha: 0.8, z: -300, rotateY: -5, duration: 3, ease: 'power2.out' }, 'scene04+=0.5')
    .fromTo(videos[4], { x: '10vw', y: '-30vh', z: -1500, rotateX: -20, autoAlpha: 0 }, { autoAlpha: 0.7, z: -600, rotateX: -5, duration: 3, ease: 'power2.out' }, 'scene04+=0.8')
    .fromTo(videos[5], { x: '-40vw', y: '30vh', z: -2000, rotateZ: 10, autoAlpha: 0 }, { autoAlpha: 0.5, z: -800, rotateZ: 5, duration: 3, ease: 'power2.out' }, 'scene04+=1')
    .fromTo(videos[6], { x: '45vw', y: '-10vh', z: -1800, rotateY: -20, autoAlpha: 0 }, { autoAlpha: 0.6, z: -700, rotateY: -10, duration: 3, ease: 'power2.out' }, 'scene04+=1.2')
    .fromTo(videos[7], { x: '0vw', y: '40vh', z: -1600, rotateX: 15, autoAlpha: 0 }, { autoAlpha: 0.65, z: -500, rotateX: 5, duration: 3, ease: 'power2.out' }, 'scene04+=1.5')
    
    // Typographical shift for constellation
    .to(tHeadline, { y: '-15vh', scale: 0.8, autoAlpha: 0.3, duration: 3, ease: 'power2.inOut' }, 'scene04');

  // ----------------------------------------------------
  // SCENE 5: FINAL ARCHIVE
  // ----------------------------------------------------
  master.addLabel('scene05', 18)
    // Camera pushes slightly through the constellation
    .to(videos, { z: '+=300', opacity: '-=0.2', duration: 4, ease: 'power1.inOut' }, 'scene05')
    // Final text reveal
    .to(tSubline, { autoAlpha: 1, y: -50, scale: 1.2, duration: 3, ease: 'power2.inOut' }, 'scene05')
    .to('.signal-aurora', { rotation: 180, scale: 1.5, autoAlpha: 0.9, duration: 4, ease: 'power2.inOut' }, 'scene05')
    .to('.signal-orbit', { rotation: 220, scale: 1.35, autoAlpha: 0.8, duration: 4, ease: 'power2.inOut' }, 'scene05');

  return master;
};
