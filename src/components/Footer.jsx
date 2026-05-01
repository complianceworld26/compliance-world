import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { getWhatsAppChatUrl } from '../utils/whatsapp'

const footerColumns = [
  {
    title: 'Services',
    links: [
      { label: 'Company Registration', to: '/services' },
      { label: 'GST Filing', to: '/services' },
      { label: 'Income Tax', to: '/services' },
      { label: 'Trademark Registration', to: '/services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about-us' },
      { label: 'Careers', to: '#' },
      { label: 'Blog', to: '#' },
      { label: 'Contact', to: '/contact-us' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Terms & Conditions', to: '/terms-and-conditions' },
      { label: 'Refund Policy', to: '/refund-policy' },
      { label: 'Disclaimer', to: '/disclaimer' },
    ],
  },
]

const Footer = () => {
  const { isLight } = useTheme()

  const footerClass = isLight
    ? 'border-t border-slate-200 bg-slate-100 py-14 text-slate-700'
    : 'bg-slate-900 py-14 text-slate-200'

  const titleClass = isLight ? 'text-xl font-bold text-slate-900' : 'text-xl font-bold text-white'

  const bodyClass = isLight ? 'mt-3 max-w-md text-sm leading-6 text-slate-600' : 'mt-3 max-w-md text-sm leading-6 text-slate-400'

  const contactClass = isLight ? 'mt-5 space-y-1 text-sm text-slate-600' : 'mt-5 space-y-1 text-sm text-slate-300'

  const colTitleClass = isLight ? 'text-sm font-semibold uppercase tracking-wider text-slate-900' : 'text-sm font-semibold uppercase tracking-wider text-white'

  const linkClass = isLight ? 'text-sm text-slate-600' : 'text-sm text-slate-400'

  const linkHover = 'transition-colors duration-300 hover:text-slate-900'
  const linkHoverDark = 'transition-colors duration-300 hover:text-white'

  const bottomBorder = isLight ? 'border-slate-200' : 'border-slate-700'
  const bottomText = isLight ? 'text-slate-600' : 'text-slate-400'

  const linkItemClass = `${linkClass} block ${isLight ? linkHover : linkHoverDark}`

  return (
    <footer id="contact" className={footerClass}>
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="sm:col-span-2 lg:col-span-2">
          <p className={titleClass}>Compliance World</p>
          <p className={bodyClass}>
            Modern compliance platform to help startups and enterprises stay fully compliant with confidence.
          </p>
          <div className={contactClass}>
            <p>Email: info@complianceworld.in</p>
            <p>Phone: +91 90000 00000</p>
            <p>
              <a
                href={getWhatsAppChatUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex ${isLight ? linkHover : linkHoverDark}`}
              >
                WhatsApp
              </a>
            </p>
            <p>Address: Delhi, India</p>
          </div>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title}>
            <p className={colTitleClass}>{column.title}</p>
            <ul className="mt-4 space-y-2">
              {column.links.map((item) => (
                <li key={item.label}>
                  {item.to.startsWith('/') ? (
                    <NavLink to={item.to} className={linkItemClass}>
                      {item.label}
                    </NavLink>
                  ) : (
                    <a href={item.to} className={linkItemClass}>
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={`mx-auto mt-10 w-full max-w-7xl border-t px-4 pt-6 text-sm sm:px-6 lg:px-8 ${bottomBorder} ${bottomText}`}>
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row">
          <p>© 2026 Compliance World. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="/" className={isLight ? linkHover : linkHoverDark}>
              LinkedIn
            </a>
            <a href="/" className={isLight ? linkHover : linkHoverDark}>
              X
            </a>
            <a href="/" className={isLight ? linkHover : linkHoverDark}>
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
