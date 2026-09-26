const youtubeVideos = [
  "https://www.youtube.com/embed/qYhKm8HNnj8?modestbranding=1&controls=1&rel=0&showinfo=0",
  "https://www.youtube.com/embed/n91CEUwXmrQ?modestbranding=1&controls=1&rel=0&showinfo=0",
  "https://www.youtube.com/embed/BltPBP-RD1s?modestbranding=1&controls=1&rel=0&showinfo=0",
  "https://www.youtube.com/embed/GvgXczJZSN8?modestbranding=1&controls=1&rel=0&showinfo=0",
  "https://www.youtube.com/embed/Xkh3t_zs8qY?modestbranding=1&controls=1&rel=0&showinfo=0",
  "https://www.youtube.com/embed/axza2DFSaJQ?modestbranding=1&controls=1&rel=0&showinfo=0",
  "https://www.youtube.com/embed/_vLGjxurNsY?modestbranding=1&controls=1&rel=0&showinfo=0",
  "https://www.youtube.com/embed/5MpGx6p6a5M?modestbranding=1&controls=1&rel=0&showinfo=0",
  "https://www.youtube.com/embed/5LjtlsEtZUs?modestbranding=1&controls=1&rel=0&showinfo=0",
];

export default function Music() {
  return (
    <main className="max-w-6xl mx-auto py-16 px-6 sm:px-8 pb-24">
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold text-white mb-6 sm:mb-8 text-center tracking-tight">Listen</h1>
      <p className="text-base sm:text-lg text-gray-400 text-center mb-10 sm:mb-12">
        Explore Barhama&#39;s music videos below
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {youtubeVideos.map((src, idx) => (
          <div key={src} className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-2xl hover:shadow-primary/20 transition-shadow duration-300">
            <iframe
              src={src}
              title={`Barhama Cham Video ${idx + 1}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full min-h-[200px]"
              loading="lazy"
            ></iframe>
          </div>
        ))}
      </div>
    </main>
  );
} 