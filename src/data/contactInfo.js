/** Site contact phone numbers (India). */
export const PHONE_NUMBERS = [
  {
    digits: '9711123484',
    display: '+91 97111 23484',
    href: 'tel:+919711123484',
  },
  {
    digits: '9711123472',
    display: '+91 97111 23472',
    href: 'tel:+919711123472',
  },
]

export const PRIMARY_PHONE = PHONE_NUMBERS[0]

/** Digits for wa.me (country code + number). */
export const WHATSAPP_FALLBACK_DIGITS = `91${PRIMARY_PHONE.digits}`
