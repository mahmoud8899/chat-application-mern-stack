import "./Login.css"
import { Link } from "react-router-dom"
import { Action_Login, Google_Action } from "../../redux/Action/Auth_action"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import GoogleLogin from "react-google-login"

import Title from "../Title/index"


const Login = ({ location, history }) => {

    const dispatch = useDispatch()

    const [postData, setPostDate] = useState({ email: '', password: '' })
    // user info.....
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo, loading, error } = userLogin

  



    const redirect = location.search ? location.search.split('=')[1] : '/'
    useEffect(() => {

        if (userInfo) {
            history.push(redirect)
        }

        // eslint-disable-next-line
    }, [dispatch, userInfo, history, redirect])


    // login in  user.... 
    const HandleLogin = (e) => {
        e.preventDefault()

        dispatch(Action_Login(postData))
        //    console.log(postData)

    }


    // google login ...
    const responseGoogle = (res) => {

        if (res.profileObj.email === undefined ||
            res.profileObj.name === undefined ||
            res.profileObj.googleId === undefined ||
            res.profileObj.imageUrl === undefined
        ) {
            console.log('no')
        } else {
            dispatch(Google_Action({
                email: res.profileObj.email,
                username :res.profileObj.name,
                googleId: res.profileObj.googleId,
                image :res.profileObj.imageUrl,
            }))
            console.log(res.profileObj.email, res.profileObj.name, res.profileObj.googleId, res.profileObj.imageUrl)
        }

    }



    return (
        <div className="input_login">



            <Title title="login " description="hello" />
            <span className="first_login">
                <h1>Login</h1>
                {loading && (<h1>Loading...</h1>)}
                {error && (<h1>{error}</h1>)}
            </span>

            <form className="form" onSubmit={HandleLogin}>
                <input
                    type="email"
                    className="input_login_input"
                    placeholder="Emil enter"
                    name="email"
                    onChange={(e) => setPostDate({ ...postData, email: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' ? HandleLogin(e) : null}
                    value={postData.email}
                    required
                />
                <input
                    type="password"
                    className="input_login_input"
                    placeholder="Password.."
                    onChange={(e) => setPostDate({ ...postData, password: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' ? HandleLogin(e) : null}
                    value={postData.password}
                    required

                />
                <button type="submit" className="button_input" >Login....</button>
                <span className="like">
                    <p><Link className="like1" to="/singup">If you do not have an account, you can register on the site</Link></p>
                </span>

                <span className="login_from_allt">
                    <span className="google">
                        <GoogleLogin
                            clientId="835149893481-5h9ukujqrghbbghsl6g79gi8pptkbvuf.apps.googleusercontent.com"
                            onSuccess={responseGoogle}
                            isSignedIn={false}
                            cssClass="fox"
                        />
                    </span>

                </span>
            </form>


        </div>
    )
}


export default Login


