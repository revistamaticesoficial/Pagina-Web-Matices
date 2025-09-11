import { Button } from '@/components/ui/Button';
import { Benefit } from '@/types/sugerencias';

const ModalPromo = ({ isRedeemOpen, setIsRedeemOpen, selectedBenefit }: { isRedeemOpen: boolean, setIsRedeemOpen: (isRedeemOpen: boolean) => void, selectedBenefit: Benefit | null }) => {
    return (
        <>
{isRedeemOpen && (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setIsRedeemOpen(false)}
      />
      <div
        className="relative z-10 w-full max-w-lg mx-4 bg-white rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-xl font-bold text-gray-900">
            {selectedBenefit ? `Canjear: ${selectedBenefit.title}` : 'Canjear Beneficio'}
          </h3>
          <button
            aria-label="Cerrar"
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setIsRedeemOpen(false)}
          >
            ✕
          </button>
        </div>
        <form
          className="px-6 py-6 space-y-4 flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget as HTMLFormElement);
            console.log('Formulario canje', {
              nombreCompleto: formData.get('nombreCompleto'),
              dni: formData.get('dni'),
              telefono: formData.get('telefono'),
              benefitId: selectedBenefit?.id,
            });
            setIsRedeemOpen(false);
          }}
        >
          <div>
            <label htmlFor="nombreCompleto" className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
            <input
              id="nombreCompleto"
              name="nombreCompleto"
              type="text"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Juan Pérez"
            />
          </div>
            <div>
              <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
              <input
                id="dni"
                name="dni"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: 12345678"
              />
            </div>
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                inputMode="tel"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: +54 9 11 1234 5678"
              />
            </div>
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              className="bg-gray-200 text-gray-800 hover:bg-gray-300"
              onClick={() => setIsRedeemOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-green-600 to-green-600 hover:from-green-700 hover:to-green-700 text-white"
            >
              Enviar solicitud
            </Button>
          </div>
        </form>
      </div>
    </div>
  )}
  </>
    )
}

export default ModalPromo;