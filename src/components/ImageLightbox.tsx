import { useCallback, useEffect, useRef, useState } from "react";

const MIN = 1;
const MAX = 4;
const STEP = 0.5;

/**
 * Full-screen image viewer: zoom with the buttons, the wheel or a double-click,
 * drag to pan once zoomed, arrow keys to move between shots, Escape to close.
 */
export default function ImageLightbox({
  images,
  index,
  alt,
  onIndexChange,
  onClose,
}: {
  images: string[];
  index: number;
  alt: string;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const reset = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const zoomBy = useCallback((delta: number) => {
    setZoom((z) => {
      const next = Math.min(MAX, Math.max(MIN, +(z + delta).toFixed(2)));
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (images.length < 2) return;
      reset();
      onIndexChange((index + dir + images.length) % images.length);
    },
    [images.length, index, onIndexChange, reset]
  );

  // keyboard + scroll lock while open
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "+" || e.key === "=") zoomBy(STEP);
      else if (e.key === "-") zoomBy(-STEP);
      else if (e.key === "0") reset();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [go, onClose, reset, zoomBy]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${alt} — enlarged view`}
      className="fixed inset-0 z-[100] bg-ink/92 backdrop-blur-sm flex flex-col animate-[fade-in_.18s_ease-out]"
      onClick={onClose}
    >
      {/* toolbar */}
      <div
        className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 text-white shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-[13px] text-white/80 tabular-nums">
          {images.length > 1 ? `${index + 1} / ${images.length}` : ""}
        </span>
        <div className="flex items-center gap-2">
          <IconButton label="Zoom out" onClick={() => zoomBy(-STEP)} disabled={zoom <= MIN}>
            <path d="M5 12h14" />
          </IconButton>
          <span className="text-[13px] tabular-nums w-12 text-center">{Math.round(zoom * 100)}%</span>
          <IconButton label="Zoom in" onClick={() => zoomBy(STEP)} disabled={zoom >= MAX}>
            <path d="M12 5v14M5 12h14" />
          </IconButton>
          <button
            type="button"
            onClick={reset}
            className="text-[13px] px-3 h-10 rounded-full border border-white/40 hover:bg-white/10 transition-colors"
          >
            Reset
          </button>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close enlarged view"
            className="w-10 h-10 grid place-items-center rounded-full border border-white/40 hover:bg-white/10 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      </div>

      {/* stage */}
      <div
        className="flex-1 min-h-0 relative flex items-center justify-center overflow-hidden select-none"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => zoomBy(e.deltaY < 0 ? STEP / 2 : -STEP / 2)}
        onDoubleClick={() => (zoom > 1 ? reset() : zoomBy(1))}
        onPointerDown={(e) => {
          if (zoom <= 1) return;
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          drag.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          setPan({
            x: drag.current.px + (e.clientX - drag.current.x),
            y: drag.current.py + (e.clientY - drag.current.y),
          });
        }}
        onPointerUp={() => (drag.current = null)}
        style={{ cursor: zoom > 1 ? (drag.current ? "grabbing" : "grab") : "zoom-in" }}
      >
        <img
          src={images[index]}
          alt={alt}
          draggable={false}
          className="max-w-[92vw] max-h-full object-contain will-change-transform"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transition: drag.current ? "none" : "transform .18s ease-out",
          }}
        />

        {images.length > 1 && (
          <>
            <Arrow side="left" onClick={() => go(-1)} />
            <Arrow side="right" onClick={() => go(1)} />
          </>
        )}
      </div>

      {/* thumbnails */}
      {images.length > 1 && (
        <div
          className="shrink-0 flex gap-2 justify-center px-4 py-4 overflow-x-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => {
                reset();
                onIndexChange(i);
              }}
              aria-label={`View image ${i + 1}`}
              aria-current={i === index}
              className={`w-14 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-colors ${
                i === index ? "border-white" : "border-white/30 hover:border-white/70"
              }`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function IconButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="w-10 h-10 grid place-items-center rounded-full border border-white/40 hover:bg-white/10 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        {children}
      </svg>
    </button>
  );
}

function Arrow({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous image" : "Next image"}
      className={`absolute top-1/2 -translate-y-1/2 ${
        side === "left" ? "left-3" : "right-3"
      } w-11 h-11 grid place-items-center rounded-full bg-ink/60 text-white border border-white/30 hover:bg-ink/80 transition-colors`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={side === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
      </svg>
    </button>
  );
}
