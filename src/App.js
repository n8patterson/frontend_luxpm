import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './style/App.scss';
import SignIn from './views/auth/SignIn';
import ForgotPassword from './views/auth/ForgotPassword';
import MenuAppBar from './views/core/MenuAppBar';
import useToken from './hooks/useToken';

const App = () => {
    const {token, setToken} = useToken();

    return (
        <div>
            <Router> 
                <MenuAppBar token={token} setToken={setToken}/>
                <Switch>
                    <Route path='/login'>
                        <SignIn token={token} setToken={setToken}/>
                    </Route>
                    <Route path='/forgotPassword'>
                        <ForgotPassword token={token} />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
