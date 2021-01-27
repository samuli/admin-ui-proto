import React from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { isRight } from "fp-ts/Either";
import { Divider } from "semantic-ui-react";

import GeneralForm, { GeneralFormValues } from "./GeneralForm";
import ErrorMessage from "../../components/ErrorMessage";
import { setGeneral, updateGeneral } from "../../services/views";
import { viewGeneral } from "../../types";
import { apiBaseUrl } from "../../constants";
import { useStateValue } from "../../state";

type Props = {
  onClose: () => void;
};

const General: React.FC<Props> = ( { onClose } ) => {
  const { id } = useParams();
  const [{ view: { general }, allLanguages, organisationViews }, dispatch] = useStateValue();

  const [error, setError] = React.useState<string | undefined>();

  React.useEffect(() => {
    if (general) {
      return;
    }
    const getData = async () => {
      try {
        const { data } = await axios.get(`${apiBaseUrl}/views/${id}`);
        //const { data } = await axios.get(`${apiBaseUrl}/view/getSection/${id}`);

        const decoded = viewGeneral.decode(data);
         if (isRight(decoded)) {
           //dispatch({type: "SET_GENERAL", payload: decoded.right});
           dispatch(setGeneral(decoded.right));
        } else { 
          console.log(decoded.left);
          setError(`Error decoding general: ${decoded.left}`);
        }
      } catch (e) {
        console.log("err: ", e);
        setError(e.toString());
      }
    };
    getData();
  }, []); // eslint-disable-line

  const save = async (values: GeneralFormValues) => {
    dispatch(updateGeneral(values));
    onClose();
  };

  return (
    <div className="edit-view__general">
      <h2>General settings</h2>
      <Divider />
      { error && <ErrorMessage message={error} /> }
      { general &&
        <GeneralForm
          view={general}
          allLanguages={allLanguages}
          availableParentViews={organisationViews}
          onSubmit={save} onCancel={() => onClose()}
        />
      }
    </div>
  );
};

export default General;
