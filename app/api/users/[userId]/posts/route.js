import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";

export const GET = async (req, { params }) => { 
    try {
       await connectToDB();
       console.log('Connected to DB');
    //    console.log('Params:', params);

       const { userId } = await params;
       const prompts = await Prompt.find({ creator: userId }).populate("creator");

       return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};
