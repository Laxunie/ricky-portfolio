const Projects = ({darkMode}: {darkMode: boolean}) => {
    const languages = [{
        name: "React",
        color: "bg-[#61DAFB]" // keep light blue, recognizable
    }, {
        name: "Firebase",
        color: "bg-[#FFCA28]" // yellow/orange, keeps contrast
    }, {
        name: "Material UI",
        color: "bg-[#4B5563]" // dark gray instead of bright blue, easier on eyes
    }, {
        name: "TailWindCSS",
        color: "bg-[#0EA5E9]" // slightly darker teal than before
    }, {
        name: "C#",
        color: "bg-[#68217A]" // purple, keeps as is
    }, {
        name: ".NET",
        color: "bg-[#4B2D8D]" // slightly darker purple to differentiate from C#
    }, {
        name: "Python",
        color: "bg-[#FFD43B]" // switch to Python yellow/gold, still Python-branded
    }, {
        name: "ElectronJS",
        color: "bg-[#3C6E71]" // darker teal/gray for variety
    }, {
        name: "MQTT",
        color: "bg-[#FF6F00]" // keep strong orange, matches MQTT branding
    }
];

    const projects = [
        {
            title: "Notes4U",
            description: "virtual bulletin board for users to store sticky notes online and access them from anywhere.",
            languages: ['React', 'Firebase', 'Material UI', 'TailWindCSS'],
            link: "https://github.com/Laxunie/Notes4U",
            website: "https://notes4u.onrender.com"
        },
        {
            title: "Nutrition Facts API",
            description: "RESTful API that provides nutritional information about various foods.",
            languages: ['React', 'TailWindCSS'],
            link: "https://github.com/Laxunie/nutritonfacts",
            website: "https://nutritionfactsapi.onrender.com/"
        },
        {
            title: "Windows File Remover",
            description: "useful tool to delete files from Windows OS.",
            languages: ['C#', '.NET'],
            link: "https://github.com/Laxunie/FileRemover",
            website: ""
        },
        {
            title: "Smart Lamp",
            description: "IoT project to control a lamp remotely.",
            languages: ['Python', 'React', 'ElectronJS', "MQTT"],
            link: "",
            website: ""
        }
    ];

    return (
        <div className={`w-full ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {projects.map((project) => (
                <div
                onClick={() => window.open(project.link, "_blank")}
                className="flex flex-col md:flex-row items-stretch gap-4 mb-4 text-sm p-4 hover:scale-[1.02] duration-500 cursor-pointer"
                >
                {/* Project Info */}
                <div className="flex-1 max-w-md break-words">
                    <h2 className='font-medium'>{project.title}</h2>
                    <p className='text-sm'>{project.description}</p>
                </div>

                {/* Languages */}
                <div className="flex-1 flex flex-wrap gap-2">
                    {project.languages.map((lang, idx) => {
                        const langObj = languages.find(l => l.name === lang);
                        return (
                        <div key={idx} className="flex items-center gap-2">
                            <span
                                className={`rounded-full text-white text-xs p-2 ${langObj?.color}`}
                            >
                                {lang}
                            </span>
                        </div>
                        )
                    })}
                </div>
            </div>))}
        </div>
    )
}

export default Projects