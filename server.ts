import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type, GenerateVideosOperation } from '@google/genai';
import {
  DESIGNER_PROFILE,
  PROJECTS_DATA,
  BOOKS_DATA,
  SERVICES_DATA,
  RESUME_DATA
} from './src/data/portfolioData.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  submittedAt: string;
}

const contactSubmissions: ContactSubmission[] = [];

function buildPortfolioSystemContext(): string {
  const projectsSummary = PROJECTS_DATA.map(
    (p) =>
      `- [${p.slug}] "${p.title}" (${p.category}, ${p.year}, Client: ${p.client}): ${p.excerpt} Results: ${p.results
        .map((r) => `${r.value} ${r.label}`)
        .join(', ')}. Sample Headline: "${p.copySpecimens[0]?.headline || ''}"`
  ).join('\n');

  const booksSummary = BOOKS_DATA.map(
    (b) =>
      `- "${b.title}" (${b.publishYear}, ${b.pages} pages, Format: ${b.format}): ${b.subtitle} Synopsis: ${b.synopsis}`
  ).join('\n');

  const servicesSummary = SERVICES_DATA.map(
    (s) =>
      `- ${s.number}. ${s.title} (${s.investmentRange}, Timeline: ${s.timeline}): ${s.subtitle} Ideal for: ${s.idealFor}`
  ).join('\n');

  return `You are the official AI Portfolio & Storyteller Assistant for Tanishq Sharma (${DESIGNER_PROFILE.roles.join(' · ')}).
Your tone is warm, articulate, editorial, insightful, and helpful—reflecting Tanishq's signature philosophy: "Words That Convert. I turn ideas, brands and stories into words people remember."

Here is the complete factual knowledge base about Tanishq Sharma:
- Location: ${DESIGNER_PROFILE.location}
- Contact Email: ${DESIGNER_PROFILE.email}
- Availability: ${DESIGNER_PROFILE.availability}
- Key Stats: 2 Published Books (Happy With My Heartbreak & Everythingship!), 9 Flagship Canva Portfolio Case Studies (Tata CLiQ Fashion, GAS Milano India, Miyo Dessert Bar, The Drip Dept., Ed-a-Mamma).
- Bio: ${DESIGNER_PROFILE.aboutLead} ${DESIGNER_PROFILE.extendedBio.join(' ')}

PUBLISHED BOOKS BY TANISHQ SHARMA:
${booksSummary}

PORTFOLIO PROJECTS (Use exact slug in recommendedProjectSlugs when relevant):
${projectsSummary}

SERVICES & INVESTMENT TIERS:
${servicesSummary}

EXPERIENCE & CREDENTIALS:
${RESUME_DATA.summary}

Guidelines:
1. Answer visitor questions directly, concisely, and warmly using concrete facts, metrics, and copy examples from Tanishq's work.
2. Whenever a user asks about specific work, industries, categories (Branding, Packaging, Social Media, Advertising, UI/UX, Typography, Illustration), or campaign results, include 1 to 3 matching project slugs in "recommendedProjectSlugs".
3. Always provide 2 to 3 thoughtful, short follow-up questions in "suggestedFollowUps".`;
}

