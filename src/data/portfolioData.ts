export type ProjectCategory =
  | 'Branding'
  | 'Packaging'
  | 'Social Media'
  | 'Advertising'
  | 'UI/UX'
  | 'Typography'
  | 'Illustration';

export interface ProcessStep {
  phase: string;
  title: string;
  description: string;
}

export interface GallerySlide {
  id: string;
  caption: string;
  subcaption: string;
  aspect: 'landscape' | 'portrait' | 'square';
  artType:
    | 'fragrance-campaign'
    | 'coffee-social'
    | 'sneaker-ad'
    | 'architecture-strategy'
    | 'apothecary-packaging'
    | 'fintech-ui'
    | 'monograph-type'
    | 'botanical-illustration'
    | 'luxury-ev'
    | 'editorial-spread'
    | 'packaging-unboxing';
}

export interface ProjectResult {
  metric: string;
  value: string;
  label: string;
  detail: string;
}

export interface CopySpecimen {
  context: string;
  headline: string;
  bodyCopy: string;
  rationale: string;
}

export interface ProjectExternalLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  showcaseTitle: string;
  category: ProjectCategory;
  year: string;
  client: string;
  industry: string;
  readTime: string;
  featured: boolean;
  featuredOrder?: number;
  artType: GallerySlide['artType'];
  excerpt: string;
  description: string;
  challenge: string;
  solution: string;
  process: ProcessStep[];
  copySpecimens: CopySpecimen[];
  gallery: GallerySlide[];
  tools: string[];
  results: ProjectResult[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  externalLinks?: ProjectExternalLink[];
  relatedIds: string[];
}

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  publishYear: string;
  isbn: string;
  pages: number;
  format: string;
  readersCount: string;
  coverTheme: 'happy-breakup' | 'creative-mindset';
  synopsis: string;
  keyTakeaways: string[];
  sampleChapterTitle: string;
  sampleExcerpt: string[];
  amazonUrl: string;
  endorsement: {
    quote: string;
    reviewer: string;
  };
}

export interface ServicePackage {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  timeline: string;
  investmentRange: string;
  idealFor: string;
  projectTypeKey: string;
}

export const DESIGNER_PROFILE = {
  name: 'Tanishq Sharma',
  brandMark: 'TANISHQ SHARMA.',
  roles: ['COPYWRITER', 'CONTENT STRATEGIST', 'BRAND STORYTELLER'],
  heroHeadline: ['WORDS', 'THAT', 'MOVE.'],
  heroSubheadline:
    'I turn ideas, brands and stories into words people remember. From flagship fashion sale campaigns and Italian denim storytelling to experiential pop-ups and published books.',
  aboutKicker: '01 / ABOUT · GET TO KNOW ME',
  aboutHeadingTop: 'Ideas Don’t Just Happen.',
  aboutHeadingItalic: 'I Write Them.',
  aboutLead:
    'I’m Tanishq Sharma, a copywriter and creative strategist who believes the best ideas are usually the simplest ones—and that “Would I send this to my bestie?” is a pretty solid creative benchmark.',
  extendedBio: [
    'My Notes app is probably my most prized possession. At Spek! Digital Marketing Agency, I craft 360° campaign communications, social-first IPs, shoot concepts, influencer reel scripts, and visual direction for marquee fashion and lifestyle brands including Tata CLiQ Fashion, GAS Milano India, and Ed-a-Mamma.',
    'Trained in Fashion Communication at Pearl Academy, Mumbai (Post Graduate, 2022–24) with a BBA from IMED, Bharati Vidyapeeth University, Pune (2019–22), my work bridges sharp commercial strategy with culture-first storytelling—from London Fashion Week and Lakmé Fashion Week (FDCI) to in-store brand collaborations.',
    'When I’m not writing for brands, you’ll find me writing for myself—having authored two published titles, Happy With My Heartbreak (July 2024) and Everythingship! (January 2020)—collecting internet culture references, or being supervised by my cat.'
  ],
  location: 'Mumbai, India · Available Worldwide',
  email: 'itanishqsharmaoff@gmail.com',
  phone: '+91 8120004662',
  canvaPortfolioUrl:
    'https://www.canva.com/design/DAGv9YTo4Wc/eO_RAzg15-K4vmuy1iWtLg/view',
  availability: 'Available for Q2/Q3 Brand Campaigns, Retainers & Creative Strategy',
  socials: {
    linkedin:
      'https://www.linkedin.com/in/tanishq-sharma-2b8020270?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
    instagram: 'https://www.instagram.com/p/DYU3gJKzDsh/',
    whatsapp: 'https://wa.me/918120004662',
    amazonAuthor: 'https://amzn.in/d/0e6w7nV6'
  },
  toolkit: [
    'BAU content concepts: carousels, statics, shoot-based & edit-based reels',
    '360° Campaign ideation & communication direction',
    'Social media captions & Broadcast messages',
    'SMS, WhatsApp, Emailer & Dark ad copy',
    'Moodboards & cohesive visual direction',
    'Trend research & cultural creative references',
    'AI tools for creative exploration & execution',
    'Influencer reel scripts, vox pops & supers',
    'Pitch decks & Annual Operating Plan (AOP) decks',
    'Online Reputation Management (ORM)',
    'Styling, conceptualising & look curation for shoots'
  ],
  heroStats: [
    {
      value: '360°',
      label: 'Campaign Strategy',
      detail: 'Hero, Hub & Hygiene ecosystems across Site, App, CRM & Social'
    },
    {
      value: '2',
      label: 'Published Books',
      detail: 'Happy With My Heartbreak (2024) & Everythingship! (2020)'
    },
    {
      value: '11+',
      label: 'Toolkit Disciplines',
      detail: 'From P1 Sale IPs & Documentary Scripts to AOP Pitch Decks'
    },
    {
      value: '5+',
      label: 'Marquee Fashion Labels',
      detail: 'Tata CLiQ Fashion, GAS Milano, Ed-a-Mamma, Rocky Star & FDCI'
    }
  ]
};

