import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

interface Props {
  handleChange: any;
}

const CustomerSelectSearch: React.FC<Props> = (props) => {
  const theme = createMuiTheme({
    overrides: {
      MuiOutlinedInput: {
        root: {
          borderRadius: "8px",
        },
      },
    },
  });
  let { state } = useContext(AppContext);

  return (
    <ThemeProvider theme={theme}>
    <Autocomplete
      options={state.customers}
      style={{ marginTop: "20px" }}
      getOptionLabel={(option: any) => option.fullName}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Customer"
          variant="outlined"
          style={{ borderRadius: "8px" }}
        />
      )}
      onChange={(event: any, newValue: any) =>
        props.handleChange(event, newValue)
      }
    />
    </ThemeProvider>
  );
};

export default CustomerSelectSearch;
