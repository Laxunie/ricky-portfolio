import { FaGithub, FaLinkedin, FaSpotify } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = ({darkMode}: {darkMode: boolean}) => {
  return (
    <footer className={`flex flex-col justify-center items-center py-8 text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
        <div className='flex gap-4'>
            <a className="hover:scale-105" href="https://github.com/Laxunie" target="_blank" rel="noopener noreferrer">
                <FaGithub size={21} color={darkMode ? "white" : ""}/>
            </a>
            <a className="hover:scale-105" href="https://www.linkedin.com/in/ricky-la-9aa77715a/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={21} color={darkMode ? "white" : ""}/>
            </a>
            <a className="hover:scale-105" href="https://open.spotify.com/user/8rydvkl2h5n5h2dzlb4g9ygaw" target="_blank" rel="noopener noreferrer">
                <FaSpotify size={21} color={darkMode ? "white" : ""}/>
            </a>
            <a className="hover:scale-105" href="mailto:rickylaa@hotmail.com" target="_blank" rel="noopener noreferrer">
                <MdEmail size={21} color={darkMode ? "white" : ""}/>
            </a>
        </div>
        <p className="text-center mt-2 text-sm font-light ">© 2025 Ricky La. All rights reserved.</p>
    </footer>
  )
}

export default Footer