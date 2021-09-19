import React, { useState, useEffect } from "react";
import { Card, IconButton } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { db } from "../firebase/firebase";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Teams = () => {
  const classes = useStyles();

  const [members, setMembers] = useState([]);
  const [key, setKey] = useState(false);
  const [teamMembers, setTeamMembers] = useState("");
  const [title, setTitle] = useState("");
  const [arr, setArr] = useState([]);


  useEffect(() => {
    async function fetchData() {
      try {
        db.collection("Members")
          .where("is_approved", "==", true)
          .onSnapshot((snapshot) => {
            setMembers(
              snapshot.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
              })
            );
          });
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  const addToTeamButtonClick = (e) => {
    e.preventDefault();
    setKey(!key);
  };

  const formOnSubmitHandler = async (e) => {
    e.preventDefault();
    let idArray=[]
    for(let i=0;i<arr.length;i++){
      idArray.push(arr[i].id);
    }

    try {
      console.log("Adding Data");
      const res = await db.collection("Teams").add({
        title: title,
        members: idArray,
      });
      setTitle("");
      setTeamMembers([]);
      setArr([])
    } catch (e) {
      console.log(e);
    }
  };

  console.log(arr)

  return (
    <Card style={{ padding: "10px", marginTop: "20px", maxWidth: "1220px" }}>
      <form className={classes.form} onSubmit={formOnSubmitHandler}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField
              value={title}
              autoComplete="address"
              name="title"
              variant="outlined"
              required
              fullWidth
              id="title"
              placeholder="Title"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={8}>
            <Autocomplete
              variant="outlined"
              disablePortal
              id="combo-box-demo"
              options={members}
              getOptionLabel={(option) => option.username}
              sx={{ width: 300 }}
              key={key}
              renderInput={(params) => (
                <TextField {...params} label="Members" variant="outlined" />
              )}
              onChange={(event, newValue) => {
                setArr((prevState) => {
                  let id = newValue.id;
                  let username = newValue.username;

                    if (arr.some(e=> e.id === id)) {
                      console.log("already exists");
                      return [...prevState];
                    } else return [...prevState, {id,username}];
                });
              }}
            />
            <Button
              style={{ marginTop: "4px" }}
              type="submit"
              variant="contained"
              color="primary"
              onClick={addToTeamButtonClick}
            >
              Add to Team
            </Button>
          </Grid>

          <Grid item xs={8}>
            {arr.length > 0 &&
              arr.map((member) => (
                <Grid item xs={8}>
                  <h3 key={member.id}>
                    {member.username}
                    <IconButton color="secondary" onClick={() => {
                      setArr(()=> arr.filter(item => item.id !== member.id))
                    }}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </h3>
                </Grid>
              ))}
          </Grid>

          <Grid item xs={8}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Create Team
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default Teams;
