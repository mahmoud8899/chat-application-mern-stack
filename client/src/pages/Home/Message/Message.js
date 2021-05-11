
import { Fragment, useEffect,  useState ,useRef} from "react"
import { format } from "timeago.js"
import axios from "axios"

const Message = ({ messages, userInfo, chatId, setImageFirends,imageFirends }) => {


  //console.log('cc',messages)
  const [firendes, setFirendes] = useState([])
 
  const scrollRef = useRef()
  //console.log('sita',imageFirends)
      // scroll...
      useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])


  useEffect(() => {

    let firend = chatId.users.map((user) => user)
    setImageFirends(firendes.filter((us) => firend.includes(us._id)))

  }, [chatId,firendes])



  useEffect(() => {

    const userList = async () => {
      try {
        const { data } = await axios.get(`/api/users/`)
        setFirendes(data)
      } catch (error) {
        console.error(error)
      }

    }
    userList()
  }, [])






  return (
    <span   >
    {userInfo ?
       messages &&
          messages.length >= 0 ?

          messages.map((mess, index) => {
            return <Fragment key={index}>

              <span className={mess.sender === userInfo._id ? "andra xp" : "andra"}  ref={scrollRef}>
                {imageFirends.map((user, userIndex) => (
                  <>{user._id === mess.sender && <img src={user?.image} alt="dsd" className="messager_top_image" key={userIndex} />}</>
                ))}
                <p className={mess.sender === userInfo._id ? "messager_top_image_text xp" : "messager_top_image_text"} >{mess?.text}</p>

              </span>
              <span className={mess.sender === userInfo._id ? "time xp" :"time"}>
                  <p className={mess.sender === userInfo._id ? "time1 xp": "time1"}>{format(mess?.date) }</p>
                </span>

            </Fragment>
          })

          : null

        : null}


    </span >

  )
}

export default Message




/*
    {userInfo ?
       messages &&
          messages.length >= 0 ?

          messages.map((mess, index) => {
            return <Fragment key={index}>

              <span className={mess.sender === userInfo._id ? "andra xp" : "andra"}  ref={scrollRef}>
                {imageFirends.map((user, userIndex) => (
                  <>{user._id === mess.sender && <img src={user?.image} alt="dsd" className="messager_top_image" key={userIndex} />}</>
                ))}
                <p className={mess.sender === userInfo._id ? "messager_top_image_text xp" : "messager_top_image_text"} >{mess?.text}</p>

              </span>
              <span className={mess.sender === userInfo._id ? "time xp" :"time"}>
                  <p className={mess.sender === userInfo._id ? "time1 xp": "time1"}>{format(mess?.date) }</p>
                </span>

            </Fragment>
          })

          : null

        : null}

*/