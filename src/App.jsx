import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Problems from './components/Problems/Problems'
import Solution from './components/Solution/Solution'
import Advantages from './components/Advantages/Advantages'
import WaterTypes from './components/WaterTypes/WaterTypes'
import Technology from './components/Technology/Technology'
import Configurations from './components/Configurations/Configurations'
import Documents from './components/Documents/Documents'
import Cases from './components/Cases/Cases'
import Service from './components/Service/Service'
import ContactForm from './components/ContactForm/ContactForm'
import Footer from './components/Footer/Footer'
import CookieBanner from './components/CookieBanner/CookieBanner'

function App() {
  return (
    <>
      <Header />
      <div id="page-scroll" className="page-scroll">
        <main>
          <Hero />
          <Problems />
          <Solution />
          <Advantages />
          <WaterTypes />
          <Technology />
          <Configurations />
          <Documents />
          <Cases />
          <Service />
          <ContactForm />
        </main>
        <Footer />
      </div>
      <CookieBanner />
    </>
  )
}

export default App
