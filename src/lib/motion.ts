/** Shared Framer Motion entrance variants used on the homepage hero. */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 + i * 0.09, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}
