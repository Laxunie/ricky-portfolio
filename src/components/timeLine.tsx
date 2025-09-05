import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab'

type TimelineItem = {
    company: string;
    role: string;
    time: string;
    description: string;
    color: string;
};
const TimeLine = ({darkMode}: {darkMode: boolean}) => {
    const items: TimelineItem[] = [
        {
        company: "Team Liquid",
        role: "Frontend Developer Intern",
        time: "2023 - 2023",
        description: "worked on Liquid+ fan engagement platform",
        color: "#E8000D"
        },
        {
        company: "Red River College, Winnipeg, MB",
        role: "Business Information Technology Diploma",
        time: "2020 - 2022",
        description: "studied software development, web development, database management, and project management",
        color: "#1F51FF"
        },
        {
            company: "Sisler High School, Winnipeg, MB",
            role: "IT Student",
            time: "2015 - 2019",
            description: "studied server and network administration, participated in cyber security competitions",
            color: "#4CAF50"
        }
    ];

    return (
        <div className={`w-full ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <Timeline position="right">
            {items.map((item, index) => (
                <TimelineItem key={index} sx={{'&::before': {display: 'none',},}}>
                <TimelineSeparator>
                    <TimelineDot sx={{ backgroundColor: item.color }} />
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <div className='flex flex-col hover:scale-[1.02] transition-transform duration-100 ease-in-out text-sm max-sm:gap-1'>
                        <div className='flex items-center justify-between max-sm:flex-col max-sm:items-start'>
                            <p className='font-medium'>{item.company}</p>
                            <p className='text-sm'>{item.time}</p>
                        </div>
                        <h3 className='text-sm italic'>{item.role }</h3>
                        <ul className="list-disc pl-5 text-sm">
                            <li>{item.description}</li>
                        </ul>
                    </div>
                </TimelineContent>
                </TimelineItem>
            ))}
            </Timeline>
        </div>
    )
}

export default TimeLine