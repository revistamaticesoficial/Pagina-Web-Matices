"use client";
import LandingLayout from "@/components/layout/LandingLayout";
import { Button } from "@/components/ui/Button";
import { CardContent } from "@/components/ui/Card";
import { MapPin, Phone, Mail, Megaphone, ArrowRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/Label";
import emailjs from "@emailjs/browser";
import { useState, useRef } from "react";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

export default function ContactoPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error("Faltan variables de entorno de EmailJS");
      return;
    }
    try {
      setSending(true);
      emailjs.init(PUBLIC_KEY);
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current!, {
        publicKey: PUBLIC_KEY,
      });
      setSent(true);
      formRef.current?.reset();
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };
  return (
    <LandingLayout>
        <div className=" bg-white" />
        <section className="bg-gradient-to-r from-[#003c56] to-[#005B82] text-white py-16">
        <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Contacto
            </h1>
            <p className="mt-3 text-white text-pretty text-base text-muted-foreground md:text-lg">
              ¿Dónde estamos y cómo encontrarnos? Escribinos, llamanos o
              acercate a nuestras oficinas en el Cerro de las Rosas.
            </p>
        </div>
      </section>
      <section className="px-4 pb-16 md:pb-24">
        <div className="container mx-auto max-w-6xl">
          <div className="w-full flex justify-center mb-8">
            <div className="w-full">
              <Card className="border bg-white/70 shadow-sm backdrop-blur-sm">
                <CardHeader className="text-center">
                  {/* <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-6 h-6 text-primary" />
                  </div> */}
                  <CardTitle>Formulario de contacto</CardTitle>
                  <CardDescription>
                    Envíanos un mensaje y te responderemos a la brevedad
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Título</Label>
                        <Input
                          id="title"
                          name="title"
                          placeholder="Tu título"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="tu@email.com"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="name">Nombre</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Tu nombre completo"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Mensaje</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Cuéntanos en qué podemos ayudarte..."
                        rows={4}
                        required
                      />
                    </div>
                    {/* Campo para dirigir al correo de publicidad */}
                    <input
                      type="hidden"
                      name="to_email"
                      value="publicidadnuevosmatices@gmail.com"
                    />
                    <div className="flex gap-4 pt-2">
                      <Button
                        type="submit"
                        className="flex-1 bg-[#005B82] hover:bg-[#005B82]/90"
                        disabled={sending}
                      >
                        {sending ? "Enviando..." : "Enviar Mensaje"}
                      </Button>
                    </div>
                    {sent && (
                      <p className="text-green-600 text-center font-medium">
                        Mensaje enviado correctamente
                      </p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Segunda fila: mapa + info */}
          <div className="w-full grid grid-cols-1 gap-6 md:grid-cols-5 md:gap-8">
            {/* Map card */}
            <div className="md:col-span-3">
              <div className="h-full overflow-hidden rounded-2xl border bg-white/70 shadow-sm backdrop-blur-sm">
                <div className="border-b p-4 md:p-5">
                  <h2 className="text-lg font-semibold">
                    ¿Dónde estamos ubicados?
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Encontranos en el Cerro de las Rosas
                  </p>
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

            {/* Info card abajo al lado del mapa */}
            <div className="md:col-span-2">
              <div className="h-full rounded-2xl border bg-white/70 p-6 shadow-sm backdrop-blur-sm md:p-8">
                <h2 className="text-xl font-semibold text-foreground">
                  Información de contacto
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Respondemos de lunes a viernes de 9:00 a 18:00 h.
                </p>

                <ul className="mt-6 space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 rounded-lg bg-[#005B82]/10 p-2 text-[#005B82]">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="font-medium text-foreground">
                        Dirección
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Av. Rafael Núñez 4558, Cerro de las Rosas, Córdoba,
                        Argentina
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 rounded-lg bg-[#005B82]/10 p-2 text-[#005B82]">
                      <Phone className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="font-medium text-foreground">
                        Teléfono
                      </div>
                      <a
                        href="tel:+351 5141456"
                        className="text-sm text-[#005B82] underline underline-offset-4"
                      >
                        +54 351 514-1456
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 rounded-lg bg-[#005B82]/10 p-2 text-[#005B82]">
                      <Megaphone className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="font-medium text-foreground">
                        Publicidad
                      </div>
                      <a
                        href="mailto:publicidadnuevosmatices@gmail.com"
                        className="text-sm text-[#005B82] underline underline-offset-4"
                      >
                        publicidadnuevosmatices@gmail.com
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 rounded-lg bg-[#005B82]/10 p-2 text-[#005B82]">
                      <Mail className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="font-medium text-foreground">
                        Consultas generales
                      </div>
                      <a
                        href="mailto:info@revistamatices.com"
                        className="text-sm text-[#005B82] underline underline-offset-4"
                      >
                        info@revistamatices.com
                      </a>
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
                  <a
                    href="https://wa.me/3515141456?text=Hola%20Matices%2C%20quisiera%20hacer%20una%20consulta"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="w-full sm:w-auto">
                      WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
