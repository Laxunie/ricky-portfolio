import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import OpenAI from "https://deno.land/x/openai@v4.24.0/mod.ts";
const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY')
});
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
};
const resumeText = `
    Ricky La
    Software Engineer
    From: Winnipeg
    Birthday: March 27, 2001
    Moved: Vancouver
    Frontend: React, TypeScript, TailwindCSS, MUI, JavaScript, HTML, CSS, PHP, Ruby
    Backend: Node.js, Express, PHP, Python, Supabase, MySQL, MongoDB, Firebase
    Projects: {
        "Amazon clone": "A full-stack e-commerce application built with the MERN stack.",
        "Notes4U": "Notes App for users to store sticky notes online and access them from anywhere."
        "Ricky AI": "An AI-powered career assistant using OpenAI's GPT-5 Model and Supabase Edge Functions."
        "Nutrition Facts API": "RESTful API that provides nutritional information about various foods."
        "Windows File Remover": "Useful tool to delete files from Windows OS.
        "IoT Lamp": "An IoT lamp controlled via a web interface using Raspberry Pi, Microcontroller and Python."
    }
    Goals: [
        "Get into FAANG",
        "Move to Seattle"
    ]
    College: Red River College
    Degree: Business Information Technology Diploma
    Graduation: 2022
    Work Experience: {
        "Team Liquid": "Frontend Developer Intern - Worked on Liquid+ fan engagement platform using React and TypeScript. Improved user experience and performance.",
        "Red River College": "Full Stack Software Developer - Studied software development, web development, database management, and project management"
    }
`;

let embeddingsCache = [];
// Split resume into chunks (basic version, can improve later)
const chunks = resumeText.split("\n").filter((line)=>line.trim().length > 0);
async function initResumeEmbeddings() {
  embeddingsCache = [];
  for (const chunk of chunks){
    const embeddingResp = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: chunk
    });
    embeddingsCache.push({
      text: chunk,
      embedding: embeddingResp.data[0].embedding
    });
  }
}
// Compute cosine similarity
function cosineSimilarity(a, b) {
  let dot = 0.0, normA = 0.0, normB = 0.0;
  for(let i = 0; i < a.length; i++){
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}
// Find top matching resume chunks
async function searchResume(query) {
  const queryEmbedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: query
  });
  const results = embeddingsCache.map((entry)=>({
      ...entry,
      score: cosineSimilarity(queryEmbedding.data[0].embedding, entry.embedding)
    })).sort((a, b)=>b.score - a.score);
  return results.slice(0, 3).map((r)=>r.text); // top 3 chunks
}
serve(async (req)=>{
  await initResumeEmbeddings();
  // Handle preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders
    });
  }
  // Normal request
  const { question } = await req.json();
  const context = await searchResume(question);
  const response = await openai.chat.completions.create({
    model: "gpt-5",
    messages: [
      {
        role: "system",
        content: `
          You are Ricky's personal AI career assistant.
          - Never speak as Ricky and always refer to him in the third person.
          - Never act like you are talking to Ricky
          - You may add light conversational style (friendly, engaging).
          - Do NOT invent details outside the context (skills, jobs, locations).
          - If the user asks for ideas, advice, or examples, you may expand — but keep it relevant to Ricky’s context.
          - Keep answers concise by default, but expand if the user asks for detail.
          - Do not mention anything about ChatGPt or AI.
          - Always answer as if you are Ricky's personal career assistant.
          - Always refer to the resume for answers.
          - If you cannot find the answer in the resume, say "I don't know" or "I don't have that information".
          - If the question is not related to Ricky's career, politely inform the user that you can only answer questions related to Ricky's career.

          [CONTEXT]
          ${context.join("\n")}
        `
      },
      {
        role: "user",
        content: question
      }
    ]
  });
  return new Response(JSON.stringify(response), {
    status: 200,
    headers: corsHeaders
  });
});
