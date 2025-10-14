import Image from 'next/image';
import Link from 'next/link';
function CTA() {
    return (
        <section className="py-16 px-4">
            <div className="mt-16 w-full max-w-6xl mx-auto">
              {/* Card de fondo (portada) */}
              <div className="relative w-full rounded-2xl bg-[#005B82] shadow-lg border border-gray-200 overflow-hidden">
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