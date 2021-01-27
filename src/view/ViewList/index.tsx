import React from "react";
import { Fragment } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Divider } from "semantic-ui-react";
import { useStateValue } from "../../state";
import { ViewSummary } from '../../types';
import { apiBaseUrl } from '../../constants';
import { setViews } from "../../services/views";

const ViewList: React.FC = () => {
  const [ { views }, dispatch] = useStateValue();

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get<ViewSummary[]>(`${apiBaseUrl}/views/`);
        dispatch(setViews(data));
      } catch (e) {
        console.log("err: ", e);
//        setError(e.toString());
      }
    };
    getData();
  }, []); // eslint-disable-line

  return (
    <Fragment>
      <Link to="/">Main</Link>
      <h2>Views</h2>
      <Divider />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(views).map((view: ViewSummary) => (
            <Table.Row key={view.id}>
              <Table.Cell>{view.title}</Table.Cell>
              <Table.Cell>{view.status}</Table.Cell>
                <Table.Cell>
                  <Link to={`/view/${view.id}`}>Edit</Link>
                </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Fragment>
  );
};

export default ViewList;
