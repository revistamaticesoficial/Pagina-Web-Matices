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
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function Contact() {
  const router = useRouter();
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

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
    <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">
            {"Contactanos"}
          </h2>
          <p className="text-muted-foreground text-pretty max-w-2xl mx-auto">
            {
              "Comunicate con nosotros y te responderemos lo antes posible."
            }
          </p>
        </motion.div>

        <motion.div 
            className="flex flex-col md:flex-row justify-center gap-6 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          >
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          >
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );

} export default Contact;