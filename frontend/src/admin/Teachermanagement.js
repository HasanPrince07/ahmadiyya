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

function Teachermanagement() {
    const [model, setModel] = useState(false);
    const [modelV, setModelV] = useState(false);

    const [headingBtn1, setHeadingBtn1] = useState(false);
    const [headingBtn2, setHeadingBtn2] = useState(false);

    const [TName, setTName] = useState("");
    const [TSubject, setTSubject] = useState("");
    const [TDetail, setTDetail] = useState("");
    const [TId, setTId] = useState("");

    const [TData, setTData] = useState([]);

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
                fetch("/admin/fetchTeachers").then((result) => {
                    return result.json();
                }).then((data) => {
                    if (data.status === 200) {
                        setTData(data.data);
                    } else {
                        toast(data.message, { type: "error" });
                    }
                });
            }
        });
    }

    function handleform(e) {
        e.preventDefault();
        const formdata = { TName, TSubject, TDetail };
        if (TId) {
            fetch(`/admin/updateTeachers/${TId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formdata),
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
            fetch("/admin/addTeachers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formdata),
            }).then((result) => {
                return result.json();
            }).then((data) => {
                if (data.status === 201) {
                    fetchFn();
                    toast("Teacher data added successfully!", { type: "success" });
                } else {
                    toast("Process failed. Please try again.", { type: "error" });
                }
            });
        }
    }

    function deleteFn(id) {
        fetch(`/admin/deleteTeachers/${id}`, {
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
        setTName("");
        setTSubject("");
        setTDetail("");
        setTId("");
    }
    function uModel(id) {
        setModel(true);
        setModelV(false);
        fetch(`/admin/fetchTeachersById/${id}`)
            .then((result) => {
                return result.json();
            }).then((data) => {
                if (data.status === 200) {
                    setTName(data.data.TName);
                    setTSubject(data.data.TSubject);
                    setTDetail(data.data.TDetail);
                    setTId(data.data._id);
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
                            <p style={styles.heading} className="d-sm-block d-none font-family text-center fw-bolder heading my-3">TEACHER MANAGEMENT PAGE</p>
                            <p style={styles.heading} className="d-sm-none d-block font-family text-center fw-bolder fs-5 my-2">TEACHER MANAGEMENT PAGE </p>
                            <div>
                                <NavLink to="/aboutmanagement" className="text-decoration-none">
                                    <button style={headingBtn1 ? styles.headingBtn : styles.headingBtnHover} onMouseLeave={() => { setHeadingBtn1(false); }} onMouseEnter={() => { setHeadingBtn1(true); }} className="d-sm-block d-none font-family fw-normal btn form-control heading-btn shadow-none rounded-0 my-2">ABOUT MANAGEMENT PAGE</button>
                                </NavLink>
                                <NavLink to="/aboutmanagement" className="text-decoration-none">
                                    <button style={headingBtn1 ? styles.headingBtn : styles.headingBtnHover} onMouseLeave={() => { setHeadingBtn1(false); }} onMouseEnter={() => { setHeadingBtn1(true); }} className="d-sm-none d-block font-family fw-normal btn form-control shadow-none rounded-0 my-2">ABOUT MANAGEMENT PAGE</button>
                                </NavLink>
                                <NavLink onClick={() => { aModel(); }} className="text-decoration-none" >
                                    <button style={headingBtn2 ? styles.headingBtn : styles.headingBtnHover} onMouseLeave={() => { setHeadingBtn2(false); }} onMouseEnter={() => { setHeadingBtn2(true); }} className="d-sm-block d-none font-family fw-normal btn form-control heading-btn shadow-none rounded-0 my-2" >ADD TEACHER DATA</button>
                                </NavLink>
                                <NavLink onClick={() => { aModel(); }} className="text-decoration-none" >
                                    <button style={headingBtn2 ? styles.headingBtn : styles.headingBtnHover} onMouseLeave={() => { setHeadingBtn2(false); }} onMouseEnter={() => { setHeadingBtn2(true); }} className="d-sm-none d-block font-family fw-normal btn form-control shadow-none rounded-0 my-2" > ADD TEACHER DATA </button>
                                </NavLink>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-bordered text-center table-center font-family">
                                    <thead style={styles.tableHead} className="align-middle">
                                        <tr>
                                            <th>S.NO.</th>
                                            <th>TEACHER NAME</th>
                                            <th>TEACHER SUBJECT</th>
                                            <th>TEACHER DETAIL</th>
                                            <th>DELETE</th>
                                            <th>UPDATE</th>
                                        </tr>
                                    </thead>
                                    {TData.length !== 0 ? (
                                        <tbody className="align-middle">
                                            {TData.map((data, key) => (
                                                <tr key={data._id}>
                                                    <td>{key + 1}</td>
                                                    <td>{data.TName}</td>
                                                    <td>{data.TSubject}</td>
                                                    <td>{data.TDetail}</td>
                                                    <td>
                                                        <button onClick={() => { deleteFn(data._id); }} style={styles.tableBtn} className="btn form-control shadow-none rounded-0" >DELETE</button>
                                                    </td>
                                                    <td>
                                                        <button onClick={() => { uModel(data._id) }} style={styles.tableBtn} className="btn form-control shadow-none rounded-0" >UPDATE</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    ) : (
                                        <tbody className="align-middle">
                                            <tr>
                                                <td colSpan="6">NO TEACHER DATA HERE</td>
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
                                        <p style={styles.heading} className="d-sm-block d-none font-family text-center fw-bolder model-heading m-0"> {modelV ? "ADD" : "UPDATE"} TEACHER SECTION HERE </p>
                                        <p style={styles.heading} className="d-sm-none d-block font-family text-center fw-bolder fs-5" >{modelV ? "ADD" : "UPDATE"} TEACHER SECTION HERE </p>
                                    </div>
                                    <div className="col-sm-2">
                                        <button style={styles.modelBtn} className="btn font-family form-control rounded-0" onClick={() => { setModel(false); }} > CLOSE </button>
                                    </div>
                                </div>
                                <form method="post" onSubmit={(e) => { handleform(e); }} >
                                    <div className="col-sm-12 d-sm-flex d-block my-2">
                                        <div className="col-sm-6 pe-sm-2 pe-0">
                                            <label className="d-sm-block d-none font-family model-label">TEACHER NAME </label>
                                            <label className="d-sm-none d-block font-family fs-4"> TEACHER NAME</label>
                                            <input type="text" onChange={(e) => { setTName(e.target.value); }} value={TName} className="form-control shadow-none font-family mt-2 rounded-0" required />
                                        </div>
                                        <div className="col-sm-6 ps-sm-2 ps-0">
                                            <label className="d-sm-block d-none font-family model-label">TEACHER SUBJECT </label>
                                            <label className="d-sm-none d-block font-family fs-4">TEACHER SUBJECT </label>
                                            <input type="text" onChange={(e) => { setTSubject(e.target.value); }} value={TSubject} className="form-control shadow-none font-family mt-2 rounded-0" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 my-2">
                                        <label className="d-sm-block d-none font-family model-label"> TEACHER DETAIL</label>
                                        <label className="d-sm-none d-block font-family fs-4"> TEACHER DETAIL </label>
                                        <textarea rows={3} onChange={(e) => { setTDetail(e.target.value); }} value={TDetail} className="form-control shadow-none font-family mt-2 rounded-0" required ></textarea>
                                    </div>
                                    <div className="col-sm-12">
                                        <button style={styles.modelBtn} className="btn form-control font-family shadow-none rounded-0 mt-3" >{modelV ? "ADD" : "UPDATE"}</button>
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

export default Teachermanagement;
