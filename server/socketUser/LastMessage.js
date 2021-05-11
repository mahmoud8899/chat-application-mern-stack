const ChatModel = require('../model/ChatModel')


const sistaMessage = async (userId) =>{


  let chat = await ChatModel.find({users: userId}).select('-message')
  if(chat){

    return {chat}
  }else {
    return {error : 'Fonunt not chat...'}
  }

}

module.exports = sistaMessage

