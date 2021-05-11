
import {Link} from "react-router-dom"
import  {useSelector, useDispatch} from "react-redux"
import {lOgout} from "../../redux/Action/Auth_action"
import "./index.css"

const NavBar = ()=>{


    const dispatch = useDispatch()

        // user info..... 
        const userLogin = useSelector((state) => state.userLogin)
        const { userInfo} = userLogin





    return (
        <div className="navbar">
            <span className="first_navbar">
            <i className="fas fa-home"></i>
            <Link  to="/">social network </Link>
            </span>

            <ul className="list">
                {userInfo ? (
                    <>
                    <li><Link to={`/profile/${userInfo._id}/`}>My Profil</Link></li>
                    <li><Link  onClick={()=> dispatch(lOgout())} >logUt</Link></li>
                  <li className="sx"><img src={userInfo.image} className="navbARiMAGE" alt={userInfo.userrname} /><p>{userInfo.username}</p></li> 
                    </>
                ) : (
                    <>
                    <li><Link to="/login/">Login</Link></li>
                    </>
                )}
               
                
            </ul>


            <span className="icons">
                <span className="xxx"></span>
                <span className="xxx"></span>
                <span className="xxx"></span>
            </span>
        </div>
    )
}


export default NavBar