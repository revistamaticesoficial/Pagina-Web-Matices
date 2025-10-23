"use client";

import type React  from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  MessageCircle,
  Mail,
} from "lucide-react";
import { useRouter } from "next/navigation";

export function Contact() {
  const router = useRouter();

  const handleCardClick = (cardType: string) => {
    if (cardType === "whatsapp") {
      window.open(
        "https://wa.me/3515141456?text=Hola, me gustaría obtener más información sobre...",
        "_blank"  
      );
    } else if (cardType === "form") {
      router.push("/contacto");
    }
  };


  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">
            {"Contactanos"}
          </h2>
          <p className="text-muted-foreground text-pretty max-w-2xl mx-auto">
            {
              "Comunicate con nosotros y te responderemos lo antes posible."
            }
          </p>
        </div>

        <div className="flex justify-center gap-6 mb-8 max-w-2xl mx-auto">
          <Card
            className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 hover:border-[#E6020220]"
            onClick={() => handleCardClick("form")}
          >
            <CardHeader className="text-center mx-auto max-w-sm gap-4">
              <div className="w-12 h-12 bg-[#E6020220] rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-[#E60202]" />
              </div>
              <CardTitle>{"Formulario"}</CardTitle>
              <CardDescription>
                {"Envíanos un mensaje detallado"}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 hover:border-green-200"
            onClick={() => handleCardClick("whatsapp")}
          >
            <CardHeader className="text-center mx-auto max-w-sm gap-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-green-500" />
              </div>
              <CardTitle>{"WhatsApp"}</CardTitle>
              <CardDescription>
                {"Chatea con nosotros directamente"}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        
        {/* <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            {"También puedes encontrarnos en:"}
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleSocialClick("instagram")}
              className="flex items-center gap-2 hover:bg-pink-50 hover:border-pink-200"
            >
              <Instagram className="w-5 h-5" />
              {"Instagram"}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleSocialClick("facebook")}
              className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-200"
            >
              <Facebook className="w-5 h-5" />
              {"Facebook"}
            </Button>
          </div>
        </div> */}
      </div>
    </section>
  );

} export default Contact;