import { MessageCircle } from "lucide-react";
import { BUSINESS } from "@/config/business";
import { buildWhatsappChatUrl } from "@/lib/enquiry";

export function FloatingWhatsApp() {
  const url = buildWhatsappChatUrl(BUSINESS.whatsappNumber);
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with ZENVIX on WhatsApp"
      className="fixed bottom-5 right-5 z-[55] inline-flex h-14 w-14 items-center justify-center rounded-full bg-success text-primary-foreground shadow-lift transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </a>
  );
}
