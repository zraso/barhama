import Image from "next/image";

const musicians = [
  {
    name: "Samuel Peter Thomas",
    role: "Keyboardist & Bass Guitarist",
    imageSrc: "/samuel-peter-thomas.jpg",
    summary:
      "Samuel is a Sierra Leonean-born keyboardist and bass guitarist who came to The Gambia in 1999 after the war in Sierra Leone. Music became refuge and direction, first through the church, where he found discipline, grounding, and a sense of calling. Influenced by his guitarist father and Nigerian artists of his generation, he began on keyboard in the early 2000s, then built a reputation for versatility across both instruments. Mentor Bernard Thomas helped him see music as something that could be pursued with integrity and sustainability, even alongside formal studies in accounting and MIS. His sound blends funk with African grooves like sebene and soukous, and he brings that same sense of service and long-term vision to Barhama’s band.",
  },
  {
    name: "Mawdo Kuyateh",
    role: "Lead Guitarist",
    imageSrc: "/mawdo-kuyateh.jpg",
    summary:
      "Mawdo is a Gambian guitarist shaped by deep griot lineage, where music, history, and responsibility travel together. On both sides of his family, griot tradition runs close, including figures like his uncle Ansumana Suso and a heritage that reaches across generations and performance history. Though his father served as a soldier, music remained central at home, and after commerce and entrepreneurship studies, Mawdo committed fully to the guitar in 2015. His playing is rooted in traditional Manding music and stretches into mbalax and Afrobeats, balancing discipline with instinct. Recognised as one of The Gambia’s rare highly skilled guitarists, he treats Barhama’s band as his musical home and a bridge between ancestral Mande tradition and contemporary African sound.",
  },
  {
    name: "Abdoulie Kuyateh",
    role: "Calabash & Percussion",
    imageSrc: "/abdoulie-kuyateh.jpg",
    summary:
      "Abdoulie is a Gambian percussionist and calabash player born into a griot family where music is inherited as much as learned. He began playing in junior school and was the first balafon player in his early musical environment before deepening into Afro-Manding rhythm and calabash work. His journey also passed through formal institutions, including the Gambia Police Force band as a saxophonist and later the Gambia Airport Authority, before he chose to follow his artistic purpose full time. He has performed across regional spaces, integrating traditional percussion into contemporary settings, and speaks plainly about what Gambian musicians need most: stronger infrastructure and support, not more talent. In Sitaa Ba, he strengthens the band’s Afro-Manding foundation with precision, depth, and cultural grounding.",
  },
  {
    name: "Mbemba Saho",
    role: "Kora",
    imageSrc: "/mbemba-saho.jpg",
    summary:
      "Mbemba is a Gambian kora player from Bakoteh, carrying a lineage where the instrument is both inheritance and responsibility, passed from his grandfather through his father, Seikou Saho Jali, a respected griot and master player. He learned under his elder brother Souleyman Jobateh when touring schedules made daily instruction harder to hold, then deepened his craft through curiosity, discipline, and expanding music theory. That foundation allows him to move the kora across reggae, jazz, and modern African contexts without losing its voice, shaped further by the influence of the late Ansumana Suso. Beyond performance, he is committed to teaching younger generations that the kora is Gambian in origin and story, restoring knowledge alongside sound. With Sitaa Ba, he brings continuity, mastery, and a clear sense of where the music comes from and where it can travel next.",
  },
];

export default function SitaBaa() {
  return (
    <main className="max-w-6xl mx-auto py-16 px-6 sm:px-8 pb-24">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white mb-8 text-center tracking-tight">
        The Band
      </h1>

      <section className="max-w-4xl mx-auto mb-14 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-5 tracking-tight">
          Sitaa Ba Band: The Big Baobab
        </h2>
        <div className="space-y-5 text-base sm:text-lg text-gray-300 leading-relaxed">
          <p>
            In our quest for authentic representation as Africans, and
            particularly as Gambians, we believe our identity goes beyond mere
            names or sounds. It must resonate deeply with our history, culture,
            and community traditions.
          </p>
          <p>
            Sitaa Ba is a musical band dedicated to revitalizing traditional
            Gambian sounds while seamlessly blending them with global influences.
            This fusion not only honors our roots but also bridges connections
            with the world beyond, allowing us to share our rich heritage.
          </p>
          <p>
            The baobab tree, or &quot;sitaa ba,&quot; serves as our emblem. More
            than just an African icon, it symbolizes resilience, life, and the
            profound interconnectedness of nature and culture. These majestic
            giants have stood for centuries, witnessing the ebb and flow of
            African history while providing sustenance, shelter, and spiritual
            guidance to countless communities.
          </p>
          <p>
            As a band, we embody the essence of the baobab, drawing strength from
            our traditions while reaching out to create meaningful connections
            through music. We are not just a band; we are a living testament to
            the enduring power of our cultural legacy.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto mb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="relative h-64 sm:h-72 md:h-80 w-full overflow-hidden rounded-xl border border-gray-800 bg-gray-900/40">
            <Image
              src="/sita-baa-group1.jpg"
              alt="Sitaa Ba group photo"
              fill
              className="object-cover object-[center_42%]"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="relative h-64 sm:h-72 md:h-80 w-full overflow-hidden rounded-xl border border-gray-800 bg-gray-900/40">
            <Image
              src="/barhama-performance.jpg"
              alt="Barhama Cham performing live"
              fill
              className="object-cover object-[center_42%]"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6 text-center tracking-tight">
          Musicians
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {musicians.map((musician) => (
            <article
              key={musician.name}
              className="bg-gray-900/40 border border-gray-800 rounded-xl p-5 sm:p-6"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-gray-800 bg-gray-900/40 mb-4">
                <Image
                  src={musician.imageSrc}
                  alt={musician.name}
                  fill
                  className={`object-cover ${
                    musician.name === "Samuel Peter Thomas"
                      ? "object-[center_24%]"
                      : musician.name === "Abdoulie Kuyateh"
                        ? "object-[center_32%]"
                        : musician.name === "Mbemba Saho"
                          ? "object-[center_44%]"
                          : "object-center"
                  }`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-medium text-white mb-1">
                {musician.name}
              </h3>
              <p className="text-sm text-accent mb-3">{musician.role}</p>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                {musician.summary}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
