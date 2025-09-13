import OpenAI from "openai";

export async function serve(req: Request) {
  const body = await req.json();
  const question = body.question;

  const openai = new OpenAI({ apiKey: Deno.env.get("OPENAI_API_KEY") });

  // Your resume as plain text (can be parsed from PDF/DOCX offline)
const resumeText = `
        Ricky La
        Software Developer
        Skills: React, TypeScript, Python, Java, C#, PHP, Ruby
        Projects: MERN Amazon clone, Flask API, etc.
        Goal: Join FAANG and move to Seattle
        Education: Business Information Technology (Programming path)
        Experience: Courier, independent projects
    `
;

let embeddingsCache: { text: string; embedding: number[] }[] = [];

// Split resume into chunks (basic version, can improve later)
const chunks = resumeText.split("\n").filter(line => line.trim().length > 0);

function initResumeEmbeddings() {
  embeddingsCache = [];

  for (const chunk of chunks) {
    const embeddingResp = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: chunk,
    });

    embeddingsCache.push({
      text: chunk,
      embedding: embeddingResp.data[0].embedding,
    });
  }
}

// Compute cosine similarity
function cosineSimilarity(a: number[], b: number[]) {
  let dot = 0.0, normA = 0.0, normB = 0.0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Find top matching resume chunks
function searchResume(query: string) {
  const queryEmbedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: query,
  });

  const results = embeddingsCache
    .map((entry) => ({
      ...entry,
      score: cosineSimilarity(queryEmbedding.data[0].embedding, entry.embedding),
    }))
    .sort((a, b) => b.score - a.score);

  return results.slice(0, 3).map(r => r.text); // top 3 chunks
}


  try {
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
  }
}