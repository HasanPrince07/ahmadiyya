import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Aboutmanagement from "./admin/Aboutmanagement";
import Addeventmanagement from "./admin/Addeventmanagement";
import Addfacilitymanagement from "./admin/Addfacilitymanagement";
import Addlinksmanagement from "./admin/Addlinksmanagement";
import Adminmanagement from "./admin/Adminmanagement";
import Contactmanagement from "./admin/Contactmanagement";
import Dashboard from "./admin/Dashboard";
import Eventmanagement from "./admin/Eventmanagement";
import Facilitymanagement from "./admin/Facilitymanagement";
import Footermanagement from "./admin/Footermanagement";
import Headermanagement from "./admin/Headermanagement";
import Historymanagement from "./admin/Historymanagement";
import Imagesmanagement from "./admin/Imagesmanagement";
import Login from "./admin/Login";
import Mainmanagement from "./admin/Mainmanagement";
import Resultmanagement from "./admin/Resultmanagement";
import Reviewmanagement from "./admin/Reviewmanagement";
import Studentmanagement from "./admin/Studentmanagement";
import Teachermanagement from "./admin/Teachermanagement";
import Userreviewmanagement from "./admin/Userreviewmanagement";
import { context } from "./common/Context";
import About from "./user/About";
import Addreview from "./user/Addreview";
import Contact from "./user/Contact";
import Error from "./user/Error";
import Event from "./user/Event";
import Facility from "./user/Facility";
import Facilitypage from "./user/Facilitypage";
import History from "./user/History";
import Home from "./user/Home";
import Result from "./user/Result";
import Review from "./user/Review";

function App() {

  const [gAdmin, setGAdmin] = useState(null)
  const [gMessage, setGMessage] = useState(null)
  const [gAdminName, setGAdminName] = useState(JSON.parse(window.localStorage.getItem("admin_name")))

  return (
    <>
      <Router>
        <context.Provider value={{ gAdmin, setGAdmin, gMessage, setGMessage, gAdminName, setGAdminName }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/event" element={<Event />} />
            <Route path="/result" element={<Result />} />
            <Route path="/review" element={<Review />} />
            <Route path="/facility" element={<Facility />} />
            <Route path="/history" element={<History />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/addreview" element={<Addreview />} />
            <Route path="/facilitypage" element={<Facilitypage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/adminmanagement" element={<Adminmanagement />} />
            <Route path="/headermanagement" element={<Headermanagement />} />
            <Route path="/mainmanagement" element={<Mainmanagement />} />
            <Route path="/imagesmanagement" element={<Imagesmanagement />} />
            <Route path="/reviewmanagement" element={<Reviewmanagement />} />
            <Route path="/userreviewmanagement" element={<Userreviewmanagement />} />
            <Route path="/eventmanagement" element={<Eventmanagement />} />
            <Route path="/addeventmanagement" element={<Addeventmanagement />} />
            <Route path="/footermanagement" element={<Footermanagement />} />
            <Route path="/addlinksmanagement" element={<Addlinksmanagement />} />
            <Route path="/aboutmanagement" element={<Aboutmanagement />} />
            <Route path="/teachermanagement" element={<Teachermanagement />} />
            <Route path="/resultmanagement" element={<Resultmanagement />} />
            <Route path="/studentmanagement" element={<Studentmanagement />} />
            <Route path="/facilitymanagement" element={<Facilitymanagement />} />
            <Route path="/addfacilitymanagement" element={<Addfacilitymanagement />} />
            <Route path="/historymanagement" element={<Historymanagement />} />
            <Route path="/contactmanagement" element={<Contactmanagement />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </context.Provider>
      </Router>
    </>
  );
}

export default App;