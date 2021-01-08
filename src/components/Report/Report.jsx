import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../axios";
import Input from "../Input/Input";

const Report = ({ open, onClose }) => {
  const id = useSelector((state) => state.general.id);
  const [report, setReport] = useState({
    category: "",
    complaint: "",
  });
  const [valid, setValid] = useState(false);

  const categories = [
    "Unacceptable behavior",
    "Bad language",
    "Advertisement account",
  ];

  const handleChange = (e) => {
    e.preventDefault();
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  const handleSendReport = async (e) => {
    e.stopPropagation();
    const body = {
      date: (new Date().getTime() / 1000).toFixed(0),
      category: report.category,
      complaint: report.complaint,
      authorId: id,
    };
    const res = await api.post("report", body);
    console.log(res);
  };

  const inputs = [
    {
      name: "category",
      type: "select",
      label: "Category",
      value: report.category,
      values: categories,
      ignoreUntouched: true,
      onChange: handleChange,
    },
    {
      name: "complaint",
      type: "text",
      label: "Complaint",
      value: report.complaint,
      ignoreUntouched: true,
      onChange: handleChange,
      onValidate: (isValid) => setValid(isValid),
      rules: {
        helperText: "Invalid complaint. Min length: 5, max length: 40",
        rule: {
          minLength: 3,
          maxLength: 40,
          regex: /^.+$/i,
        },
      },
    },
  ];

  return (
    <Dialog
      style={{ minWidth: 400 }}
      open={open}
      onClose={onClose}
      aria-labelledby="form-report-user"
    >
      <DialogTitle id="form-report-user">Report user</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please give some description, why user is reported
        </DialogContentText>
        {inputs.map((input) => (
          <Input style={{ margin: "10px 0" }} key={input.name} {...input} />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button disabled={!valid} onClick={handleSendReport}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Report;