export const PORTFOLIO_CATEGORIES: ('All' | ProjectCategory)[] = [
  'All',
  'Branding',
  'Packaging',
  'Social Media',
  'Advertising',
  'UI/UX',
  'Typography',
  'Illustration'
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'proj-01',
    slug: 'aurae-botanica-brand-campaigns',
    title: 'Tata CLiQ Fashion — Big CLiQ Sale (P1 Sale): “Everything Is On Loop”',
    showcaseTitle: 'Big CLiQ Sale (P1)',
    category: 'Advertising',
    year: '2025',
    client: 'Tata CLiQ Fashion',
    industry: 'Fashion E-Commerce · 360° Flagship Sale Campaign',
    readTime: '6 min read',
    featured: true,
    featuredOrder: 1,
    artType: 'fragrance-campaign',
    excerpt:
      'Built a high-impact 360° P1 Sale campaign rooted in “No Limits. No Rules.” around the core hook “Everything Is On Loop”—spanning teaser scripts, binding visual moodboards, and Hero-Hub-Hygiene rollouts.',
    description:
      'For Tata CLiQ Fashion’s flagship Big CLiQ Sale (P1 Sale), the brief was to build a high-impact campaign that felt bigger, more dynamic, and more unpredictable than its previous edition while staying rooted in the brand’s established communication: “No Limits. No Rules.” I developed the core campaign idea—“Everything Is On Loop”—alongside a 360° creative approach across Hero, Hub, and Hygiene content, social-first teasers, giveaways, brand collaborations, and a cohesive visual world.',
    challenge:
      'Flagship fashion e-commerce sales often blur into repetitive discount shouting. Tata CLiQ Fashion needed a unifying creative hook that could scale across site banners, app drops, social teasers, script-led reels, and physical brand collaborations while embodying a Confident, Expansive, and High-Energy tone of voice.',
    solution:
      'By decoding the brief and mapping cultural references, I anchored the campaign in “Core Idea: Everything Is On Loop”—when there are no limits and no rules, there’s no telling what comes next. Every deal, drop, and reward loops into something bigger. We defined binding visual elements, wrote loop-led social teaser scripts to build intrigue before the reveal, and rolled out a cohesive multi-touchpoint campaign.',
    process: [
      {
        phase: '01 / Decode the Brief',
        title: 'Rooting in “No Limits. No Rules.”',
        description:
          'Audited previous P1 Sale editions and mapped Hero, Hub, and Hygiene touchpoints to ensure the campaign felt bolder, faster, and more unpredictable.'
      },
      {
        phase: '02 / Trend & Culture Mapping',
        title: 'Exploring References & Loop Metaphors',
        description:
          'Tracked relevant fashion and internet culture trends to define binding visual elements and set the campaign’s high-energy visual mood and direction.'
      },
      {
        phase: '03 / Finding the Hook',
        title: '“Everything Is On Loop”',
        description:
          'Crafted the core narrative where endless possibilities mean every deal, drop, and reward leads to something more—testing scalability across static, video, and on-ground formats.'
      },
      {
        phase: '04 / Script & Teaser Rollout',
        title: 'Translating the Core Idea into Social-First Scripts',
        description:
          'Wrote loop-led teaser reel scripts and sustenance copy that built intrigue prior to the sale reveal and carried high-energy momentum through sale days.'
      }
    ],
    copySpecimens: [
      {
        context: 'Campaign Core Idea & Manifesto',
        headline: 'No Limits. No Rules. Everything Is On Loop.',
        bodyCopy:
          'When there are no limits and no rules, there’s no telling what comes next. Welcome to a sale designed around endless possibilities—where every deal, every drop, and every reward loops into something more.',
        rationale:
          'Establishes an expansive, confident, high-energy tone of voice that turns endless scrolling and deal-hunting into an intentional loop metaphor.'
      },
      {
        context: 'Social-First Teaser Script Direction',
        headline: 'Wait—Did That Just Happen Again? The Loop Starts Now.',
        bodyCopy:
          'Visual: Fast-cut loop of outfit transitions and recurring visual motifs that reset just as the viewer expects the frame to end. Super: Big CLiQ Sale. No Limits. No Rules.',
        rationale:
          'Uses visual and verbal repetition to hook viewers in the first 1.5 seconds before revealing the P1 Sale dates.'
      }
    ],
    gallery: [
      {
        id: 'gal-1',
        caption: 'Big CLiQ Sale (P1) — Core Idea & Tone of Voice Architecture',
        subcaption: 'Confident · Expansive · High-Energy (“Everything Is On Loop”)',
        aspect: 'landscape',
        artType: 'fragrance-campaign'
      },
      {
        id: 'gal-2',
        caption: 'Binding Visual Language & Mood Direction',
        subcaption: 'Cohesive visual world tying Hero, Hub & Hygiene touchpoints together',
        aspect: 'landscape',
        artType: 'editorial-spread'
      },
      {
        id: 'gal-3',
        caption: 'Loop-Led Social Teaser Scripts & Content Rollout',
        subcaption: 'Pre-reveal intrigue scripts and high-impact launch reels',
        aspect: 'landscape',
        artType: 'monograph-type'
      }
    ],
    tools: [
      '360° Campaign Ideation',
      'Hero-Hub-Hygiene Strategy',
      'Visual Direction & Moodboarding',
      'Reel Scriptwriting',
      'Canva & Google Workspace'
    ],
    results: [
      {
        metric: 'Campaign Scope',
        value: '360°',
        label: 'Hero, Hub & Hygiene Rollout',
        detail: 'Unified creative language across social, site, app, and collaborations'
      },
      {
        metric: 'Tone Architecture',
        value: '3 Pillars',
        label: 'Confident · Expansive · High-Energy',
        detail: 'Consistent verbal identity across teasers, scripts, and static drops'
      },
      {
        metric: 'Deliverable System',
        value: 'P1 Flagship',
        label: 'Teasers, Scripts & Visual Bible',
        detail: 'End-to-end execution from research process to live Instagram reels'
      }
    ],
    externalLinks: [
      {
        label: 'View Big CLiQ Sale Instagram Post',
        url: 'https://www.instagram.com/p/DYU3gJKzDsh/?stkn=MTFnN3FiNTlhYWJwag=='
      },
      {
        label: 'Read Teaser Scripts & Content Sheet (Google Sheets)',
        url: 'https://docs.google.com/spreadsheets/d/1DaxcXfZl0G-zlTbJrJO4174s4J5-CEQY-X40NW_3RQ4/edit?usp=sharing'
      },
      {
        label: 'View Original Slide in Canva Portfolio',
        url: 'https://www.canva.com/design/DAGv9YTo4Wc/eO_RAzg15-K4vmuy1iWtLg/view#11'
      }
    ],
    testimonial: {
      quote:
        'The “Everything Is On Loop” direction gave our flagship Big CLiQ Sale a fresh, unpredictable pulse that connected social teasers, visual moodboards, and on-ground activations seamlessly.',
      author: 'Campaign Brand Team',
      role: 'Tata CLiQ Fashion · Spek! Digital'
    },
    relatedIds: ['proj-02', 'proj-03', 'proj-04']
  },
  {
    id: 'proj-02',
    slug: 'kuro-roasters-social-content',
    title: 'Tata CLiQ Fashion — Cupid Sale (P1 Valentine’s Campaign): “LOVE IT.”',
    showcaseTitle: 'Cupid Sale: LOVE IT.',
    category: 'Social Media',
    year: '2025',
    client: 'Tata CLiQ Fashion',
    industry: 'Fashion & Lifestyle · Omnichannel P1 Sale',
    readTime: '5 min read',
    featured: true,
    featuredOrder: 2,
    artType: 'coffee-social',
    excerpt:
      'Developed the Valentine’s Day P1 Sale campaign “LOVE IT.” across Site, App, CRM, and Social—celebrating self-love, friendships, and romance through “Own It, Gift It, or Show It.”',
    description:
      'Tasked with developing Tata CLiQ Fashion’s Valentine’s Day Sale campaign going live on 29 January across Site, App, CRM, and Social, I created the core idea “LOVE IT.” Rather than restricting Valentine’s Day to couples, the campaign embraced self-love, friendships, and romantic relationships—capturing the instant connection you feel when a style, product, or detail simply feels right.',
    challenge:
      'Valentine’s campaigns frequently alienate solo shoppers or rely on clichés and hard-sell discount banners. The brief required an inclusive, high-fashion creative umbrella that worked without pre-buzz while powering launch reels, sustenance posts, brand collaborations, and BAU social content.',
    solution:
      '“LOVE IT.” distilled that instant spark with a piece of fashion into three actionable expressions: Own It (self-love), Gift It (friendships & partners), or Show It (personal style). Alongside the P1 campaign launch reel and sustenance posts, I crafted social-first BAU copy and captions designed around “sale messaging, minus the hard sell.”',
    process: [
      {
        phase: '01 / Omnichannel Strategy',
        title: 'Site, App, CRM & Social Alignment',
        description:
          'Built a unified verbal hook (“LOVE IT.”) concise enough for mobile app push notifications and rich enough for hero launch reels.'
      },
      {
        phase: '02 / Three-Way Expression',
        title: 'Own It · Gift It · Show It',
        description:
          'Segmented campaign storytelling across self-love, Galentine’s friendships, and modern romance.'
      },
      {
        phase: '03 / Launch Reel & Sustenance',
        title: 'High-Fashion Visual & Copy Pairing',
        description:
          'Directed the launch reel narrative and Instagram sustenance carousels to maintain momentum throughout the sale window.'
      },
      {
        phase: '04 / BAU Social-First Copy',
        title: 'Sale Messaging, Minus the Hard Sell',
        description:
          'Wrote conversational captions and in-graphic copy that fit each visual organically.'
      }
    ],
    copySpecimens: [
      {
        context: 'Cupid Sale Core Manifesto',
        headline: 'LOVE IT. Own It. Gift It. Show It.',
        bodyCopy:
          '“Love It” captures the instant connection you feel when a style, product, or detail simply feels right. Whether you’re dressing up for yourself, your bestie, or your date—when you see it, you just Love It.',
        rationale:
          'Transforms a two-word emotional reaction into a versatile retail framework across every shopper segment.'
      },
      {
        context: 'BAU Social-First Caption Philosophy',
        headline: 'Sale Messaging, Minus the Hard Sell.',
        bodyCopy:
          'Copy that fits the visual first and sells second—written with the benchmark: “Would I send this post to my bestie?”',
        rationale:
          'Keeps engagement organic on Instagram Reels and carousels while still driving product discovery.'
      }
    ],
    gallery: [
      {
        id: 'gal-201',
        caption: 'Cupid Sale (P1) — “LOVE IT.” Campaign Identity & Launch Reel',
        subcaption: 'Omnichannel rollout across Site, App, CRM & Instagram',
        aspect: 'landscape',
        artType: 'coffee-social'
      },
      {
        id: 'gal-202',
        caption: 'Instagram Sustenance Posts & BAU Content Grid',
        subcaption: 'Sale messaging minus the hard sell · Social-first thinking',
        aspect: 'landscape',
        artType: 'editorial-spread'
      }
    ],
    tools: [
      'Campaign Strategising',
      'Creative Copywriting',
      'Visual Direction',
      'BAU & IP Concepts',
      'CRM & App Copy'
    ],
    results: [
      {
        metric: 'Channels Covered',
        value: '4 Ecosystems',
        label: 'Site · App · CRM · Social',
        detail: 'Seamless verbal thread from push notifications to Instagram Reels'
      },
      {
        metric: 'Live Social Assets',
        value: '6+ Featured',
        label: 'Launch Reels & Sustenance Posts',
        detail: 'Published across Tata CLiQ Fashion’s official Instagram feed'
      },
      {
        metric: 'Audience Pillars',
        value: '3 Segments',
        label: 'Self-Love · Friendships · Romance',
        detail: 'Expanded Valentine’s relevance across all shopper demographics'
      }
    ],
    externalLinks: [
      {
        label: 'Watch Cupid Sale Launch Post (Instagram)',
        url: 'https://www.instagram.com/p/DUFdGxjgkFo/?stkn=bml3MWN2MXc2bXZo'
      },
      {
        label: 'Watch BAU Reel on Instagram',
        url: 'https://www.instagram.com/reel/DUm44QxApeu/?stkn=MTM3dTk1bmFmaGxmcA=='
      },
      {
        label: 'View BAU Carousel Post 01',
        url: 'https://www.instagram.com/p/DUqSkNKAqrt/?stkn=NG12aTFvY3FtbThk'
      },
      {
        label: 'View BAU Carousel Post 02',
        url: 'https://www.instagram.com/p/DUNyWsIArXL/?stkn=MWM0djBjeXlpNnpqYw=='
      }
    ],
    relatedIds: ['proj-01', 'proj-03', 'proj-08']
  },
  {
    id: 'proj-03',
    slug: 'kinetix-run-advertising',
    title: 'GAS Milano India — #ArtOfItalianDenim, “Essensual” SS’25 & John Abraham Collab',
    showcaseTitle: 'GAS Milano India',
    category: 'Branding',
    year: '2025',
    client: 'GAS Milano India',
    industry: 'International Italian Denim & Fashion Label',
    readTime: '6 min read',
    featured: true,
    featuredOrder: 3,
    artType: 'sneaker-ad',
    excerpt:
      'Streamlined GAS Milano India’s brand storytelling under #ArtOfItalianDenim, revived the Underwear collection with John Abraham (“Iconic. Intimate. Italian.”), and coined “Essensual” for SS’25.',
    description:
      'To streamline GAS Milano India’s brand storytelling across styles and seasons, I united its Italian heritage and love for denim under one consistent strategic thread: #ArtOfItalianDenim. Under this umbrella, I developed four modular routes—Keep It Raw, Keep It Simple, Keep It Authentic, and Keep It Warm—and directed high-profile campaigns including the John Abraham Underwear collaboration and the SS’25 “Essensual” collection launch.',
    challenge:
      'GAS Milano needed a cohesive India communication direction that bridged global seasonal assets with local cultural resonance, while also reviving its underwear category with brand ambassador John Abraham and launching the SS’25 collection.',
    solution:
      '1) Created the 4-pillar #ArtOfItalianDenim architecture. 2) For the John Abraham underwear collaboration, extended the “Keep It Raw” route into “Iconic. Intimate. Italian.” and “Keep it raw, keep it real.” 3) For SS’25, fused “essential” and “sensual” into “Essensual”—capturing effortless summer essentials with Italian sensuality.',
    process: [
      {
        phase: '01 / Brand Thread',
        title: '#ArtOfItalianDenim & 4 Seasonal Routes',
        description:
          'Structured Keep It Raw (raw essence of denim), Keep It Simple (effortless everyday style), Keep It Authentic (Italian roots), and Keep It Warm (winter comfort).'
      },
      {
        phase: '02 / Celebrity Collab',
        title: 'John Abraham × GAS Underwear Revival',
        description:
          'Crafted “Iconic. Intimate. Italian.” and “Keep it raw, keep it real” to position the underwear collection with understated masculine confidence.'
      },
      {
        phase: '03 / SS’25 Direction',
        title: 'Coining “Essensual” for Summer ’25',
        description:
          'Blended “essential” + “sensual” to frame global SS’25 assets around feeling good in summer essentials.'
      },
      {
        phase: '04 / AW’25 Moto Documentary',
        title: 'Script to Screen: Shashank Sharma Moto Film',
        description:
          'Wrote the documentary script connecting motorcycle racer Shashank Sharma’s personal journey with the GAS Milano AW’25 Moto Collection.'
      }
    ],
    copySpecimens: [
      {
        context: 'John Abraham × GAS Underwear Collaboration',
        headline: 'Iconic. Intimate. Italian. — Keep It Raw, Keep It Real.',
        bodyCopy:
          'Continuing the “Keep It Raw” route, we stripped back the noise to celebrate second-skin comfort, authentic confidence, and unmistakable Italian craft with John Abraham.',
        rationale:
          'Three punchy alliterative words anchor the heritage while “Keep it raw, keep it real” links directly to the overarching denim architecture.'
      },
      {
        context: 'GAS Milano India SS’25 Collection Direction',
        headline: 'ESSENSUAL — Where Summer Essentials Meet Effortless Sensuality.',
        bodyCopy:
          'Summer dressing is about having your essentials and feeling good in them, with a little sensuality thrown in. Bringing “essential” and “sensual” together gave us “Essensual.”',
        rationale:
          'A single memorable portmanteau gives global SS’25 lookbook photography an editorial campaign point of view.'
      }
    ],
    gallery: [
      {
        id: 'gal-301',
        caption: '#ArtOfItalianDenim — 4-Route Brand Storytelling System',
        subcaption: 'Keep It Raw · Keep It Simple · Keep It Authentic · Keep It Warm',
        aspect: 'landscape',
        artType: 'sneaker-ad'
      },
      {
        id: 'gal-302',
        caption: 'John Abraham Collaboration — “Iconic. Intimate. Italian.”',
        subcaption: 'Reviving the GAS Underwear Collection under the Keep It Raw route',
        aspect: 'landscape',
        artType: 'editorial-spread'
      },
      {
        id: 'gal-303',
        caption: 'SS’25 “Essensual” & AW’25 Moto Documentary Script',
        subcaption: 'Seasonal campaign direction and racer Shashank Sharma documentary script',
        aspect: 'landscape',
        artType: 'monograph-type'
      }
    ],
    tools: [
      'Brand Storytelling Architecture',
      'Celebrity Campaign Copy',
      'Seasonal Collection Naming',
      'Documentary Scriptwriting',
      'Social Content Direction'
    ],
    results: [
      {
        metric: 'Brand Architecture',
        value: '4 Routes',
        label: '#ArtOfItalianDenim System',
        detail: 'Adaptable storytelling framework across all four fashion seasons'
      },
      {
        metric: 'Talent Collab',
        value: 'John Abraham',
        label: '“Iconic. Intimate. Italian.”',
        detail: 'High-impact revival of the GAS Milano Underwear line'
      },
      {
        metric: 'Script to Screen',
        value: 'AW’25 Moto',
        label: 'Racer Documentary Film Script',
        detail: 'Connected the Indian motorcycling community with GAS AW’25 Moto'
      }
    ],
    externalLinks: [
      {
        label: 'View John Abraham × GAS Post 01 (Instagram)',
        url: 'https://www.instagram.com/p/DO0WexeiDDv/?rpxt=MXRwanJmN24yZGsyeg=='
      },
      {
        label: 'View John Abraham × GAS Post 02 (Instagram)',
        url: 'https://www.instagram.com/p/DPETRyviNf7/?rpxt=a2NhcWFya3Z3aTd0'
      },
      {
        label: 'View GAS SS’25 “Essensual” Post (Instagram)',
        url: 'https://www.instagram.com/p/DJO86OIoAKf/?dlrf=MTZtZXJ5Zm5ncjYwbw=='
      },
      {
        label: 'Read AW’25 Moto Documentary Script (Google Docs)',
        url: 'https://docs.google.com/document/d/1uSKMbCehcqL820sXErt7hFYm_KjSfLYeL7B8eEwIbnI/edit?usp=sharing'
      }
    ],
    relatedIds: ['proj-01', 'proj-06', 'proj-07']
  },
  {
    id: 'proj-04',
    slug: 'meridian-architecture-brand-strategy',
    title: 'Tata CLiQ Fashion × All You Can 2026 — “The Drip Dept.” Grocery Pop-Up',
    showcaseTitle: 'The Drip Dept. Pop-Up',
    category: 'Packaging',
    year: '2026',
    client: 'Tata CLiQ Fashion × All You Can',
    industry: 'Experiential Retail Pop-Up & Festival Activation',
    readTime: '5 min read',
    featured: true,
    featuredOrder: 4,
    artType: 'architecture-strategy',
    excerpt:
      'Developed the world-building story, teaser rollout, vox pop reel script, and event recap for “The Drip Dept.”—Tata CLiQ Fashion’s grocery-store-themed fashion photo-op at All You Can 2026.',
    description:
      'For All You Can 2026, Tata CLiQ Fashion created “The Drip Dept.”—a playful grocery-store-themed photo-op and experiential space where fashion essentials were stocked like fresh supermarket aisles. I developed the narrative world around the space and planned the end-to-end content rollout, from Story Reminders, Teaser Posts, and Announcement Posts to the on-ground Vox Pop Reel script and post-event recap.',
    challenge:
      'Festival pop-ups can easily become passive photo booths unless anchored in a witty, cohesive concept that translates offline footfall into online social engagement before, during, and after the event.',
    solution:
      'Turned the supermarket metaphor into a complete editorial vocabulary (“Fresh Fits on Aisle 4”, “Stocking Up on Drip”). Planned a three-phase rollout—Pre-Event Teasers & Story Reminders, Live Event Vox Pop Reel Scripting, and Post-Event Recap Captions—making The Drip Dept. one of the most shared corners at All You Can 2026.',
    process: [
      {
        phase: '01 / Spatial Storytelling',
        title: 'Conceptualising “The Drip Dept.”',
        description:
          'Mapped grocery-store cultural references into fashion copy so every prop, shelf label, and teaser felt part of one world.'
      },
      {
        phase: '02 / Pre-Event Buzz',
        title: 'Teaser Post, Announcement & Story Reminders',
        description:
          'Built curiosity ahead of All You Can 2026 with visual references and countdown reminders driving festival-goers to the booth.'
      },
      {
        phase: '03 / On-Ground Script',
        title: 'Vox Pop Reel Script at the Festival',
        description:
          'Wrote fast-paced, interactive vox pop questions for creators and attendees visiting The Drip Dept.'
      },
      {
        phase: '04 / Post-Event Recap',
        title: 'Recap Reel & Community Highlights',
        description:
          'Synthesized the weekend’s best looks and crowd moments into a high-performing recap post.'
      }
    ],
    copySpecimens: [
      {
        context: 'Pop-Up World-Building & Announcement',
        headline: 'Welcome to The Drip Dept. — Fresh Fits, Zero Expiry Date.',
        bodyCopy:
          'Aisle 1: Impulse buys you won’t regret. Aisle 2: Main-character energy in bulk. Drop by Tata CLiQ Fashion’s grocery-themed photo-op at All You Can 2026.',
        rationale:
          'Plays on familiar supermarket signage to make fashion curation feel tactile, playful, and instantly Instagrammable.'
      },
      {
        context: 'On-Ground Vox Pop Reel Script',
        headline: '“What’s One Fashion Item Always on Your Grocery List?”',
        bodyCopy:
          'Host prompt: Hand the shopper a Drip Dept. basket and ask them to build their 3-item “emergency style cart” in 15 seconds.',
        rationale:
          'Gives on-ground videographers an easy, repeatable hook that sparks spontaneous, funny answers.'
      }
    ],
    gallery: [
      {
        id: 'gal-401',
        caption: 'The Drip Dept. — Grocery-Store-Themed Photo-Op Story & Rollout',
        subcaption: 'Tata CLiQ Fashion × All You Can 2026 Festival Activation',
        aspect: 'landscape',
        artType: 'architecture-strategy'
      },
      {
        id: 'gal-402',
        caption: 'Teaser Post, Story Reminder & Vox Pop Reel Script',
        subcaption: 'Pre-buzz announcements, on-ground vox pop prompts, and recap copy',
        aspect: 'landscape',
        artType: 'packaging-unboxing'
      }
    ],
    tools: [
      'Experiential Storytelling',
      'Event Rollout Strategy',
      'Vox Pop Scriptwriting',
      'Social Teasers & Recaps',
      'Pop-Up Copy Direction'
    ],
    results: [
      {
        metric: 'Rollout Phases',
        value: '3 Stages',
        label: 'Teaser · Live Vox Pop · Recap',
        detail: 'Complete narrative arc from pre-festival intrigue to post-event reel'
      },
      {
        metric: 'Activation Theme',
        value: 'Drip Dept.',
        label: 'Fashion Supermarket Concept',
        detail: 'Bridged physical pop-up props with digital social storytelling'
      },
      {
        metric: 'Deliverables',
        value: '5 Formats',
        label: 'Stories, Teasers, Announcements, Vox Pop & Recap',
        detail: 'Published across Tata CLiQ Fashion & All You Can social handles'
      }
    ],
    externalLinks: [
      {
        label: 'View Event Recap Post on Instagram',
        url: 'https://www.instagram.com/p/DaNfHPNApPL/?dlrf=MW15OHBpenVlNXpjdw=='
      },
      {
        label: 'View Teaser & Announcement Post on Instagram',
        url: 'https://www.instagram.com/p/DaBHUFNghHU/?dlrf=MWpwZjhxNGZ2dWdrcA=='
      }
    ],
    relatedIds: ['proj-01', 'proj-05', 'proj-02']
  },
  {
    id: 'proj-05',
    slug: 'veda-earth-packaging-system',
    title: 'Tata CLiQ Fashion × Miyo Dessert Bar — “Scoop, Spill & Win” Activation',
    showcaseTitle: 'Miyo Dessert Bar Collab',
    category: 'Packaging',
    year: '2025',
    client: 'Tata CLiQ Fashion × Miyo Dessert Bar',
    industry: 'Experiential F&B × Fashion Brand Collaboration',
    readTime: '5 min read',
    featured: false,
    artType: 'apothecary-packaging',
    excerpt:
      'Brought the Big CLiQ Sale’s “No Limits. No Rules.” theme into Miyo Dessert Bar through unlimited gelato toppings, a bowl-weight challenge, “Scoop, Spill & Win”, and “Never Have I Ever: Sale Edition.”',
    description:
      'I developed the concept and content rollout for Tata CLiQ Fashion × Miyo Dessert Bar, bringing the Big CLiQ Sale’s “No Limits. No Rules.” theme to life through Miyo’s signature unlimited toppings. Both brands celebrate choice and the joy of adding “just one more”—making an in-store gelato bar the ultimate physical metaphor for an overflowing sale wishlist.',
    challenge:
      'How do you make an online fashion sale tangible inside a physical dessert bar without feeling like a forced sponsorship?',
    solution:
      'I started with relatable sale shopping habits—impulse buys, overflowing wishlists, and the urge to add just one more—and turned them into interactive in-store game formats and cup/bowl activations: 1) A Bowl-Weight Challenge & question prompt to win Tata CLiQ Fashion vouchers, 2) “Scoop, Spill & Win” where shoppers spill their shopping secrets, and 3) “Never Have I Ever (Sale Edition)” where participants take a bite of gelato for every shopping habit they’re guilty of.',
    process: [
      {
        phase: '01 / Brand Synergy',
        title: 'Unlimited Deals × Unlimited Toppings',
        description:
          'Connected Tata CLiQ Fashion’s “No Limits. No Rules.” directly to Miyo Dessert Bar’s unlimited toppings ritual.'
      },
      {
        phase: '02 / In-Store Mechanics',
        title: 'Bowl-Weight Challenge & Voucher Wins',
        description:
          'Designed simple, joyful participation rules so every customer ordering a bowl could play and win shopping vouchers.'
      },
      {
        phase: '03 / Content Formats',
        title: '“Scoop, Spill & Win” & “Never Have I Ever”',
        description:
          'Turned guilty-pleasure shopping confessions into two social-first video IP formats filmed live at Miyo.'
      }
    ],
    copySpecimens: [
      {
        context: 'Content Format 01 — Interactive Vox Pop',
        headline: 'Scoop, Spill & Win: Spill Your Shopping Secrets for Gift Vouchers.',
        bodyCopy:
          'From 3 AM cart additions to “I only bought it because it was 60% off”—spill your most relatable shopping confession over a scoop of Miyo gelato to win Tata CLiQ Fashion vouchers.',
        rationale:
          'Lowers the barrier to on-camera participation by asking lighthearted, universally relatable questions.'
      },
      {
        context: 'Content Format 02 — Social Game Reel',
        headline: 'Never Have I Ever (Sale Edition): Take a Bite for Every Guilty Habit.',
        bodyCopy:
          '“Never have I ever added 14 items to my wishlist just to feel something.” Take a spoonful of gelato for every shopping habit you’re guilty of!',
        rationale:
          'Integrates the product (Miyo gelato) directly into the game mechanic while spotlighting sale shopping behavior.'
      }
    ],
    gallery: [
      {
        id: 'gal-501',
        caption: 'Tata CLiQ Fashion × Miyo Dessert Bar — Collaboration Concept',
        subcaption: '“No Limits. No Rules.” meets unlimited gelato toppings',
        aspect: 'landscape',
        artType: 'apothecary-packaging'
      },
      {
        id: 'gal-502',
        caption: 'Scoop, Spill & Win + Never Have I Ever (Sale Edition)',
        subcaption: 'Interactive in-store game formats and voucher giveaway rollout',
        aspect: 'landscape',
        artType: 'packaging-unboxing'
      }
    ],
    tools: [
      'Brand Collaboration Ideation',
      'Experiential Activation Design',
      'Game Format Scripting',
      'Social Content Rollout'
    ],
    results: [
      {
        metric: 'Interactive Formats',
        value: '3 Games',
        label: 'Bowl-Weight · Scoop & Spill · Never Have I Ever',
        detail: 'High in-store participation and organic social reel content'
      },
      {
        metric: 'Brand Fit',
        value: '100%',
        label: 'Choice & The Joy of Adding More',
        detail: 'Seamlessly united fashion wishlist culture with custom dessert toppings'
      }
    ],
    externalLinks: [
      {
        label: 'Watch Tata CLiQ × Miyo Dessert Bar Reel (Instagram)',
        url: 'https://www.instagram.com/p/DYpPxhCgmc-/?dlrf=MThvOHdlaDZyNWM1Zw=='
      }
    ],
    relatedIds: ['proj-01', 'proj-04', 'proj-02']
  },
  {
    id: 'proj-06',
    slug: 'solace-wealth-ux-writing',
    title: 'GAS Milano AW’25 Moto Collection — “Script to Screen” Racer Documentary',
    showcaseTitle: 'GAS Moto Documentary',
    category: 'Typography',
    year: '2025',
    client: 'GAS Milano India',
    industry: 'Documentary Film Scripting & Motorsport Storytelling',
    readTime: '6 min read',
    featured: false,
    artType: 'monograph-type',
    excerpt:
      'Wrote the AW’25 Moto Collection documentary script for GAS Milano India—shaping motorcycle racer Shashank Sharma’s real-life journey into a cinematic brand story.',
    description:
      'For the launch of the GAS Milano AW’25 Moto Collection, the brief was to reach out to authentic motorcycle racers and create a documentary that connected the Indian motorcycling community with GAS Milano’s motorsport heritage. Taking extensive background material on professional racer Shashank Sharma’s life, I wrote the complete documentary script—shaping his discipline, crashes, and pursuit of speed into a narrative for the brand.',
    challenge:
      'Motorsport communities immediately spot inauthentic fashion commercials. The script needed to honor Shashank Sharma’s real voice and racing journey first, allowing the AW’25 Moto Collection to live naturally within his world.',
    solution:
      'Structured the script around the quiet tension before the visor drops—contrasting raw track telemetry and personal perseverance with the rugged craftsmanship of the GAS AW’25 Moto Collection.',
    process: [
      {
        phase: '01 / Biographical Research',
        title: 'Studying Shashank Sharma’s Racing Journey',
        description:
          'Synthesized interview transcripts and career milestones into a three-act emotional arc.'
      },
      {
        phase: '02 / Voiceover & Visual Pacing',
        title: 'Writing for Engine Note & Silence',
        description:
          'Balanced spoken monologue with atmospheric track visuals, supers, and B-roll cues.'
      },
      {
        phase: '03 / Brand Integration',
        title: 'Connecting Motorsport Grit with AW’25 Moto',
        description:
          'Wove the collection’s protective silhouettes and Italian moto heritage naturally into the closing act.'
      }
    ],
    copySpecimens: [
      {
        context: 'Documentary Opening Voiceover & Super Direction',
        headline: 'Before the Track Hears the Engine, You Hear Your Own Breath.',
        bodyCopy:
          'Shashank Sharma’s story isn’t just measured in lap times—it’s measured in every return to the tarmac. Scripted for GAS Milano India’s AW’25 Moto Collection.',
        rationale:
          'Grounds the film in human vulnerability and grit before introducing high-speed racing footage.'
      }
    ],
    gallery: [
      {
        id: 'gal-601',
        caption: 'Script to Screen — GAS Milano AW’25 Moto Collection Documentary',
        subcaption: 'Featuring motorcycle racer Shashank Sharma',
        aspect: 'landscape',
        artType: 'monograph-type'
      },
      {
        id: 'gal-602',
        caption: 'Timecoded Voiceover, Visual Cues & On-Screen Supers',
        subcaption: 'Full production script linking motorsport culture with Italian fashion',
        aspect: 'landscape',
        artType: 'editorial-spread'
      }
    ],
    tools: [
      'Documentary Scriptwriting',
      'Biographical Storytelling',
      'Voiceover & B-Roll Direction',
      'On-Screen Supers'
    ],
    results: [
      {
        metric: 'Format',
        value: 'Docu-Film',
        label: 'Script to Screen Production',
        detail: 'Full narrative script for GAS Milano AW’25 Moto Collection'
      },
      {
        metric: 'Protagonist',
        value: 'Shashank S.',
        label: 'Authentic Motorsport Community',
        detail: 'Built genuine credibility with Indian motorcycle enthusiasts'
      }
    ],
    externalLinks: [
      {
        label: 'Read Full Documentary Script on Google Docs',
        url: 'https://docs.google.com/document/d/1uSKMbCehcqL820sXErt7hFYm_KjSfLYeL7B8eEwIbnI/edit?usp=sharing'
      }
    ],
    relatedIds: ['proj-03', 'proj-01', 'proj-07']
  },
  {
    id: 'proj-07',
    slug: 'atelier-varanasi-editorial-monograph',
    title: 'Ed-a-Mamma — SS’26 “Summer Stories”, Store Launches & Parent-Kid IPs',
    showcaseTitle: 'SS’26 Summer Stories',
    category: 'Illustration',
    year: '2026',
    client: 'Ed-a-Mamma (Conscious Kidswear)',
    industry: 'Kidswear, Nature & Family Lifestyle',
    readTime: '5 min read',
    featured: false,
    artType: 'botanical-illustration',
    excerpt:
      'Set the narrative for the SS’26 “Summer Stories” collection, conceptualised Little Birdie store launch creatives across cities, and created interactive parent-kid social IPs.',
    description:
      'The SS’26 kidswear collection centres on children enjoying a carefree summer in their own backyards—planting trees, drawing, and playing together. To capture that sense of play, freedom, and the joy of making the most of summer at home, I developed the overarching campaign direction “Summer Stories.” Additionally, drawing from elements of the earth, a child’s imagination, and brand characters like Little Birdie, I conceptualised store launch creatives across cities and recurring interactive IPs for parents and kids.',
    challenge:
      'Kidswear communication must speak simultaneously to parents who value conscious, earth-friendly clothing and to children’s sense of wonder—across seasonal lookbooks, new retail store openings, and daily Instagram engagement.',
    solution:
      '1) Unified the SS’26 season under “Summer Stories”, turning every backyard moment into a storybook chapter. 2) Used the brand mascot Little Birdie and earth elements to announce store launches across cities. 3) Created recurring storytelling IPs and playful question-based formats for parents to enjoy with their kids.',
    process: [
      {
        phase: '01 / Seasonal Narrative',
        title: 'SS’26 “Summer Stories” Campaign',
        description:
          'Framed backyard summer play—planting saplings, sketching, daydreaming—as an anthology of little childhood stories.'
      },
      {
        phase: '02 / Retail Buzz',
        title: 'Little Birdie City Store Launch Creatives',
        description:
          'Conceptualised city-specific store opening announcements guided by Little Birdie and nature motifs.'
      },
      {
        phase: '03 / Engagement IPs',
        title: 'Interactive Parent & Child Formats',
        description:
          'Built recurring carousel IPs and conversation starters that invite parents and kids to co-create stories.'
      }
    ],
    copySpecimens: [
      {
        context: 'SS’26 Collection Campaign Direction',
        headline: 'Summer Stories — Every Backyard Moment Is a Story Waiting to Be Told.',
        bodyCopy:
          'Whether kids are planting trees, drawing on the porch, or inventing games in the garden, each moment becomes a story—giving us room to capture the whole carefree season under one roof.',
        rationale:
          'Warm, imaginative, and flexible enough to house dozens of product drops and reel concepts.'
      },
      {
        context: 'Store Launch & Interactive IP Concept',
        headline: 'A Little Birdie Told Us… A New Store Just Landed in Your City!',
        bodyCopy:
          'Drawing from elements of the earth and a child’s imagination, Little Birdie leads families straight to our newest conscious kidswear space.',
        rationale:
          'Uses a beloved brand character to turn retail store announcements into storybook teasers.'
      }
    ],
    gallery: [
      {
        id: 'gal-701',
        caption: 'SS’26 Collection Narrative — “Summer Stories”',
        subcaption: 'Carefree backyard summer play, nature, and imagination',
        aspect: 'landscape',
        artType: 'botanical-illustration'
      },
      {
        id: 'gal-702',
        caption: 'Little Birdie Store Launch Creatives & Interactive Parent-Kid IPs',
        subcaption: 'City store launch buzz and recurring question-based social formats',
        aspect: 'landscape',
        artType: 'editorial-spread'
      }
    ],
    tools: [
      'Collection Naming & Narrative',
      'Store Launch Conceptualisation',
      'Character-Led Storytelling',
      'Interactive Social IPs'
    ],
    results: [
      {
        metric: 'Season Umbrella',
        value: 'SS’26',
        label: '“Summer Stories” Direction',
        detail: 'Cohesive storytelling across lookbooks, reels, and carousels'
      },
      {
        metric: 'Retail Expansion',
        value: 'Multi-City',
        label: 'Little Birdie Store Launch Buzz',
        detail: 'Distinctive character-led announcements for new physical stores'
      }
    ],
    externalLinks: [
      {
        label: 'View SS’26 “Summer Stories” Post on Instagram',
        url: 'https://www.instagram.com/p/DWjSGLxiJZQ/?srtk=NWJ6eG5vNXEzYjY3'
      }
    ],
    relatedIds: ['proj-02', 'proj-08', 'proj-03']
  },
  {
    id: 'proj-08',
    slug: 'noor-literary-festival-illustrations',
    title: 'Cultural Moments, Topical Campaigns & Virat Kohli Collab Concepts',
    showcaseTitle: 'Topical & Virat Kohli Collab',
    category: 'Social Media',
    year: '2025',
    client: 'Tata CLiQ Fashion & Marquee Brand Partners',
    industry: 'Topical Social Media, Celebrity Collabs & BAU Systems',
    readTime: '4 min read',
    featured: false,
    artType: 'luxury-ev',
    excerpt:
      'High-shareability topical campaigns across Skincare Day, Father’s Day, Raksha Bandhan, Friendship Day, Lipstick Day, and BAU collaboration concepts featuring Virat Kohli.',
    description:
      'Great BAU (Business-As-Usual) and topical content is built on one simple test: “Would I send this to my bestie?” Across Tata CLiQ Fashion and marquee lifestyle labels, I conceptualised and wrote topical campaigns for Skincare Day, Father’s Day, Raksha Bandhan, Friendship Day, and Lipstick Day, alongside high-impact BAU collaboration concepts featuring Virat Kohli.',
    challenge:
      'Topical calendar days are often the most cluttered moments on Instagram. Brands risk posting generic greeting cards that audiences scroll past without a second glance.',
    solution:
      'Replaced generic topical wishes with sharp observational humor, fashion-first visual hooks, and relatable sibling/friend/self-care truths—while crafting punchy, athlete-authentic copy for a Virat Kohli collaboration reel.',
    process: [
      {
        phase: '01 / Cultural Observation',
        title: 'Finding the “Send to Bestie” Insight',
        description:
          'Identified the unspoken human truth behind Raksha Bandhan sibling negotiations, Skincare Day routines, and Lipstick Day rituals.'
      },
      {
        phase: '02 / Visual + Copy Pairing',
        title: 'Copy That Fits the Visual',
        description:
          'Collaborated closely with designers so the on-graphic headline and carousel progression delivered a clean punchline.'
      },
      {
        phase: '03 / Celebrity BAU',
        title: 'Virat Kohli Collaboration Concept',
        description:
          'Developed high-energy BAU reel and static concepts leveraging Virat Kohli’s unmistakable charisma.'
      }
    ],
    copySpecimens: [
      {
        context: 'Topical Calendar Series (Skincare Day · Father’s Day · Raksha Bandhan · Friendship Day · Lipstick Day)',
        headline: 'Built on the Benchmark: “Would I Send This to My Bestie?”',
        bodyCopy:
          'From sibling negotiations on Raksha Bandhan to unapologetic self-care on Skincare Day and Lipstick Day—turning calendar moments into save-worthy fashion stories.',
        rationale:
          'Prioritizes DM shares and saves—the two strongest signals of cultural resonance on Instagram.'
      }
    ],
    gallery: [
      {
        id: 'gal-801',
        caption: 'Virat Kohli Collaboration & BAU Content Concepts',
        subcaption: 'High-impact celebrity reel and carousel ideation',
        aspect: 'landscape',
        artType: 'luxury-ev'
      },
      {
        id: 'gal-802',
        caption: 'Topical Series: Skincare Day, Father’s Day, Raksha Bandhan & Lipstick Day',
        subcaption: 'Culture-first social storytelling across marquee moments',
        aspect: 'landscape',
        artType: 'coffee-social'
      }
    ],
    tools: [
      'Topical Ideation',
      'Celebrity Collab Copy',
      'Carousel & Reel Concepts',
      'Social Captions & Broadcasts'
    ],
    results: [
      {
        metric: 'Topical Campaigns',
        value: '5+ Moments',
        label: 'Skincare · Father’s · Rakhi · Friendship · Lipstick Day',
        detail: 'Consistent high-shareability creative across the cultural calendar'
      },
      {
        metric: 'Celebrity Collab',
        value: 'Virat Kohli',
        label: 'BAU Collaboration Concept',
        detail: 'Live reel collaboration published on Instagram'
      }
    ],
    externalLinks: [
      {
        label: 'Watch Virat Kohli Collab Reel (Instagram)',
        url: 'https://www.instagram.com/p/DHs7trsSrck/?obrf=a3N1M3c5M2loaHhs'
      },
      {
        label: 'View Topical Campaign Post 01 (Instagram)',
        url: 'https://www.instagram.com/p/DahrVwbkyZZ/?cplk=aXpxanZhZXBhcHJi'
      },
      {
        label: 'View Topical Campaign Post 02 (Instagram)',
        url: 'https://www.instagram.com/p/DZ1MOzXAmM8/?vrfl=MXY5N3E3cWFkd3pycg=='
      },
      {
        label: 'View Topical Campaign Post 03 (Instagram)',
        url: 'https://www.instagram.com/p/Dcjmeytin7p/?vrfl=MmtmejI5NmkzcTBm'
      }
    ],
    relatedIds: ['proj-02', 'proj-01', 'proj-07']
  },
  {
    id: 'proj-09',
    slug: 'lumina-gt-launch-campaign',
    title: 'Omnichannel CRM, WhatsApp, App Copy & AOP Pitch Deck Architecture',
    showcaseTitle: 'CRM, App & AOP Decks',
    category: 'UI/UX',
    year: '2025',
    client: 'Spek! Digital & Fashion E-Commerce Brands',
    industry: 'CRM, App Microcopy, Dark Ads & Strategic Pitch Decks',
    readTime: '5 min read',
    featured: false,
    artType: 'fintech-ui',
    excerpt:
      'End-to-end digital copywriting toolkit spanning SMS, WhatsApp broadcasts, emailers, dark ads, Online Reputation Management (ORM), and Annual Operating Plan (AOP) pitch decks.',
    description:
      'Beyond hero Instagram campaigns, a brand’s daily commercial engine runs on high-converting microcopy and strategic decks. At Spek! Digital Marketing Agency, my toolkit spans SMS alerts, WhatsApp broadcast messages, retention emailers, performance dark ad copy, Online Reputation Management (ORM), and full Annual Operating Plan (AOP) & new-business pitch decks.',
    challenge:
      'Performance channels (SMS, WhatsApp, Email, Dark Ads) have strict character limits and seconds to earn a tap, while AOP pitch decks require clear strategic narrative to win annual brand mandates.',
    solution:
      'Built modular copy frameworks that keep brand voice intact even in a 90-character push notification or dark ad headline—while structuring persuasive, insight-led pitch and AOP decks backed by cultural research and AI-assisted creative exploration.',
    process: [
      {
        phase: '01 / Retention & CRM',
        title: 'SMS, WhatsApp Broadcasts & Emailers',
        description:
          'Crafted high-open-rate subject lines and conversational WhatsApp drops that feel like a tip from a stylish friend.'
      },
      {
        phase: '02 / Performance Copy',
        title: 'Dark Ads & App Banner Microcopy',
        description:
          'Wrote thumb-stopping hooks and clear CTAs tailored for paid social acquisition and app conversion.'
      },
      {
        phase: '03 / Strategic Decks',
        title: 'Pitch Decks & Annual Operating Plans (AOP)',
        description:
          'Translated brand audits and cultural trends into winning agency pitch narratives and year-long content roadmaps.'
      }
    ],
    copySpecimens: [
      {
        context: 'Omnichannel Toolkit Philosophy',
        headline: 'From 60-Character Push Alerts to 60-Slide Annual Operating Plans.',
        bodyCopy:
          'Whether it’s an urgent P1 Sale WhatsApp broadcast, an empathetic ORM response, or an AOP deck for a national fashion label, every touchpoint speaks with the same human clarity.',
        rationale:
          'Bridges creative storytelling with measurable performance marketing.'
      }
    ],
    gallery: [
      {
        id: 'gal-901',
        caption: 'CRM, WhatsApp, Emailer & Dark Ad Copy Systems',
        subcaption: 'High-conversion microcopy across mobile and retention touchpoints',
        aspect: 'landscape',
        artType: 'fintech-ui'
      },
      {
        id: 'gal-902',
        caption: 'Pitch Decks, AOP Roadmaps & Shoot Look Curation',
        subcaption: 'Strategic agency decks and end-to-end shoot conceptualisation',
        aspect: 'landscape',
        artType: 'architecture-strategy'
      }
    ],
    tools: [
      'SMS, WhatsApp & Emailer Copy',
      'Performance Dark Ads',
      'Pitch & AOP Decks',
      'Online Reputation Management (ORM)',
      'AI Creative Exploration'
    ],
    results: [
      {
        metric: 'Toolkit Span',
        value: '11 Pillars',
        label: 'Full-Funnel Creative & Strategy',
        detail: 'Covers BAU reels, P1 sales, CRM copy, ORM, styling, and AOP decks'
      },
      {
        metric: 'Agency Role',
        value: 'Spek! Digital',
        label: 'Creative Strategist',
        detail: 'Leading campaign ideation and communication across fashion accounts'
      }
    ],
    externalLinks: [
      {
        label: 'View Full Toolkit in Canva Portfolio',
        url: 'https://www.canva.com/design/DAGv9YTo4Wc/eO_RAzg15-K4vmuy1iWtLg/view#5'
      }
    ],
    relatedIds: ['proj-01', 'proj-02', 'proj-03']
  }
];

