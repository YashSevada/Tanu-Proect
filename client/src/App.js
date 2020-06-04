import React from 'react';
import SignUp from './components/pages/SignUp'
import SignIn from './components/pages/SignIn'
import Dashboard from './components/dashboard/Dashboard'
import Tabs from './components/dashboard/Tabs'
import ForgotPassword from './components/pages/ForgotPassword'
import {BrowserRouter , Route , Switch} from 'react-router-dom'
import AuthState from './context/authContext/AuthState'
import PrivateRoute from './components/routes/PrivateRoute'
import ClassroomState from './context/classroomContext/ClassroomState'

function App() {
  return (
    <AuthState>
      <ClassroomState>
        <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={SignIn} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/Tabs" component={Tabs} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <SignUp />
          </Switch>
        </div>
        </BrowserRouter>
      </ClassroomState>
    </AuthState>
  );
}

export default App;
