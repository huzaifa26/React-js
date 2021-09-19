import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  TextField,
  Grid,
  MenuItem,
  Button,
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { db } from "../firebase/firebase";
import firebase from "firebase";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from "@material-ui/core/Checkbox";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));




const PushMessage = (props) => {
  const classes = useStyles();
  const [approvedUsers, setApprovedUsers]=useState([]);
  const [teams, setTeams]=useState([]);
  const [selectedTeam, setSelectedTeam] = useState();
  const [message, setMessage] = useState();
  const [open, setOpen] = useState(false);
  const [key,setKey] = useState(false);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [checkedTeam, setCheckedTeam] = useState(false);
  const [member, setMember] = useState();

  const [checkedMember, setCheckedMember] = useState(false);

  useEffect(()=>{
    async function fetchData() {
        try{
            db.collection("Teams")
            .onSnapshot((snapshot) => {
              setTeams(
                snapshot.docs.map((doc) => {
                  return { ...doc.data(), id: doc.id };
                })
              );
            });

            db.collection("Members")
            .where('is_approved', '==', true)
            .onSnapshot((snapshot) => {
              setApprovedUsers(
                snapshot.docs.map((doc) => {
                  return { ...doc.data(), id: doc.id };
                })
              );
            });
        } catch (e){
            console.log(e);
        }       
} 
fetchData();
},[]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if(checkedTeam){
      for(let i=0;i<selectedTeam[0].members.length;i++){ 
        try {
          e.target.reset();
            const res = await db.collection("PushMessage").add({
            created_on: firebase.firestore.FieldValue.serverTimestamp(),
            for_member: selectedTeam[0].members[i],
            message: message,
          });
          handleClick();
          setKey(!key);
        } catch (error) {
          console.log(error);
        }
      }
    }

    if(checkedMember){
      try {
        e.target.reset();
          const res = await db.collection("PushMessage").add({
          created_on: firebase.firestore.FieldValue.serverTimestamp(),
          for_member: member,
          message: message,
        });
        handleClick();
        setKey(!key);
      } catch (error) {
        console.log(error);
      }
    }
    
  };


  const selectTeamHandler = (e) => {
    e.preventDefault();
    try{
      db.collection("Teams")
      .where("title", "==", e.target.value)
      .onSnapshot((snapshot) => {
        setSelectedTeam(
          snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
      });
  } catch (e){
      console.log(e);
  }  
  }

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
      <Grid item xs={12}>
              <Autocomplete
                key={key}
                variant="outlined"
                disablePortal
                id="combo-box-demo"
                options={teams}
                getOptionLabel={(option) => option.title}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Team" variant="outlined" onSelect={selectTeamHandler}/>}
            />
            </Grid>
    );
  } else if (!checkedTeam) {
    showTeam = null;
  }

  if (checkedMember) {
    showMember = (
      <Grid item xs={12}>
        <Autocomplete
          variant="outlined"
          disablePortal
          id="combo-box-demo"
          options={approvedUsers}
          getOptionLabel={(option) => option.username}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Members" variant="outlined" />
          )}
          onChange={(event, newValue) => {
            setMember(newValue.id);
          }}
        />
      </Grid>
    );
  } else if (!checkedMember) {
    showMember = null;
  }

  return (
    <>
      <Card
        style={{
          padding: "20px",
        }}
      >
        <Grid item xs={10}>
            <Typography variant="h6" component="h3" style={{marginBottom:"15px"}}>
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
        <form className={classes.form} onSubmit={sendMessage}>
          <Grid container spacing={2}>
            {/* TEAM CODE */}
            {showTeam}

            {/* SHOW MEMBERS */}
            {showMember}


            <Grid item xs={12}>
              <TextField
                id="message"
                label="Message"
                fullWidth
                required
                multiline
                defaultValue=""
                rows={4}
                variant="outlined"
                onChange={(e) => setMessage(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Send Message
          </Button>
        </form>
      </Card>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Message Sent!
        </Alert>
      </Snackbar>
    </>
  );
};

export default PushMessage;