export const BOOKS_DATA: Book[] = [
  {
    id: 'book-happy-breakup',
    title: 'Happy With My Heartbreak',
    subtitle:
      'A zine containing 13 metrical pieces tracing the journey from falling in love to being happily heartbroken once you’ve moved on.',
    publishYear: 'July 2024',
    isbn: 'Amazon India · Print & Kindle Zine',
    pages: 64,
    format: 'Illustrated Zine · 13 Metrical Pieces',
    readersCount: 'Published July 2024',
    coverTheme: 'happy-breakup',
    synopsis:
      'HAPPY WITH MY HEARTBREAK is a zine containing 13 metrical pieces. I don’t quite want to call them poems or songs. Together, they trace the emotional arc from falling headfirst in love to the quiet, liberating moment you realise you are happily heartbroken once you’ve moved on.',
    keyTakeaways: [
      '13 original metrical pieces—living in the lyrical space between poetry and song.',
      'Traces the complete emotional timeline from first infatuation to post-heartbreak peace.',
      'Written with the same honest, intimate voice that defines Tanishq’s personal notebooks.'
    ],
    sampleChapterTitle: 'Piece VII — The Morning the Weight Lifted',
    sampleExcerpt: [
      'People talk about heartbreak as if it is only a demolition. They rarely write about the morning you wake up and realize the silence in the room is no longer heavy—it is simply yours again.',
      'These thirteen metrical pieces are not quite poems and not quite songs. They are the notes left behind when you stop mourning an ending and start celebrating the person who survived it.',
      'To be happy with your heartbreak is not to pretend it didn’t hurt; it is to love the clarity that arrived after the storm cleared.'
    ],
    amazonUrl: 'https://amzn.in/d/0e6w7nV6',
    endorsement: {
      quote:
        'Honest, rhythmic, and deeply relatable—like reading a late-night voice note from your wisest friend.',
      reviewer: 'Reader Appreciation · Canva Portfolio Archive'
    }
  },
  {
    id: 'book-creative-mindset',
    title: 'Everythingship!',
    subtitle:
      'A coming-of-age queer romance novel about self-acceptance, family secrets, and falling in love.',
    publishYear: 'January 2020',
    isbn: 'Amazon India · Coming-of-Age Novel',
    pages: 210,
    format: 'Paperback & Kindle Edition',
    readersCount: 'Published January 2020',
    coverTheme: 'creative-mindset',
    synopsis:
      'EVERYTHINGSHIP! is a coming-of-age queer romance novel that follows its protagonist as he learns to accept himself, uncovers long-held family secrets, and confronts his inner demons while falling in love.',
    keyTakeaways: [
      'A heartfelt coming-of-age queer romance exploring identity, vulnerability, and first love.',
      'Weaves family mystery and inner reckoning with warmth and emotional honesty.',
      'Debut novel published in January 2020 while studying Business Administration.'
    ],
    sampleChapterTitle: 'Chapter I — Naming What We Are',
    sampleExcerpt: [
      'There is a word for friends, and there is a word for strangers, and there are a hundred borrowed labels for everything in between. But when you are nineteen and still learning how to say your own truth out loud, every label feels one size too small.',
      'So we called it an Everythingship—because it held our secrets, our fear of being seen, and the quiet relief of finally not having to pretend.',
      'Growing up isn’t a single cinematic revelation; it’s a hundred small acts of courage when nobody is watching.'
    ],
    amazonUrl: 'https://amzn.in/d/0eeQdLPo',
    endorsement: {
      quote:
        'A tender, courageous coming-of-age story that captures the messy beauty of young love and self-discovery.',
      reviewer: 'Reader Reviews · Amazon India'
    }
  }
];

