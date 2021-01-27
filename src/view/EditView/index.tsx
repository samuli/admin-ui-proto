import React from "react";
import { useHistory, useParams, useRouteMatch, Link, Switch, Route } from 'react-router-dom';
import { Button, List, Grid } from "semantic-ui-react";
import { useStateValue } from "../../state";
import { changeView } from "../../services/views";

import General from "../General";
import Facets from "../Facets";

const EditView: React.FC = () => {
  const match = useRouteMatch();
  const { id } = useParams();
  const history = useHistory();
  const [, dispatch] = useStateValue();
 
  if (!match) {
      return null;
  }

  const listItems = () => {
    const sections = { general: "General", facets: "Facets" };
    return Object.entries(sections).map(([key,val]) => {
      return (
        <List.Item as="li" key={key}>
          <Link to={`${match.url}/${key}`}>{val}</Link>
        </List.Item>
      );
    });
  };

  const exitViewEdit = () => {
    history.push(`/view`);
    dispatch(changeView());
  };

  const closeSection = () => {
    history.push(`/view/${id}`);
  };

  return (
    <div className="edit-view__container">
      <Grid>
        <Grid.Column floated="left" width={1}>
          <Button as="a" style={{cursor: "pointer"}} onClick={() => exitViewEdit()}>Views</Button>
          <List as="ul">
            { listItems() }
          </List>
        </Grid.Column>
        <Grid.Column floated="left" width={9}>
          <Switch>
            <Route path={`${match.path}/general`}>
              <General onClose={closeSection}/>
            </Route>
            <Route path={`${match.path}/facets`} component={Facets} />
            <Route exact path={`${match.path}`} render={() => <p>edit view</p> } />
          </Switch>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default EditView;
