export default function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Raymond Csirak',
    jobTitle: 'DevOps Engineer & SRE',
    url: 'https://raymi.xyz',
    image: 'https://raymi.xyz/profile.jpg',
    sameAs: [
      'https://linkedin.com/in/raymondcsirak',
      'https://github.com/raymondcsirak',
      'https://instagram.com/raymondcsirak',
      'https://x.com/raymondcsirak'
    ],
    description: 'DevOps Engineer and Site Reliability Engineer specializing in Kubernetes, Infrastructure as Code, and CI/CD automation.',
    knowsAbout: ['DevOps', 'SRE', 'Kubernetes', 'Linux', 'CI/CD', 'Cloud Computing', 'Infrastructure as Code', 'AWS', 'Terraform'],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
