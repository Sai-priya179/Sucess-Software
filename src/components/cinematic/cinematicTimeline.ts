import gsap from 'gsap';

export const buildCinematicTimeline = (
  section: HTMLElement,
  viewport: HTMLElement,
  parallax: HTMLElement,
  cards: (HTMLElement | null)[],
  textRefs: any,
  onProgress: (p: number) => void
) => {
  const master = gsap.timeline({
    scrollTrigger: {
      id: 'cinematic-master',
      trigger: section,
      start: 'top top',
      end: '+=12000', // Extended duration to map time scrub more granularly
      pin: viewport,
      scrub: 1,
      onUpdate: (self) => onProgress(self.progress)
    }
  });

  const { tIntro, tProg, tWeb, tTech, identityBox, identityLine1, identityLine2, cta } = textRefs;

  // ----------------------------------------------------
  // INITIAL STATE SETUP (Absolute Motion Reconstruction)
  // ----------------------------------------------------
  gsap.set([tProg, tWeb, tTech, identityBox, cta], { autoAlpha: 0 });
  gsap.set(tIntro, { autoAlpha: 1, y: 0, clipPath: 'inset(0% 0 0 0)' });
  gsap.set(cards, { autoAlpha: 0, z: -2000, scale: 0.5 });

  // SCENE 01: INTRO (Hold & Drift)
  master.addLabel('scene01', 0)
    .fromTo(cards[0], { x: '30vw', y: '-20vh', z: -1000, rotateY: -15, autoAlpha: 0 }, { x: '10vw', y: '-5vh', z: -200, rotateY: -5, autoAlpha: 1, scale: 1.2, duration: 2, ease: 'power1.out' }, 'scene01')
    .fromTo(cards[1], { x: '50vw', y: '10vh', z: -1500, autoAlpha: 0 }, { x: '25vw', y: '5vh', z: -400, rotateZ: 5, autoAlpha: 0.8, scale: 0.9, duration: 2, ease: 'power1.out' }, 'scene01+=0.2')
    .fromTo(cards[2], { x: '20vw', y: '40vh', z: -800, autoAlpha: 0 }, { x: '5vw', y: '25vh', z: -100, rotateX: 10, autoAlpha: 0.9, scale: 1, duration: 2, ease: 'power1.out' }, 'scene01+=0.4');

  // SCENE 02: PROGRAMMING
  master.addLabel('scene02', 2)
    .to(tIntro, { y: -50, autoAlpha: 0, duration: 1, ease: 'power2.inOut' }, 'scene02')
    .fromTo(tProg, { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, ease: 'power2.out' }, 'scene02+=0.2')
    
    .to(cards[0], { x: '-40vw', y: '-10vh', z: -800, rotateY: 15, autoAlpha: 0.3, duration: 2.5, ease: 'power2.inOut' }, 'scene02')
    .to(cards[1], { x: '-20vw', y: 0, z: -600, autoAlpha: 0.5, duration: 2.5, ease: 'power2.inOut' }, 'scene02')
    .to(cards[2], { x: '-60vw', y: '30vh', z: -1000, autoAlpha: 0, duration: 2.5, ease: 'power2.inOut' }, 'scene02')
    
    .fromTo(cards[3], { x: '60vw', y: '-30vh', z: -1500, autoAlpha: 0 }, { x: '15vw', y: '-15vh', z: -150, rotateZ: -8, autoAlpha: 1, scale: 1.1, duration: 2.5, ease: 'power2.out' }, 'scene02')
    .fromTo(cards[4], { x: '80vw', y: '10vh', z: -1000, autoAlpha: 0 }, { x: '30vw', y: '0vh', z: -300, rotateY: -10, autoAlpha: 0.9, scale: 1, duration: 2.5, ease: 'power2.out' }, 'scene02+=0.2')
    .fromTo(cards[5], { x: '40vw', y: '40vh', z: -2000, autoAlpha: 0 }, { x: '5vw', y: '30vh', z: -50, rotateX: 5, autoAlpha: 1, scale: 1.3, duration: 2.5, ease: 'power2.out' }, 'scene02+=0.4');

  // SCENE 03: WEB DEV
  master.addLabel('scene03', 4.5)
    .to(tProg, { y: -50, autoAlpha: 0, duration: 1, ease: 'power2.inOut' }, 'scene03')
    .fromTo(tWeb, { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1, ease: 'power2.out' }, 'scene03+=0.2')
    
    .to([cards[3], cards[4], cards[5]], { x: '-=30vw', z: '-=500', autoAlpha: 0.4, duration: 2.5, ease: 'power2.inOut' }, 'scene03')
    
    .fromTo(cards[6], { x: '30vw', y: '-50vh', z: -1000, autoAlpha: 0 }, { x: '10vw', y: '-20vh', z: -100, rotateZ: 5, autoAlpha: 1, scale: 1.1, duration: 2.5, ease: 'power2.out' }, 'scene03')
    .fromTo(cards[7], { x: '70vw', y: '0vh', z: -2000, autoAlpha: 0 }, { x: '25vw', y: '10vh', z: -250, rotateY: -15, autoAlpha: 0.85, scale: 1, duration: 2.5, ease: 'power2.out' }, 'scene03+=0.3')
    .fromTo(cards[8], { x: '40vw', y: '60vh', z: -1500, autoAlpha: 0 }, { x: '0vw', y: '25vh', z: 0, rotateX: -5, autoAlpha: 1, scale: 1.2, duration: 2.5, ease: 'power2.out' }, 'scene03+=0.5');

  // SCENE 04: TECH
  master.addLabel('scene04', 7)
    .to(tWeb, { scale: 0.9, autoAlpha: 0, duration: 1, ease: 'power2.inOut' }, 'scene04')
    .fromTo(tTech, { scale: 1.1, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1, ease: 'power2.out' }, 'scene04+=0.2')
    
    .to([cards[6], cards[7], cards[8]], { x: '-=40vw', z: '-=600', autoAlpha: 0.2, duration: 2.5, ease: 'power2.inOut' }, 'scene04')
    
    .fromTo(cards[9], { x: '50vw', y: '-30vh', z: -800, autoAlpha: 0 }, { x: '-10vw', y: '-10vh', z: -50, rotateY: 10, autoAlpha: 1, scale: 1.3, duration: 2.5, ease: 'power2.out' }, 'scene04')
    .fromTo(cards[10], { x: '80vw', y: '20vh', z: -1500, autoAlpha: 0 }, { x: '15vw', y: '5vh', z: -300, rotateZ: -10, autoAlpha: 0.9, scale: 1, duration: 2.5, ease: 'power2.out' }, 'scene04+=0.2')
    .fromTo(cards[11], { x: '10vw', y: '50vh', z: -1000, autoAlpha: 0 }, { x: '30vw', y: '30vh', z: -150, rotateX: 15, autoAlpha: 1, scale: 1.1, duration: 2.5, ease: 'power2.out' }, 'scene04+=0.4');

  // SCENE 05: COLLAGE FORMATION & DOLLY ZOOM
  master.addLabel('scene05', 9.5)
    .to(tTech, { autoAlpha: 0, duration: 1 }, 'scene05')
    .to(cards[0], { x: '-35vw', y: '-30vh', z: -400, rotateY: 20, rotateZ: -10, autoAlpha: 0.7, duration: 4, ease: 'power2.inOut' }, 'scene05')
    .to(cards[1], { x: '-20vw', y: '35vh', z: -800, rotateX: -15, autoAlpha: 0.5, duration: 4, ease: 'power2.inOut' }, 'scene05')
    .to(cards[2], { x: '30vw', y: '-40vh', z: -600, rotateZ: 15, autoAlpha: 0.6, duration: 4, ease: 'power2.inOut' }, 'scene05')
    .to(cards[3], { x: '40vw', y: '25vh', z: -300, rotateY: -25, autoAlpha: 0.8, duration: 4, ease: 'power2.inOut' }, 'scene05')
    .to(cards[4], { x: '-10vw', y: '0vh', z: -1000, rotateZ: 5, autoAlpha: 0.4, duration: 4, ease: 'power2.inOut' }, 'scene05')
    .to(cards[5], { x: '-45vw', y: '15vh', z: -200, rotateX: 10, autoAlpha: 0.9, duration: 4, ease: 'power2.inOut' }, 'scene05')
    .to(cards[6], { x: '10vw', y: '-25vh', z: -150, rotateY: -10, autoAlpha: 1, duration: 4, ease: 'power2.inOut' }, 'scene05')
    .to(cards[7], { x: '25vw', y: '10vh', z: -700, rotateZ: -12, autoAlpha: 0.6, duration: 4, ease: 'power2.inOut' }, 'scene05')
    .to(cards[8], { x: '-25vw', y: '-15vh', z: -50, rotateX: 5, autoAlpha: 1, scale: 1.1, duration: 4, ease: 'power2.inOut' }, 'scene05')
    .to(cards[9], { x: '5vw', y: '20vh', z: -900, autoAlpha: 0.5, duration: 4, ease: 'power2.inOut' }, 'scene05')
    .to(cards[10],{ x: '-15vw', y: '40vh', z: -350, rotateY: 15, autoAlpha: 0.8, duration: 4, ease: 'power2.inOut' }, 'scene05')
    .to(cards[11],{ x: '35vw', y: '-10vh', z: -500, rotateZ: 8, autoAlpha: 0.7, duration: 4, ease: 'power2.inOut' }, 'scene05');

  // Push through the cards
  master.to(cards, { z: '+=500', duration: 4, ease: 'none' }, 'scene05');

  // SCENE 06: IDENTITY STATEMENT
  master.addLabel('scene06', 13.5)
    .to(cards, { z: 1000, autoAlpha: 0, stagger: 0.05, duration: 2.5, ease: 'power2.in' }, 'scene06')
    .fromTo(identityBox, { scale: 0.9, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1, ease: 'power2.out' }, 'scene06+=1.5')
    .fromTo(identityLine1, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power3.inOut' }, 'scene06+=2')
    .fromTo(identityLine2, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 'scene06+=2.8');

  // SCENE 07: CTA
  master.addLabel('scene07', 17.5)
    .to(identityBox, { scale: 1.1, autoAlpha: 0, duration: 1, ease: 'power2.inOut' }, 'scene07')
    .fromTo(cta, { scale: 0.9, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1, ease: 'power2.out' }, 'scene07+=0.5');

  return master;
};
