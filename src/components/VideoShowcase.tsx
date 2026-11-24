import { useRef, useState } from 'react';
import { Film, Pause, Play } from 'lucide-react';
import { SafeImage } from './SafeImage';

interface PreviewFrame {
  src: string;
  label: string;
}

interface VideoShowcaseProps {
  heading: string;
  subheading: string;
  videoSrc: string;
  posterSrc: string;
  posterAlt: string;
  previewFrames: PreviewFrame[];
  surface?: 'ivory' | 'olive';
}

export function VideoShowcase({
  heading,
  subheading,
  videoSrc,
  posterSrc,
  posterAlt,
  previewFrames,
  surface = 'ivory',
}: VideoShowcaseProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoMissing, setVideoMissing] = useState(false);
  const [selectedFrameIndex, setSelectedFrameIndex] = useState(0);

  const isOlive = surface === 'olive';

  const handlePlayAttempt = async () => {
    setHasStarted(true);
    const videoEl = videoRef.current;
    if (!videoEl) return;

    try {
      await videoEl.play();
      setIsPlaying(true);
    } catch {
      // Missing local file or browser decode error triggers onError / state
      if (videoEl.error || videoEl.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
        setVideoMissing(true);
      }
      setIsPlaying(false);
    }
  };

  const handleTogglePlay = () => {
    const videoEl = videoRef.current;
    if (!videoEl || videoMissing) return;
    if (videoEl.paused) {
      void handlePlayAttempt();
    } else {
      videoEl.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      className={
        isOlive
          ? 'bg-[#34483D] text-[#F3EDE2] py-16 sm:py-24'
          : 'bg-[#F3EDE2] text-[#34483D] py-16 sm:py-24 border-y border-[#34483D]/10'
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-semibold tracking-wider uppercase text-[#B9785C] mb-3">
            Apartment Walkthrough
          </p>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-balance">
            {heading}
          </h2>
          <p
            className={`mt-4 text-base leading-relaxed ${
              isOlive ? 'text-[#F3EDE2]/80' : 'text-[#34483D]/80'
            }`}
          >
            {subheading}
          </p>
        </div>

        {/* Responsive 16:9 Video Frame */}
        <div className="relative aspect-video w-full overflow-hidden border border-[#B9785C]/30 bg-[#34483D]">
          {!videoMissing ? (
            <>
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster={posterSrc}
                controls={hasStarted}
                playsInline
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onError={() => {
                  if (hasStarted) {
                    setVideoMissing(true);
                  }
                }}
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support embedded video playback.
              </video>

              {!hasStarted && (
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 bg-gradient-to-t from-[#34483D]/85 via-[#34483D]/25 to-transparent">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#F3EDE2]/80 mb-1">
                        Walkthrough Preview
                      </p>
                      <p className="font-display text-xl sm:text-2xl text-[#F3EDE2]">
                        {posterAlt}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => void handlePlayAttempt()}
                      aria-label={`Play apartment walkthrough video: ${heading}`}
                      className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#B9785C] text-[#F3EDE2] hover:bg-[#F3EDE2] hover:text-[#34483D] transition-colors duration-200 font-semibold text-sm shrink-0 cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current" aria-hidden="true" />
                      <span>Play Walkthrough</span>
                    </button>
                  </div>
                </div>
              )}

              {hasStarted && (
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  className="sr-only"
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
              )}
            </>
          ) : (
            /* Honest Placeholder State when MP4 file is not yet placed in public/videos/ */
            <div className="relative w-full h-full">
              <SafeImage
                src={previewFrames[selectedFrameIndex]?.src || posterSrc}
                alt={previewFrames[selectedFrameIndex]?.label || posterAlt}
                loading="eager"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#34483D]/95 via-[#34483D]/45 to-[#34483D]/25 flex flex-col justify-between p-5 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#34483D]/90 border border-[#F3EDE2]/20 text-xs text-[#F3EDE2]">
                    <Film className="w-3.5 h-3.5 text-[#B9785C] shrink-0" aria-hidden="true" />
                    <span>
                      Video file not yet uploaded at <code className="font-mono">{videoSrc}</code>
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="max-w-xl">
                    <p className="text-sm sm:text-base text-[#F3EDE2] font-medium">
                      {previewFrames[selectedFrameIndex]?.label}
                    </p>
                    <p className="text-xs sm:text-sm text-[#F3EDE2]/80 mt-1">
                      Showing interior stills while awaiting your MP4 footage. Add your apartment video file to{' '}
                      <code className="font-mono text-[#F3EDE2]">public{videoSrc}</code> to enable native video playback.
                    </p>
                  </div>

                  {/* Interactive scene switcher while awaiting MP4 */}
                  <div className="flex flex-wrap gap-2">
                    {previewFrames.map((frame, idx) => (
                      <button
                        key={frame.src}
                        type="button"
                        onClick={() => setSelectedFrameIndex(idx)}
                        className={`px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer ${
                          selectedFrameIndex === idx
                            ? 'bg-[#B9785C] text-[#F3EDE2]'
                            : 'bg-[#34483D]/80 text-[#F3EDE2]/85 border border-[#F3EDE2]/25 hover:border-[#B9785C]'
                        }`}
                      >
                        {idx + 1}. {frame.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs opacity-75">
          <span>
            Replaceable video source path: <code className="font-mono">{videoSrc}</code>
          </span>
          {videoMissing && (
            <button
              type="button"
              onClick={() => {
                setVideoMissing(false);
                setHasStarted(false);
              }}
              className="inline-flex items-center gap-1 underline underline-offset-4 cursor-pointer self-start sm:self-auto"
            >
              <Pause className="w-3 h-3" aria-hidden="true" />
              <span>Reset video player</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
