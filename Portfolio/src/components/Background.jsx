// Bright, airy background matching glance.com: soft white canvas with
// gentle violet/magenta gradient orbs and a faint dotted grid at the top.
export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[--color-bg]">
      {/* Morphing gradient blobs (CodePen-style) */}
      <div
        className="blob absolute -top-40 -left-32 h-[40rem] w-[40rem]"
        style={{ background: "conic-gradient(from 120deg, #5a34f5, #be52c4, #5ec2f9, #5a34f5)", opacity: "calc(0.16 * var(--orb-opacity))", filter: "blur(80px)" }}
      />
      <div
        className="blob absolute top-1/4 -right-40 h-[36rem] w-[36rem]"
        style={{ background: "conic-gradient(from 300deg, #be52c4, #ff6b35, #5a34f5, #be52c4)", opacity: "calc(0.14 * var(--orb-opacity))", filter: "blur(80px)", animationDelay: "-9s", animationDirection: "reverse" }}
      />
      <div
        className="orb absolute bottom-0 left-1/3 h-[32rem] w-[32rem] rounded-full"
        style={{ background: "radial-gradient(circle, #5ec2f9, transparent 60%)", animationDelay: "-16s", opacity: "calc(0.12 * var(--orb-opacity))" }}
      />
      {/* Faint dotted grid, fading out below the hero */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: "radial-gradient(var(--dot-color) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse 90% 55% at 50% 0%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 55% at 50% 0%, black 30%, transparent 100%)",
        }}
      />
    </div>
  );
}
