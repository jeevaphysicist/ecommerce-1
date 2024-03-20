import { ConnectToDB } from "utils/database";
import User from "@models/user";

export default async function handler(req, res) {    
    let requestData = JSON.parse(req.body);
    let {id ,cart } = requestData ;


    try {
        await ConnectToDB();
        let result = await User.updateOne({_id:id},{cart : cart})
            // console.log("result",result)    ;      
        const responseData = { message: "Update User cart successfully", data:result };
        
        // Send the response
        res.status(200).json(responseData);
    } catch (error) {
        // console.error("Error handling GET request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}