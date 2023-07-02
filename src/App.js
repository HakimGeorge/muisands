import React, {Component} from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Page1 from './Page01';
import Page2 from './Page02';
import Page3 from './Page03';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
      authenticated: false,
      username: '',
      password: '',
      error: '',
    };
  }

  handleTabChange = (event, newValue) => {
    this.setState({ selectedTab: newValue });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleLogin = (event) => {
    event.preventDefault();
    const { username, password } = this.state;

    // Perform authentication logic
    const isValidUser = this.authenticateUser(username, password);

    if (isValidUser) {
      this.setState({ authenticated: true, error: '' });
    } else {
      this.setState({ error: 'Invalid username or password' });
    }
  };

  handleLogout = () => {
    this.setState({ authenticated: false, username: '', password: '', error: '' });
  };


  authenticateUser = (username, password) => {
    // Read the user data from a local JSON file
    const usersData = require('./users.json');

    for (const user of usersData) {
      if (user.username === username && user.password === password) {
        return true;
      }
    }
    return false;
  };


  renderTabContent = () => {
    console.log('Switching to tab '+this.state.selectedTab.toString())
    switch (this.state.selectedTab) {
      case 0:
        return <Page1 />;
      case 1:
        return <Page2 />;
      case 2:
        return <Page3 />;
      default:
        return null;
    }
  };

  render() {
    const { selectedTab, authenticated, username, password, error } = this.state;

    return (
        <div className="App">
          {!authenticated ? (
              <LoginPage
                  username={username}
                  password={password}
                  error={error}
                  onInputChange={this.handleInputChange}
                  onLogin={this.handleLogin}
              />
          ) : (
              <>
                <Tabs value={this.state.selectedTab} onChange={this.handleTabChange}>
                  <Tab label="Maths" />
                  <Tab label="Physics" />
                  <Tab label="Biology" />
                </Tabs>
                <Box p={3}>{this.renderTabContent()}</Box>
                <button onClick={this.handleLogout}>Logout</button>
              </>
          )}
        </div>
    );
  }
}

class LoginPage extends Component {
  render() {
    const { username, password, error, onInputChange, onLogin } = this.props;

    return (
        <div>
          <h1>Login</h1>
          <form onSubmit={onLogin}>
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={onInputChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={onInputChange}
            />
            <p className="error">{error}</p>
            <button type="submit">Login</button>
          </form>
        </div>
    );
  }
}

export default App;
