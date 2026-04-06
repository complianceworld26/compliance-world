import Home from './Pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Services from './Pages/Services/Services'
import ContactUs from './Pages/ContactUs/ContactUs'
import AboutUs from './Pages/AboutUs/AboutUs'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/about-us" element={<AboutUs />} />
    </Routes>
  )
}

export default App