import React from 'react';

const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base black background */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Cybersecurity-themed background image */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Enhanced greyish pattern overlay */}
      <div 
        className="absolute inset-0 opacity-25 animate-pattern-fade"
        style={{
          backgroundImage: `
            linear-gradient(rgba(128, 128, 128, 0.25) 1px, transparent 1px),
            linear-gradient(90deg, rgba(128, 128, 128, 0.25) 1px, transparent 1px),
            linear-gradient(45deg, rgba(128, 128, 128, 0.15) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(128, 128, 128, 0.15) 1px, transparent 1px),
            radial-gradient(circle at 25% 25%, rgba(128, 128, 128, 0.35) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(128, 128, 128, 0.35) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px, 60px 60px, 40px 40px, 40px 40px, 30px 30px, 30px 30px',
          backgroundPosition: '0 0, 0 0, 0 0, 0 0, 0 0, 15px 15px',
        }}
      />
      
      {/* Additional geometric pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(128, 128, 128, 0.1) 10px,
              rgba(128, 128, 128, 0.1) 20px
            )
          `,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Cyber grid pattern */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Animated orbs */}
      <div className="absolute inset-0">
        {/* Orb 1 - Cyan */}
        <div 
          className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-orb-1"
          style={{ top: '20%', left: '10%' }}
        />
        
        {/* Orb 2 - Magenta */}
        <div 
          className="absolute w-80 h-80 bg-magenta-500/15 rounded-full blur-3xl animate-orb-2"
          style={{ top: '60%', right: '15%' }}
        />
        
        {/* Orb 3 - Lime */}
        <div 
          className="absolute w-72 h-72 bg-lime-500/10 rounded-full blur-3xl animate-orb-3"
          style={{ bottom: '20%', left: '30%' }}
        />
      </div>
      
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black/90" />
      
      {/* Additional gradient mesh */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 0, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(0, 255, 0, 0.05) 0%, transparent 50%)
          `
        }}
      />
      
      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />
      
      {/* Enhanced particle effect */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
        
        {/* Larger floating elements */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`large-${i}`}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Background; 