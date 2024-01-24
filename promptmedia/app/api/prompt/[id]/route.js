import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//Endpoints of CRUD
//GET (read)

export const GET = async (request, { params }) => {
  try {
      await connectToDB()

      const prompt = await Prompt.findById(params.id).populate("creator")
      if (!prompt) return new Response("Prompt Not Found", { status: 404 });

      return new Response(JSON.stringify(prompt), { status: 200 })

  } catch (error) {
      return new Response("Internal Server Error", { status: 500 });
  }
}


//PATCH (Update)
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
      await connectToDB();

      // Find the existing prompt by ID
      const existingPrompt = await Prompt.findById(params.id);

      if (!existingPrompt) {
          return new Response("Prompt not found", { status: 404 });
      }

      // Update the prompt with new data
      existingPrompt.prompt = prompt;
      existingPrompt.tag = tag;

      await existingPrompt.save();

      return new Response("Successfully updated the Prompts", { status: 200 });
  } catch (error) {
      return new Response("Error Updating Prompt", { status: 500 });
  }
};


export const DELETE = async (request, { params }) => {
    try {
        console.log("Attempting to delete prompt with ID:", params.id);
        await connectToDB();
  
        // Find the prompt by ID and remove it
        const deletedPrompt = await Prompt.findByIdAndDelete(params.id);
  
        console.log("Deleted prompt:", deletedPrompt);
  
        if (!deletedPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }
  
        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        console.error("Error deleting prompt:", error);
        return new Response("Error deleting prompt", { status: 500 });
    }
  };
  