import {
  Paper,
  TableCell,
  TableRow,
  Typography,
  TableHead,
  Table,
  makeStyles,
  TableContainer,
  TablePagination,
  Toolbar,
  TextField,
  InputAdornment,
  Button,
  IconButton,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import TableBody from "@material-ui/core/TableBody";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import GetAppIcon from '@material-ui/icons/GetApp';
import CheckIcon from "@material-ui/icons/Check";
import $ from "jquery";
import { db } from "../firebase/firebase";

import LocationModal from "../Modals/Location/LocationModal";
import EditUser from "../Modals/Users/EditUser";
import ViewUser from "../Modals/Users/ViewUser";
import { Link } from "react-router-dom";

const Width = $(window).width() - 300;

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.primary.main,
      backgroundColor: "#3c44b126",
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
  searchInput: {
    width: "75%",
  },
  actionbtn: {
    minWidth: 0,
    margin: theme.spacing(0.5),
    backgroundColor: "#f8324526",
    "& .MuiButton-label": {
      color: "#f83245",
    },
  },
}));

function Locations({ locations, apiKey }) {
  const classes = useStyles();

  const [accessCode, setAccessCode] = useState({});
  const [isStoryBuilding, setIsStoryBuilding] = useState(false);
  const [noOfStories, setNoOfStories] = useState();

  const [showModal, setShowModal] = useState(false);


  const pages = [10, 25, 50];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSearch = (e) => {
    let target = e.target;

    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.address.toLowerCase().includes(target.value)
          );
      },
    });
  };
  const recordsAfterpaging = () => {
    return filterFn
      .fn(locations)
      .slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  const downloadFile = (link) => {
    window.open(link);
    // window.location.href = link;
  }

  const locationModalHandler = () => {
    setShowModal(!showModal);
  }

  let modal=null;

  if(showModal){
    modal=  <LocationModal open={open} onClose={handleClose}/>
  } else if (!showModal){
    modal=null
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e) => {
    console.log();
    setOpen(true);
  };

  const handleClose = () => {
    console.log("hello world")
    setOpen(false);
  };

  return (
    <>
      {/* {modal} */}

      <LocationModal accessCode={accessCode} isStoryBuilding={isStoryBuilding} noOfStories={noOfStories} open={open} onClose={handleClose}/>

      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            marginTop: 10,
          }}
        >
          <TextField
            variant="outlined"
            label="Search Locations"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
        </div>
        {/* <Button
            variant="outlined"
            startIcon={<AddLocationIcon />}
            color="primary"
            onClick={handleClickOpen}
          >
            Add Location
          </Button> */}
      </Toolbar>
      <TableContainer>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Address</TableCell>
              <TableCell>Type of Building</TableCell>
              <TableCell>Latitude</TableCell>
              <TableCell>Longitude</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recordsAfterpaging().map((item) => (
              <TableRow onClick={()=>{
                setAccessCode(item.access_code);
                setIsStoryBuilding(item.is_story_building);
                setNoOfStories(item.number_of_stories);
                handleClickOpen();
              }} key={item.id}>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.is_story_building}</TableCell>
                <TableCell>{item.latitude}</TableCell>
                <TableCell>{item.longitude}</TableCell>
                <TableCell>
                  {/* <IconButton
                      color="primary"
                      onClick={() => {
                        setcurrentUsername(item.username);
                        setcurrentemail(item.email_address);
                        setcurrentpassword(item.password);
                        setcurrentID(item.id);
                        setcurrentphone(item.phone_number);
                        handleClickOpen2();
                      }}
                    >
                      <EditLocationIcon />
                    </IconButton> */}

                  <IconButton
                    // color="secondary"
                    value={item.floorplan}
                    onClick={async (e) => {
                      e.preventDefault();
                      console.log(item.floorplan)
                      downloadFile(item.floorplan);
                    }}
                  >
                    <GetAppIcon />
                  </IconButton>

                  <IconButton
                    color="secondary"
                    onClick={async (e) => {
                      e.preventDefault();
                      const user = await db
                        .collection("Location")
                        .doc(item.id)
                        .delete();
                    }}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        component="div"
        page={page}
        rowsPerPageOptions={pages}
        rowsPerPage={rowsPerPage}
        count={locations.length}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />

      {/* <Typography variant="h4" style={{ marginTop: "20px" }}>
        Add Location
      </Typography>
      <AddLocation open={open} handleClose={handleClose} apiKey={apiKey} /> */}
    </>
  );
}

export default Locations;
