export const BUSINESS_INFO = {
  phone: '+234 800 000 0000',
  email: 'info@bigteewise.com',
  location: 'Lagos, Nigeria',
  socialHandle: '@bigteewisedigital',
  socialLinks: {
    facebook: 'https://facebook.com',
    twitter: 'https://x.com',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
  },
};

export const SERVICES = [
  {
    id: 'book-marketing',
    title: 'Book Marketing',
    iconName: 'BookOpenCheck',
    category: 'specialization',
    isSpecialization: true,
    shortDesc: 'Comprehensive launch and growth campaigns designed to get your book into the hands of thousands of targeted readers.',
    fullDesc: 'End-to-end book launch execution including Amazon category optimization, reader lead magnets, ARC distribution, and targeted promotion.',
    deliverables: ['Launch Strategy Roadmap', 'Amazon KDP Category & Keyword Audit', 'ARC & Reviewer Campaign Setup'],
    roiHighlights: 'Average 300%+ increase in launch-week reader reach and sales rank.'
  },
  {
    id: 'author-branding',
    title: 'Author Branding',
    iconName: 'UserCheck',
    category: 'specialization',
    isSpecialization: true,
    shortDesc: 'Positioning authors as authoritative, memorable figures in their niche with distinct identity & media presence.',
    fullDesc: 'Build an enduring personal brand with a tailored author media kit, professional website design, bio crafting, and platform positioning.',
    deliverables: ['Author Media Kit PDF', 'Brand Voice & Style Guidelines', 'Author Platform Setup'],
    roiHighlights: 'Establishes instant authority for media interviews, speaking gigs, and book deals.'
  },
  {
    id: 'book-cover-design',
    title: 'Book Cover Design',
    iconName: 'Palette',
    category: 'creative',
    isSpecialization: false,
    shortDesc: 'High-converting, genre-specific ebook and print cover designs that demand reader attention.',
    fullDesc: 'Custom, custom-crafted typography and layout tailored specifically to dominate your target genre on Amazon and retail shelves.',
    deliverables: ['Front, Back & Spine Print Files (PDF)', 'Ebook Cover (JPG/PNG)', 'Audiobook Cover Formatting'],
    roiHighlights: 'Covers designed to increase ad click-through rates by up to 45%.'
  },
  {
    id: 'book-mockup-design',
    title: 'Book Mockup Design',
    iconName: 'Box',
    category: 'creative',
    isSpecialization: false,
    shortDesc: 'Photorealistic 3D book mockups and promotional assets tailored for social ads, websites, and marketing displays.',
    fullDesc: 'High-resolution 3D renders showcasing hardcovers, paperbacks, e-readers, and device bundles for launch campaigns.',
    deliverables: ['High-Res Transparent PNG Renders', 'Social Media Promo Graphics', 'Banner Ads'],
    roiHighlights: 'Boosts ad engagement with realistic visual proof.'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    iconName: 'TrendingUp',
    category: 'marketing',
    isSpecialization: false,
    shortDesc: 'Data-driven multi-channel digital campaigns designed to maximize ROI, customer acquisition, and brand visibility.',
    fullDesc: 'Omnichannel growth marketing strategies focusing on customer acquisition, conversion rate optimization, and brand scaling.',
    deliverables: ['Growth Strategy Roadmap', 'Multi-channel Campaign Setup', 'Performance Analytics Reports'],
    roiHighlights: 'Predictable, scalable pipeline for sustained business growth.'
  },
  {
    id: 'social-media-marketing',
    title: 'Social Media Marketing & Management',
    iconName: 'Share2',
    category: 'marketing',
    isSpecialization: false,
    shortDesc: 'Strategic content creation, community growth, and active management across Instagram, LinkedIn, TikTok, and X.',
    fullDesc: 'Turn passive scrollers into active brand advocates with consistent, high-converting social media publishing and community management.',
    deliverables: ['Monthly Content Calendar', 'Custom Graphic & Reel Creation', 'Community Engagement & Analytics'],
    roiHighlights: 'Consistent audience building and higher organic reach.'
  },
  {
    id: 'social-media-graphics',
    title: 'Social Media Graphics & Creative Design',
    iconName: 'Sparkles',
    category: 'creative',
    isSpecialization: false,
    shortDesc: 'Eye-catching custom graphics, carousels, infographics, and promotional flyers that command feed attention.',
    fullDesc: 'Stop the scroll with tailored visual designs aligned perfectly with your brand identity.',
    deliverables: ['Custom Instagram Carousels', 'Promotional Banners & Flyers', 'Editable Canva Templates'],
    roiHighlights: 'Dramatically improves feed interaction and shareability.'
  },
  {
    id: 'content-marketing',
    title: 'Content Marketing',
    iconName: 'FileText',
    category: 'marketing',
    isSpecialization: false,
    shortDesc: 'Compelling storytelling through blogs, articles, newsletters, and lead magnets that educate and convert.',
    fullDesc: 'Nurture cold traffic into loyal buyers with high-value blog content, whitepapers, email sequences, and lead magnets.',
    deliverables: ['SEO-Optimized Blog Articles', 'Lead Magnet PDFs', 'Email Nurture Sequences'],
    roiHighlights: 'Builds long-term organic authority and search visibility.'
  },
  {
    id: 'seo',
    title: 'Search Engine Optimization (SEO)',
    iconName: 'Search',
    category: 'marketing',
    isSpecialization: false,
    shortDesc: 'Technical, on-page, and keyword strategies to rank your website at the top of Google search results.',
    fullDesc: 'Drive predictable, targeted organic website traffic with technical site audits, content optimization, and backlink strategies.',
    deliverables: ['Technical SEO Audit', 'Target Keyword Mapping', 'On-Page Content Optimization'],
    roiHighlights: 'Generates low-cost, recurring inbound leads from Google search.'
  },
  {
    id: 'brand-strategy',
    title: 'Brand Strategy & Creative Branding',
    iconName: 'Compass',
    category: 'creative',
    isSpecialization: false,
    shortDesc: 'Complete brand identity creation including logos, color palettes, tone of voice, and brand guidelines.',
    fullDesc: 'Differentiate your business from competitors with a memorable visual brand identity and strategic positioning framework.',
    deliverables: ['Primary & Secondary Logo Suite', 'Brand Guidelines Book (PDF)', 'Typography & Palette System'],
    roiHighlights: 'Creates immediate market premium and consumer trust.'
  },
  {
    id: 'digital-advertising',
    title: 'Advertising / Digital Advertising',
    iconName: 'Target',
    category: 'marketing',
    isSpecialization: false,
    shortDesc: 'Laser-targeted Meta (Facebook/IG), Google Ads, and Amazon PPC campaigns optimized for immediate sales.',
    fullDesc: 'Paid traffic campaigns designed to deliver maximum ROAS with precise audience targeting and continuous ad iteration.',
    deliverables: ['Ad Creative & Copy Design', 'Campaign Setup & Audience Targeting', 'Weekly ROAS Optimization'],
    roiHighlights: 'Scalable paid acquisition with quantifiable return on ad spend.'
  },
  {
    id: 'marketing-strategy',
    title: 'Marketing Strategy',
    iconName: 'Lightbulb',
    category: 'marketing',
    isSpecialization: false,
    shortDesc: 'Bespoke growth roadmaps and execution frameworks tailored specifically to your revenue goals.',
    fullDesc: 'Clear, actionable roadmap outlining exact marketing channels, tactics, budgets, and timelines required to reach your target KPIs.',
    deliverables: ['Comprehensive Marketing Blueprint', 'Competitor Benchmark Report', 'Budget Allocation Plan'],
    roiHighlights: 'Eliminates wasted ad spend and focuses budget on proven ROI channels.'
  }
];

