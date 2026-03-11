'use client';

export default function ScrollHint() {
  const handleClick = () => {
    const hero = document.getElementById('home');
    if (hero) {
      const nextSection = hero.nextElementSibling as HTMLElement | null;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <button
      className="hero__scroll-hint"
      aria-label="Scroll to next section"
      onClick={handleClick}
    >
      <i className="ph ph-caret-down"></i>
    </button>
  );
}
