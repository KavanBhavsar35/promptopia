import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
// @kavan
export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const { id } = await params;
        const prompt = await Prompt.findById(id).populate('creator');
        
        if (!prompt) {
            return new Response(JSON.stringify({ error: "Prompt not found" }), { status: 404 });
        }
        
        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};

export const PATCH = async (req, { params }) => {
    const { userId, prompt, tag } = await req.json();
    try {
        await connectToDB();
        const { id } = await params;
        const existingPrompt = await Prompt.findById(id);
        
        if (!existingPrompt || existingPrompt.creator._id.toString() !== userId) {
            return new Response(JSON.stringify({ error: "Prompt not found" }), { status: 404 });
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        const updatedPrompt = await existingPrompt.save();
        
        return new Response(JSON.stringify(updatedPrompt), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
};

export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();
        const { id } = await params;
        const deletedPrompt = await Prompt.findByIdAndDelete(id);
        
        if (!deletedPrompt) {
            return new Response(JSON.stringify({ error: "Prompt not found" }), { status: 404 });
        }
        
        return new Response(JSON.stringify({ message: "Prompt deleted successfully" }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};
