import { Grid, makeStyles, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useTags } from "../../hooks/useTags.hook";

const useStyles = makeStyles({
  Container: {
    width: "100%",
  },
});

const TagInput = (props) => {
  const classes = useStyles();
  const { tags } = useTags();
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    setAllTags(tags);
  }, [tags]);

  return (
    <Grid className={classes.Container}>
      {allTags && (
        <Autocomplete
          multiple
          freeSolo
          id={props.name}
          options={allTags}
          getOptionLabel={(option) => option}
          defaultValue={props.tags}
          onChange={(e, value, reason) => props.onChange({ value })}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Tags"
              placeholder="Enter tag and press enter"
            />
          )}
        />
      )}
    </Grid>
  );
};

export default TagInput;
