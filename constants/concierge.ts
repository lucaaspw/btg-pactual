export const CONCIERGE_WHATSAPP = {
  partners:
    "https://api.whatsapp.com/send?phone=551148621680&text=Cart%C3%A3o%20Partners%3A%20Sele%C3%A7%C3%A3o%20para%20a%20P%C3%A1scoa%20com%20benef%C3%ADcios%20exclusivos%20-%20C%C3%B3digo%20P0202",
  ultrablue:
    "https://api.whatsapp.com/send?phone=551148621688&text=Ultrablue%20BTG%20Pactual%3A%20Sele%C3%A7%C3%A3o%20para%20a%20P%C3%A1scoa%20com%20benef%C3%ADcios%20exclusivos%20-%20C%C3%B3digo%20U0206",
} as const;

export type ConciergeBrand = keyof typeof CONCIERGE_WHATSAPP;
