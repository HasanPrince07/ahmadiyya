import { useContext, useEffect, useState } from "react";
import AdminHeader from "../common/AdminHeader";
import Sidebar from "../common/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate } from "react-router-dom";
import { context } from "../common/Context";

const styles = {
    heading: {
        color: "#000000",
    },
    headingBtn: {
        backgroundColor: "#ffffff",
        color: "#000000",
        border: "2px solid #000000",
    },
    headingBtnHover: {
        color: "#ffffff",
        backgroundColor: "#000000",
        border: "2px solid #000000",
    },
    tableHead: {
        backgroundColor: "#000000",
        color: "#ffffff",
    },
    tableBtn: {
        backgroundColor: "#000000",
        color: "#ffffff",
    },
    modelDiv1: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    modelDiv2: {
        backgroundColor: "#ffffff",
        border: "2px solid #000000",
    },
    modelBtn: {
        backgroundColor: "#000000",
        color: "#ffffff",
    },
};

function Allimagemanagement() {
    const [model, setModel] = useState(false);
    const [modelV, setModelV] = useState(false);

    const [headingBtn2, setHeadingBtn2] = useState(false);

    const [AImage, setAImage] = useState("");
    const [AId, setAId] = useState("");

    const [AData, setAData] = useState([]);

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
                fetch("/admin/fetchAImage").then((result) => {
                    return result.json();
                }).then((data) => {
                    if (data.status === 200) {
                        setAData(data.data);
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
        formdata.append("AImage", AImage);
        if (AId) {
            fetch(`/admin/updateAImage/${AId}`, {
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
            fetch("/admin/addAImage", {
                method: "POST",
                body: formdata,
            }).then((result) => {
                return result.json();
            }).then((data) => {
                if (data.status === 201) {
                    fetchFn();
                    toast("Image added successfully!", { type: "success" });
                } else {
                    toast("Process failed. Please try again.", { type: "error" });
                }
            });
        }
    }

    function deleteFn(id) {
        fetch(`/admin/deleteAImage/${id}`, {
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
        setAImage("");
        setAId("");
    }
    function uModel(id) {
        setModel(true);
        setModelV(false);
        fetch(`/admin/fetchAImageById/${id}`)
            .then((result) => {
                return result.json();
            }).then((data) => {
                if (data.status === 200) {
                    setAId(data.data._id);
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
                            <p style={styles.heading} className="d-sm-block d-none font-family text-center fw-bolder heading my-3"> ALL IMAGE MANAGEMENT PAGE </p>
                            <p style={styles.heading} className="d-sm-none d-block font-family text-center fw-bolder fs-5 my-2" > ALL IMAGE MANAGEMENT PAGE </p>
                            <div>
                                <NavLink onClick={() => { aModel(); }} className="text-decoration-none" >
                                    <button style={headingBtn2 ? styles.headingBtn : styles.headingBtnHover} onMouseLeave={() => { setHeadingBtn2(false); }} onMouseEnter={() => { setHeadingBtn2(true); }} className="d-sm-block d-none font-family fw-normal btn form-control heading-btn shadow-none rounded-0 my-2" >ADD IMAGE</button>
                                </NavLink>
                                <NavLink onClick={() => { aModel(); }} className="text-decoration-none" >
                                    <button style={headingBtn2 ? styles.headingBtn : styles.headingBtnHover} onMouseLeave={() => { setHeadingBtn2(false); }} onMouseEnter={() => { setHeadingBtn2(true); }} className="d-sm-none d-block font-family fw-normal btn form-control shadow-none rounded-0 my-2" >ADD IMAGE</button>
                                </NavLink>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-bordered text-center table-center font-family">
                                    <thead style={styles.tableHead} className="align-middle">
                                        <tr>
                                            <th>S.NO.</th>
                                            <th>IMAGE</th>
                                            <th>DELETE</th>
                                            <th>UPDATE</th>
                                        </tr>
                                    </thead>
                                    {AData.length !== 0 ? (
                                        <tbody className="align-middle">
                                            {AData.map((data, key) => (
                                                <tr key={data._id}>
                                                    <td>{key + 1}</td>
                                                    <td>
                                                        <img src={data.AImage} alt="Not found" />
                                                    </td>
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
                                                <td colSpan="4">NO IMAGE HERE</td>
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
                                            {modelV ? "ADD" : "UPDATE"} IMAGE SECTION HERE
                                        </p>
                                        <p style={styles.heading} className="d-sm-none d-block font-family text-center fw-bolder fs-5" >
                                            {modelV ? "ADD" : "UPDATE"} IMAGE SECTION HERE
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
                                        <label className="d-sm-block d-none font-family model-label"> IMAGE </label>
                                        <label className="d-sm-none d-block font-family fs-4"> IMAGE </label>
                                        <input type="file" onChange={(e) => { setAImage(e.target.files[0]); }} className="form-control shadow-none font-family mt-2 rounded-0" required />
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

export default Allimagemanagement;
