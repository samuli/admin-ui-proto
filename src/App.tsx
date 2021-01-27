import React from "react";
import { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Container, Divider } from "semantic-ui-react";

import ViewList from "./view/ViewList";
import EditView from "./view/EditView";

const App: React.FC = () => {
 

  return (
    <Container>
      <div className="edit-view">
        <Router>
          <Switch>
            <Route path="/view/:id" component={EditView} />
            <Route exact path="/views" component={ViewList} />
            <Route path="/" render={() => {
              return (
                <Fragment>
                  <h2>index</h2>
                  <Divider />
                  <p><Link to="/views">views</Link></p>
                </Fragment>
              );
            }} />
          </Switch>
        </Router>
      </div>
    </Container>
  );
};

export default App;
