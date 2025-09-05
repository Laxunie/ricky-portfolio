import { FaEnvelope, FaInstagram, FaLinkedin } from "react-icons/fa";

const ContactPage = ({darkMode}: {darkMode: boolean}) => {
  const platforms = [
    { name: "Email", icon: <FaEnvelope />, info: "rickylaa@hotmail.com", link: "mailto:rickylaa@hotmail.com" },
    { name: "Instagram", icon: <FaInstagram />, info: "@ricky.laa", link: "https://instagram.com/ricky.laa" },
    { name: "LinkedIn", icon: <FaLinkedin />, info: "in/rickylaa", link: "https://linkedin.com/in/rickylaa" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Contact</h1>
      <p className=" mb-6">Let's connect.</p>

      <p className="mb-4">Connect with me through any of these platforms.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {platforms.map((platform, idx) => (
          <a
            key={idx}
            href={platform.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 p-4 border rounded-lg hover:shadow-md transition-shadow ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
          >
            <div className={`text-xl`}>{platform.icon}</div>
            <div className="flex flex-col">
              <span className={`font-medium`}>{platform.name}</span>
              <span className={`text-sm`}>{platform.info}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactPage;
