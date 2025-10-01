import LandingLayout from '@/components/layout/LandingLayout'
import { Button } from '@/components/ui/Button'
import { MapPin, Phone, Mail, Megaphone, ArrowRight } from 'lucide-react'

export default function ContactoPage() {
  return (
    <LandingLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#F1F5F9] via-white to-[#E0F2FE]" />
        <div className="relative container mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-[#005B82]/10 px-3 py-1 text-xs font-medium text-[#005B82]">Estamos para ayudarte</span>
            <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Contacto
            </h1>
            <p className="mt-3 text-pretty text-base text-muted-foreground md:text-lg">
              ¿Dónde estamos y cómo encontrarnos? Escribinos, llamanos o acercate a nuestras oficinas en el Cerro de las Rosas.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 pb-16 md:pb-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-5 md:gap-8">
            {/* Info card */}
            <div className="md:col-span-2">
              <div className="h-full rounded-2xl border bg-white/70 p-6 shadow-sm backdrop-blur-sm md:p-8">
                <h2 className="text-xl font-semibold text-foreground">Información de contacto</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Respondemos de lunes a viernes de 9:00 a 18:00 h.
                </p>

                <ul className="mt-6 space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 rounded-lg bg-[#005B82]/10 p-2 text-[#005B82]"><MapPin className="h-4 w-4" /></span>
                    <div>
                      <div className="font-medium text-foreground">Dirección</div>
                      <div className="text-sm text-muted-foreground">Av. Rafael Núñez 4558, Cerro de las Rosas, Córdoba, Argentina</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 rounded-lg bg-[#005B82]/10 p-2 text-[#005B82]"><Phone className="h-4 w-4" /></span>
                    <div>
                      <div className="font-medium text-foreground">Teléfono</div>
                      <a href="tel:+351 5141456" className="text-sm text-[#005B82] underline underline-offset-4">+54 351 514-1456</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 rounded-lg bg-[#005B82]/10 p-2 text-[#005B82]"><Megaphone className="h-4 w-4" /></span>
                    <div>
                      <div className="font-medium text-foreground">Publicidad</div>
                      <a href="mailto:publicidadnuevosmatices@gmail.com" className="text-sm text-[#005B82] underline underline-offset-4">publicidadnuevosmatices@gmail.com</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 rounded-lg bg-[#005B82]/10 p-2 text-[#005B82]"><Mail className="h-4 w-4" /></span>
                    <div>
                      <div className="font-medium text-foreground">Consultas generales</div>
                      <a href="mailto:info@revistamatices.com" className="text-sm text-[#005B82] underline underline-offset-4">info@revistamatices.com</a>
                    </div>
                  </li>
                </ul>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href="mailto:publicidadnuevosmatices@gmail.com">
                    <Button className="w-full sm:w-auto bg-[#005B82] hover:bg-[#005B82]/90">
                      Escribir a Publicidad
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                  <a href="https://wa.me/3515141456?text=Hola%20Matices%2C%20quisiera%20hacer%20una%20consulta" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full sm:w-auto">
                      WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            {/* Map card */}
            <div className="md:col-span-3">
              <div className="h-full overflow-hidden rounded-2xl border bg-white/70 shadow-sm backdrop-blur-sm">
                <div className="border-b p-4 md:p-5">
                  <h2 className="text-lg font-semibold">¿Dónde estamos ubicados?</h2>
                  <p className="text-sm text-muted-foreground">Encontranos en el Cerro de las Rosas</p>
                </div>
                <div className="aspect-video w-full">
                  <iframe
                    title="Mapa Revista Matices"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d425.85012979658154!2d-64.23584588879065!3d-31.36446917428476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94329936b187beb3%3A0xe8a8cf2c43bc0a9c!2sAv.%20Rafael%20N%C3%BA%C3%B1ez%204558%2C%20X5009CFZ%20C%C3%B3rdoba!5e0!3m2!1ses-419!2sar!4v1759253869120!5m2!1ses-419!2sar"
                    className="h-full w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  )
}


