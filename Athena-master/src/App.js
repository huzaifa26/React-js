import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import AutoComplete from "./components/Map/AutoComplete";

import Signin from "./components/auth/Signin";
import Dashboard from "./components/pages/Dashboard"
import Admins from "./components/pages/Admins";
import Teams from "./components/pages/Teams";
import Layout from "./components/layout/Layout";
import AdminLayout from "./components/layout/AdminLayout";
import Members from "./components/pages/Users";
import Locations from "./components/pages/Locations";
import Tasks from "./components/pages/Tasks";
import { db } from "./components/firebase/firebase";
import Alerts from "./components/pages/Alerts";
import PushMessage from "./components/pages/PushMessage";
import AddLocation from "./components/pages/AddLocation";
import Settings from "./components/pages/Settings";
import AddTask from "./components/pages/AddTask";
import Logs from "./components/pages/Logs";

function App() {
  const [members, setMembers] = useState([]);
  const [teams, setTeams] = useState([]);

  const [approvedUsers, setApprovedUsers]=useState([]);
  const [unapprovedUsers, setUnapprovedUsers]=useState([]);
  const [locations, setLocations] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [apiKey, setapiKey] = useState([]);
  const [currentUser, setcurrentUser] = useState();


  useEffect(()=>{
    async function fetchData() {
      db.collection("Members")
        .where('is_approved', '==', true)
        .onSnapshot((snapshot) => {
          setApprovedUsers(
            snapshot.docs.map((doc) => {
              return { ...doc.data(), id: doc.id };
            })
          );
        });

        db.collection("Members")
        .where('is_approved', '==', false)
        .onSnapshot((snapshot) => {
          setUnapprovedUsers(
            snapshot.docs.map((doc) => {
              return { ...doc.data(), id: doc.id };
            })
          );
        });

    }

    fetchData();
  },[])

  useEffect(() => {
    async function fetchData() {
      db.collection("Members")
        .orderBy("created_on", "desc")
        .onSnapshot((snapshot) => {
          setMembers(
            snapshot.docs.map((doc) => {
              return { ...doc.data(), id: doc.id };
            })
          );
        });
      //USE TO FETCH LOCATIONS FROM DATA BASE AND PASS TO LOCATION COMPONENT
      db.collection("Location")
        .orderBy("created_on", "desc")
        .onSnapshot((snapshot) => {
          setLocations(
            snapshot.docs.map((doc) => {
              return { ...doc.data(), id: doc.id };
            })
          );
        });
    }
    fetchData();
  }, []);
  // console.log(tasks)
  useEffect(() => {
    async function fetchData() {
      db.collection("Tasks")
        .orderBy("created_on", "desc")
        .onSnapshot((snapshot) => {
          setTasks(
            snapshot.docs.map((doc) => {
              // console.log(doc.id)
              return { ...doc.data(), id: doc.id };
            })
          );
        });
          db.collection("Teams")
            .onSnapshot((snapshot) => {
              setTeams(
                snapshot.docs.map((doc) => {
                  return { ...doc.data(), id: doc.id };
                })
              );
            });
      db.collection("Alerts")
        .orderBy("created_on", "desc")
        .onSnapshot((snapshot) => {
          setAlerts(
            snapshot.docs.map((doc) => {
              return { ...doc.data(), id: doc.id };
            })
          );
        });
      db.collection("Api").onSnapshot((snapshot) => {
        setapiKey(
          snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
      });
    }
    fetchData();
  }, []);

  // console.log(users) 

  // console.log(apiKey[0]);
  return (
    <Router>
      <Switch>
      <Route
          exact
          path="/dashboard"
          render={() => <AdminLayout body={<Dashboard approvedUsers={approvedUsers} unapprovedUsers={unapprovedUsers} members={members} tasks={tasks} locations={locations} />} />}
        />
        <Route
          exact
          path="/admin/manageadmins"
          render={() => <AdminLayout body={<Admins />} />}
        />
        <Route
          exact
          path="/admin/members"
          render={() => <AdminLayout body={<Members users={members}/>} />}
        />
        <Route
          exact
          path="/admin/teams"
          render={() => <AdminLayout body={<Teams users={members} />} />}
        />
        <Route
          exact
          path="/admin/locations"
          render={() => (
            <AdminLayout
              body={<Locations locations={locations} apiKey={apiKey} />}
            />
          )}
        />

        <Route
          exact
          path="/admin/addlocations"
          render={() => (
            <AdminLayout
              body={<AddLocation locations={locations} apiKey={apiKey} />}
            />
          )}
        />

        {/* /admin/addlocations */}
        <Route
          exact
          path="/admin/manage-tasks"
          render={() => (
            <AdminLayout
              body={<Tasks tasks={tasks} users={members} locations={locations} />}
            />
          )}
        />
        <Route
          exact
          path="/admin/add-tasks"
          render={() => (
            <AdminLayout
              body={<AddTask locations={locations} teams={teams} approvedUsers={approvedUsers}/>}
            />
          )}
        />
        <Route
          exact
          path="/admin/alerts"
          render={() => <AdminLayout body={<Alerts alerts={alerts} />} />}
        />
        <Route
          exact
          path="/admin/pushmessage"
          render={() => <AdminLayout body={<PushMessage users={members} />} />}
        />
        <Route
          exact
          path="/admin/settings"
          render={() => (
            <AdminLayout
              body={<Settings apiKey={apiKey} currentUser={currentUser} />}
            />
          )}
        />
        <Route
          exact
          path="/users"
          render={() => <Layout body={<Members users={members} />} />}
        />
        <Route
          exact
          path="/locations"
          render={() => (
            <Layout
              body={<Locations locations={locations} apiKey={apiKey} />}
            />
          )}
        />
        <Route
          exact
          path="/log"
          render={() => (
            <Layout
              body={<Tasks tasks={tasks} users={members} locations={locations} />}
            />
          )}
        />
        <Route
          exact
          path="/alerts"
          render={() => <Layout body={<Alerts alerts={alerts} />} />}
        />
        <Route
          exact
          path="/pushmessage"
          render={() => <Layout body={<PushMessage users={members} />} />}
        />
        <Route
          exact
          path="/settings"
          render={() => (
            <Layout
              body={<Settings apiKey={apiKey} currentUser={currentUser} />}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => <Signin setcurrentUser={setcurrentUser} />}
        />

        <Route
          exact
          path="/logs"
          render={() => <AdminLayout body={<Logs />} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
