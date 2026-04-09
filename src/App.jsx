import Home from './Pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Services from './Pages/Services/Services'
import ContactUs from './Pages/ContactUs/ContactUs'
import AboutUs from './Pages/AboutUs/AboutUs'
import Order from './Pages/Order/Order'
import ServiceDetail from './Pages/ServiceDetail/ServiceDetail'
import Login from './Pages/Auth/Login'
import Signup from './Pages/Auth/Signup'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:categorySlug/:serviceSlug" element={<ServiceDetail />} />
      <Route path="/service-detail" element={<ServiceDetail />} />
      <Route path="/order" element={<Order />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/about-us" element={<AboutUs />} />
    </Routes>
  )
}

export default App