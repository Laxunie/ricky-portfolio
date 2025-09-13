import { useState } from 'react'
import { About, AI, Contact, Footer, Home, Navbar } from './components'

function App() {
  const [index, setIndex] = useState(0)
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} overflow-x-hidden`}>
      <div className='w-full max-w-[42rem] max-sm:w-[22rem] mx-auto sm:px-6'>
        <Navbar index={index} setIndex={setIndex} darkMode={darkMode} setDarkMode={setDarkMode}/>
        <main>
          {index === 0 && <section id="ai" className='min-h-[70vh]'><AI darkMode={darkMode}/></section>}
          {index === 1 && <section id="home" className='min-h-[70vh]'><Home darkMode={darkMode}/></section>}
          {index === 2 && <section id="about" className='min-h-[70vh]'><About darkMode={darkMode}/></section>}
          {index === 3 && <section id="contact" className='min-h-[70vh]'><Contact darkMode={darkMode}/></section>}
        </main>
        <Footer darkMode={darkMode}/>
      </div>
    </div>
  )
}

export default App
