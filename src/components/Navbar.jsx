import { NavLink } from 'react-router-dom'

const Navbar = () => {
    const NAV_ITEMS = [
        {
            name : "Home",
            href : "/",
        },
        {
            name : "Services",
            href : "/services",
        },
        {
            name : "Contact Us",
            href : "/contact-us",
        },
        {
            name : "About Us",
            href : "/about-us",
        },
    ]
  return (
    <div>
        <div className='h-22 bg-stone-900 flex items-center justify-between px-10'>
            <div className='text-white text-2xl font-bold'>Compliance World</div>
            <div className='flex items-center gap-6'>
                {
                    NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            className={({ isActive }) =>
                                `text-white text-lg font-semibold ${isActive ? 'underline' : ''}`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Navbar