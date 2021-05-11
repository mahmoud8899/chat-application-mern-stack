import axios from "axios"
import { useEffect, useState } from "react"

const ListUsers = ({ conversation, userInfo }) => {

  const [users, setUsers] = useState(null)
  // console.log(users)

  useEffect(() => {

    if (userInfo) {

      const nextUser = conversation.users.find((user) => user !== userInfo._id)
      // console.log('d',nextUser)

      const AddChatList = async () => {
        try {
          const { data } = await axios.get(`/api/user/profile/${nextUser}/`)
          setUsers(data)
        } catch (error) {

          console.error(error)
        }
      }

      AddChatList()


    }

  }, [userInfo, conversation])




  return (
    <>
     
        <span className="list_user_allt" key={conversation.id}>
       
          <img src={users?.image ? users.image : null} alt="" className="list_user_allt_image" />
         
          <p className="sistaMessage">
          <p className="list_user_allt_text">{users?.username} </p>
          <p  className="p_andra">{conversation?.lastMessage}</p>
          
          </p>
        </span>
      

    </>
  )
}

export default ListUsers


/*




*/