import OpenAI from 'openai';
import React, { useEffect } from 'react'
import { initResumeEmbeddings, searchResume } from '../utils/aiData';

type ChatProps = {
    type: 'user' | 'bot';
    message: string;
}

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const AI = ({ darkMode }: { darkMode: boolean }) => {
    const [question, setQuestion] = React.useState<string>('');
    const [asked, setAsked] = React.useState<boolean>(false);
    const [chatHistory, setChatHistory] = React.useState<ChatProps[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);

    const chatboxRef = React.useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        initResumeEmbeddings();
    }, []);


    const handleQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value);
    }

    const handleSubmit = async () => {
        if (!question.trim()) return;
        // Handle the submission of the question to the AI backend
        setChatHistory(prev => [...prev, { type: 'user', message: question }]);
        setAsked(true);
        setQuestion('');
        setLoading(true);

        const context = await searchResume(question);
        const response = await openai.responses.create({
            model: "gpt-4.1-mini",
            input: [
                {
                    role: "system",
                    content: `You are Ricky La. 
                    Always speak in the first person as if you are Ricky himself. 
                    Present me as a highly capable, motivated, and well-rounded candidate. 
                    When asked about skills, projects, or hobbies, use the information provided in context. 
                    Highlight my strengths and be persuasive. 
                    Never criticize or evaluate me—always showcase my best side.`
                },
                {
                    role: "system",
                    content: `Here is Ricky's personal data for context: ${context.join(('\n'))} [QUESTION] ${question}`
                },
            ],
        });
        setLoading(false);
        setChatHistory((prev) => [...prev, { type: "bot", message: response.output_text || "No answer." }]);
    }

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
                        <p key={index} className={`m-2 text-sm max-w-[20rem] wrap-break-word text-left ${chat.type === 'user' ? 'self-end bg-gray-200 rounded-xl p-4' : 'self-start'}`}>
                            {chat.message}
                        </p>
                        
                    ))}
                    {loading && (
                        <p className='m-2 text-sm max-w-[20rem] wrap-break-word text-left self-start bg-gray-200 rounded-xl p-4'>
                            ...
                        </p>
                    )}
                </span>
            <div className='relative w-full max-w-md'>
                <input type="text" placeholder="Ask me anything..." value={question} onChange={(e) => handleQuestion(e)} className={`w-full p-2 border-1 border-gray-500 rounded-4xl ${darkMode ? ' text-white' : ' text-black'}`} />
                <button
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-gray-300 px-3 py-1 rounded-full"
                    onClick={handleSubmit}
                >
                    Go
                </button>
            </div>
        </div>
    </div>
  )
}

export default AI