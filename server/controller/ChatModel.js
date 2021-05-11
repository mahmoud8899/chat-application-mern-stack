const ChatModel = require('../model/ChatModel')
const ObjectID  = require('mongoose').Types.ObjectId



// chat melland users...
exports.visatChat = async (req,res)=>{
    if(!ObjectID.isValid(req.params.userId)) return res.status(404).json({message: `not user id${req.params.userId}`})

   let chat = await ChatModel.find({users : req.params.userId}).select('-message')
   if(chat){
       return res.json(chat)
   }else{
  return res.status(404).json('not..//....')
   }

}



// create chat....
exports.createChat = async (req,res)=>{

    try{
        let chat = await ChatModel.findOne({users : [req.body.userId, req.body.lastId]})

        if(!chat) {
           chat = new ChatModel({
               users :[req.body.userId, req.body.lastId],
               lastMessage: ''
           })
           const saveChat = await chat.save()
           return res.status(201).json(saveChat)
        }else{
            return res.status(404).json({message: 'We have some Chat...'})
        }

    }catch(error){
        return res.status(404).json({message : error.message})
    }
}



// create Message 
exports.createMessage = async (req,res)=>{
if(!ObjectID.isValid(req.params.id)) return res.status(404).json({message : `Not Id ${req.params.id}`})
    const {sender, text } = req.body
   try{
       let chat = await ChatModel.findById({_id : req.params.id})
       if(chat) {
           const addMessage = {
               sender,
               text,
               date: Date.now()
           }

           chat.message.push(addMessage)
           chat.lastMessage = text
           const saveChat = await chat.save()
           return res.json(saveChat)

       }else {
           return res.json({message : 'We have not id .....'})
       }
      
   }catch(error){
       return res.status(404).json({message: error.message})
   }


}


// chat id 
exports.visaChatId = async (req,res)=>{
    if(!ObjectID.isValid(req.params.id)) return res.status(404).json({message : `Not Id ${req.params.id}`})
    
    let chat  = await ChatModel.findOne({_id : req.params.id})
    if(chat) return res.json(chat)
    else return res.json({message: 'not chat...'})
}