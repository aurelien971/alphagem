"use client";

export default function LearnMoreButton({
  targetId,
  children,
  className,
}: {
  targetId: string;
  children: React.ReactNode;
  className?: string;
}) {
  const handleClick = () => {
    const el = document.getElementById(targetId);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}