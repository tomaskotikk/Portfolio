// Logos that are black by default and need inverting on a dark background.
const darkLogos = new Set(['Next.js', 'Express', 'GitHub', 'Unity Engine']);

export const techClass = (name) => (darkLogos.has(name) ? 'logo logo--invert' : 'logo');
