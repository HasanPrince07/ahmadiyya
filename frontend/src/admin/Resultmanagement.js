import { useContext, useEffect, useState } from "react";
import AdminHeader from "../common/AdminHeader";
import Sidebar from "../common/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from "react-router-dom";
import { context } from "../common/Context";

const styles = {
    heading: {
        color: "#000000",
    },
    headingBtn: {
        backgroundColor: "#ffffff",
        color: "#000000",
        border: "2px solid #000000"
    },
    headingBtnHover: {
        color: "#ffffff",
        backgroundColor: "#000000",
        border: "2px solid #000000"
    },
    tableHead: {
        backgroundColor: "#000000",
        color: "#ffffff",
    },
    tableBtn: {
        backgroundColor: "#000000",
        color: "#ffffff"
    },
    modelDiv1: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    modelDiv2: {
        backgroundColor: "#ffffff",
        border: "2px solid #000000"
    },
    modelBtn: {
        backgroundColor: "#000000",
        color: "#ffffff"
    }
}

function Resultmanagement() {

    const [model, setModel] = useState(false)

    const [headingBtn, setHeadingBtn] = useState(false)

    const [BColor, setBColor] = useState("")

    const navigate = useNavigate()

    const { setGMessage } = useContext(context)

    useEffect(() => {
        fetchFn()
    }, [model])

    function fetchFn() {
        const token = window.localStorage.getItem("token")
        fetch("/admin/authentication", {
            headers: { authorization: `Bearer ${JSON.parse(token)}` }
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 401) {
                window.localStorage.removeItem("token")
                setGMessage("Please login")
                navigate("/login")
            } else if (data.status === 500) {
                window.localStorage.removeItem("token")
                setGMessage("Server error. Please login")
                navigate("/login")
            } else {
                fetch("/admin/fetchResult").then((result) => { return result.json() }).then((data) => {
                    if (data.status === 200) {
                        setBColor(data.data.BColor)
                    } else {
                        toast(data.message, { type: "error" })
                    }
                })
            }
        })
    }

    function handleform(e) {
        e.preventDefault()
        const formdata = { BColor }
        fetch("/admin/updateResult", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata)
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                fetchFn()
                toast("Successfully updated!", { type: "success" })
            } else {
                toast("Update failed. Please try again.", { type: "error" })
            }
        })
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
                            <p style={styles.heading} className="d-sm-block d-none font-family text-center fw-bolder heading my-3">RESULT MANAGEMENT PAGE</p>
                            <p style={styles.heading} className="d-sm-none d-block font-family text-center fw-bolder fs-5 my-2">RESULT MANAGEMENT PAGE</p>
                            <div>
                                <NavLink to="/studentmanagement" className="text-decoration-none"><button style={headingBtn ? styles.headingBtn : styles.headingBtnHover} onMouseLeave={() => { setHeadingBtn(false) }} onMouseEnter={() => { setHeadingBtn(true) }} className="d-sm-block d-none font-family fw-normal btn form-control heading-btn shadow-none rounded-0 my-2">STUDENT MANAGEMENT PAGE</button></NavLink>
                                <NavLink to="/studentmanagement" className="text-decoration-none"><button style={headingBtn ? styles.headingBtn : styles.headingBtnHover} onMouseLeave={() => { setHeadingBtn(false) }} onMouseEnter={() => { setHeadingBtn(true) }} className="d-sm-none d-block font-family fw-normal btn form-control shadow-none rounded-0 my-2">STUDENT MANAGEMENT PAGE</button></NavLink>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-bordered text-center table-center font-family">
                                    <thead style={styles.tableHead} className="align-middle">
                                        <tr>
                                            <th>BACKGROUND COLOR</th>
                                            <th>UPDATE</th>
                                        </tr>
                                    </thead>
                                    <tbody className="align-middle">
                                        <tr>
                                            <td>{BColor}</td>
                                            <td><button onClick={() => { setModel(true) }} style={styles.tableBtn} className="btn form-control shadow-none rounded-0">UPDATE</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {
                model ? <>
                    <section style={styles.modelDiv1} id="model" className="overflow-auto">
                        <div className="container">
                            <div style={styles.modelDiv2} className="row p-3 my-sm-5">
                                <div className="col-sm-12 d-sm-flex d-block justify-content-between align-items-center">
                                    <div className="col-sm-2"></div>
                                    <div>
                                        <p style={styles.heading} className="d-sm-block d-none font-family text-center fw-bolder model-heading m-0">UPDATE RESULT SECTION HERE</p>
                                        <p style={styles.heading} className="d-sm-none d-block font-family text-center fw-bolder fs-5">UPDATE RESULT SECTION HERE</p>
                                    </div>
                                    <div className="col-sm-2">
                                        <button style={styles.modelBtn} className="btn font-family form-control rounded-0" onClick={() => { setModel(false) }}>CLOSE</button>
                                    </div>
                                </div>
                                <form method="post" onSubmit={(e) => { handleform(e) }}>
                                    <div className="col-sm-12 my-sm-0 my-2">
                                        <label className="d-sm-block d-none font-family model-label">BACKGROUND COLOR</label>
                                        <label className="d-sm-none d-block font-family fs-4">BACKGROUND COLOR</label>
                                        <input type="text" onChange={(e) => { setBColor(e.target.value) }} value={BColor} className="form-control shadow-none font-family mt-2 rounded-0" required />
                                    </div>
                                    <div className="col-sm-12">
                                        <button style={styles.modelBtn} className="btn form-control font-family shadow-none rounded-0 mt-3">UPDATE</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section></> : <></>
            }
        </>
    );
}

export default Resultmanagement;