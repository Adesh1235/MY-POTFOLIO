import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Trash2,
  ArrowUpRight,
  Loader2,
  BookOpen
} from 'lucide-react';
import { PROJECTS_DATA, Project } from '../data/portfolioData';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  recommendedProjects?: Project[];
}

interface AIChatProps {
  onSelectProjectSlug: (slug: string) => void;
}

const INITIAL_SUGGESTIONS = [
  'Tell me about Tata CLiQ Big CLiQ Sale & Cupid Sale',
  'Tell me about Tanishq’s two published books',
  'What did Tanishq write for GAS Milano India?',
  'Recommend a case study for Social Media or UX Copy'
];

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome-msg',
  role: 'assistant',
  text: 'Hello! I am Tanishq Sharma’s Portfolio & Storyteller Assistant. Ask me about his real Canva campaigns (Tata CLiQ Fashion, GAS Milano India, Miyo Dessert Bar, The Drip Dept., Ed-a-Mamma), his two books ("Happy With My Heartbreak" and "Everythingship!"), or service packages.',
  recommendedProjects: [PROJECTS_DATA[0], PROJECTS_DATA[2]]
};

export const AIChat: React.FC<AIChatProps> = ({ onSelectProjectSlug }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [suggestedQuestions, setSuggestedQuestions] =
    useState<string[]>(INITIAL_SUGGESTIONS);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  const sendQuestion = async (questionText: string) => {
    const trimmed = questionText.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed
    };

    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInputValue('');
    setErrorBanner(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: nextHistory.map((m) => ({ role: m.role, text: m.text }))
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Could not reach the portfolio assistant.');
      }

      const matchedProjects: Project[] = Array.isArray(data.recommendedProjectSlugs)
        ? data.recommendedProjectSlugs
            .map((slug: string) => PROJECTS_DATA.find((p) => p.slug === slug))
            .filter((p: Project | undefined): p is Project => Boolean(p))
        : [];

      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        text: data.reply || 'Here is what I found in Tanishq’s portfolio:',
        recommendedProjects: matchedProjects
      };

      setMessages((prev) => [...prev, assistantMsg]);

      if (Array.isArray(data.suggestedFollowUps) && data.suggestedFollowUps.length > 0) {
        setSuggestedQuestions(data.suggestedFollowUps);
      }
    } catch (err) {
      setErrorBanner(
        err instanceof Error
          ? err.message
          : 'Unable to fetch a response right now. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuestion(inputValue);
  };

  const handleClearChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setSuggestedQuestions(INITIAL_SUGGESTIONS);
    setErrorBanner(null);
  };

  return (
    <div className="no-print">
      {/* Floating Liquid Glass Launcher Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Portfolio Assistant"
          className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 px-5 py-3.5 rounded-full liquid-glass-nav text-[#171717] shadow-xl hover:-translate-y-0.5 transition-all duration-150 cursor-pointer"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#9A6F52]" />
          <MessageSquare className="w-4 h-4 text-[#9A6F52]" />
          <span className="text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap">
            Ask Storyteller AI
          </span>
        </button>
      )}

      {/* Floating Liquid Glass Conversational Panel */}
      {isOpen && (
        <aside
          aria-label="AI Portfolio Assistant Panel"
          className="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-[420px] max-h-[82vh] h-[600px] z-50 rounded-3xl liquid-glass-nav shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="px-5 py-4 bg-[#171717]/95 text-[#FAF9F6] flex items-center justify-between gap-3">
            <div>
              <div className="font-serif-editorial text-xl leading-none">
                Tanishq&rsquo;s Portfolio Guide
              </div>
              <div className="text-[10px] font-mono-tabular tracking-widest text-[#D6A676] mt-1">
                GEMINI STORYTELLER ASSISTANT
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleClearChat}
                title="Clear conversation"
                aria-label="Clear conversation history"
                className="p-2 rounded-full text-[#C9C3B8] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close assistant"
                aria-label="Close AI assistant panel"
                className="p-2 rounded-full text-[#C9C3B8] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#171717] text-[#FAF9F6]'
                      : 'bg-white/80 text-[#171717] border border-white shadow-2xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {/* Recommended Case Study Cards */}
                {msg.recommendedProjects && msg.recommendedProjects.length > 0 && (
                  <div className="mt-2.5 w-full max-w-[92%] space-y-2">
                    <span className="text-[10px] font-mono-tabular uppercase tracking-wider text-[#55524D] block px-1">
                      Recommended Case Studies:
                    </span>
                    {msg.recommendedProjects.map((proj) => (
                      <button
                        key={proj.id}
                        type="button"
                        onClick={() => {
                          onSelectProjectSlug(proj.slug);
                          setIsOpen(false);
                        }}
                        className="w-full p-3 rounded-2xl bg-white/85 border border-white hover:border-[#9A6F52] text-left flex items-center justify-between gap-3 transition-colors cursor-pointer group"
                      >
                        <div className="min-w-0">
                          <div className="text-[10px] font-mono-tabular text-[#9A6F52]">
                            {proj.category} · {proj.client}
                          </div>
                          <div className="font-serif-editorial text-base text-[#171717] truncate group-hover:text-[#9A6F52]">
                            {proj.title}
                          </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-[#9A6F52] shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-[#55524D] px-2 py-1">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#9A6F52]" />
                <span>Consulting Tanishq&rsquo;s portfolio archive...</span>
              </div>
            )}

            {errorBanner && (
              <div className="p-3 rounded-xl bg-red-50/90 border border-red-200 text-xs text-red-800">
                {errorBanner}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggested Prompts */}
          <div className="px-4 py-2.5 border-t border-white/60 bg-white/40">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              <BookOpen className="w-3.5 h-3.5 text-[#9A6F52] shrink-0" />
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  type="button"
                  disabled={isLoading}
                  onClick={() => sendQuestion(q)}
                  className="px-2.5 py-1 rounded-full text-[11px] bg-white/80 border border-white text-[#171717] hover:border-[#9A6F52] whitespace-nowrap shrink-0 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleFormSubmit}
            className="p-3 bg-white/75 border-t border-white flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about campaigns, books, or copywriting..."
              aria-label="Ask AI portfolio assistant"
              className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm rounded-full bg-white/90 border border-[#C9C3B8] text-[#171717] placeholder:text-[#7D7166] focus:outline-none focus:border-[#9A6F52]"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              aria-label="Send question"
              className="p-2.5 rounded-full bg-[#171717] text-[#FAF9F6] hover:bg-[#653F3B] disabled:opacity-40 transition-colors cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </aside>
      )}
    </div>
  );
};
