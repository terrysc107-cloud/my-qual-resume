export const PACKAGES = [
  {
    id: 'starter' as const,
    name: 'Starter',
    price: 29,
    tag: '',
    desc: 'Perfect for career changers and entry-level professionals getting back into the market.',
    delivery: '48 hours',
    revisions: 2,
    features: [
      '1 resume variation',
      'ATS keyword optimization',
      'Job description analysis',
      'Expert review',
      '48-hour delivery',
      '2 revision rounds',
    ],
    featured: false,
    squareLink: 'https://square.link/u/j7Ky4isi',
  },
  {
    id: 'standard' as const,
    name: 'Standard',
    price: 49,
    tag: 'Most Popular',
    desc: 'The complete package for mid-career professionals targeting a specific role.',
    delivery: '48 hours',
    revisions: 3,
    features: [
      '2 resume variations',
      'ATS keyword optimization',
      'Custom cover letter',
      'Company research included',
      'Expert review',
      '48-hour delivery',
      '3 revision rounds',
    ],
    featured: true,
    squareLink: 'https://square.link/u/Jbn6uVYr',
  },
  {
    id: 'premium' as const,
    name: 'Premium',
    price: 79,
    tag: 'Full Package',
    desc: 'Everything you need for a complete job search including LinkedIn optimization.',
    delivery: '24 hours',
    revisions: 3,
    features: [
      '3 resume variations',
      'ATS keyword optimization',
      'Custom cover letter',
      'LinkedIn summary rewrite',
      'Company + role research',
      '24-hour delivery',
      '3 revision rounds',
    ],
    featured: false,
    squareLink: 'https://square.link/u/UtQ7nKp3',
  },
] as const

export type PackageId = typeof PACKAGES[number]['id']

export function getPackage(id: PackageId) {
  return PACKAGES.find(p => p.id === id)!
}
