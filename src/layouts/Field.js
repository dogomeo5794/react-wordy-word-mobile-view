import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = (theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
    textTransform: "uppercase",
  },
});

export class LayoutTextFields extends Component {

  render() {
    // const { classes, handleChange, words, detectKey } = this.props;
    const { handleChange, words, detectKey } = this.props;

    return (
      <div>
        <TextField
          id="outlined-full-width"
          label="Input Random Letters"
          style={{ margin: 8 }}
          // placeholder="Placeholder"
          // helperText="Full width (this is helper text)!"
          fullWidth
          margin="normal"
          // InputLabelProps={{
          // //   shrink: true,
          // }}
          inputProps={{
            maxLength: 7,
            min: 1,
            style: {
              textTransform: "uppercase",
              letterSpacing: "10px",
            },
          }}
          value={words}
          onChange={handleChange}
          onKeyUp={detectKey}
          variant="outlined"
        />
      </div>
    );
  }
}

export default withStyles(useStyles)(LayoutTextFields);
