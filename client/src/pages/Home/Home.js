import "./style.css"
import { useSelector, useDispatch } from "react-redux"
import { useEffect,  useState } from "react"
import ListUsers from "./ListUser/ListUsers"
import Message from "./Message/Message"
import OliUser from "./OnlineUser/OnlineUser"
import axios from "axios"
import Search from "./Search/Search"
import { Route, Link } from "react-router-dom"
import { userList_action } from "../../redux/Action/Auth_action"
import io from "socket.io-client"

const Home = ({ match }) => {


  const [socket, setSocket] = useState(null);


  const setupSocket = () => {

    if (!socket) {
      const newSocket = io.connect('http://localhost:8000/', { reconnect: true })

      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        console.log("error", "Socket Disconnected!");
      });

      newSocket.on("connect", () => {
        console.log("success", "Socket Connected!");
      });

      setSocket(newSocket);
    }
  };

  useEffect(() => {
    setupSocket();
    //eslint-disable-next-line
  }, []);










  const keyword = match.params.keyword
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userList_action(keyword))
    //eslint-disable-next-line
  }, [keyword, dispatch])



  const [conversation, setConversation] = useState([])
  // console.log(conversation)
  const [messages, setMessages] = useState([])

  const [chatId, setChatId] = useState(null)


  const [connectUser, setConnectUser] = useState([])


  // userInfo...
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const listUsers = useSelector((state) => state.listUsers)
  const { userList } = listUsers
  // data kpommer from socket.... real time.... 
  const [arrivalMessage, setArrivalMessage] = useState(null);
  //  console.log('here data', arrivalMessage)


  useEffect(() => {
    if (userInfo) {

      // users Online...
      if (socket) {
        socket.emit('join', userInfo._id)


        socket.on('getUser', users => {
          setConnectUser(users)
        })
      }

      // tillbaka data from server...
      if (socket) {

        socket.on('newMessage', (data) => {
          setArrivalMessage({
            sender: data.senderId,
            text: data.text,
            date: Date.now()
          })
        })
      }

      if (socket) {
        socket.emit('NextSista', userInfo._id)
        socket.on('LoadMesaa', ({ chat }) => {
          setConversation(chat)
          // console.log('chat', chat)
        })
      }

      // disconnect Users... 
      if (socket) {
        return (() => {
          socket.on('disconnect')
          socket.off()
        })
      }


    }

  }, [userInfo, socket])


  // sista si
  useEffect(() => {

    arrivalMessage &&
      chatId?.users.includes(arrivalMessage.sender) &&
      // console.log('tillbak',arrivalMessage)
      setMessages((prev) => [...prev, arrivalMessage])
    // console.log(messages)

  }, [arrivalMessage, chatId])

  // message... 
  useEffect(() => {
    if (userInfo) {


      const addMessage = async () => {
        try {
          const { data } = await axios.get(`/api/chat/chat/${chatId._id}`)
          // console.log(data.message)
          setMessages(data.message)
        } catch (error) {
          console.error(error.response ? error.response.data.message : error.message)
        }
      }
      addMessage()
    }
    //eslint-disable-next-line
  }, [userInfo, chatId])






  // Handel SendMessage to User..
  const [messageInput, setMessageInput] = useState()
  const SenderMessag = async (e) => {
    e.preventDefault()

    const addmessage = {
      sender: userInfo._id,
      text: messageInput,
    }

    // send messger till server...
    if (socket) {
      if (chatId) {
        let lastAndra = chatId.users.find((user) => user !== userInfo._id)
        //  console.log('lastuser', lastAndra)
        socket.emit('loadingMessage', {
          senderId: userInfo._id,
          text: messageInput,
          resicId: lastAndra
        })
      }

    }


    try {
      if (chatId) {
        const { data } = await axios.post(`/api/create/message/${chatId._id}/`, addmessage)
        // console.log('data',data.message)
        setMessages([...data.message, messages])
      }

    } catch (error) {
      console.error(error)
    }

    setMessageInput('')
  }



  // create chat... 
  const [dtaCreate, setDataCreate] = useState()
  const HandleCreateChat = async (id) => {
    //localhost:8000/api/create/chat/
    const NewChat = {
      userId: userInfo._id,
      lastId: id
    }




    try {
      const { data } = await axios.post(`/api/create/chat/`, NewChat)
      setDataCreate(data)
    } catch (error) {
      console.error(
        error.respons &&
          error.response.data.messae ?
          error.response.data.messae :
          error.messae
      )
    }

  }



  // user Image to Chat....
  const [imageFirends, setImageFirends] = useState([])
  const [me, setMe] = useState()
  useEffect(() => {

    if (userInfo) {
      let checkInput = imageFirends.filter((user) => user._id !== userInfo._id)
      setMe(checkInput)
    }
  }, [userInfo, imageFirends])






 






  return (
    <>

      <div className="connection_home">
        <span className="listUser">
          <span className="search_list">


            <span className="first_chat_icons">
              <p className="chat_text">chat</p>

            </span>



            <Route render={({ history }) => <Search history={history} />} />

            {userInfo ?
              keyword ?

                <>
                  <Link className="back" to={'/'}>to Back</Link>
                  {userList.map((userl, userlIndex) => (


                    <span className="list_user_allt_x" key={userlIndex}>
                      <span className="allt_search">
                        <Link to={`/profile/${userl._id}`}> <img src={userl.image} alt="" className="list_user_allt_image" /></Link>
                        <p className="list_user_allt_text_search">{userl.username}</p>
                      </span>
                      {userInfo._id !== userl._id ? <p className="create_chat" onClick={() => HandleCreateChat(userl._id)}> add chat</p> : null}

                    </span>


                  ))}
                </>
                : null


              : null}

            {dtaCreate && <p>Create chat</p>}
          </span>


          <span>
            {conversation.map((conversation, conversationIndex) => (
              <span onClick={() => setChatId(conversation)} key={conversationIndex} >
                <ListUsers conversation={conversation} userInfo={userInfo} />
              </span>

            ))}

          </span>
        </span>

        <span className="message_input">


          {chatId ?
            <>





              {me.map((user, userIndex) => (
                <span className="vem" key={userIndex} >
                  <img src={user?.image} className="vemImger" alt="" />
                  <p className="vem_text">{user?.username}</p>
                  <span className="call">
                    <i className="fas fa-phone-volume" ></i>
                  </span>
                </span>
              ))}







              <span className="messager_top">
                <Message
                  userInfo={userInfo}
                  messages={messages}
                  chatId={chatId}
                  setImageFirends={setImageFirends}
                  imageFirends={imageFirends}

                />
              </span>

              <span className="messager_ner_input">
                <textarea
                  placeholder="Messager "
                  className="messager_top_Input"
                  name="message"
                  onChange={e => setMessageInput(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' ? SenderMessag(e) : null}
                  value={messageInput}
                />
              </span>

            </>




            : <span>No Message ....</span>}




        </span>


        <span className="online_users">
          <OliUser />
        </span>


      </div>
    </>
  )
}


export default Home

