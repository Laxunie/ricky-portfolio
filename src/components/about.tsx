import {TimeLine, Projects} from './'

type AboutProps = {
  darkMode: boolean;
}
const About = ({darkMode}: AboutProps) => {


  return (
    <div className="">
      <h1 className="text-3xl font-bold">About</h1>
      <span className="text-md font-light">This is me.</span>

      {/* Parent container using :has() */}
      <div className="flex flex-col gap-6 [&_>div:hover]:z-10 [&:has(>div:hover)>div:not(:hover)]:opacity-50 transition-all">
        {/* Timeline */}
        <div className="flex gap-20 justify-between py-4 hover:scale-105 transition-all duration-500 max-sm:flex-col max-sm:gap-2">
          <h1 className="text-lg font-medium">Timeline</h1>
          <TimeLine darkMode={darkMode} />
        </div>

        {/* Projects */}
        <div className="flex gap-20 justify-between py-4 hover:scale-105 transition-all duration-500 max-sm:flex-col max-sm:gap-2">
          <h1 className="text-lg font-medium">Projects</h1>
          <Projects darkMode={darkMode} />
        </div>
      </div>
    </div>
  )
}

export default About