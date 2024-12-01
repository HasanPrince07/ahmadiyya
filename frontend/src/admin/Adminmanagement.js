import { useContext, useEffect, useState } from "react";
import AdminHeader from "../common/AdminHeader";
import Sidebar from "../common/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { context } from "../common/Context";

const styles = {
  heading: {
    color: "black",
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

function Adminmanagement() {
  const [model, setModel] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { setGMessage, setGAdminName } = useContext(context);

  useEffect(() => {
    fetchFn();
  }, [model]);

  function fetchFn() {
    const token = window.localStorage.getItem("token");
    fetch("/admin/authentication", {
      headers: { authorization: `Bearer ${JSON.parse(token)}` },
    })
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        if (data.status === 401) {
          window.localStorage.removeItem("token");
          setGMessage("Please login");
          navigate("/login");
        } else if (data.status === 500) {
          window.localStorage.removeItem("token");
          setGMessage("Server error. Please login");
          navigate("/login");
        } else {
          fetch("/admin/fetchAdmin")
            .then((result) => {
              return result.json();
            })
            .then((data) => {
              if (data.status === 200) {
                setUsername(data.data.username);
                setPassword(data.data.password);
              } else {
                toast(data.message, { type: "error" });
              }
            });
        }
      });
  }

  function handleform(e) {
    e.preventDefault();
    const formdata = { username, password };
    fetch("/admin/updateAdmin", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formdata),
    })
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        if (data.status === 200) {
          setGAdminName(data.username);
          fetchFn();
          toast("Successfully updated!", { type: "success" });
        } else {
          toast("Update failed. Please try again.", { type: "error" });
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
              <p
                style={styles.heading}
                className="d-sm-block d-none font-family text-center fw-bolder heading my-3"
              >
                ADMIN MANAGEMENT PAGE
              </p>
              <p
                style={styles.heading}
                className="d-sm-none d-block font-family text-center fw-bolder fs-5 my-2"
              >
                ADMIN MANAGEMENT PAGE
              </p>
              <div className="table-responsive">
                <table className="table table-bordered text-center table-center font-family">
                  <thead style={styles.tableHead} className="align-middle">
                    <tr>
                      <th>USERNAME</th>
                      <th>PASSWORD</th>
                      <th>UPDATE</th>
                    </tr>
                  </thead>
                  <tbody className="align-middle">
                    <tr>
                      <td>{username}</td>
                      <td>{password}</td>
                      <td>
                        <button
                          onClick={() => {
                            setModel(true);
                          }}
                          style={styles.tableBtn}
                          className="btn form-control shadow-none rounded-0"
                        >
                          UPDATE
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {model ? (
        <>
          <section
            style={styles.modelDiv1}
            id="model"
            className="overflow-auto"
          >
            <div className="container">
              <div style={styles.modelDiv2} className="row p-3 my-sm-5">
                <div className="col-sm-12 d-sm-flex d-block justify-content-between align-items-center">
                  <div className="col-sm-2"></div>
                  <div>
                    <p
                      style={styles.heading}
                      className="d-sm-block d-none font-family text-center fw-bolder model-heading m-0"
                    >
                      UPDATE ADMIN SECTION HERE
                    </p>
                    <p
                      style={styles.heading}
                      className="d-sm-none d-block font-family text-center fw-bolder fs-5"
                    >
                      UPDATE ADMIN SECTION HERE
                    </p>
                  </div>
                  <div className="col-sm-2">
                    <button
                      style={styles.modelBtn}
                      className="btn font-family form-control rounded-0"
                      onClick={() => {
                        setModel(false);
                      }}
                    >
                      CLOSE
                    </button>
                  </div>
                </div>
                <form
                  method="post"
                  onSubmit={(e) => {
                    handleform(e);
                  }}
                >
                  <div className="col-sm-12 my-2">
                    <label className="d-sm-block d-none font-family model-label">
                      USERNAME
                    </label>
                    <label className="d-sm-none d-block font-family fs-4">
                      USERNAME
                    </label>
                    <input
                      type="text"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      value={username}
                      className="form-control shadow-none font-family mt-2 rounded-0"
                    />
                  </div>
                  <div className="col-sm-12 my-2">
                    <label className="d-sm-block d-none font-family model-label">
                      PASSWORD
                    </label>
                    <label className="d-sm-none d-block font-family fs-4">
                      PASSWORD
                    </label>
                    <input
                      type="text"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      value={password}
                      className="form-control shadow-none font-family mt-2 rounded-0"
                      required
                    />
                  </div>
                  <div className="col-sm-12">
                    <button
                      style={styles.modelBtn}
                      className="btn form-control font-family shadow-none rounded-0 mt-3"
                    >
                      UPDATE
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

export default Adminmanagement;
