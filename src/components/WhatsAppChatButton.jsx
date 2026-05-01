import { FaWhatsapp } from 'react-icons/fa'
import { getWhatsAppChatUrl } from '../utils/whatsapp'

const WhatsAppChatButton = () => {
  const href = getWhatsAppChatUrl()

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-900/25 transition hover:scale-105 hover:bg-[#20bd5a] focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300/80 sm:h-16 sm:w-16"
      style={{
        bottom: 'max(1.25rem, env(safe-area-inset-bottom, 0px))',
        right: 'max(1.25rem, env(safe-area-inset-right, 0px))',
      }}
    >
      <FaWhatsapp className="h-8 w-8 sm:h-9 sm:w-9" aria-hidden />
    </a>
  )
}

export default WhatsAppChatButton
