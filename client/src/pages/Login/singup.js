import "./Login.css"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { SingUp_action } from "../../redux/Action/Auth_action"
import { useDispatch, useSelector } from "react-redux"

const SingUp = ({ history }) => {

    const [postData, setPostData] = useState({ username: '', email: '', password: '' })


    const dispatch = useDispatch()

    // user check in ... 
    const singUp = useSelector((state) => state.singUp)
    const {
        loading,
        error,
        success
        
    } = singUp


    useEffect(()=>{

        if(success) history.push('/')

    },[success,history])


    const HandleSingUp = e => {


        e.preventDefault()
        dispatch(SingUp_action(postData))
        setPostData({ username: '', email: '', password: '' })
    }



    return (
        <div className="input_login">
            <span className="first_login">
                <h1>Singup</h1>
                {loading && (<h1>Loading</h1>)}
                {error && (<h1>{error}</h1>)}
            </span>

            <form className="form" onSubmit={HandleSingUp}>
                <input
                    type="text"
                    className="input_login_input"
                    placeholder="Username..."
                    value={postData.username}
                    onChange={(e) => setPostData({ ...postData, username: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' ? HandleSingUp(e) : null}
                    name="username"
                    required

                />
                <input
                    type="email"
                    className="input_login_input"
                    placeholder="Emil enter"
                    value={postData.email}
                    onChange={(e) => setPostData({ ...postData, email: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' ? HandleSingUp(e) : null}
                    name="email"
                    required

                />
                <input
                    type="password"
                    className="input_login_input"
                    placeholder="Password.."
                    value={postData.password}
                    onChange={(e) => setPostData({ ...postData, password: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' ? HandleSingUp(e) : null}
                    name="password"
                    required
                />
                <button type="submit" className="button_input" >singup....</button>
                <span className="like">
                    <p><Link className="like1" to="/login">If you have an account, you can log in from here</Link></p>
                </span>
            </form>


        </div>
    )
}


export default SingUp