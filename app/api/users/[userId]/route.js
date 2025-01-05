import { connectToDB } from "@utils/database";
import User from "@models/user";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {

    try {
        await connectToDB();
        const { userId } = await params;
        const user = await User.findById(userId);
        const userPrompts = await Prompt.find({ creator: userId }).populate('creator');
        
        if (!userPrompts) {
            return new Response(JSON.stringify({ error: "User's prompts not found" }), { status: 404 });
        }
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        const newUser = {
            _id: user._id,
            username: user.username,
            email: user.email,
            image: user.image,
            prompts: userPrompts            
        };        
        return new Response(JSON.stringify(newUser), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}