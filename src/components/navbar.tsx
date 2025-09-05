import React, { useEffect, useRef, useState } from 'react'; 
import { LogoTransparent } from '../assets'
import { MdLightMode } from "react-icons/md";

type NavbarProps = {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = ({index, setIndex, darkMode, setDarkMode }: NavbarProps) => {
  const links = ["Home", "About", "Contact"];

  const containerRef = useRef<HTMLDivElement>(null);
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const linkEls = Array.from(container.querySelectorAll('a')) as HTMLElement[];
    const linkEl = linkEls[index]; // get the correct <a> by index
    if (!linkEl) return;

    setHighlightStyle({
      left: linkEl.offsetLeft,
      width: linkEl.offsetWidth,
    });
  }, [index]);

  return (
    <nav className='pb-8'>
      <div className='flex items-center justify-between py-4'>
        <img src={LogoTransparent} alt="logo" className='h-8'/>
        <div className={`relative flex gap-4 text-sm font-light ${darkMode ? "text-gray-300" : "text-gray-600"}`} ref={containerRef}>
          {/* Moving highlight */}
          <div
            className={`absolute top-0 h-full rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-200"} transition-all duration-300`}
            style={{
              left: highlightStyle.left,
              width: highlightStyle.width,
            }}
          ></div>

          {links.map((label, i) => (
            <a
              key={label}
              onClick={() => setIndex(i)}
              className={`relative px-3 py-2 cursor-pointer ${darkMode ? "hover:text-gray-100" : "hover:text-gray-900"} z-10`}
            >
              {label}
            </a>
          ))}
        </div>
        <button className='p-2'>
          <MdLightMode onClick={() => setDarkMode(!darkMode)} className='cursor-pointer w-5 h-5'/>
        </button>

      </div>
    </nav>
  )
}

export default Navbar