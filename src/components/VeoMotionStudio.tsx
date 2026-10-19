import React, { useState, useRef } from 'react';
import {
  Film,
  Upload,
  Play,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Download
} from 'lucide-react';

const REASSURING_MESSAGES = [
  'Initializing Veo 3.1 motion synthesis...',
  'Analyzing portrait lighting and editorial depth layers...',
  'Rendering 720p cinematic camera trajectory...',
  'Polishing film grain and studio highlights...'
];

function generateDefaultSampleBase64(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 360;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 640, 360);
  grad.addColorStop(0, '#F4F1EA');
  grad.addColorStop(1, '#DFD7C8');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 640, 360);

  ctx.fillStyle = '#171614';
  ctx.font = 'bold 48px Georgia, serif';
  ctx.fillText('WORDS THAT MOVE.', 48, 160);

  ctx.fillStyle = '#A68B6A';
  ctx.font = 'italic 28px Georgia, serif';
  ctx.fillText('Tanishq Sharma · Editorial Motion Reel', 48, 215);

  return canvas.toDataURL('image/jpeg', 0.9);
}

export const VeoMotionStudio: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [prompt, setPrompt] = useState<string>(
    'Subtle cinematic editorial camera push-in, warm golden-hour rim light, gentle depth-of-field motion.'
  );
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusStep, setStatusStep] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMimeType(file.type || 'image/jpeg');
    setErrorMsg(null);
    setVideoUrl(null);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUseEditorialSample = () => {
    const sample = generateDefaultSampleBase64();
    setImagePreview(sample);
    setMimeType('image/jpeg');
    setErrorMsg(null);
    setVideoUrl(null);
  };

  const handleGenerateVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    const sourceImage = imagePreview || generateDefaultSampleBase64();
    if (!imagePreview) {
      setImagePreview(sourceImage);
    }

    setIsGenerating(true);
    setErrorMsg(null);
    setVideoUrl(null);
    setStatusStep(0);

    const msgTimer = setInterval(() => {
      setStatusStep((prev) => (prev + 1) % REASSURING_MESSAGES.length);
    }, 3500);

    try {
      const startRes = await fetch('/api/veo/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: sourceImage,
          mimeType,
          prompt,
          aspectRatio
        })
      });

      const startData = await startRes.json();
      if (!startRes.ok || !startData.operationName) {
        throw new Error(
          startData.error ||
            'Could not initiate Veo 3.1 video generation. Please verify your API key in Settings > Secrets.'
        );
      }

      const operationName: string = startData.operationName;

      // Poll until done
      let isDone = false;
      for (let attempt = 0; attempt < 40; attempt++) {
        await new Promise((r) => setTimeout(r, 4000));
        const pollRes = await fetch('/api/veo/status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ operationName })
        });
        const pollData = await pollRes.json();
        if (!pollRes.ok) {
          throw new Error(pollData.error || 'Error checking video status.');
        }
        if (pollData.error) {
          throw new Error(pollData.error);
        }
        if (pollData.done) {
          isDone = true;
          break;
        }
      }

      if (!isDone) {
        throw new Error('Video generation timed out. Please try again.');
      }

      // Download video stream
      const dlRes = await fetch('/api/veo/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operationName })
      });

      if (!dlRes.ok) {
        const errJson = await dlRes.json().catch(() => ({}));
        throw new Error(errJson.error || 'Failed to download generated video.');
      }

      const blob = await dlRes.blob();
      const objectUrl = URL.createObjectURL(blob);
      setVideoUrl(objectUrl);
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred during Veo video generation.'
      );
    } finally {
      clearInterval(msgTimer);
      setIsGenerating(false);
    }
  };

  return (
    <section
      aria-label="Veo Editorial Photo-to-Video Motion Lab"
      className="w-full py-12 border-t border-[#E2DDD2]"
    >
      <div className="liquid-glass rounded-2xl p-6 sm:p-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#E2DDD2]">
          <div>
            <div className="font-mono-tabular text-xs uppercase tracking-widest text-[#A68B6A] mb-2 flex items-center gap-2">
              <Film className="w-3.5 h-3.5" />
              <span>MOTION ART DIRECTION LAB · VEO 3.1</span>
            </div>
            <h2 className="font-serif-editorial font-bold text-3xl sm:text-4xl text-[#171614]">
              Animate Campaign Stills Into Editorial Video.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#777168] max-w-md">
            Upload a portrait or campaign photograph and direct a <code className="font-mono-tabular">16:9</code> or <code className="font-mono-tabular">9:16</code> motion reel powered by <code className="font-mono-tabular">veo-3.1-fast-generate-preview</code>.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Upload & Motion Controls */}
          <form onSubmit={handleGenerateVideo} className="lg:col-span-6 space-y-5">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            <div>
              <label className="block text-xs font-mono-tabular uppercase tracking-wider text-[#171614] mb-2">
                1. Source Photograph
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-[#171614] bg-[#FFFFFF] border border-[#D4CEC3] rounded-xl hover:border-[#A68B6A] transition-colors cursor-pointer"
                >
                  <Upload className="w-4 h-4 text-[#A68B6A]" />
                  <span>Upload Photo</span>
                </button>

                <button
                  type="button"
                  onClick={handleUseEditorialSample}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-[#777168] hover:text-[#171614] transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#A68B6A]" />
                  <span>Use Studio Title Frame</span>
                </button>
              </div>
            </div>

            {/* Aspect Ratio Selector: 16:9 or 9:16 */}
            <div>
              <label className="block text-xs font-mono-tabular uppercase tracking-wider text-[#171614] mb-2">
                2. Target Aspect Ratio
              </label>
              <div className="inline-flex p-1 rounded-xl bg-[#ECE7DC] border border-[#E2DDD2]">
                {(['16:9', '9:16'] as const).map((ratio) => (
                  <button
                    key={ratio}
                    type="button"
                    onClick={() => setAspectRatio(ratio)}
                    className={`px-4 py-2 rounded-lg text-xs font-mono-tabular transition-colors cursor-pointer ${
                      aspectRatio === ratio
                        ? 'bg-[#171614] text-[#F4F1EA] font-semibold'
                        : 'text-[#777168] hover:text-[#171614]'
                    }`}
                  >
                    {ratio === '16:9' ? '16:9 Landscape' : '9:16 Portrait'}
                  </button>
                ))}
              </div>
            </div>

            {/* Motion Prompt */}
            <div>
              <label
                htmlFor="veo-prompt"
                className="block text-xs font-mono-tabular uppercase tracking-wider text-[#171614] mb-2"
              >
                3. Camera &amp; Lighting Direction
              </label>
              <textarea
                id="veo-prompt"
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full px-4 py-3 text-sm rounded-xl bg-[#FFFFFF] border border-[#D4CEC3] text-[#171614] focus:outline-none focus:border-[#A68B6A]"
              />
            </div>

            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-900 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isGenerating}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#F4F1EA] bg-[#171614] rounded-xl hover:bg-[#2E2B27] disabled:opacity-60 transition-colors cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#A68B6A]" />
                  <span>{REASSURING_MESSAGES[statusStep]}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-[#A68B6A]" />
                  <span>Animate Photo into {aspectRatio} Video</span>
                </>
              )}
            </button>
          </form>

          {/* Right: Preview & Video Player */}
          <div className="lg:col-span-6">
            <div className="rounded-xl bg-[#171614] text-[#F4F1EA] p-5 min-h-[280px] flex flex-col items-center justify-center relative overflow-hidden border border-[#2E2B27]">
              {videoUrl ? (
                <div className="w-full space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono-tabular text-[#A68B6A]">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>VEO 3.1 REEL READY ({aspectRatio})</span>
                    </span>
                    <a
                      href={videoUrl}
                      download={`tanishq-motion-${aspectRatio.replace(':', 'x')}.mp4`}
                      className="inline-flex items-center gap-1 text-[#F4F1EA] hover:text-[#A68B6A]"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Save MP4</span>
                    </a>
                  </div>
                  <video
                    src={videoUrl}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className={`w-full rounded-lg bg-black mx-auto ${
                      aspectRatio === '9:16' ? 'max-w-[240px] aspect-[9/16]' : 'aspect-video'
                    }`}
                  />
                </div>
              ) : imagePreview ? (
                <div className="w-full text-center space-y-3">
                  <span className="text-[11px] font-mono-tabular text-[#A68B6A] block">
                    SOURCE STILL LOADED · TARGET {aspectRatio}
                  </span>
                  <img
                    src={imagePreview}
                    alt="Uploaded still preview for Veo animation"
                    referrerPolicy="no-referrer"
                    className="max-h-56 mx-auto rounded-lg object-contain border border-[#3A352F]"
                  />
                </div>
              ) : (
                <div className="text-center max-w-xs space-y-2 py-8">
                  <Film className="w-8 h-8 text-[#A68B6A] mx-auto mb-2" />
                  <p className="font-serif-editorial text-2xl text-[#F4F1EA]">
                    Ready to Animate Your Frame
                  </p>
                  <p className="text-xs text-[#A39B90]">
                    Upload any portrait or campaign image on the left to generate a smooth 720p editorial motion clip.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
