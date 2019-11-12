import 'materialize-css/dist/css/materialize.min.css'
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header'; 
import { connect } from 'react-redux';
import * as actions from '../actions';
import Landing from './Landing';
// import Dashboard from './Dashboard';
import SurveyNew from './surveys/surveyNew';

export const Dashboard = () => {
  return <div>Hello</div>
};

class App extends React.Component {

  componentDidMount = () => {
    this.props.fetchUser();
  }
  render(){
    return (
      // <div className="container">
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/" component={Landing} />
          <Route path="/surveys" component={Dashboard} />
          <Route path="/surveys/new" component={SurveyNew} />
        </div>
      </BrowserRouter>
      // </div>
    );
  }
}

export default connect(actions)(App);