// Shared Framer Motion variants — keeps animation language consistent.

export const easeExpo = [0.16, 1, 0.3, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeExpo },
  },
};

export const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: easeExpo } },
};

// Standard viewport config: animate once, when 20% is visible.
export const inView = { once: true, amount: 0.2 };
