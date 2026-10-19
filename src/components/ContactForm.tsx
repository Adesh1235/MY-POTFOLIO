import React, { useState, useEffect, useRef } from 'react';
import {
  Mail,
  Linkedin,
  Instagram,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RotateCcw
} from 'lucide-react';
import { DESIGNER_PROFILE } from '../data/portfolioData';

interface ContactFormProps {
  initialProjectType?: string;
  initialBudget?: string;
  initialMessage?: string;
  onViewWork?: () => void;
}

interface SubmissionReceipt {
  id: string;
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  submittedAt: string;
}

const PROJECT_TYPES = [
  'Brand Storytelling & Strategy',
  'Advertising & Campaign Copy',
  'Social Media & Content Strategy',
  'Packaging & Product Copy',
  'Website & UI/UX Copy',
  'Book & Editorial Collaboration',
  'Speaking / General Inquiry'
];

const BUDGET_RANGES = [
  '$1,500 – $3,000',
  '$3,000 – $5,000',
  '$5,000 – $10,000',
  '$10,000+',
  'Monthly Retainer'
];

export const ContactForm: React.FC<ContactFormProps> = ({
  initialProjectType = '',
  initialBudget = '',
  initialMessage = '',
  onViewWork
}) => {
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState(initialProjectType || PROJECT_TYPES[0]);
  const [budget, setBudget] = useState(initialBudget || BUDGET_RANGES[1]);
  const [message, setMessage] = useState(initialMessage);

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<SubmissionReceipt | null>(null);
  const [confirmationNote, setConfirmationNote] = useState<string>('');

  useEffect(() => {
    if (initialProjectType) setProjectType(initialProjectType);
    if (initialBudget) setBudget(initialBudget);
    if (initialMessage) setMessage(initialMessage);
  }, [initialProjectType, initialBudget, initialMessage]);

  const validateClientSide = (): boolean => {
    const errors: Record<string, string> = {};
    if (name.trim().length < 2) {
      errors.name = 'Please enter your full name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.email = 'Please enter a valid email address (e.g., alex@brand.com).';
    }
    if (!projectType.trim()) {
      errors.projectType = 'Please choose a project type.';
    }
    if (!budget.trim()) {
      errors.budget = 'Please choose an estimated budget range.';
    }
    if (message.trim().length < 15) {
      errors.message = 'Please share a bit more context (at least 15 characters).';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setGeneralError(null);

    if (!validateClientSide()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          projectType,
          budget,
          message: message.trim()
        })
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        }
        setGeneralError(
          data.error ||
            'We could not send your brief right now. Please review your entries and try again.'
        );
        return;
      }

      setReceipt(data.submission);
      setConfirmationNote(data.confirmationMessage);
      setFieldErrors({});
    } catch {
      setGeneralError(
        'Network error while submitting your inquiry. Please check your connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setReceipt(null);
    setConfirmationNote('');
    setName('');
    setEmail('');
    setMessage('');
    setFieldErrors({});
    setGeneralError(null);
  };

  const handleViewWorkClick = () => {
    if (onViewWork) {
      onViewWork();
      return;
    }
    const el = document.getElementById('selected-work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/portfolio';
    }
  };

  return (
    <section
      id="contact-section"
      aria-label="Closing Spread — Contact Tanishq Sharma"
      className="surface-contact relative w-full py-24 sm:py-32 border-b border-[#DED6C6] overflow-hidden"
    >
      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12 items-start">
          {/* =========================================================================
              LEFT COLUMN (5 Columns): Closing Magazine Spread + Physical Note + Direct Desk
              ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-5">
              <div className="flex items-center gap-3 text-[10px] font-mono-tabular tracking-[0.24em] uppercase text-[#74482A]">
                <span>07 / CLOSING PAGE</span>
                <span aria-hidden="true" className="w-6 h-[1px] bg-[#C8BFA8]" />
                <span className="text-[#6E685F]">DIRECT COMMISSION</span>
              </div>

              <h2 className="font-serif-editorial text-5xl sm:text-6xl lg:text-[72px] text-[#141311] leading-[0.92] tracking-[-0.025em]">
                <span className="block">HAVE A STORY</span>
                <span className="block italic font-normal text-[#74482A] mt-1">
                  WORTH TELLING?
                </span>
              </h2>

              <p className="text-base sm:text-[17px] text-[#4A4640] leading-[1.72] max-w-[40ch]">
                A brand project, a collaboration, or simply a conversation.
                I&rsquo;d love to hear from you.
              </p>

              {/* Two Closing Actions: LET'S TALK ↗ and VIEW MY WORK */}
              <div className="pt-2 flex flex-wrap items-center gap-6">
                <button
                  type="button"
                  onClick={() => nameInputRef.current?.focus()}
                  className="btn-editorial-primary px-7 py-4 text-xs font-mono-tabular tracking-[0.2em] uppercase cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#74482A]"
                >
                  <span>LET&rsquo;S TALK</span>
                  <ArrowUpRight className="w-4 h-4 btn-editorial-arrow" />
                </button>

                <button
                  type="button"
                  onClick={handleViewWorkClick}
                  className="group inline-flex items-center gap-2 py-2 text-xs font-mono-tabular tracking-[0.2em] uppercase text-[#141311] hover:text-[#74482A] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#74482A]"
                >
                  <span className="underline underline-offset-8 decoration-[#C8BFA8] group-hover:decoration-[#74482A]">
                    VIEW MY WORK
                  </span>
                </button>
              </div>
            </div>

            {/* Physical Framed Closing Card + Handwritten Note */}
            <div className="relative pt-4">
              <div className="paper-mount p-6 space-y-4">
                <div className="flex items-center justify-between text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-[#6E685F] pb-3 border-b border-[#EAE2D3]">
                  <span>WRITER&rsquo;S CORRESPONDENCE DESK</span>
                  <span className="text-[#74482A]">REPLY WITHIN 24H</span>
                </div>

                <a
                  href={`mailto:${DESIGNER_PROFILE.email}`}
                  className="flex items-center gap-3 text-sm sm:text-base font-medium text-[#141311] hover:text-[#74482A] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#74482A] shrink-0" />
                  <span className="underline underline-offset-4 decoration-[#C8BFA8]">
                    {DESIGNER_PROFILE.email}
                  </span>
                </a>

                <div className="pt-2 flex flex-wrap items-center gap-5 text-xs font-mono-tabular uppercase tracking-[0.16em] text-[#55524D]">
                  <a
                    href={DESIGNER_PROFILE.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-[#74482A] transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[#74482A]" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>

                  <a
                    href={DESIGNER_PROFILE.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-[#74482A] transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5 text-[#74482A]" />
                    <span>Instagram (@plotter_head)</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Required Handwritten Note: "Good conversations create better stories." */}
              <div className="paper-note-foreground mt-5 sm:mt-0 sm:absolute sm:-bottom-6 sm:right-4 z-20 px-4 py-3 -rotate-2 max-w-[230px]">
                <div
                  aria-hidden="true"
                  className="archival-tape absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-3 rotate-1"
                />
                <p className="font-handwritten text-xl text-[#2B241E] leading-[1.12]">
                  &ldquo;Good conversations
                  <br />
                  <span className="text-[#74482A]">create better stories.&rdquo;</span>
                </p>
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN (7 Columns): Physical Archival Commission Brief Sheet
              ========================================================================= */}
          <div className="lg:col-span-7">
            <div className="paper-mount relative p-7 sm:p-10 lg:p-12">
              {/* Top Archival Tape Strip */}
              <div
                aria-hidden="true"
                className="archival-tape hidden sm:block absolute -top-2.5 left-12 w-16 h-4 -rotate-1"
              />

              {receipt ? (
                /* Verified Submission Receipt State */
                <div
                  role="status"
                  aria-live="polite"
                  className="py-6 space-y-6 text-[#141311]"
                >
                  <div className="flex items-center gap-3 text-[#2E5A36]">
                    <CheckCircle2 className="w-6 h-6 shrink-0" />
                    <span className="font-mono-tabular text-xs uppercase tracking-[0.2em]">
                      INQUIRY LOGGED · REF #{receipt.id.slice(0, 8).toUpperCase()}
                    </span>
                  </div>

                  <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#141311]">
                    Thank you, {receipt.name}. Your brief is on my desk.
                  </h3>

                  <p className="text-sm sm:text-base text-[#4A4640] leading-relaxed">
                    {confirmationNote ||
                      'I review every project inquiry personally and will respond within 24 business hours.'}
                  </p>

                  <div className="p-5 bg-[#FAF6EE] border border-[#DDD3C2] space-y-2 text-xs font-mono-tabular text-[#55524D]">
                    <div>
                      <strong className="text-[#141311]">CLIENT:</strong> {receipt.name} (
                      {receipt.email})
                    </div>
                    <div>
                      <strong className="text-[#141311]">SCOPE:</strong>{' '}
                      {receipt.projectType} · {receipt.budget}
                    </div>
                    <div>
                      <strong className="text-[#141311]">MESSAGE:</strong>{' '}
                      {receipt.message}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-[#141311] text-xs font-mono-tabular uppercase tracking-[0.18em] text-[#141311] hover:bg-[#141311] hover:text-[#FAF8F4] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Send Another Inquiry</span>
                  </button>
                </div>
              ) : (
                /* Commission Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#EAE2D3]">
                    <span className="font-mono-tabular text-[10px] uppercase tracking-[0.22em] text-[#74482A]">
                      PROJECT BRIEF &amp; INQUIRY SHEET
                    </span>
                    <span className="font-mono-tabular text-[10px] uppercase tracking-[0.18em] text-[#6E685F]">
                      ALL FIELDS REQUIRED
                    </span>
                  </div>

                  {generalError && (
                    <div
                      role="alert"
                      className="p-4 bg-[#FDF2F0] border border-[#C94A38] text-[#8B261D] text-xs flex items-start gap-2.5"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{generalError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-[#55524D] mb-2"
                      >
                        01 / YOUR NAME
                      </label>
                      <input
                        ref={nameInputRef}
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (fieldErrors.name) {
                            setFieldErrors((prev) => ({ ...prev, name: '' }));
                          }
                        }}
                        placeholder="e.g., Aarav Mehta"
                        className="w-full px-3.5 py-3 bg-[#FAF6EE] border border-[#D8CEBE] text-sm text-[#141311] placeholder:text-[#9C9488] focus:outline-none focus:border-[#141311] transition-colors"
                      />
                      {fieldErrors.name && (
                        <p className="mt-1.5 text-xs text-[#A63224]">{fieldErrors.name}</p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-[#55524D] mb-2"
                      >
                        02 / EMAIL ADDRESS
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (fieldErrors.email) {
                            setFieldErrors((prev) => ({ ...prev, email: '' }));
                          }
                        }}
                        placeholder="e.g., aarav@brandstudio.com"
                        className="w-full px-3.5 py-3 bg-[#FAF6EE] border border-[#D8CEBE] text-sm text-[#141311] placeholder:text-[#9C9488] focus:outline-none focus:border-[#141311] transition-colors"
                      />
                      {fieldErrors.email && (
                        <p className="mt-1.5 text-xs text-[#A63224]">{fieldErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Project Type Select */}
                    <div>
                      <label
                        htmlFor="contact-project-type"
                        className="block text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-[#55524D] mb-2"
                      >
                        03 / DISCIPLINE / SCOPE
                      </label>
                      <select
                        id="contact-project-type"
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full px-3.5 py-3 bg-[#FAF6EE] border border-[#D8CEBE] text-sm text-[#141311] focus:outline-none focus:border-[#141311] transition-colors cursor-pointer"
                      >
                        {PROJECT_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Budget Range Select */}
                    <div>
                      <label
                        htmlFor="contact-budget"
                        className="block text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-[#55524D] mb-2"
                      >
                        04 / ESTIMATED INVESTMENT
                      </label>
                      <select
                        id="contact-budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-3.5 py-3 bg-[#FAF6EE] border border-[#D8CEBE] text-sm text-[#141311] focus:outline-none focus:border-[#141311] transition-colors cursor-pointer"
                      >
                        {BUDGET_RANGES.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-[10px] font-mono-tabular uppercase tracking-[0.2em] text-[#55524D] mb-2"
                    >
                      05 / THE BRIEF (TELL ME ABOUT YOUR STORY OR CAMPAIGN)
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (fieldErrors.message) {
                          setFieldErrors((prev) => ({ ...prev, message: '' }));
                        }
                      }}
                      placeholder="Share your brand, campaign goals, deliverables, or timeline..."
                      className="w-full px-3.5 py-3 bg-[#FAF6EE] border border-[#D8CEBE] text-sm text-[#141311] placeholder:text-[#9C9488] focus:outline-none focus:border-[#141311] transition-colors resize-y"
                    />
                    {fieldErrors.message && (
                      <p className="mt-1.5 text-xs text-[#A63224]">{fieldErrors.message}</p>
                    )}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <span className="font-handwritten text-lg text-[#74482A]">
                      Every brief is read personally.
                    </span>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-editorial-primary px-8 py-4 text-xs font-mono-tabular tracking-[0.2em] uppercase disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#74482A]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>SENDING BRIEF...</span>
                        </>
                      ) : (
                        <>
                          <span>SEND PROJECT BRIEF</span>
                          <ArrowUpRight className="w-4 h-4 btn-editorial-arrow" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
