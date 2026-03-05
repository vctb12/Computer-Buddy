'use client';
export function NoticeRegion({ text }: { text: string }) {
  return <p aria-live="polite" className="muted">{text}</p>;
}
