import React, { useEffect } from 'react'
import { FaArrowRightToBracket } from "react-icons/fa6";
import Typewriter from 'typewriter-effect';

type ChatProps = {
    type: 'user' | 'bot';
    message: string;
}

const AI = ({ darkMode }: { darkMode: boolean }) => {
    // Your resume as plain text (can be parsed from PDF/DOCX offline)

    const [question, setQuestion] = React.useState<string>('');
    const [asked, setAsked] = React.useState<boolean>(false);
    const [chatHistory, setChatHistory] = React.useState<ChatProps[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);

    const chatboxRef = React.useRef<HTMLDivElement | null>(null);

    const handleQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value);
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (!question.trim()) return;
        // Handle the submission of the question to the AI backend
        setChatHistory(prev => [...prev, { type: 'user', message: question }]);
        setAsked(true);
        setQuestion('');
        setLoading(true);


        const response = await fetch('https://ljwcfsnlciwurfhyzasz.supabase.co/functions/v1/openai', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
        });
        const data = await response.text();
        const  content = JSON.parse(data);
        setChatHistory(prev => [...prev, { type: 'bot', message: content.choices[0].message.content }]);
        setLoading(false);
    };

    useEffect(() => {
        if (chatboxRef.current) {
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
        }
    }, [chatHistory]);

    return (
        <div className={`text-center ${darkMode ? 'text-white' : 'text-black'} h-[70vh]`}>
            <div className='flex flex-col justify-center items-center gap-5 mt-10 h-full'>
                <span className={`font-light text-4xl ${asked ? 'hidden' : ''}`}>Ricky AI</span>
                <span id='chatbox' ref={chatboxRef} className={`w-full flex flex-col font-light text-4xl overflow-y-auto wrap-normal ${asked ? 'h-[70vh]' : ''}`}>
                    {chatHistory.map((chat, index) => (
                        <p key={index} className={`m-2 text-sm max-w-[20rem] wrap-break-word whitespace-pre-wrap text-left ${chat.type === 'user' ? `self-end ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded-xl px-3 py-2` : 'self-start'}`}>
                            {chat.type === 'user' ? chat.message : (
                            <Typewriter
                                onInit={(typewriter) => {
                                    typewriter.typeString(chat.message)
                                    .callFunction(() => {
                                        const cursors = document.querySelectorAll('.Typewriter__cursor');
                                        cursors.forEach(cursor => {(cursor as HTMLElement).style.display = 'none'});
                                    })
                                    .stop()
                                    .start();
                                }}
                                options={
                                    {
                                        delay: 100,
                                    }
                                }
                            />)}
                        </p>
                    ))}
                    {loading && (
                        <p className='m-2 text-sm max-w-[20rem] wrap-break-word text-left self-start'>
                            <Typewriter
                                onInit={(typewriter) => {
                                    typewriter.typeString("...")
                                    .stop()
                                    .start();
                                }}
                                options={{
                                    autoStart: true,
                                    loop: true,
                                    delay: 300,
                                }}
                            />
                        </p>
                    )}
                </span>
            <form className='relative w-full max-w-md'>
                <input type="text" placeholder="Ask me anything..." value={question} onChange={(e) => handleQuestion(e)} className={`w-full p-2 border-1 border-gray-500 rounded-4xl ${darkMode ? ' text-white' : ' text-black'}`} />
                <button
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} px-2 py-2 rounded-full`}
                    onClick={(e) => handleSubmit(e)}
                >
                    <FaArrowRightToBracket />
                </button>
            </form>
        </div>
    </div>
  )
}

export default AI