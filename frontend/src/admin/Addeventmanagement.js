import { useContext, useEffect, useState } from "react";
import AdminHeader from "../common/AdminHeader";
import Sidebar from "../common/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate } from "react-router-dom";
import { context } from "../common/Context";

const styles = {
  heading: {
    color: "black",
  },
  headingBtn: {
    backgroundColor: "white",
    color: "#1d1d36",
    border: "2px solid #1d1d36",
  },
  headingBtnHover: {
    color: "white",
    backgroundColor: "#1d1d36",
    border: "2px solid #1d1d36",
  },
  tableHead: {
    backgroundColor: "#1d1d36",
    color: "white",
  },
  tableBtn: {
    backgroundColor: "#1d1d36",
    color: "white",
  },
  modelDiv1: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modelDiv2: {
    backgroundColor: "white",
    border: "2px solid black",
  },
  modelBtn: {
    backgroundColor: "#1d1d36",
    color: "white",
  },
};

function Addeventmanagement() {
  const [model, setModel] = useState(false);
  const [modelV, setModelV] = useState(false);

  const [headingBtn1, setHeadingBtn1] = useState(false);
  const [headingBtn2, setHeadingBtn2] = useState(false);

  const [eImage, setEImage] = useState("");
  const [eName, setEName] = useState("");
  const [eDetail, setEDetail] = useState("");
  const [eStatus, setEStatus] = useState("");
  const [eDate, setEDate] = useState("");
  const [eId, setEId] = useState("");

  const [eData, setEData] = useState([]);

  const navigate = useNavigate();

  const { setGMessage } = useContext(context);

  useEffect(() => {
    fetchFn();
  }, [model]);

  function fetchFn() {
    const token = window.localStorage.getItem("token");
    fetch("/admin/authentication", {
      headers: { authorization: `Bearer ${JSON.parse(token)}` },
    }).then((result) => { return result.json() }).then((data) => {
      if (data.status === 401) {
        window.localStorage.removeItem("token");
        setGMessage("Please login");
        navigate("/login");
      } else if (data.status === 500) {
        window.localStorage.removeItem("token");
        setGMessage("Server error. Please login");
        navigate("/login");
      } else {
        fetch("/admin/fetchEvents").then((result) => {
          return result.json();
        }).then((data) => {
          if (data.status === 200) {
            setEData(data.data);
          } else {
            toast(data.message, { type: "error" });
          }
        });
      }
    });
  }

  function handleform(e) {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("eImage", eImage);
    formdata.append("eName", eName);
    formdata.append("eDate", eDate);
    formdata.append("eStatus", eStatus);
    formdata.append("eDetail", eDetail);
    if (eId) {
      fetch(`/admin/updateEvents/${eId}`, {
        method: "PUT",
        body: formdata,
      }).then((result) => {
        return result.json();
      }).then((data) => {
        if (data.status === 200) {
          fetchFn();
          toast("Successfully updated!", { type: "success" });
        } else {
          toast("Update failed. Please try again.", { type: "error" });
        }
      });
    } else {
      fetch("/admin/addEvents", {
        method: "POST",
        body: formdata,
      }).then((result) => {
        return result.json();
      }).then((data) => {
        if (data.status === 201) {
          fetchFn();
          toast("Event added successfully!", { type: "success" });
        } else {
          toast("Process failed. Please try again.", { type: "error" });
        }
      });
    }
  }

  function deleteFn(id) {
    fetch(`/admin/deleteEvents/${id}`, {
      method: "DELETE",
    }).then((result) => {
      return result.json();
    }).then((data) => {
      if (data.status === 200) {
        fetchFn();
        toast("Successfully deleted!", { type: "success" });
      } else {
        toast("Failed to delete. Please try again.", { type: "error" });
      }
    });
  }

  function aModel() {
    setModel(true);
    setModelV(true);
    setEImage("");
    setEName("");
    setEDetail("");
    setEStatus("");
    setEDate("");
    setEId("");
  }
  function uModel(id) {
    setModel(true);
    setModelV(false);
    fetch(`/admin/fetchEventsById/${id}`)
      .then((result) => {
        return result.json();
      }).then((data) => {
        if (data.status === 200) {
          setEImage(data.data.eImage);
          setEName(data.data.eName);
          setEDetail(data.data.eDetail);
          setEStatus(data.data.eStatus);
          setEDate(data.data.eDate);
          setEId(data.data._id);
        } else {
          toast(data.message, { type: "error" });
        }
      });
  }

  return (
    <>
      <ToastContainer position="top-center" />
      <AdminHeader />
      <section id="management-page">
        <div className="container-fluid">
          <div className="row">
            <Sidebar />
            <div className="col-sm-9">
              <p style={styles.heading} className="d-sm-block d-none font-family text-center fw-bolder heading my-3"> ADD EVENT MANAGEMENT PAGE </p>
              <p style={styles.heading} className="d-sm-none d-block font-family text-center fw-bolder fs-5 my-2" > ADD EVENT MANAGEMENT PAGE </p>
              <div>
                <NavLink to="/eventmanagement" className="text-decoration-none">
                  <button style={headingBtn1 ? styles.headingBtn : styles.headingBtnHover} onMouseLeave={() => { setHeadingBtn1(false); }} onMouseEnter={() => { setHeadingBtn1(true); }} className="d-sm-block d-none font-family fw-normal btn form-control heading-btn shadow-none rounded-0 my-2" >EVENT MANAGEMENT PAGE</button>
                </NavLink>
                <NavLink to="/eventmanagement" className="text-decoration-none">
                  <button style={headingBtn1 ? styles.headingBtn : styles.headingBtnHover} onMouseLeave={() => { setHeadingBtn1(false); }} onMouseEnter={() => { setHeadingBtn1(true); }} className="d-sm-none d-block font-family fw-normal btn form-control shadow-none rounded-0 my-2" >EVENT MANAGEMENT PAGE</button>
                </NavLink>
                <NavLink onClick={() => { aModel(); }} className="text-decoration-none" >
                  <button style={headingBtn2 ? styles.headingBtn : styles.headingBtnHover} onMouseLeave={() => { setHeadingBtn2(false); }} onMouseEnter={() => { setHeadingBtn2(true); }} className="d-sm-block d-none font-family fw-normal btn form-control heading-btn shadow-none rounded-0 my-2" > ADD EVENT </button>
                </NavLink>
                <NavLink onClick={() => { aModel(); }} className="text-decoration-none" >
                  <button style={headingBtn2 ? styles.headingBtn : styles.headingBtnHover} onMouseLeave={() => { setHeadingBtn2(false); }} onMouseEnter={() => { setHeadingBtn2(true); }} className="d-sm-none d-block font-family fw-normal btn form-control shadow-none rounded-0 my-2" > ADD EVENT </button>
                </NavLink>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered text-center table-center font-family">
                  <thead style={styles.tableHead} className="align-middle">
                    <tr>
                      <th>S.NO.</th>
                      <th>EVENT IMAGE</th>
                      <th>EVENT NAME</th>
                      <th>EVENT DATE</th>
                      <th>STATUS</th>
                      <th>EVENT DETAIL</th>
                      <th>DELETE</th>
                      <th>UPDATE</th>
                    </tr>
                  </thead>
                  {eData.length !== 0 ? (
                    <tbody className="align-middle">
                      {eData.map((data, key) => (
                        <tr key={data._id}>
                          <td>{key + 1}</td>
                          <td>
                            <img src={data.eImage} alt="image not found" />
                          </td>
                          <td>{data.eName}</td>
                          <td>{data.eDate}</td>
                          <td>{data.eStatus}</td>
                          <td>{data.eDetail}</td>
                          <td>
                            <button onClick={() => { deleteFn(data._id); }} style={styles.tableBtn} className="btn form-control shadow-none rounded-0" > DELETE</button>
                          </td>
                          <td>
                            <button onClick={() => { uModel(data._id) }} style={styles.tableBtn} className="btn form-control shadow-none rounded-0" > UPDATE </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <tbody className="align-middle">
                      <tr>
                        <td colSpan="8">NO EVENT HERE</td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {model ? (
        <>
          <section style={styles.modelDiv1} id="model" className="overflow-auto" >
            <div className="container">
              <div style={styles.modelDiv2} className="row p-3 my-sm-5">
                <div className="col-sm-12 d-sm-flex d-block justify-content-between align-items-center">
                  <div className="col-sm-2"></div>
                  <div>
                    <p style={styles.heading} className="d-sm-block d-none font-family text-center fw-bolder model-heading m-0" >
                      {modelV ? "ADD" : "UPDATE"} EVENT SECTION HERE
                    </p>
                    <p style={styles.heading} className="d-sm-none d-block font-family text-center fw-bolder fs-5" >
                      {modelV ? "ADD" : "UPDATE"} EVENT SECTION HERE
                    </p>
                  </div>
                  <div className="col-sm-2">
                    <button style={styles.modelBtn} className="btn font-family form-control rounded-0" onClick={() => { setModel(false); }} >
                      CLOSE
                    </button>
                  </div>
                </div>
                <form method="post" onSubmit={(e) => { handleform(e); }} >
                  <div className="col-sm-12 my-2">
                    <label className="d-sm-block d-none font-family model-label">
                      EVENT IMAGE
                    </label>
                    <label className="d-sm-none d-block font-family fs-4">
                      EVENT IMAGE
                    </label>
                    <input type="file" onChange={(e) => { setEImage(e.target.files[0]); }} className="form-control shadow-none font-family mt-2 rounded-0" />
                  </div>
                  <div className="col-sm-12 d-sm-flex d-block my-2">
                    <div className="col-sm-6 pe-sm-2 pe-0">
                      <label className="d-sm-block d-none font-family model-label">
                        EVENT NAME
                      </label>
                      <label className="d-sm-none d-block font-family fs-4">
                        EVENT NAME
                      </label>
                      <input type="text" onChange={(e) => { setEName(e.target.value); }} value={eName} className="form-control shadow-none font-family mt-2 rounded-0" required />
                    </div>
                    <div className="col-sm-6 ps-sm-2 ps-0">
                      <label className="d-sm-block d-none font-family model-label">
                        EVENT DATE
                      </label>
                      <label className="d-sm-none d-block font-family fs-4">
                        EVENT DATE
                      </label>
                      <input type="text" onChange={(e) => { setEDate(e.target.value); }} value={eDate} className="form-control shadow-none font-family mt-2 rounded-0" required />
                    </div>
                  </div>
                  <div className="col-sm-12 my-2">
                    <label className="d-sm-block d-none font-family model-label">
                      EVENT STATUS
                    </label>
                    <label className="d-sm-none d-block font-family fs-4">
                      EVENT STATUS
                    </label>
                  </div>
                  <div className="col-sm-12 d-flex">
                    <div className="col-sm-2 col-6 d-flex">
                      <label className="d-sm-block d-none font-family model-sub-label">
                        UPCOMING EVENT
                      </label>
                      <label className="d-sm-none d-block font-family model-sub-mob-label">
                        UPCOMING EVENT
                      </label>
                      <input type="radio" onChange={(e) => { setEStatus(e.target.value); }} value={eStatus} className="my-sm-1 my-0 ms-sm-3 ms-2" name="eStatus" value="upcoming_event" required />
                    </div>
                    <div className="col-sm-2 col-6 d-flex">
                      <label className="d-sm-block d-none font-family model-sub-label">
                        ALL EVENTS
                      </label>
                      <label className="d-sm-none d-block font-family model-sub-mob-label">
                        ALL EVENTS
                      </label>
                      <input type="radio" onChange={(e) => { setEStatus(e.target.value); }} value={eStatus} className="my-sm-1 my-0 ms-sm-3 ms-2" name="eStatus" value="all_events" required />
                    </div>
                  </div>
                  <div className="col-sm-12 my-2">
                    <label className="d-sm-block d-none font-family model-label">
                      EVENT DETAIL
                    </label>
                    <label className="d-sm-none d-block font-family fs-4">
                      EVENT DETAIL
                    </label>
                    <textarea rows={4} onChange={(e) => { setEDetail(e.target.value); }} value={eDetail} className="form-control shadow-none font-family mt-2 rounded-0" required ></textarea>
                  </div>
                  <div className="col-sm-12">
                    <button style={styles.modelBtn} className="btn form-control font-family shadow-none rounded-0 mt-3" >
                      {modelV ? "ADD" : "UPDATE"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Addeventmanagement;