function generateSmartFallbackResponse(userMessage: string): {
  reply: string;
  recommendedProjectSlugs: string[];
  suggestedFollowUps: string[];
} {
  const q = userMessage.toLowerCase();

  if (q.includes('book') || q.includes('heartbreak') || q.includes('everythingship') || q.includes('author')) {
    return {
      reply: `Tanishq Sharma is the published author of two titles available on Amazon India:\n\n1. **"Happy With My Heartbreak"** (July 2024) — *A collection of 13 metrical pieces in the form of a zine, each paired with a carefully chosen visual to reflect the emotion of the words.*\n2. **"Everythingship!"** (January 2020) — *A coming-of-age queer romance novel exploring love, identity, and self-discovery.*\n\nYou can read chapter excerpts of both books right here in the Books section or order them on Amazon.`,
      recommendedProjectSlugs: ['solitude-illustrated-anthology', 'monograph-literary-press-typography'],
      suggestedFollowUps: [
        'What is the core philosophy of The Creative Mindset?',
        'Can Tanishq help ghostwrite or edit a brand monograph?',
        'Show me Tanishq’s top brand campaigns'
      ]
    };
  }

  if (q.includes('service') || q.includes('price') || q.includes('budget') || q.includes('cost') || q.includes('hire') || q.includes('rate')) {
    return {
      reply: `Tanishq offers six tailored creative & storytelling engagements:\n\n• **01. Brand Storytelling & Verbal Identity** ($3,500 – $7,000 · 3–4 weeks)\n• **02. Campaign & Advertising Copywriting** ($4,000 – $8,500 · 2–4 weeks)\n• **03. Social Media & Content Strategy** ($2,500 – $5,000/mo)\n• **04. Packaging & Tactile Product Copy** ($2,500 – $5,500 · 2–3 weeks)\n• **05. Website Copy & UI/UX Microcopy** ($3,000 – $6,500 · 3–5 weeks)\n• **06. Books, Monographs & Editorial Direction** ($6,000 – $15,000+)\n\nYou can click "Let's Talk" in the navigation bar or select any service to pre-fill your project brief.`,
      recommendedProjectSlugs: ['aurae-botanica-brand-campaigns', 'meridian-architecture-brand-strategy'],
      suggestedFollowUps: [
        'Which service is best for a D2C product launch?',
        'Show me examples of Packaging & Skincare copy',
        'How quickly can we kick off a new project?'
      ]
    };
  }

  if (q.includes('social') || q.includes('instagram') || q.includes('coffee') || q.includes('content')) {
    return {
      reply: `For social storytelling and organic growth, explore **Pulse & Pour: Morning Rituals Unfiltered**. Tanishq built their "First Cup Notes" serialized carousel and reel engine—generating **+310% organic saves**, **4.8M unpaid reach**, and a **+54% lift in coffee subscriptions** while reducing paid ad spend by 40%.`,
      recommendedProjectSlugs: ['pulse-and-pour-social-content', 'aurae-botanica-brand-campaigns'],
      suggestedFollowUps: [
        'Show me Advertising & Billboard campaigns',
        'What are Tanishq’s monthly retainer rates for Social Content?',
        'Tell me about UI/UX microcopy work'
      ]
    };
  }

  if (q.includes('ui') || q.includes('ux') || q.includes('website') || q.includes('fintech') || q.includes('app')) {
    return {
      reply: `In UI/UX and digital product copy, Tanishq redesigned 140+ onboarding and wealth management screens for **Kinetix Wealth**. By replacing intimidating financial jargon with calm, human scenario guidance, the project lifted **end-to-end KYC completion by +41%** and cut verification support tickets by **52%**.`,
      recommendedProjectSlugs: ['kinetix-wealth-ux-microcopy', 'meridian-architecture-brand-strategy'],
      suggestedFollowUps: [
        'What deliverables are included in Website & UX Copy?',
        'Show me Brand Storytelling case studies',
        'How does Tanishq collaborate with Figma design teams?'
      ]
    };
  }

  if (q.includes('packaging') || q.includes('skincare') || q.includes('box') || q.includes('label')) {
    return {
      reply: `For tactile packaging copy, check out **Veda Earth: Tactile Apothecary Packaging** (22 skincare SKUs unified under a numbered ritual hierarchy, lifting in-store shelf pick-up by **+64%**) as well as **Aurae Botanica** (+168% discovery set sales).`,
      recommendedProjectSlugs: ['veda-earth-apothecary-packaging', 'aurae-botanica-brand-campaigns'],
      suggestedFollowUps: [
        'Show me Typography & Book Design projects',
        'What is the timeline for a Packaging Copy project?',
        'Tell me about Tanishq’s two published books'
      ]
    };
  }

  return {
    reply: `Tanishq Sharma is a Copywriter, Content Strategist, and Brand Storyteller who has shipped **50+ campaigns** across luxury fragrance, specialty coffee, sportswear, architecture, and fintech—alongside authoring two books (*Happy With My Breakup* and *The Creative Mindset*).\n\nBelow are three flagship case studies showcasing how strategic words translate into measurable brand conversion:`,
    recommendedProjectSlugs: [
      'aurae-botanica-brand-campaigns',
      'pulse-and-pour-social-content',
      'stride-athletics-creative-copy'
    ],
    suggestedFollowUps: [
      'Tell me about Tanishq’s two published books',
      'What services and pricing packages are available?',
      'Which campaign achieved the highest ROI?'
    ]
  };
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  // Health & Portfolio API Routes
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'tanishq-sharma-portfolio-api',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  });

  app.get('/api/projects', (_req, res) => {
    res.json({
      profile: DESIGNER_PROFILE,
      projects: PROJECTS_DATA,
      books: BOOKS_DATA,
      services: SERVICES_DATA
    });
  });

  app.get('/api/projects/:slug', (req, res) => {
    const project = PROJECTS_DATA.find((p) => p.slug === req.params.slug);
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.json({ project });
  });

  // Contact Form Submission Endpoint
  app.post('/api/contact', (req, res) => {
    const { name, email, projectType, budget, message } = req.body || {};

    const errors: Record<string, string> = {};
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      errors.name = 'Please enter your full name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      errors.email = 'Please provide a valid email address so Tanishq can reply.';
    }
    if (!projectType || typeof projectType !== 'string' || !projectType.trim()) {
      errors.projectType = 'Please select a project type or inquiry category.';
    }
    if (!budget || typeof budget !== 'string' || !budget.trim()) {
      errors.budget = 'Please select an estimated budget tier.';
    }
    if (!message || typeof message !== 'string' || message.trim().length < 15) {
      errors.message = 'Please share a brief overview of your project (at least 15 characters).';
    }

    if (Object.keys(errors).length > 0) {
      res.status(400).json({
        ok: false,
        error: 'Please check the highlighted fields and try again.',
        fieldErrors: errors
      });
      return;
    }

    const submission: ContactSubmission = {
      id: `INQ-${Date.now().toString(36).toUpperCase()}`,
      name: name.trim(),
      email: email.trim(),
      projectType: projectType.trim(),
      budget: budget.trim(),
      message: message.trim(),
      submittedAt: new Date().toISOString()
    };

    contactSubmissions.unshift(submission);

    res.status(201).json({
      ok: true,
      submission,
      confirmationMessage: `Thank you, ${submission.name}. Your brief (${submission.id}) has been logged for Tanishq Sharma. Expect a personal reply within 24 business hours.`
    });
  });

  app.get('/api/contact/submissions', (_req, res) => {
    res.json({ submissions: contactSubmissions });
  });

  // Server-Side Gemini AI Portfolio Assistant Endpoint
  app.post('/api/ai/chat', async (req, res) => {
    const { message, history } = req.body || {};

    if (!message || typeof message !== 'string' || !message.trim()) {
      res.status(400).json({ error: 'Please enter a question or prompt for the assistant.' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      const fallback = generateSmartFallbackResponse(message);
      res.json(fallback);
      return;
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      const conversationTranscript = Array.isArray(history)
        ? history
            .slice(-8)
            .map((m: { role?: string; text?: string }) => `${m.role === 'user' ? 'Visitor' : 'Assistant'}: ${m.text || ''}`)
            .join('\n')
        : '';

      const prompt = conversationTranscript
        ? `Previous conversation:\n${conversationTranscript}\n\nVisitor's new question: ${message.trim()}`
        : `Visitor's question: ${message.trim()}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: buildPortfolioSystemContext(),
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              reply: {
                type: Type.STRING,
                description: 'Warm, articulate response answering the visitor question with concrete examples from Tanishq Sharma’s portfolio.'
              },
              recommendedProjectSlugs: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Array of 0 to 3 matching project slugs from Tanishq’s portfolio.'
              },
              suggestedFollowUps: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Array of 2 to 3 short follow-up questions the visitor can click next.'
              }
            },
            required: ['reply', 'recommendedProjectSlugs', 'suggestedFollowUps']
          }
        }
      });

      const rawText = response.text;
      if (!rawText) {
        res.json(generateSmartFallbackResponse(message));
        return;
      }

      const parsed = JSON.parse(rawText.trim());
      const validSlugs = Array.isArray(parsed.recommendedProjectSlugs)
        ? parsed.recommendedProjectSlugs.filter((slug: string) =>
            PROJECTS_DATA.some((p) => p.slug === slug)
          )
        : [];

      res.json({
        reply: parsed.reply || generateSmartFallbackResponse(message).reply,
        recommendedProjectSlugs: validSlugs,
        suggestedFollowUps:
          Array.isArray(parsed.suggestedFollowUps) && parsed.suggestedFollowUps.length > 0
            ? parsed.suggestedFollowUps.slice(0, 3)
            : [
                'Show me Tanishq’s top brand campaigns',
                'Tell me about his two published books',
                'What are the service packages & timelines?'
              ]
      });
    } catch (error) {
      console.warn('Gemini API fallback activated:', error instanceof Error ? error.message : error);
      // Graceful recovery using our grounded portfolio response engine
      const fallback = generateSmartFallbackResponse(message);
      res.json(fallback);
    }
  });

  // 1. Start Veo Photo-to-Video Generation (veo-3.1-fast-generate-preview)
  app.post('/api/veo/generate', async (req, res) => {
    const { imageBase64, mimeType, prompt, aspectRatio } = req.body || {};
    const validAspect = aspectRatio === '9:16' ? '9:16' : '16:9';

    if (!imageBase64 || typeof imageBase64 !== 'string') {
      res.status(400).json({ error: 'Please upload a valid photo to animate.' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      res.status(400).json({
        error: 'A valid Gemini API key is required in Settings > Secrets to run Veo video generation.'
      });
      return;
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      const cleanBase64 = imageBase64.replace(/^data:[^;]+;base64,/, '');
      const operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt:
          prompt && typeof prompt === 'string' && prompt.trim()
            ? prompt.trim()
            : 'Subtle cinematic editorial camera motion, warm studio lighting, gentle depth of field.',
        image: {
          imageBytes: cleanBase64,
          mimeType: mimeType && typeof mimeType === 'string' ? mimeType : 'image/jpeg'
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: validAspect
        }
      });

      res.json({ operationName: operation.name });
    } catch (err) {
      res.status(500).json({
        error:
          err instanceof Error
            ? err.message
            : 'Failed to start Veo video generation. Please check your API key and billing plan.'
      });
    }
  });

  // 2. Poll Veo Video Generation Status
  app.post('/api/veo/status', async (req, res) => {
    const { operationName } = req.body || {};
    if (!operationName || typeof operationName !== 'string') {
      res.status(400).json({ error: 'Missing operationName' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(400).json({ error: 'Missing GEMINI_API_KEY' });
      return;
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      const op = new GenerateVideosOperation();
      op.name = operationName;
      const updated = await ai.operations.getVideosOperation({ operation: op });

      res.json({
        done: Boolean(updated.done),
        error: updated.error ? String((updated.error as { message?: string }).message || 'Video generation error') : null
      });
    } catch (err) {
      res.status(500).json({
        error: err instanceof Error ? err.message : 'Error polling video generation status.'
      });
    }
  });

  // 3. Download Completed Veo Video Stream
  app.post('/api/veo/download', async (req, res) => {
    const { operationName } = req.body || {};
    if (!operationName || typeof operationName !== 'string') {
      res.status(400).json({ error: 'Missing operationName' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(400).json({ error: 'Missing GEMINI_API_KEY' });
      return;
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      const op = new GenerateVideosOperation();
      op.name = operationName;
      const updated = await ai.operations.getVideosOperation({ operation: op });
      const uri = updated.response?.generatedVideos?.[0]?.video?.uri;

      if (!uri) {
        res.status(404).json({ error: 'Generated video URI not available.' });
        return;
      }

      const videoRes = await fetch(uri, {
        headers: { 'x-goog-api-key': apiKey }
      });

      if (!videoRes.ok || !videoRes.body) {
        res.status(502).json({ error: 'Failed to stream generated video.' });
        return;
      }

      res.setHeader('Content-Type', 'video/mp4');
      await videoRes.body.pipeTo(
        new WritableStream({
          write(chunk) {
            res.write(chunk);
          },
          close() {
            res.end();
          }
        })
      );
    } catch (err) {
      res.status(500).json({
        error: err instanceof Error ? err.message : 'Error downloading generated video.'
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Tanishq Sharma Portfolio Server running at http://localhost:${PORT}`);
  });
}

startServer();
