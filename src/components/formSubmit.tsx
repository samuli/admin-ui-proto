import React from "react";
import { Grid, Button } from "semantic-ui-react";

type Props = {
  disabled: boolean;
  onCancel: () => void;
};


export const FormSubmit: React.FC<Props> = ({ disabled, onCancel }) => {
    return (
      <Grid style={{ "marginTop": "20px" }}>
        <Grid.Column floated="left" width={5}>
          <Button type="button" onClick={() => onCancel()} color="red">
            Cancel
          </Button>
        </Grid.Column>
        <Grid.Column floated="right" width={5}>
          <Button
            type="submit"
            floated="right"
            color="green"
            disabled={disabled}
           >
           Save
           </Button>
        </Grid.Column>
      </Grid>
    );
};

export default FormSubmit;
