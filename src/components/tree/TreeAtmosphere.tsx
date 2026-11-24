export function TreeAtmosphere() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #FDFBF6 0%, #F6F1E5 62%, #EDE6D3 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 36%, rgba(255,247,214,.85) 0%, rgba(255,247,214,0) 70%)' }} />
    </div>
  );
}
