import Image from 'next/image';
import Link from 'next/link';
function CTA() {
    return (
        <section className="py-16 px-4">
            <div className="mt-16 w-full max-w-6xl mx-auto">
              <div className="relative w-full group cursor-pointer">
                <Image
                  src="/images/mati-revista.png"
                  alt="Descubre todo lo que Mati tiene para ofrecer - Ver Sugerencias"
                  width={1400}
                  height={400}
                  className="w-full h-auto rounded-2xl shadow-lg border border-gray-200 object-cover"
                  priority={false}
                />
                {/* Optional overlay for better mobile readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl md:hidden"></div>
                
                {/* Centered Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Link href="/sugerencias">
                    <button 
                      className="bg-[#F58220] hover:bg-[#E5750D] text-white font-bold text-2xl px-10 py-6 rounded-[8px] shadow-xl transform transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95"
                      style={{ backgroundColor: '#F58220' }}
                    >
                      VER SUGERENCIAS
                    </button>
                  </Link>
                </div>
              </div>
            </div>
        </section>
    )
}
export default CTA;