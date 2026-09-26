// src/lib/data.ts

export interface Musician {
  name: string;
  role: string;
  imageSrc: string;
  summary: string;
}

export const musicians: Musician[] = [
  {
    name: "Samuel Peter Thomas",
    role: "Keyboardist & Bass Guitarist",
    imageSrc: "/samuel-peter-thomas.jpg",
    summary:
      "Samuel is a Sierra Leonean-born keyboardist and bass guitarist who came to The Gambia in 1999 after the war in Sierra Leone. Music became refuge and direction, first through the church, where he found discipline, grounding, and a sense of calling. Influenced by his guitarist father and Nigerian artists of his generation, he began on keyboard in the early 2000s, then built a reputation for versatility across both instruments. Mentor Bernard Thomas helped him see music as something that could be pursued with integrity and sustainability, even alongside formal studies in accounting and MIS. His sound blends funk with African grooves like sebene and soukous, and he brings that same sense of service and long-term vision to Barhama's band.",
  },
  {
    name: "Mawdo Kuyateh",
    role: "Lead Guitarist",
    imageSrc: "/mawdo-kuyateh.jpg",
    summary:
      "Mawdo is a Gambian guitarist shaped by deep griot lineage, where music, history, and responsibility travel together. On both sides of his family, griot tradition runs close, including figures like his uncle Ansumana Suso and a heritage that reaches across generations and performance history. Though his father served as a soldier, music remained central at home, and after commerce and entrepreneurship studies, Mawdo committed fully to the guitar in 2015. His playing is rooted in traditional Manding music and stretches into mbalax and Afrobeats, balancing discipline with instinct. Recognised as one of The Gambia's rare highly skilled guitarists, he treats Barhama's band as his musical home and a bridge between ancestral Mande tradition and contemporary African sound.",
  },
  {
    name: "Abdoulie Kuyateh",
    role: "Calabash & Percussion",
    imageSrc: "/abdoulie-kuyateh.jpg",
    summary:
      "Abdoulie is a Gambian percussionist and calabash player born into a griot family where music is inherited as much as learned. He began playing in junior school and was the first balafon player in his early musical environment before deepening into Afro-Manding rhythm and calabash work. His journey also passed through formal institutions, including the Gambia Police Force band as a saxophonist and later the Gambia Airport Authority, before he chose to follow his artistic purpose full time. He has performed across regional spaces, integrating traditional percussion into contemporary settings, and speaks plainly about what Gambian musicians need most: stronger infrastructure and support, not more talent. In Sita-Baa, he strengthens the band's Afro-Manding foundation with precision, depth, and cultural grounding.",
  },
  {
    name: "Mbemba Saho",
    role: "Kora",
    imageSrc: "/mbemba-saho.jpg",
    summary:
      "Mbemba is a Gambian kora player from Bakoteh, carrying a lineage where the instrument is both inheritance and responsibility, passed from his grandfather through his father, Seikou Saho Jali, a respected griot and master player. He learned under his elder brother Souleyman Jobateh when touring schedules made daily instruction harder to hold, then deepened his craft through curiosity, discipline, and expanding music theory. That foundation allows him to move the kora across reggae, jazz, and modern African contexts without losing its voice, shaped further by the influence of the late Ansumana Suso. Beyond performance, he is committed to teaching younger generations that the kora is Gambian in origin and story, restoring knowledge alongside sound. With Sita-Baa, he brings continuity, mastery, and a clear sense of where the music comes from and where it can travel next.",
  },
];

export const videoIds: string[] = [
  "RkXamNeUJow",
  "ggHRHZT34Ak",
  "qYhKm8HNnj8",
  "n91CEUwXmrQ",
  "BltPBP-RD1s",
  "GvgXczJZSN8",
  "Xkh3t_zs8qY",
  "axza2DFSaJQ",
  "_vLGjxurNsY",
  "5MpGx6p6a5M",
  "5LjtlsEtZUs",
];

export const galleryImages: string[] = [
  "/gallery1.jpg",
  "/gallery2.jpg",
  "/gallery3.jpg",
  "/gallery4.jpg",
  "/gallery5.jpg",
  "/gallery6.JPG",
  "/gallery7.jpg",
  "/gallery8.jpg",
  "/gallery9.jpg",
];
