import { useRef, useState, type PointerEvent, type KeyboardEvent } from "react";

interface Props {
  /** Real turntable frames (e.g. 24–36 images). When present, drag scrubs frames. */
  frames?: string[];
  label?: string;
  tint?: [string, string];
}

/**
 * Click-drag 360° product viewer.
 * - With `frames`: a photo turntable — horizontal drag scrubs through frames.
 * - Without: a live CSS-3D demo cube so the rotate interaction works today;
 *   real turntable frames drop in with no API change.
 */
export default function Turntable360({ frames, tint = ["#e7ebe2", "#d7ddd0"], label }: Props) {
  const hasFrames = !!frames && frames.length > 0;
  const [ry, setRy] = useState(24);
  const [rx, setRx] = useState(-14);
  const [dragging, setDragging] = useState(false);
  const start = useRef<{ x: number; y: number; ry: number; rx: number } | null>(null);

  function onDown(e: PointerEvent) {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    start.current = { x: e.clientX, y: e.clientY, ry, rx };
    setDragging(true);
  }
  function onMove(e: PointerEvent) {
    if (!start.current) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    setRy(start.current.ry + dx * 0.6);
    if (!hasFrames) setRx(Math.max(-40, Math.min(18, start.current.rx - dy * 0.3)));
  }
  function onUp() {
    start.current = null;
    setDragging(false);
  }
  function onKey(e: KeyboardEvent) {
    if (e.key === "ArrowLeft") setRy((r) => r - 15);
    if (e.key === "ArrowRight") setRy((r) => r + 15);
  }

  const cursor = dragging ? "grabbing" : "grab";
  const hint = (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-forest/70 bg-cream/80 rounded-full px-3 py-1 pointer-events-none">
      ↔ Drag to rotate
    </div>
  );

  if (hasFrames) {
    const n = frames!.length;
    const idx = (((Math.round(ry / (360 / n)) % n) + n) % n);
    return (
      <div
        className="ph relative aspect-square rounded-3xl border border-line select-none touch-none overflow-hidden"
        style={{ cursor, ["--ph-a" as string]: tint[0], ["--ph-b" as string]: tint[1] }}
        data-label=""
        role="img"
        aria-label={`${label ?? "Product"} 360 degree view`}
        tabIndex={0}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onKeyDown={onKey}
      >
        <img src={frames![idx]} alt="" draggable={false} className="w-full h-full object-cover" />
        {hint}
      </div>
    );
  }

  // Demo cube
  const S = 220;
  const face = (transform: string, shade: number, text: string) => (
    <div
      key={text}
      className="absolute grid place-items-center font-serif text-forest/60 text-sm border border-line/60"
      style={{
        width: S,
        height: S,
        transform,
        background: `linear-gradient(135deg, ${tint[0]}, ${tint[1]})`,
        filter: `brightness(${shade})`,
      }}
    >
      {text}
    </div>
  );

  return (
    <div
      className="relative aspect-square rounded-3xl border border-dashed border-sage overflow-hidden select-none touch-none grid place-items-center"
      style={{ cursor, background: "radial-gradient(120% 120% at 30% 20%, #fbf9f3, #eef0e8)" }}
      role="img"
      aria-label={`${label ?? "Product"} 360 degree preview — drag to rotate`}
      tabIndex={0}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onKeyDown={onKey}
    >
      <div style={{ perspective: 900 }}>
        <div
          style={{
            width: S,
            height: S,
            position: "relative",
            transformStyle: "preserve-3d",
            transform: `rotateX(${rx}deg) rotateY(${ry}deg)`,
            transition: dragging ? "none" : "transform 0.25s ease-out",
          }}
        >
          {face(`rotateY(0deg) translateZ(${S / 2}px)`, 1.02, "Front")}
          {face(`rotateY(90deg) translateZ(${S / 2}px)`, 0.92, "Right")}
          {face(`rotateY(180deg) translateZ(${S / 2}px)`, 0.86, "Back")}
          {face(`rotateY(-90deg) translateZ(${S / 2}px)`, 0.92, "Left")}
          {face(`rotateX(90deg) translateZ(${S / 2}px)`, 1.08, "Top")}
          {face(`rotateX(-90deg) translateZ(${S / 2}px)`, 0.8, "")}
        </div>
      </div>
      {hint}
      <div className="absolute top-3 right-3 text-[10px] uppercase tracking-wide text-sage font-semibold bg-cream/80 rounded-full px-2 py-0.5 pointer-events-none">
        360° demo
      </div>
    </div>
  );
}
