import { ConnectToDB } from "utils/database";
import Products from "models/products";

export default async function handler(req, res) {    
    let requestData = JSON.parse(req.body);

    console.log("requestData",requestData);
    // console.log("req",req)

    try {
        await ConnectToDB();
        let filter = {};
        if (requestData.isNew || requestData.isSale) {
            if (requestData.isNew && requestData.isSale) {
               
                filter.$in = [{ isNew: true }, { isSale: true }];
            } else if (requestData.isNew) {
                
                filter.isNew = true;
            } else if (requestData.isSale) {
              
                filter.isSale = true;
            }
        }
        if(requestData.category){
             filter.productCategoryID = requestData.category ;
        }
        if (requestData.lcost && requestData.hcost) {
            filter.productPrice = {
                $gte: requestData.lcost,
                $lte: requestData.hcost
            };
        } else if (requestData.lcost) {
            filter.productPrice = { $gte: requestData.lcost };
        } else if (requestData.hcost) {
            filter.productPrice = { $lte: requestData.hcost };
        }
       
        

        console.log("filters",filter);
    
        let result = await Products.find(filter)
            .sort([["productPrice", requestData.productsort]])  
            // console.log("result",result)    ;      
        const responseData = { message: "GET  Shop products  successfully", data:result };
        
        // Send the response
        res.status(200).json(responseData);
    } catch (error) {
        // console.error("Error handling GET request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}