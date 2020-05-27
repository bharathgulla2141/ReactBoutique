import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import Autocomplete from "@material-ui/lab/Autocomplete";

import TextField from "@material-ui/core/TextField";

interface Props {
  handleChange: any;
  customer : any
}

const CustomerSelectSearch: React.FC<Props> = (props) => {
  let { state } = useContext(AppContext);
  let [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(state.customers);
  },[state]);

  return (
    <Autocomplete
      options={options}
      value = {props.customer}
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
      onChange={(event: any, newValue: any) => {
        props.handleChange(event, newValue);
      }      
      }
    />
  );
};

export default CustomerSelectSearch;
