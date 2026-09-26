import Image from "next/image";

export default function About() {
  return (
    <main className="max-w-5xl mx-auto py-16 px-6 sm:px-8 pb-24">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white mb-16 sm:mb-20 text-center tracking-tight">About Barhama Cham</h1>
      
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Introduction */}
        <div className="text-center space-y-6">
          <p className="text-lg sm:text-xl text-gray-200 leading-relaxed">
            In Sanchaba Suly Jobe, a village in The Gambia where history is carried
            by voice long before it reaches the page,{" "}
            <span className="text-primary font-medium">Ebrima Cham</span> encountered
            music as meaning before he understood it as performance.
          </p>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            His mother, <span className="text-accent font-medium">Fatou Thiam</span>,
            was a market seller, but at home she was a storyteller whose songs carried
            memory, rhythm, and moral weight. Through her voice, Ebrima learned that
            music was not first about entertainment, but about transmission.
          </p>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            As a child, he echoed those melodies quietly when he was alone. Over time,
            people around him began to notice the sincerity and strength in his voice,
            often before he recognized it himself.
          </p>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Music was not an obvious inheritance. His father,{" "}
            <span className="text-primary font-medium">Babacar Thiam</span>, was a
            tailor and an imam, and in a society where musical lineage traditionally
            belongs to griot families, singing without that ancestry could be seen as
            inappropriate. When Ebrima realized it was not a hobby but a calling, the
            awareness both clarified and unsettled him.
          </p>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto italic">
            Rather than rebel, he waited.
          </p>
        </div>

        {/* Activism - Stylized Cards */}
        <div className="text-center">
          <div className="flex justify-center my-8">
            <div className="relative w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/about2.jpg"
                alt="Barhama Cham"
                width={800}
                height={600}
                className="object-cover w-full h-auto"
              />
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white pt-8 mb-8 tracking-tight">Music as a Tool for Change</h2>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto mb-6">
            Named after <span className="text-primary font-medium">Baye Niasse</span>,
            the revered Islamic scholar and spiritual leader, Ebrima felt the
            responsibility of his name deeply. When the pull toward music became
            impossible to ignore, he chose proof over protest, recording a song in honor
            of Baye Niasse while still unsure of his voice.
          </p>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto mb-6">
            The turning point came during a Gamou in Kaolack, Senegal, when his sister
            played the recording for their family. After listening, an uncle asked who
            the singer was. When his sister replied that it was Ebrima, the family
            responded with blessing, offering guidance that would shape his path:
            singing in a way your future self will respect, and in a way that leaves
            something behind.
          </p>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8">
            That blessing became a responsibility. He later chose the name{" "}
            <span className="text-accent font-medium">Barhama</span>, drawn from the
            spiritual tradition surrounding Baye Niasse, meaning son of peace and son of
            life. The name became a compass, grounding his work and reminding him that
            when Barhama speaks, it is not only a voice being heard, but a promise being
            kept.
          </p>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto mb-8">
            Barhama uses music to create awareness on crucial matters:
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
            {['Gender-based Violence', 'Climate Change', 'Peace and Reconciliation', 'Transitional Justice', 'Employment'].map((topic) => (
              <span 
                key={topic}
                className="px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-full text-sm text-gray-300 hover:border-primary hover:text-primary transition-all duration-300 cursor-default"
              >
                {topic}
              </span>
            ))}
          </div>
          <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto space-y-5 text-left sm:text-center">
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              By the time he formally began his career in{" "}
              <span className="text-primary font-medium">2016</span>, Barhama had already
              decided that sound alone was not enough. His activism began at home,
              shaped by the example of his parents&apos; relationship and his belief in
              dignity and respect, particularly for women. When he encountered
              gender-based violence, music became his response. A collaborative song on
              the issue revealed that music could carry cause without losing soul.
            </p>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              From there, his work expanded into themes of peace, climate change,
              reconciliation, and civic responsibility, always rooted in Gambian life.
              In <span className="text-accent font-medium">2019</span>, he represented
              The Gambia at the <span className="text-primary font-medium">UNFPA Summit</span>{" "}
              in Dakar, advocating through performance for the rights of women, followed
              by collaborations with <span className="text-accent font-medium">UNDP</span>{" "}
              and other institutions.
            </p>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              In <span className="text-primary font-medium">2021</span>, during a tense
              election period, he staged a stadium concert centered on peace, bringing
              fifteen thousand voices together with the hope that the message would
              follow them home.
            </p>
          </div>
          </div>
        </div>

        {/* Gambian sound & next chapter */}
        <div className="text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6 tracking-tight">Gambian Sound, Carried Forward</h2>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            At the core of Barhama&apos;s work is a commitment to The Gambia itself.
            Despite being the birthplace of the kora and a historic exporter of sound
            across the region, Gambian music remains underrecognized.
          </p>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Influenced by artists like Bob Marley and The Wailers, who treated music as
            liberation rather than spectacle, Barhama now enters a new chapter. What began
            as a solo journey is becoming a collective one through the formation of a
            band, aimed at carrying Gambian sound beyond its borders.
          </p>
          <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-3xl mx-auto">
            For Barhama, music remains a living responsibility — one that carries Gambian
            sound forward while staying rooted in where it began.
          </p>
        </div>

        {/* Name & Legacy - Special Highlight */}
        <div className="text-center space-y-6">
          <div className="flex justify-center my-6 mb-8">
            <div className="relative w-full max-w-md rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/about1.jpg"
                alt="Barhama Cham"
                width={600}
                height={400}
                className="object-cover w-full h-auto"
              />
            </div>
          </div>
          <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-3xl mx-auto pt-8">
            Today, audiences know that voice as{" "}
            <span className="text-primary font-medium">Barhama Cham</span> — an
            Afro-pop artist with a <span className="text-accent font-medium">golden voice</span>{" "}
            and a live presence shaped by years of discipline, story, and service.
          </p>
        </div>
      </div>
    </main>
  );
} 