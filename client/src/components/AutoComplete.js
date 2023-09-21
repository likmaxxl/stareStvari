import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export function AutoComplete({ autocomplete,onChangeOption,label,errorMesasge,errText }) {
  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={autocomplete}
        onChange={onChangeOption} 
        sx={{ width: 300}}
        renderInput={params => (  
          <TextField
          error={errorMesasge}
          helperText={errText}
          {...params}
          label={label}
          variant="outlined"
          />
        )}
      />
    </>
  );
}
