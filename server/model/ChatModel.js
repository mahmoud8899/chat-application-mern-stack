const mongoose = require("mongoose")

const ChatSchema = mongoose.Schema({
  users :{
    type : Array
  },

  lastMessage : {type: String},

  message : [
      {
          sender: {type: String},
          text : {type: String},
          date : {type: Date},
      }
  ]

},{
    timestamps: true
})




module.exports = mongoose.model('Chat', ChatSchema)