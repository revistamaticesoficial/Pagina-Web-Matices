export function Stats() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-[#005B82] mb-2">15+</div>
            <div className="text-sm lg:text-base text-gray-600">Artículos semanales</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-[#F58220] mb-2">20+</div>
            <div className="text-sm lg:text-base text-gray-600">Comercios destacados</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-[#3BA740] mb-2">5K+</div>
            <div className="text-sm lg:text-base text-gray-600">Lectores mensuales</div>
          </div>
        </div>
      </div>
    </section>
  );
}
