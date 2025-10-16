"use client";

import type React  from "react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/Label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import {
  MessageCircle,
  Instagram,
  Linkedin,
  Facebook,
  Mail,
  Send,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import emailjs from "@emailjs/browser";
import { useRouter } from "next/navigation";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

export function Contact() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [send, setSend] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    email: "",
    message: "",
  });

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

  const handleSocialClick = (platform: string) => {
    const urls = {
      instagram: "https://instagram.com/revistamaticesoficial",
      facebook: "https://www.facebook.com/profile.php?id=61579318061468",
      //   twitter: "https://twitter.com/empresa",
      //   linkedin: "https://linkedin.com/company/empresa",
    };
    window.open(urls[platform as keyof typeof urls], "_blank");
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">
            {"¿Cómo prefieres contactarnos?"}
          </h2>
          <p className="text-muted-foreground text-pretty max-w-2xl mx-auto">
            {
              "Selecciona tu método preferido de comunicación y te responderemos lo antes posible."
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
          <Card
            className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 hover:border-[#E6020220]"
            onClick={() => handleCardClick("form")}
          >
            <CardHeader className="text-center">
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
            <CardHeader className="text-center">
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
        
        <div className="mt-12 text-center">
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
            {/* <Button
              variant="outline"
              size="lg"
              onClick={() => handleSocialClick("linkedin")}
              className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-200"
            >
              <Linkedin className="w-5 h-5" />
              {"LinkedIn"}
            </Button> */}
          </div>
        </div>
      </div>
    </section>
  );
}
