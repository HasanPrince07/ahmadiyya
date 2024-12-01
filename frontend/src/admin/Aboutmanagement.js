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

function Aboutmanagement() {

    const [model, setModel] = useState(false)

    const [headingBtn, setHeadingBtn] = useState(false)

    const [Image, setImage] = useState("")
    const [About, setAbout] = useState("")
    const [BColor, setBColor] = useState("")
    const [HColor, setHColor] = useState("")
    const [TColor, setTColor] = useState("")
    const [PName, setPName] = useState("")
    const [PDetail, setPDetail] = useState("")

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
                fetch("/admin/fetchAbout").then((result) => { return result.json() }).then((data) => {
                    if (data.status === 200) {
                        setImage(data.data.Image)
                        setAbout(data.data.About)
                        setBColor(data.data.BColor)
                        setHColor(data.data.HColor)
                        setTColor(data.data.TColor)
                        setPName(data.data.PName)
                        setPDetail(data.data.PDetail)
                    } else {
                        toast(data.message, { type: "error" })
                    }
                })
            }
        })
    }

    function handleform(e) {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append("Image", Image)
        formdata.append("About", About)
        formdata.append("BColor", BColor)
        formdata.append("HColor", HColor)
        formdata.append("TColor", TColor)
        formdata.append("PName", PName)
        formdata.append("PDetail", PDetail)
        fetch("/admin/updateAbout", {
            method: "PUT",
            body: formdata
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
                            <p style={styles.heading} className="d-sm-block d-none font-family text-center fw-bolder heading my-3">ABOUT MANAGEMENT PAGE</p>
                            <p style={styles.heading} className="d-sm-none d-block font-family text-center fw-bolder fs-5 my-2">ABOUT MANAGEMENT PAGE</p>
                            <div>
                                <NavLink to="/teachermanagement" className="text-decoration-none"><button style={headingBtn ? styles.headingBtn : styles.headingBtnHover} onMouseLeave={() => { setHeadingBtn(false) }} onMouseEnter={() => { setHeadingBtn(true) }} className="d-sm-block d-none font-family fw-normal btn form-control heading-btn shadow-none rounded-0 my-2">TEACHER MANAGEMENT PAGE</button></NavLink>
                                <NavLink to="/teachermanagement" className="text-decoration-none"><button style={headingBtn ? styles.headingBtn : styles.headingBtnHover} onMouseLeave={() => { setHeadingBtn(false) }} onMouseEnter={() => { setHeadingBtn(true) }} className="d-sm-none d-block font-family fw-normal btn form-control shadow-none rounded-0 my-2">TEACHER MANAGEMENT PAGE</button></NavLink>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-bordered text-center table-center font-family">
                                    <thead style={styles.tableHead} className="align-middle">
                                        <tr>
                                            <th>IMAGE</th>
                                            <th>PRINCIPAL NAME</th>
                                            <th>PRINCIPAL DETAIL</th>
                                            <th>ABOUT</th>
                                            <th>BACKROUND COLOR</th>
                                            <th>HEADING COLOR</th>
                                            <th>TEXT COLOR</th>
                                            <th>UPDATE</th>
                                        </tr>
                                    </thead>
                                    <tbody className="align-middle">
                                        <tr>
                                            <td><img src={Image} alt="image not found" /></td>
                                            <td>{PName}</td>
                                            <td>{PDetail}</td>
                                            <td>{About}</td>
                                            <td>{BColor}</td>
                                            <td>{HColor}</td>
                                            <td>{TColor}</td>
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
                                        <p style={styles.heading} className="d-sm-block d-none font-family text-center fw-bolder model-heading m-0">UPDATE ABOUT SECTION HERE</p>
                                        <p style={styles.heading} className="d-sm-none d-block font-family text-center fw-bolder fs-5">UPDATE ABOUT SECTION HERE</p>
                                    </div>
                                    <div className="col-sm-2">
                                        <button style={styles.modelBtn} className="btn font-family form-control rounded-0" onClick={() => { setModel(false) }}>CLOSE</button>
                                    </div>
                                </div>
                                <form method="post" onSubmit={(e) => { handleform(e) }}>
                                    <div className="col-sm-12 my-2">
                                        <label className="d-sm-block d-none font-family model-label">IMAGE</label>
                                        <label className="d-sm-none d-block font-family fs-4">IMAGE</label>
                                        <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} className="form-control shadow-none font-family mt-2 rounded-0" />
                                    </div>
                                    <div className="col-sm-12 d-sm-flex d-block my-2">
                                        <div className="col-sm-4 my-sm-0 my-2">
                                            <label className="d-sm-block d-none font-family model-label">BACKGROUND COLOR</label>
                                            <label className="d-sm-none d-block font-family fs-4">BACKGROUND COLOR</label>
                                            <input type="text" onChange={(e) => { setBColor(e.target.value) }} value={BColor} className="form-control shadow-none font-family mt-2 rounded-0" required />
                                        </div>
                                        <div className="col-sm-4 px-sm-2 px-0 my-sm-0 my-2">
                                            <label className="d-sm-block d-none font-family model-label">HEADING COLOR</label>
                                            <label className="d-sm-none d-block font-family fs-4">HEADING COLOR</label>
                                            <input type="text" onChange={(e) => { setHColor(e.target.value) }} value={HColor} className="form-control shadow-none font-family mt-2 rounded-0" required />
                                        </div>
                                        <div className="col-sm-4 my-sm-0 my-2">
                                            <label className="d-sm-block d-none font-family model-label">TEXT COLOR</label>
                                            <label className="d-sm-none d-block font-family fs-4">TEXT COLOR</label>
                                            <input type="text" onChange={(e) => { setTColor(e.target.value) }} value={TColor} className="form-control shadow-none font-family mt-2 rounded-0" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 d-sm-flex d-block my-2">
                                        <div className="col-sm-6 pe-sm-2 pe-0">
                                            <label className="d-sm-block d-none font-family model-label">PRINCIPAL NAME</label>
                                            <label className="d-sm-none d-block font-family fs-4">PRINCIPAL NAME</label>
                                            <input type="text" onChange={(e) => { setPName(e.target.value) }} value={PName} className="form-control shadow-none font-family mt-2 rounded-0" required />
                                        </div>
                                        <div className="col-sm-6 ps-sm-2 ps-0 my-sm-0 my-2">
                                            <label className="d-sm-block d-none font-family model-label">PRINCIPAL DETAIL</label>
                                            <label className="d-sm-none d-block font-family fs-4">PRINCIPAL DETAIL</label>
                                            <input type="text" onChange={(e) => { setPDetail(e.target.value) }} value={PDetail} className="form-control shadow-none font-family mt-2 rounded-0" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 my-2">
                                        <label className="d-sm-block d-none font-family model-label">ABOUT</label>
                                        <label className="d-sm-none d-block font-family fs-4">ABOUT</label>
                                        <textarea rows="4" onChange={(e) => { setAbout(e.target.value) }} value={About} className="form-control shadow-none font-family mt-2 rounded-0" required></textarea>
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

export default Aboutmanagement;