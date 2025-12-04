const Header = () => {
  return (
    <header className="relative h-16 bg-card/50 backdrop-blur-sm border-b-2 border-primary flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 hologram opacity-30" />
      <div className="absolute inset-0 scanlines opacity-50" />

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-4">
        {/* Left decorative element */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-8 h-[2px] bg-gradient-to-r from-transparent to-primary" />
          <div className="w-2 h-2 bg-primary rotate-45 animate-pulse-neon" />
          <div className="w-4 h-[2px] bg-primary" />
        </div>

        {/* Title */}
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-[0.3em] text-foreground neon-text animate-pulse-neon">
          MIND-NET
        </h1>

        {/* Right decorative element */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-4 h-[2px] bg-primary" />
          <div className="w-2 h-2 bg-primary rotate-45 animate-pulse-neon" />
          <div className="w-8 h-[2px] bg-gradient-to-l from-transparent to-primary" />
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-primary opacity-60" />
      <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-primary opacity-60" />
      <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-primary opacity-60" />
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-primary opacity-60" />

      {/* Animated scan line */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div
          className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          style={{
            animation: "scanline 4s linear infinite",
          }}
        />
      </div>
    </header>
  );
};

export default Header;
