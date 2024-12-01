import { useContext, useEffect, useState } from "react";
import AdminHeader from "../common/AdminHeader";
import Sidebar from "../common/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from "react-router-dom";
import { context } from "../common/Context";

const styles = {
    heading: {
        color: "black",
    },
    headingBtn: {
        backgroundColor: "white",
        color: "#1d1d36",
        border: "2px solid #1d1d36"
    },
    headingBtnHover: {
        color: "white",
        backgroundColor: "#1d1d36",
        border: "2px solid #1d1d36"
    },
    tableHead: {
        backgroundColor: "#1d1d36",
        color: "white",
    },
    tableBtn: {
        backgroundColor: "#1d1d36",
        color: "white"
    },
    modelDiv1: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    modelDiv2: {
        backgroundColor: "white",
        border: "2px solid black"
    },
    modelBtn: {
        backgroundColor: "#1d1d36",
        color: "white"
    }
}

function Reviewmanagement() {

    const [model, setModel] = useState(false)

    const [headingBtn, setHeadingBtn] = useState(false)

    const [BColor, setBColor] = useState("")
    const [headingBColor, setHeadingBColor] = useState("")
    const [headingColor, setHeadingColor] = useState("")
    const [buttonColor, setButtonColor] = useState("")
    const [buttonBColor, setButtonBColor] = useState("")
    const [buttonHColor, setButtonHColor] = useState("")
    const [buttonHBColor, setButtonHBColor] = useState("")
    const [aButtonColor, setAButtonColor] = useState("")
    const [aButtonBColor, setAButtonBColor] = useState("")
    const [aButtonHColor, setAButtonHColor] = useState("")
    const [aButtonHBColor, setAButtonHBColor] = useState("")

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
                fetch("/admin/fetchReview").then((result) => { return result.json() }).then((data) => {
                    if (data.status === 200) {
                        setBColor(data.data.BColor)
                        setHeadingBColor(data.data.headingBColor)
                        setHeadingColor(data.data.headingColor)
                        setButtonColor(data.data.buttonColor)
                        setButtonBColor(data.data.buttonBColor)
                        setButtonHColor(data.data.buttonHColor)
                        setButtonHBColor(data.data.buttonHBColor)
                        setAButtonColor(data.data.aButtonColor)
                        setAButtonBColor(data.data.aButtonBColor)
                        setAButtonHColor(data.data.aButtonHColor)
                        setAButtonHBColor(data.data.aButtonHBColor)
                    } else {
                        toast(data.message, { type: "error" })
                    }
                })
            }
        })
    }

    function handleform(e) {
        e.preventDefault()
        const formdata = { BColor, headingBColor, headingColor, buttonColor, buttonBColor, buttonHColor, buttonHBColor, aButtonColor, aButtonBColor, aButtonHColor, aButtonHBColor }
        fetch("/admin/updateReview", {
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
                            <p style={styles.heading} className="d-sm-block d-none font-family text-center fw-bolder heading my-3">REVIEW MANAGEMENT PAGE</p>
                            <p style={styles.heading} className="d-sm-none d-block font-family text-center fw-bolder fs-5 my-2">REVIEW MANAGEMENT PAGE</p>
                            <div>
                                <NavLink to="/userreviewmanagement" className="text-decoration-none"><button style={headingBtn ? styles.headingBtn : styles.headingBtnHover} onMouseLeave={() => { setHeadingBtn(false) }} onMouseEnter={() => { setHeadingBtn(true) }} className="d-sm-block d-none font-family fw-normal btn form-control heading-btn shadow-none rounded-0 my-2">USER'S REVIEW MANAGEMENT PAGE</button></NavLink>
                                <NavLink to="/userreviewmanagement" className="text-decoration-none"><button style={headingBtn ? styles.headingBtn : styles.headingBtnHover} onMouseLeave={() => { setHeadingBtn(false) }} onMouseEnter={() => { setHeadingBtn(true) }} className="d-sm-none d-block font-family fw-normal btn form-control shadow-none rounded-0 my-2">USER'S REVIEW MANAGEMENT PAGE</button></NavLink>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-bordered text-center table-center font-family">
                                    <thead style={styles.tableHead} className="align-middle">
                                        <tr>
                                            <th>BACKGROUND COLOR</th>
                                            <th>HEADING COLOR</th>
                                            <th>HEADING BACKGROUND COLOR</th>
                                            <th>BUTTON COLOR</th>
                                            <th>BUTTON BACKGROUND COLOR</th>
                                            <th>BUTTON HOVER COLOR</th>
                                            <th>BUTTON HOVER BACKGROUND COLOR</th>
                                            <th>ADD BUTTON COLOR</th>
                                            <th>ADD BUTTON BACKGROUND COLOR</th>
                                            <th>ADD BUTTON HOVER COLOR</th>
                                            <th>ADD BUTTON HOVER BACKGROUND COLOR</th>
                                            <th>UPDATE</th>
                                        </tr>
                                    </thead>
                                    <tbody className="align-middle">
                                        <tr>
                                            <td>{BColor}</td>
                                            <td>{headingColor}</td>
                                            <td>{headingBColor}</td>
                                            <td>{buttonColor}</td>
                                            <td>{buttonBColor}</td>
                                            <td>{buttonHColor}</td>
                                            <td>{buttonHBColor}</td>
                                            <td>{aButtonColor}</td>
                                            <td>{aButtonBColor}</td>
                                            <td>{aButtonHColor}</td>
                                            <td>{aButtonHBColor}</td>
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
                                        <p style={styles.heading} className="d-sm-block d-none font-family text-center fw-bolder model-heading m-0">UPDATE REVIEW SECTION HERE</p>
                                        <p style={styles.heading} className="d-sm-none d-block font-family text-center fw-bolder fs-5">UPDATE REVIEW SECTION HERE</p>
                                    </div>
                                    <div className="col-sm-2">
                                        <button style={styles.modelBtn} className="btn font-family form-control rounded-0" onClick={() => { setModel(false) }}>CLOSE</button>
                                    </div>
                                </div>
                                <form method="post" onSubmit={(e) => { handleform(e) }}>
                                    <div className="col-sm-12 d-sm-flex d-block my-2">
                                        <div className="col-sm-4 my-sm-0 my-2">
                                            <label className="d-sm-block d-none font-family model-label">BACKGROUND COLOR</label>
                                            <label className="d-sm-none d-block font-family fs-4">BACKGROUND COLOR</label>
                                            <input type="text" onChange={(e) => { setBColor(e.target.value) }} value={BColor} className="form-control shadow-none font-family mt-2 rounded-0" required />
                                        </div>
                                        <div className="col-sm-4 px-sm-2 px-0 my-sm-0 my-2">
                                            <label className="d-sm-block d-none font-family model-label">HEADING COLOR</label>
                                            <label className="d-sm-none d-block font-family fs-4">HEADING COLOR</label>
                                            <input type="text" onChange={(e) => { setHeadingColor(e.target.value) }} value={headingColor} className="form-control shadow-none font-family mt-2 rounded-0" required />
                                        </div>
                                        <div className="col-sm-4 my-sm-0 my-2">
                                            <label className="d-sm-block d-none font-family model-label">HEADING BACKGROUND COLOR</label>
                                            <label className="d-sm-none d-block font-family fs-4">HEADING BACKGROUND COLOR</label>
                                            <input type="text" onChange={(e) => { setHeadingBColor(e.target.value) }} value={headingBColor} className="form-control shadow-none font-family mt-2 rounded-0" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 d-sm-flex d-block my-2">
                                        <div className="col-sm-6 pe-sm-2 pe-0">
                                            <label className="d-sm-block d-none font-family model-label">BUTTON COLOR</label>
                                            <label className="d-sm-none d-block font-family fs-4">BUTTON COLOR</label>
                                            <input type="text" onChange={(e) => { setButtonColor(e.target.value) }} value={buttonColor} className="form-control shadow-none font-family mt-2 rounded-0" required />
                                        </div>
                                        <div className="col-sm-6 ps-sm-2 ps-0 my-sm-0 my-2">
                                            <label className="d-sm-block d-none font-family model-label">BUTTON BACKGROUND COLOR</label>
                                            <label className="d-sm-none d-block font-family fs-4">BUTTON BACKGROUND COLOR</label>
                                            <input type="text" onChange={(e) => { setButtonBColor(e.target.value) }} value={buttonBColor} className="form-control shadow-none font-family mt-2 rounded-0" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 d-sm-flex d-block my-2">
                                        <div className="col-sm-6 pe-sm-2 pe-0">
                                            <label className="d-sm-block d-none font-family model-label">BUTTON HOVER COLOR</label>
                                            <label className="d-sm-none d-block font-family fs-4">BUTTON HOVER COLOR</label>
                                            <input type="text" onChange={(e) => { setButtonHColor(e.target.value) }} value={buttonHColor} className="form-control shadow-none font-family mt-2 rounded-0" required />
                                        </div>
                                        <div className="col-sm-6 ps-sm-2 ps-0 my-sm-0 my-2">
                                            <label className="d-sm-block d-none font-family model-label">BUTTON HOVER BACKGROUND COLOR</label>
                                            <label className="d-sm-none d-block font-family fs-4">BUTTON HOVER BACKGROUND COLOR</label>
                                            <input type="text" onChange={(e) => { setButtonHBColor(e.target.value) }} value={buttonHBColor} className="form-control shadow-none font-family mt-2 rounded-0" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 d-sm-flex d-block my-2">
                                        <div className="col-sm-6 pe-sm-2 pe-0">
                                            <label className="d-sm-block d-none font-family model-label">ADD BUTTON COLOR</label>
                                            <label className="d-sm-none d-block font-family fs-4">ADD BUTTON COLOR</label>
                                            <input type="text" onChange={(e) => { setAButtonColor(e.target.value) }} value={aButtonColor} className="form-control shadow-none font-family mt-2 rounded-0" required />
                                        </div>
                                        <div className="col-sm-6 ps-sm-2 ps-0 my-sm-0 my-2">
                                            <label className="d-sm-block d-none font-family model-label">ADD BUTTON BACKGROUND COLOR</label>
                                            <label className="d-sm-none d-block font-family fs-4">ADD BUTTON BACKGROUND COLOR</label>
                                            <input type="text" onChange={(e) => { setAButtonBColor(e.target.value) }} value={aButtonBColor} className="form-control shadow-none font-family mt-2 rounded-0" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 d-sm-flex d-block my-2">
                                        <div className="col-sm-6 pe-sm-2 pe-0">
                                            <label className="d-sm-block d-none font-family model-label">ADD BUTTON HOVER COLOR</label>
                                            <label className="d-sm-none d-block font-family fs-4">ADD BUTTON HOVER COLOR</label>
                                            <input type="text" onChange={(e) => { setAButtonHColor(e.target.value) }} value={aButtonHColor} className="form-control shadow-none font-family mt-2 rounded-0" required />
                                        </div>
                                        <div className="col-sm-6 ps-sm-2 ps-0 my-sm-0 my-2">
                                            <label className="d-sm-block d-none font-family model-label">ADD BUTTON HOVER BACKGROUND COLOR</label>
                                            <label className="d-sm-none d-block font-family fs-4">ADD BUTTON HOVER BACKGROUND COLOR</label>
                                            <input type="text" onChange={(e) => { setAButtonHBColor(e.target.value) }} value={aButtonHBColor} className="form-control shadow-none font-family mt-2 rounded-0" required />
                                        </div>
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

export default Reviewmanagement;