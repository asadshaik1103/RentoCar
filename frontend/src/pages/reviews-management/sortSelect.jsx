// Author: Aditya Mahale(ad619659@dal.ca)

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const SortSelect = ({ sortOption, onSortOptionSelect }) => {
  return (
    <FormControl variant="filled" sx={{ m: 1 }} size="medium">
      <InputLabel id="sortRatingLabel">Sort</InputLabel>
      <Select
        labelId="selectratingSort"
        id="selectratingSort"
        value={sortOption}
        onChange={onSortOptionSelect}
        sx={[
          { color: "#000", borderColor: "#000" },
          {
            "&:active": {
              color: "#000",
              borderColor: "#000",
            },
          },
        ]}
      >
        <MenuItem value="d">
          <em>Most Recent Rating</em>
        </MenuItem>
        <MenuItem value="lh">Lowest to Highest Rating</MenuItem>
        <MenuItem value="hl">Highest to Lowest Rating</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortSelect;
