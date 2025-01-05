import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req, res, next) => {
    try {
        const { userId, prompt, tag } = await req.json();
        await connectToDB();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag,
        });
        await newPrompt.save();
        // res.status(201).json(newPrompt);
        return new Response(newPrompt, { status: 201 });
    } catch (error) {
        console.log(error);
        // res.status(500).json({ message: "Something went wrong", error: error });
        return new Response({ message: "Something went wrong", error }, { status: 500 });
    }
}