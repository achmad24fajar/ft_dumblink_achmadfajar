import { useEffect, useContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { UserContext } from './Context/userContext'
import { API, setAuthToken } from './Config/api'

import PrivateRoute from './Config/PrivateRoute'

// Import Components
import Header from './Components/Header'
import Template from './Pages/Template'
import CreateLink from './Pages/CreateLink'
import Profile from './Pages/Profile'
import Links from './Pages/Links'
import Landing from './Pages/Landing'
import Preview from './Pages/Preview'
import EditLink from './Pages/EditLink'

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {

  const [state, dispatch] = useContext(UserContext);

  // Hooks
  useEffect(() => {
    API.get('/user')
    .then(response => {


      let payload = response.data.data.user;
      payload.token = localStorage.token;
      console.log(payload)

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: payload,
      })
    })
    .catch(error => {
      console.log(error);
    });
  }, [])

  const client = new QueryClient();
  
  return (
    <div className="App">
    <QueryClientProvider client={client}>
      <Router>
        <Route exact path="/" component={Landing} />
        <PrivateRoute exact path="/templates" component={Template}/>
        <PrivateRoute exact path="/template/create/link/theme/:theme" component={CreateLink}/>
        <PrivateRoute exact path="/profile" component={Profile}/>
        <PrivateRoute exact path="/links" component={Links}/>
        <PrivateRoute exact path="/preview/:uniqueLink" component={Preview}/>
        <PrivateRoute exact path="/link/:id" component={EditLink}/>
      </Router>
    </QueryClientProvider>
    </div>
  );
}

export default App;
