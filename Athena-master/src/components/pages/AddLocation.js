import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
// import Dialog from "@material-ui/core/Dialog";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { MenuItem, Card, Typography } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Map from "./../Map/Map";

import { db, storage } from "../firebase/firebase";
import firebase from "firebase";

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

const AddLocation = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [address, setaddress] = useState();
  const [story, setstory] = useState();
  const [noOfFloor, setNoOfFloor] = useState();
  const [latitude, setlatitude] = useState();
  const [longitude, setlongitude] = useState();
  const [floorplan, setFloorplan] = useState();
  const [fireAlarm, setFireAlarm] = useState();
  const [gate, setGate] = useState();
  const [securityAlarm, setSecurityAlarm] = useState();

  const [error, setError] = useState();

  const getCoordinate = (coordinate, coordinateAddress) => {
    setlatitude(coordinate.lat,);
    setlongitude(coordinate.lng);
    setaddress(coordinateAddress)
  }

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFloorplan(e.target.files[0]);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setError(undefined);
  };

  const adduser = (e) => {
    e.preventDefault();
    const uploadfloorplan = storage
      .ref(`floorplans/${floorplan.name}`)
      .put(floorplan);
    uploadfloorplan.on(
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("floorplans")
          .child(floorplan.name)
          .getDownloadURL()
          .then(async (url) => {
            try {
              const checkLocation = await db
                .collection("Location")
                .where("address", "==", address)
                .get();

              if (checkLocation.empty) {
                e.target.reset();
                if(story === "Yes"){
                  const res = await db.collection("Location").add({
                    created_on: firebase.firestore.FieldValue.serverTimestamp(),
                    address: address,
                    is_story_building: story,
                    latitude: latitude,
                    longitude: longitude,
                    floorplan: url,
                    number_of_stories: noOfFloor,
                    access_code: {
                      fire_alarm: fireAlarm,
                      gate: gate,
                      security_alarm: securityAlarm
                  }
                  });
                } else if(story === "No"){
                  const res = await db.collection("Location").add({
                    created_on: firebase.firestore.FieldValue.serverTimestamp(),
                    address: address,
                    is_story_building: story,
                    latitude: latitude,
                    longitude: longitude,
                    floorplan: url,
                    number_of_stories: null,
                    access_code: {
                      fire_alarm: fireAlarm,
                      gate: gate,
                      security_alarm: securityAlarm
                  }
                  });
                }
              } else {
                setError("A Location with same Address Already Exists");
              }
            } catch (error) {
              console.log(error);
            }
          });
      }
    );
  };

  let typeOfBuilding=null;

  if(story === "Yes"){
    typeOfBuilding = (<Grid item xs={12}>
      <Grid item xs={8}>
      <TextField
        margin="dense"
        variant="outlined"
        required
        fullWidth
        id="no_of_floors"
        label="Number_of_floors"
        name="noOfFloors"
        onChange={(e) => setNoOfFloor(e.target.value)}
      >
      </TextField>
    </Grid>
    </Grid>)
  } else if(!story === "No"){
    typeOfBuilding=null;
  }

  return (
    <Card style={{ padding: "10px", marginTop: "20px", maxWidth: "1220px" }}>
      <form className={classes.form} onSubmit={adduser}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
          <Map  
              getCoordinate={getCoordinate}
              onLoad={map => {
                const bounds = new window.google.maps.LatLngBounds();
                map.fitBounds(bounds);
              }}
          />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={address}
              autoComplete="address"
              name="address"
              variant="outlined"
              required
              fullWidth
              id="address"
              placeholder="Address"
              autoFocus
              // onChange={(e) => setaddress(address)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={latitude}
              autoComplete="latitude"
              name="latitude"
              variant="outlined"
              required
              fullWidth
              id="latitude"
              placeholder="latitude"
              autoFocus
              // onChange={(e) => setlatitude(latitude)}
            />
          </Grid><Grid item xs={6}>
            <TextField
              value={longitude}
              autoComplete="longitude"
              name="longitude"
              variant="outlined"
              required
              fullWidth
              id="longitude"
              placeholder="longitude"
              autoFocus
              // onChange={(e) => setlongitude(longitude)}
            />
          </Grid>

          {/* console.log(latitude)
    console.log(longitude)
    console.log(address) */}
          <Grid item xs={8}>
            <TextField
              select
              variant="outlined"
              required
              fullWidth
              id="story_building"
              label="Type of Building"
              name="storyBuilding"
              onChange={(e) => setstory(e.target.value)}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <CloudUploadIcon color="primary" /> <span>Upload Floor Plan</span>
            <input
              accept="image/*"
              id="contained-button-file"
              type="file"
              onChange={handleChange}
            />
          </Grid>
          {typeOfBuilding}
          <Grid item xs={8}>
            <TextField
              margin="dense"
              variant="outlined"
              required
              fullWidth
              id="fire_alarm"
              label="Fire Alarm"
              name="fireAlarm"
              onChange={(e) => setFireAlarm(e.target.value)}
            >
            </TextField>
          </Grid>
          <Grid item xs={8}>
            <TextField
              margin="dense"
              variant="outlined"
              required
              fullWidth
              id="gate"
              label="Gate"
              name="Gate"
              onChange={(e) => setGate(e.target.value)}
            >
            </TextField>
          </Grid>
          <Grid item xs={8}>
            <TextField
              margin="dense"
              variant="outlined"
              required
              fullWidth
              id="security_alarm"
              label="Security Alarm"
              name="securityAlarm"
              onChange={(e) => setSecurityAlarm(e.target.value)}
            >
            </TextField>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Add Location
        </Button>
      </form>
    </Card>
  );
};

export default AddLocation;
