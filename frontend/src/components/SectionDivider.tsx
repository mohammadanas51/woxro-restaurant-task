export default function SectionDivider() {
  return (
    <div className="md:hidden py-12 flex items-center justify-center px-8">
      <div className="flex-1 h-px bg-white" />
      <div className="flex items-center justify-center gap-4 px-6">
        <div className="w-1 h-1 bg-[var(--accent-gold)] rotate-45" />
        <div className="w-2.5 h-2.5 border border-[var(--accent-gold)] rotate-45" />
        <div className="w-1 h-1 bg-[var(--accent-gold)] rotate-45" />
      </div>
      <div className="flex-1 h-px bg-white" />
    </div>
  );
}
