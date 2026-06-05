import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import Skills from '../components/Skills'
import About from '../components/About'
import Cv from '../components/Cv'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const HomePage = () => {
  return (
    <main className="app">
      <Navbar />
      <Banner />
      <Skills />
      <Projects />
      <About />
      <Cv />
      <Contact />
      <Footer />
    </main>
  )
}

export default HomePage
