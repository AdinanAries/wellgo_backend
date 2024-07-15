import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOpenAI({});
const outputParser = new StringOutputParser();

const getResponse = async (
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
    return response
}

//console.log(getResponse());
console.log("ai started");
/**
Why did the ice cream go to the gym?
Because it wanted to get a little "cone"ditioning!
 */