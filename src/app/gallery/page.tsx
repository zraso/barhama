import Image from "next/image";

const galleryImages = [
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

export default function Gallery() {
  return (
    <main className="max-w-6xl mx-auto py-16 px-6 sm:px-8 pb-24">
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold text-white mb-10 sm:mb-12 text-center tracking-tight">See</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
        {galleryImages.map((src, idx) => (
          <div key={src} className="relative rounded-xl overflow-visible shadow-2xl bg-gray-900 hover:shadow-primary/30 transition-all duration-300 hover:scale-110 hover:z-50 cursor-pointer">
            <div className="rounded-xl overflow-hidden">
              <Image
                src={src}
                alt={`Barhama Cham Gallery ${idx + 1}`}
                width={600}
                height={800}
                className="object-cover w-full h-80 sm:h-96 md:h-[28rem]"
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
} 