import Image from 'next/image';
import Link from 'next/link';
function CTA() {
    return (
        <section className="py-16 px-4">
            <div className="mt-16 w-full max-w-6xl mx-auto">
              {/* Card de fondo (portada) */}
              <div className="relative w-full rounded-2xl bg-gradient-to-br from-[#005B82] to-[#003C56] h-[420px]	 lg:h-[300px]  shadow-lg border border-gray-200 overflow-hidden">
                {/* Título centrado */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-full px-6 sm:px-10">
                  <h1 className="font-bold text-white text-2xl sm:text-3xl text-center">Descubre todo lo que mati tiene para ofrecerte</h1>
                </div>
                <div className="flex items-center justify-between gap-6 px-6 sm:px-10 py-8 sm:py-12 min-h-[300px]">
                  {/* Zorro a la izquierda */}
                  <div className="shrink-0 absolute bottom-0 left-0">
                    <Image
                      src="/images/mati-solo.png"
                      alt="Mati - Ver Sugerencias"
                      width={360}
                      height={360}
                      className="h-auto w-[200px] sm:w-[260px] object-contain"
                      priority={false}
                    />
                  </div>

                  {/* Botón a la derecha del zorro */}
                  <div className="flex-1 flex items-center justify-center">
                    <Link href="/sugerencias">
                      <button
                        className="bg-[#F58220] hover:bg-[#E5750D] text-white font-bold text-xl sm:text-2xl px-8 sm:px-10 py-5 sm:py-6 rounded-[8px] shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
                        style={{ backgroundColor: '#F58220' }}
                      >
                        VER SUGERENCIAS
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
        </section>
    )
}
export default CTA;