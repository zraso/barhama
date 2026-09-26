import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="relative flex min-h-[calc(60vh+140px)] max-sm:h-[calc(100svh-80px)] max-sm:min-h-0 max-sm:overflow-hidden sm:min-h-[calc(70vh+140px)] flex-col bg-secondary">
        <Image
          src="/barhama-homepage.jpg"
          alt="Barhama Cham Hero"
          fill
          className="object-cover object-[center_75%] opacity-80 max-sm:origin-center max-sm:scale-[1.08] sm:scale-100"
          priority
        />
        <div className="relative z-10 flex min-h-0 flex-1 flex-col">
          <div className="flex min-h-0 flex-1 items-start justify-center text-center px-4 pt-24 pb-6 sm:items-center sm:py-12 sm:p-8 w-full">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold text-white drop-shadow-lg mb-4 sm:mb-5 tracking-tight">
                Barhama Cham
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-accent font-medium drop-shadow-md tracking-tight">
                The Voice of The Gambia
              </p>
            </div>
          </div>

          {/* Music player sits on the same hero background (no black strip) */}
          <div className="w-full flex items-center justify-center px-2 pb-20 min-h-[120px] sm:pb-24">
            <div className="w-full max-w-xl flex items-center justify-center opacity-90">
              <iframe
                src="https://open.spotify.com/embed/artist/0jTXrnQV2eR82q1EBCUwVJ?theme=0"
                width="100%"
                height="80"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Player"
                className="rounded-lg opacity-95"
                style={{ filter: "brightness(0.95)" }}
              ></iframe>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent z-0" />
      </section>
    </>
  );
}
