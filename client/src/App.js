import {Route , BrowserRouter} from "react-router-dom"
import Login  from "./pages/Login/login"
import SingUp  from "./pages/Login/singup"
import Home from "./pages/Home/Home"
import ProFil from "./pages/PorFile/profile"
import NavBar from "./pages/NavBar/index"

import "./index.css"

const App = () => {

  return (
    <BrowserRouter>

    <NavBar />
    <Route path="/login" component={Login} exact />
    <Route path="/singup" component={SingUp} exact />
    <Route path="/"  component={Home} exact/>
    <Route path="/search/:keyword/"  component={Home} exact/>
    <Route path="/profile/:id/" component={ProFil} exact />
    </BrowserRouter>
  )
}


export default App