import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <section className=" relative bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className=" flex flex-col justify-center text-center gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4 min-h-[50vh]">
              <span className="bg-blue-100 text-blue-800 border-blue-200">
                {/* <Calendar className="h-3 w-3 mr-1" /> */}
                35 años informando al norte de Córdoba
              </span>

              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Revista{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Matices
                </span>
                {' '}del Cerro
              </h1>

              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
                Tu fuente confiable de noticias locales, comercios del barrio y contenido
                de interés para la comunidad de zona norte de Córdoba.
              </p>
            </div>

            {/* Features */}
            {/* <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                <span className="text-gray-700">Noticias locales actualizadas</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full" />
                <span className="text-gray-700">Directorio de comercios</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                <span className="text-gray-700">Eventos del barrio</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-600 rounded-full" />
                <span className="text-gray-700">Contenido premium</span>
              </div>
            </div> */}

            {/* CTA Buttons */}
            {/* <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group">
                Explorar Artículos
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                <Play className="mr-2 h-4 w-4" />
                Ver Video
              </Button>
            </div> */}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">15+</div>
                <div className="text-sm text-gray-600">Artículos semanales</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">20+</div>
                <div className="text-sm text-gray-600">Comercios destacados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">5K+</div>
                <div className="text-sm text-gray-600">Lectores mensuales</div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-[#005B82] text-center mb-8">Notas Destacadas</h1>
            {/* Featured Cards Grid */}
            <div className="mt-12 w-full max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Card 1: Gastronomía */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <div className="absolute inset-0 bg-[#005B82]/10"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 bg-[#005B82] rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <p className="text-gray-700 font-medium text-sm">Nota Destacada</p>
                      </div>
                    </div>

                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                        GASTRONOMIA
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                      Nueva ciclovía conecta el Cerro de las Rosas con el centro
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      La Municipalidad de Córdoba inauguró oficialmente la nueva ciclovía que conecta el barrio Cerro de las Rosas con el centro de la ciudad. Esta obra representa una inversión de $45 millones...
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>15 dic 2024</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12,6 12,12 16,14" />
                          </svg>
                          <span>3 min</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Redacción Matices</span>
                      </div>
                    </div>

                    <Link href="/notas/1">
                      <button className="w-full bg-[#005B82] hover:bg-[#004D6E] text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span>Leer Nota Completa</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Card 2: Eventos */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <div className="absolute inset-0 bg-[#005B82]/10"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 bg-[#005B82] rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <p className="text-gray-700 font-medium text-sm">Nota Destacada</p>
                      </div>
                    </div>

                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                        NOTICIAS
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                      Restaurante El Fogón del Cerro celebra 15 años de tradición gastronómica
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      El reconocido restaurante El Fogón del Cerro, ubicado en el corazón del barrio Cerro de las Rosas, celebra este mes sus 15 años de trayectoria ofreciendo la mejor cocina regional...
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>14 dic 2024</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12,6 12,12 16,14" />
                          </svg>
                          <span>4 min</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>María González</span>
                      </div>
                    </div>

                    <Link href="/notas/2">
                      <button className="w-full bg-[#005B82] hover:bg-[#004D6E] text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span>Leer Nota Completa</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Card 3: Servicios */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <div className="absolute inset-0 bg-[#005B82]/10"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 bg-[#005B82] rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <p className="text-gray-700 font-medium text-sm">Nota Destacada</p>
                      </div>
                    </div>

                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                        GASTRONOMIA
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                      Inauguración del nuevo centro comercial Plaza Norte en el Cerro
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      Este sábado se inauguró oficialmente el nuevo centro comercial Plaza Norte, ubicado en la intersección de Avenida Rafael Núñez y Calle 9 de Julio, en el barrio Cerro de las Rosas...
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>13 dic 2024</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12,6 12,12 16,14" />
                          </svg>
                          <span>3 min</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Redacción Matices</span>
                      </div>
                    </div>

                    <Link href="/notas/3">
                      <button className="w-full bg-[#005B82] hover:bg-[#004D6E] text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span>Leer Nota Completa</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Card 4: Comercio Local */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <div className="absolute inset-0 bg-[#005B82]/10"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 bg-[#005B82] rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <p className="text-gray-700 font-medium text-sm">Nota Destacada</p>
                      </div>
                    </div>

                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800 border border-pink-200">
                        SALUD
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                      Clínica del Cerro amplía servicios de cardiología
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      La Clínica del Cerro, ubicada en el barrio Cerro de las Rosas, anunció la ampliación de sus servicios de cardiología con la incorporación de tecnología de última generación...
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>12 dic 2024</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12,6 12,12 16,14" />
                          </svg>
                          <span>4 min</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Dr. Ana Morales</span>
                      </div>
                    </div>

                    <Link href="/notas/4">
                      <button className="w-full bg-[#005B82] hover:bg-[#004D6E] text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span>Leer Nota Completa</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Card 5: Educación */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <div className="absolute inset-0 bg-[#005B82]/10"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 bg-[#005B82] rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <p className="text-gray-700 font-medium text-sm">Nota Destacada</p>
                      </div>
                    </div>

                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-200">
                        EDUCACION
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                      Escuela Manuel Belgrano celebra 50 años de educación pública
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      La Escuela Primaria Manuel Belgrano, ubicada en el barrio Cerro de las Rosas, celebró este mes sus 50 años de servicio educativo a la comunidad cordobesa...
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>11 dic 2024</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12,6 12,12 16,14" />
                          </svg>
                          <span>3 min</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Prof. Carlos Ruiz</span>
                      </div>
                    </div>

                    <Link href="/notas/5">
                      <button className="w-full bg-[#005B82] hover:bg-[#004D6E] text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span>Leer Nota Completa</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Card 6: Salud */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <div className="absolute inset-0 bg-[#005B82]/10"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 bg-[#005B82] rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <p className="text-gray-700 font-medium text-sm">Nota Destacada</p>
                      </div>
                    </div>

                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                        DEPORTES
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                      Nuevo complejo deportivo en el Parque del Cerro
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      La Municipalidad de Córdoba anunció la construcción de un nuevo complejo deportivo en el Parque del Cerro, ubicado en el barrio Cerro de las Rosas...
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>10 dic 2024</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12,6 12,12 16,14" />
                          </svg>
                          <span>4 min</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Redacción Matices</span>
                      </div>
                    </div>

                    <Link href="/notas/6">
                      <button className="w-full bg-[#005B82] hover:bg-[#004D6E] text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span>Leer Nota Completa</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Promotional Image Section */}
            <div className="mt-16 w-full max-w-6xl mx-auto">
              <div className="relative w-full group cursor-pointer">
                <Image
                  src="/images/Frame 1321317502 (1).png"
                  alt="Descubre todo lo que Mati tiene para ofrecer - Ver Sugerencias"
                  width={1200}
                  height={400}
                  className="w-full h-auto rounded-2xl shadow-lg border border-gray-200 object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={false}
                />
                {/* Optional overlay for better mobile readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl md:hidden"></div>
                
                {/* Centered Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Link href="/sugerencias">
                    <button 
                      className="bg-[#F58220] hover:bg-[#E5750D] text-white font-bold text-2xl px-20 py-10 rounded-full shadow-xl transform transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95"
                      style={{ backgroundColor: '#F58220' }}
                    >
                      VER SUGERENCIAS
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Image/Visual */}
          {/* <div className="relative">
            <div className="relative z-10">
              <Image
                src="/images/hero-cerro-rosas.jpg"
                alt="Cerro de las Rosas - Córdoba"
                width={600}
                height={600}
                className="rounded-2xl shadow-2xl"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxAAPwCdABmX/9k="
              />
            </div>
            
            <div className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg border">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-semibold text-gray-900">Cerro de las Rosas</div>
                  <div className="text-sm text-gray-600">Córdoba, Argentina</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold">34</div>
                <div className="text-sm opacity-90">Años de trayectoria</div>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Bottom Wave */}
      {/* <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-auto"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="fill-current text-white"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19.3,79.78-31.16,119.65-39.92C503.43,4.88,622.72,1.11,636.47,1.11H0Z"
            opacity=".5"
            className="fill-current text-white"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,120.71-6.19,179.36,3.17,30.92,4.9,61.17,12.43,91.55,22.73,40.71,13.19,81.41,28.34,119.13,47.13,42.15,21.11,82.51,45.85,119.18,75.73,35.65,29.25,67.68,62.12,96.68,98.46,31.24,39.29,58.85,82.9,81.47,129.21,22.62,46.31,40.07,95.27,52.19,146.14V0Z"
            className="fill-current text-white"
          />
        </svg>
      </div> */}
    </section>
  );
}

