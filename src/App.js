import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Page1 from './Page01';
import Page2 from './Page02';
import Page3 from './Page03';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0
    };
  }

  handleTabChange = (event, newValue) => {
    this.setState({ selectedTab: newValue });
  };

  renderTabContent = () => {
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
    return (
        <div>
          <Tabs value={this.state.selectedTab} onChange={this.handleTabChange}>
            <Tab label="Tab 1" />
            <Tab label="Tab 2" />
            <Tab label="Tab 3" />
          </Tabs>
          <Box p={3}>{this.renderTabContent()}</Box>
        </div>
    );
  }
}

export default App;
