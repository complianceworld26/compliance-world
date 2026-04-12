import { useTheme } from '../context/ThemeContext'

const footerLinks = {
  Services: ['Company Registration', 'GST Filing', 'Income Tax', 'Trademark Registration'],
  Company: ['About Us', 'Careers', 'Blog', 'Contact'],
  Legal: ['Privacy Policy', 'Terms & Conditions', 'Refund Policy', 'Disclaimer'],
}

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

  return (
    <footer id="contact" className={footerClass}>
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <p className={titleClass}>Compliance World</p>
          <p className={bodyClass}>
            Modern compliance platform to help startups and enterprises stay fully compliant with confidence.
          </p>
          <div className={contactClass}>
            <p>Email: info@complianceworld.in</p>
            <p>Phone: +91 90000 00000</p>
            <p>Address: Delhi, India</p>
          </div>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <p className={colTitleClass}>{title}</p>
            <ul className={`mt-4 space-y-2 ${linkClass}`}>
              {links.map((link) => (
                <li key={link} className={isLight ? linkHover : linkHoverDark}>
                  <a href="/">{link}</a>
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
