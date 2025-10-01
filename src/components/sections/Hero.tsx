import ImageCarousel from '@/components/ui/ImageCarousel';

// Banner images from public/images/banner/
const bannerImages = [
  // '/images/banner/calle.avif',
  '/images/banner/kemp.png',
  '/images/banner/Matices.jpg',
  '/images/banner/mujer-urbana1.jpg',
  '/images/banner/callerafael.jpg',
  '/images/banner/tunel.jpeg',
];

export function Hero() {
  return (
    <section className="relative h-[90vh] bg-gradient-to-r from-green-600/20 to-blue-600/20 overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        <ImageCarousel 
          images={bannerImages}
          autoPlayInterval={3000}
          aspectRatio="aspect-auto h-full object-cover"
          className="h-full"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center">
        <div className="max-w-4xl">
          <div className="space-y-6">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-medium border border-white/30">
              35 años informando al norte de Córdoba
            </span>

            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
              Revista{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Matices
              </span>
              {' '}del Cerro
            </h1>

            <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              Tu fuente confiable de noticias locales, comercios del barrio y contenido
              de interés para la comunidad de zona norte de Córdoba.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}