export const SERVICES_DATA: ServicePackage[] = [
  {
    id: 'srv-01',
    number: '01',
    title: '360° Campaign Ideation & P1 Sale Direction',
    subtitle: 'Hero, Hub & Hygiene campaign concepts that move culture and commerce.',
    description:
      'End-to-end campaign architecture modeled on flagship launches like Tata CLiQ Fashion’s Big CLiQ Sale (“Everything Is On Loop”) and Cupid Sale (“LOVE IT.”)—from decoding the brief to teaser scripts and binding visual direction.',
    deliverables: [
      'Core Campaign Idea, Manifesto & Tone-of-Voice Pillars',
      'Hero, Hub & Hygiene Content Rollout Strategy',
      'Social-First Teaser Scripts & Launch Reel Concepts',
      'Binding Visual Language & Moodboard Direction',
      'Brand Collaboration & Giveaway Mechanics'
    ],
    timeline: '2 – 4 Weeks',
    investmentRange: 'Custom Campaign Scope',
    idealFor: 'Fashion, e-commerce, and lifestyle brands launching flagship seasonal or sale campaigns.',
    projectTypeKey: 'Advertising & Campaign Copy'
  },
  {
    id: 'srv-02',
    number: '02',
    title: 'Brand Storytelling & Seasonal Collection Narratives',
    subtitle: 'Cohesive storytelling threads across styles, seasons, and ambassadors.',
    description:
      'Strategic verbal direction for fashion and lifestyle collections—like GAS Milano India’s #ArtOfItalianDenim routes, “Essensual” SS’25, and Ed-a-Mamma’s “Summer Stories” SS’26.',
    deliverables: [
      'Overarching Brand Storytelling Thread & Seasonal Routes',
      'Collection Naming & Lookbook Narrative Copy',
      'Celebrity & Influencer Collaboration Direction',
      'City Store Launch Creative Concepts',
      'Cross-Channel Tone Consistency Guide'
    ],
    timeline: '2 – 3 Weeks',
    investmentRange: 'Project or Seasonal Retainer',
    idealFor: 'Apparel, denim, kidswear, and D2C brands shaping seasonal collection drops.',
    projectTypeKey: 'Brand Storytelling & Strategy'
  },
  {
    id: 'srv-03',
    number: '03',
    title: 'Social-First BAU Concepts, Reels & Recurring IPs',
    subtitle: 'Carousels, statics, shoot-based reels, and topical moments built to be shared.',
    description:
      'High-engagement social content crafted around the benchmark “Would I send this to my bestie?”—sale messaging minus the hard sell, cultural calendar moments, and interactive IPs.',
    deliverables: [
      'BAU Content Concepts (Carousels, Statics, Shoot & Edit Reels)',
      'Influencer Reel Scripts, Vox Pops & On-Screen Supers',
      'Topical Campaign Ideation (Cultural & Festive Moments)',
      'Social Media Captions & Broadcast Channel Messages',
      'Online Reputation Management (ORM) Voice Playbook'
    ],
    timeline: 'Monthly Retainer or Sprint',
    investmentRange: 'Monthly Retainer',
    idealFor: 'Consumer brands seeking scroll-stopping Instagram Reels and save-worthy carousels.',
    projectTypeKey: 'Social Media & Content Strategy'
  },
  {
    id: 'srv-04',
    number: '04',
    title: 'Experiential Pop-Ups & Brand Collaborations',
    subtitle: 'World-building stories and on-ground activations that bridge offline and online.',
    description:
      'Concept development and rollout planning for physical pop-ups and cross-brand collaborations—like Tata CLiQ Fashion × All You Can (“The Drip Dept.”) and Miyo Dessert Bar (“Scoop, Spill & Win”).',
    deliverables: [
      'Pop-Up / Collaboration Concept & Naming',
      'In-Store Game Formats & Customer Activation Mechanics',
      'Pre-Event Teasers, Story Reminders & Announcement Copy',
      'Live Event Vox Pop Scripts & Recap Reel Direction',
      'On-Ground Signage & Prop Copy'
    ],
    timeline: '2 – 3 Weeks',
    investmentRange: 'Custom Activation Scope',
    idealFor: 'Brands activating at festivals, opening retail stores, or partnering on cross-category collabs.',
    projectTypeKey: 'Packaging & Product Copy'
  },
  {
    id: 'srv-05',
    number: '05',
    title: 'Documentary Scripts, Shoot Styling & Visual Direction',
    subtitle: 'From Script-to-Screen brand films to shoot look curation.',
    description:
      'Narrative scriptwriting and visual conceptualisation—combining documentary storytelling (like the GAS Milano AW’25 Moto film) with fashion communication and shoot styling.',
    deliverables: [
      'Documentary & Brand Film Scriptwriting (Voiceover + Supers)',
      'Moodboards & Cohesive Visual Direction',
      'Styling, Conceptualising & Look Curation for Shoots',
      'Talent & Creator Interview Prompts',
      'AI-Assisted Visual & Concept Exploration'
    ],
    timeline: '1 – 3 Weeks',
    investmentRange: 'Custom Production Scope',
    idealFor: 'Production houses, fashion labels, and agencies shooting brand documentaries or lookbooks.',
    projectTypeKey: 'Advertising & Campaign Copy'
  },
  {
    id: 'srv-06',
    number: '06',
    title: 'CRM, App Copy, Pitch Decks & AOP Roadmaps',
    subtitle: 'SMS, WhatsApp, Emailers, Dark Ads, and winning Annual Operating Plan decks.',
    description:
      'Full-funnel commercial writing that converts across CRM touchpoints and wins boardroom mandates through sharp Pitch Decks and Annual Operating Plan (AOP) presentations.',
    deliverables: [
      'SMS, WhatsApp Broadcasts & Retention Emailers',
      'Performance Dark Ad Copy & App Banner Microcopy',
      'New-Business Pitch Decks & Annual Operating Plan (AOP) Decks',
      'Trend Research & Competitive Cultural Audits',
      'Channel-by-Channel Content Calendar Architecture'
    ],
    timeline: '1 – 3 Weeks',
    investmentRange: 'Project or Retainer',
    idealFor: 'Agencies and e-commerce growth teams scaling CRM conversion and annual brand plans.',
    projectTypeKey: 'Website & UI/UX Copy'
  }
];

