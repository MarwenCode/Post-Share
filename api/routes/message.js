import express from "express";
import Message from "../models/Message.js"
const messageRoute = express.Router()


//add a message
messageRoute.post("/", async(req, res) => {
    const newMessage = new Message(req.body)
    
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage)
        
    } catch (error) {
        res.status(500).json(error)
        
    }
})

//get a message
messageRoute.get("/:conversationId", async(req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId
        });
        res.status(200).json(messages)
        
    } catch (error) {
        res.status(500).json(error)

        
    }
})

export default messageRoute