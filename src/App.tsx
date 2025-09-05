import { useState } from 'react'
import { About, Contact, Footer, Home, Navbar } from './components'

function App() {
  const [index, setIndex] = useState(0)
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className='w-[42rem] max-sm:w-[22rem] ml-auto mr-auto px-6'>
        <Navbar index={index} setIndex={setIndex} darkMode={darkMode} setDarkMode={setDarkMode}/>
        <main>
          {index === 0 && <section id="home"><Home darkMode={darkMode}/></section>}
          {index === 1 && <section id="about"><About darkMode={darkMode}/></section>}
          {index === 2 && <section id="contact"><Contact darkMode={darkMode}/></section>}
        </main>
        <Footer darkMode={darkMode}/>
      </div>
    </div>
  )
}

export default App
