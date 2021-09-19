import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { MenuItem, Card, Typography } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";

import { db, storage } from "../firebase/firebase";
import 'firebase/firestore';
import firebase from "firebase";

const AddTask = (props) => {
  const [comments,setComments]=useState();

  // useEffect(()=>{
  //   db.collectionGroup("Comments")
  //       .onSnapshot((snapshot) => {
  //         setComments(
  //           snapshot.docs.map((doc) => {
  //             return { ...doc.data(), id: doc.id };
  //           })
  //         );
  //       });
  // },[])

  const riskLevelOptions = [
    { name: "Low" },
    { name: "Medium" },
    { name: "High" },
  ];

  const [riskLevel, setRiskLevel] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedMember, setSelectedMember] = useState();

  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");

  const formOnSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      e.target.reset();
      if(checkedTeam){
        const res = await db.collection("Tasks").add({
          address: selectedAddress.address,
          assigned_to: selectedTeam.members,
          completed_by: [],
          created_on: firebase.firestore.FieldValue.serverTimestamp(),
          in_progess_with: [],
          location_id: selectedAddress.id,
          pending_for: selectedTeam.members,
          risk_level: riskLevel.name,
          title: selectedTitle,
        });
      }

      if(checkedMember){
          const res = await db.collection("Tasks").add({
            address: selectedAddress.address,
            assigned_to: selectedMember.id,
            completed_by: [],
            created_on: firebase.firestore.FieldValue.serverTimestamp(),
            in_progess_with: [],
            location_id: selectedAddress.id,
            pending_for: selectedMember.id,
            risk_level: riskLevel.name,
            title: selectedTitle,
          });
      }
      
    } catch (error) {
      console.log(error);
    }
  };


  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [checkedTeam, setCheckedTeam] = useState(false);
  const [checkedMember, setCheckedMember] = useState(false);

  const teamHandleChange = (event) => {
    setCheckedMember(false);
    setCheckedTeam(event.target.checked);
  };

  const membersHandleChange = (event) => {
    setCheckedTeam(false);
    setCheckedMember(event.target.checked);
  };

  let showTeam = null;
  let showMember = null;

  if (checkedTeam) {
    showTeam = (
      <Grid item xs={10}>
        <Autocomplete
          variant="outlined"
          disablePortal
          id="combo-box-demo"
          options={props.teams}
          getOptionLabel={(option) => option.title}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Teams" variant="outlined" />
          )}
          onChange={(event, newValue) => {
            setSelectedTeam(newValue);
          }}
        />
      </Grid>
    );
  } else if (!checkedTeam) {
    showTeam = null;
  }

  if (checkedMember) {
    showMember = (
      <Grid item xs={10}>
        <Autocomplete
          variant="outlined"
          disablePortal
          id="combo-box-demo"
          options={props.approvedUsers}
          getOptionLabel={(option) => option.username}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Members" variant="outlined" />
          )}
          onChange={(event, newValue) => {
            setSelectedMember(newValue);
          }}
        />
      </Grid>
    );
  } else if (!checkedMember) {
    showMember = null;
  }

  return (
    <Card style={{ padding: "10px", marginTop: "20px", maxWidth: "1220px" }}>
      <form onSubmit={formOnSubmitHandler}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <TextField
              name="title"
              variant="outlined"
              required
              fullWidth
              id="title"
              placeholder="Title"
              autoFocus
              onChange={(e) => setSelectedTitle(e.target.value)}
            />
          </Grid>

          <Grid item xs={10}>
            <Autocomplete
              variant="outlined"
              disablePortal
              id="combo-box-demo"
              options={props.locations}
              getOptionLabel={(option) => option.address}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Address" variant="outlined" />
              )}
              onChange={(event, newValue) => {
                setSelectedAddress(newValue);
              }}
            />
          </Grid>

          <Grid item xs={10}>
            <Typography variant="h6" component="h3">
              <Checkbox
                {...label}
                checked={checkedTeam}
                onChange={teamHandleChange}
              />{" "}
              Teams
            </Typography>
          </Grid>
          <Grid item xs={10} style={{ marginTop: "-25px" }}>
            <Typography variant="h6" component="h5">
              <Checkbox
                {...label}
                checked={checkedMember}
                onChange={membersHandleChange}
              />{" "}
              Members
            </Typography>
          </Grid>

          {/* AUTOCOMPLETE FOR TEAMS DROP DOWN */}
          {showTeam}

          {/* AUTOCOMPLETE FOR MEMBERS DROP DOWN */}
          {showMember}

          <Grid item xs={10}>
            <Autocomplete
              variant="outlined"
              disablePortal
              id="combo-box-demo"
              options={riskLevelOptions}
              getOptionLabel={(option) => option.name}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Risk Level" variant="outlined" />
              )}
              onChange={(event, newValue) => {
                setRiskLevel(newValue);
              }}
            />
          </Grid>

          <Grid item xs={10}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Add Location
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default AddTask;