export const RESUME_DATA = {
  summary:
    'Copywriter, Creative Strategist, and Published Author trained in Fashion Communication at Pearl Academy, Mumbai. Currently crafting 360° sale campaigns, brand storytelling systems, social-first IPs, documentary scripts, and experiential collaborations at Spek! Digital Marketing Agency for marquee brands including Tata CLiQ Fashion, GAS Milano India, and Ed-a-Mamma.',
  experience: [
    {
      role: 'Creative Strategist',
      company: 'Spek! Digital Marketing Agency',
      period: 'August 2024 — Present',
      location: 'Mumbai, India',
      highlights: [
        'Lead 360° campaign ideation and communication direction for Tata CLiQ Fashion’s flagship P1 Sales including Big CLiQ Sale (“Everything Is On Loop”) and Cupid Sale (“LOVE IT.”).',
        'Developed brand collaborations and experiential pop-up rollouts including Tata CLiQ Fashion × Miyo Dessert Bar (“Scoop, Spill & Win”) and All You Can 2026 (“The Drip Dept.”).',
        'Streamlined GAS Milano India’s storytelling under #ArtOfItalianDenim, wrote the John Abraham Underwear collaboration (“Iconic. Intimate. Italian.”), coined “Essensual” for SS’25, and scripted the AW’25 Moto Collection documentary on racer Shashank Sharma.',
        'Created the SS’26 “Summer Stories” narrative, Little Birdie store launch creatives, and interactive parent-kid IPs for Ed-a-Mamma, plus BAU concepts including a Virat Kohli collaboration.',
        'Execute BAU content concepts, SMS/WhatsApp/Emailer/Dark ad copy, influencer reel scripts, ORM, pitch decks, and Annual Operating Plan (AOP) decks.'
      ]
    },
    {
      role: 'Social Media Executive Intern',
      company: 'Sandhya Shah Designer Label',
      period: 'May 2024 — June 2024',
      location: 'Mumbai, India',
      highlights: [
        'Planned and executed social media content calendars, lookbook storytelling, and luxury designer label captions across digital touchpoints.',
        'Collaborated on shoot styling, visual moodboards, and reel concepts showcasing couture craftsmanship.'
      ]
    },
    {
      role: 'Celebrity Styling & Content Curation (Freelance)',
      company: 'With Celebrity Stylist Anisha Gandhi',
      period: 'April 2024',
      location: 'Mumbai, India',
      highlights: [
        'Assisted in celebrity styling, look curation, and behind-the-scenes social content creation for high-profile editorial and red-carpet appearances.'
      ]
    },
    {
      role: 'FDCI Intern — Social Media Content Creation',
      company: 'Lakmé Fashion Week (FDCI × LFW)',
      period: 'March 2024',
      location: 'Mumbai, India',
      highlights: [
        'Created real-time runway coverage, backstage reels, designer spotlights, and social media copy during Lakmé Fashion Week.'
      ]
    },
    {
      role: 'London Fashion Week Intern (Model Casting & Event Management)',
      company: 'Rocky Star Label',
      period: 'September 2023',
      location: 'London, UK',
      highlights: [
        'Coordinated model casting, backstage lineups, and show-day event management for designer label Rocky Star at London Fashion Week.'
      ]
    }
  ],
  education: [
    {
      degree: 'Post Graduate Diploma in Fashion Communication',
      institution: 'Pearl Academy, Mumbai',
      year: '2022 — 2024',
      detail: 'Specialised in Fashion Copywriting, Brand Storytelling, Styling, and Visual Communication.'
    },
    {
      degree: 'Bachelor of Business Administration (BBA)',
      institution: 'IMED, Bharati Vidyapeeth University, Pune',
      year: '2019 — 2022',
      detail: 'Focused on Marketing Strategy, Consumer Behaviour, and Brand Management.'
    }
  ],
  coreCompetencies: [
    {
      group: 'Campaigns & Copywriting',
      skills: [
        '360° Campaign Ideation (Hero, Hub, Hygiene)',
        'P1 Sale & Seasonal Collection Naming',
        'BAU Carousels, Statics & Reel Concepts',
        'Influencer Reel Scripts, Vox Pops & Supers',
        'Documentary & Brand Film Scriptwriting'
      ]
    },
    {
      group: 'Omnichannel & Strategy',
      skills: [
        'SMS, WhatsApp, Emailer & Dark Ad Copy',
        'Pitch Decks & Annual Operating Plan (AOP) Decks',
        'Experiential Pop-Up & Brand Collab Mechanics',
        'Online Reputation Management (ORM)',
        'Trend Research & Cultural Reference Mapping'
      ]
    },
    {
      group: 'Visual & Fashion Direction',
      skills: [
        'Moodboards & Binding Visual Language',
        'Shoot Styling, Conceptualising & Look Curation',
        'Runway & Fashion Week Content (LFW / FDCI)',
        'AI Tools for Creative Exploration & Execution',
        'Canva, Figma & Editorial Publishing'
      ]
    }
  ],
  honors: [
    'Author of “Happy With My Heartbreak” — 13 Metrical Pieces Zine (Published July 2024, Amazon India)',
    'Author of “Everythingship!” — Coming-of-Age Queer Romance Novel (Published January 2020, Amazon India)',
    'London Fashion Week Show Team — Rocky Star Label (September 2023)',
    'FDCI Social Media Content Creator — Lakmé Fashion Week (March 2024)'
  ]
};
