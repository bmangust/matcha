import { Grid, makeStyles, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { api } from "../../axios";

const fetchedTags = ["snow", "summer", "cake"];

const TagInput = ({ tags }) => {
  const [allTags, setAllTags] = useState(null);

  useEffect(() => {
    const getTags = async () => {
      //   const res = await api("tags");
      //   console.log(res.data.data);
      //   if (res.data.status) {
      //     return res.data.data;
      //   }
      //   return [];
      setAllTags(fetchedTags);
    };
    getTags();
  }, []);

  return (
    <Grid>
      {allTags && (
        <Autocomplete
          multiple
          freeSolo
          id="tags-outlined"
          options={allTags}
          getOptionLabel={(option) => option}
          defaultValue={tags}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Tags"
              placeholder="Tags"
            />
          )}
        />
      )}
    </Grid>
  );
};

export default TagInput;
