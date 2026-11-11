export const TO_FILL = "[TO FILL]";

/** True when a config value has real content (not empty and not "[TO FILL]"). */
export function isFilled(value: string | undefined | null): value is string {
  return !!value && !value.includes(TO_FILL);
}

export function telLink(digits: string) {
  return `tel:+${digits.replace(/\D/g, "")}`;
}

/**
 * Opens WhatsApp with a ready enquiry message.
 * With a number it opens a chat with the college; without one the visitor picks the contact.
 */
export function whatsappLink(number: string, message: string) {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function directionsLink(query: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}

/** Google Maps embed that needs no API key. */
export function mapEmbedLink(query: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=14&output=embed`;
}
