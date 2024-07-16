import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

import dotenv from "dotenv";
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
console.log(OPENAI_API_KEY)

const model = new ChatOpenAI({ openAIApiKey: OPENAI_API_KEY, temperature: 0.9 });
const outputParser = new StringOutputParser();

const OpenAIModel = {
    getResponse: async (
        promptReq = ["human", "Tell me a short joke about {topic}"],
        topic="ice cream"
    ) => {
        const prompt = ChatPromptTemplate.fromMessages([
            promptReq,
        ]);
        const chain = prompt.pipe(model).pipe(outputParser);
        const response = await chain.invoke({
            topic,
        });
        return response;
    }
}

console.log("ai server initialized!");

export default OpenAIModel;