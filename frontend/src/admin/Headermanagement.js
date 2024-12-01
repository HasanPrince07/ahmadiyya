import { useContext, useEffect, useState } from "react";
import AdminHeader from "../common/AdminHeader";
import Sidebar from "../common/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
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

function Headermanagement() {

    const [model, setModel] = useState(false)

    const [logo, setLogo] = useState("")
    const [heading, setHeading] = useState("")
    const [headingColor, setHeadingColor] = useState("")
    const [headingBColor, setHeadingBColor] = useState("")
    const [linksColor, setLinksColor] = useState("")
    const [linksBColor, setLinksBColor] = useState("")
    const [aLinkColor, setAlinkColor] = useState("")
    const [aLinkBColor, setAlinkBColor] = useState("")

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
                setGMessage("Please Login.")
                navigate("/login")
            } else if (data.status === 500) {
                window.localStorage.removeItem("token")
                setGMessage("Server error. Please login")
                navigate("/login")
            } else {
                fetch("/admin/fetchHeader").then((result) => { return result.json() }).then((data) => {
                    if (data.status === 200) {
                        setLogo(data.data.logo)
                        setHeading(data.data.heading)
                        setHeadingColor(data.data.headingColor)
                        setHeadingBColor(data.data.headingBColor)
                        setLinksColor(data.data.linksColor)
                        setLinksBColor(data.data.linksBColor)
                        setAlinkColor(data.data.aLinkColor)
                        setAlinkBColor(data.data.aLinkBColor)
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
        formdata.append("logo", logo)
        formdata.append("heading", heading)
        formdata.append("headingColor", headingColor)
        formdata.append("headingBColor", headingBColor)
        formdata.append("linksColor", linksColor)
        formdata.append("linksBColor", linksBColor)
        formdata.append("aLinkColor", aLinkColor)
        formdata.append("aLinkBColor", aLinkBColor)
        fetch("/admin/updateHeader", {
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
                            <p style={styles.heading} className="d-sm-block d-none font-family text-center fw-bolder heading my-3">HEADER MANAGEMENT PAGE</p>
                            <p style={styles.heading} className="d-sm-none d-block font-family text-center fw-bolder fs-5 my-2">HEADER MANAGEMENT PAGE</p>
                            <div className="table-responsive">
                                <table className="table table-bordered text-center table-center font-family">
                                    <thead style={styles.tableHead} className="align-middle">
                                        <tr>
                                            <th>LOGO</th>
                                            <th>HEADING</th>
                                            <th>HEADING COLOR</th>
                                            <th>HEADING BACKGROUND COLOR</th>
                                            <th>LINKS COLOR</th>
                                            <th>LINKS BACKGROUND COLOR</th>
                                            <th>ACTIVE LINK COLOR</th>
                                            <th>ACTIVE LINK BACKGROUND COLOR</th>
                                            <th>UPDATE</th>
                                        </tr>
                                    </thead>
                                    <tbody className="align-middle">
                                        <tr>
                                            <td><img src={logo} alt="header logo not found" /></td>
                                            <td>{heading}</td>
                                            <td>{headingColor}</td>
                                            <td>{headingBColor}</td>
                                            <td>{linksColor}</td>
                                            <td>{linksBColor}</td>
                                            <td>{aLinkColor}</td>
                                            <td>{aLinkBColor}</td>
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
                                        <p style={styles.heading} className="d-sm-block d-none font-family text-center fw-bolder model-heading m-0">UPDATE HEADER SECTION HERE</p>
                                        <p style={styles.heading} className="d-sm-none d-block font-family text-center fw-bolder fs-5">UPDATE HEADER SECTION HERE</p>
                                    </div>
                                    <div className="col-sm-2">
                                        <button style={styles.modelBtn} className="btn font-family form-control rounded-0" onClick={() => { setModel(false) }}>CLOSE</button>
                                    </div>
                                </div>
                                <form method="post" onSubmit={(e) => { handleform(e) }}>
                                    <div className="col-sm-12 my-2">
                                        <label className="d-sm-block d-none font-family model-label">LOGO</label>
                                        <label className="d-sm-none d-block font-family fs-4">LOGO</label>
                                        <input type="file" onChange={(e) => { setLogo(e.target.files[0]) }} className="form-control shadow-none font-family mt-2 rounded-0" />
                                    </div>
                                    <div className="col-sm-12 my-2">
                                        <label className="d-sm-block d-none font-family model-label">HEADING</label>
                                        <label className="d-sm-none d-block font-family fs-4">HEADING</label>
                                        <input type="text" onChange={(e) => { setHeading(e.target.value) }} value={heading} className="form-control shadow-none font-family mt-2 rounded-0" required />
                                    </div>
                                    <div className="col-sm-12 d-sm-flex d-block my-2">
                                        <div className="col-sm-6 pe-sm-2 pe-0">
                                            <label className="d-sm-block d-none font-family model-label">HEADING COLOR</label>
                                            <label className="d-sm-none d-block font-family fs-4">HEADING COLOR</label>
                                            <input type="text" onChange={(e) => { setHeadingColor(e.target.value) }} value={headingColor} className="form-control shadow-none font-family mt-2 rounded-0" required />
                                        </div>
                                        <div className="col-sm-6 ps-sm-2 ps-0 my-sm-0 my-2">
                                            <label className="d-sm-block d-none font-family model-label">HEADING BACKGROUND COLOR</label>
                                            <label className="d-sm-none d-block font-family fs-4">HEADING BACKGROUND COLOR</label>
                                            <input type="text" onChange={(e) => { setHeadingBColor(e.target.value) }} value={headingBColor} className="form-control shadow-none font-family mt-2 rounded-0" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 d-sm-flex d-block my-2">
                                        <div className="col-sm-6 pe-sm-2 pe-0">
                                            <label className="d-sm-block d-none font-family model-label">LINKS COLOR</label>
                                            <label className="d-sm-none d-block font-family fs-4">LINKS COLOR</label>
                                            <input type="text" onChange={(e) => { setLinksColor(e.target.value) }} value={linksColor} className="form-control shadow-none font-family mt-2 rounded-0" required />
                                        </div>
                                        <div className="col-sm-6 ps-sm-2 ps-0 my-sm-0 my-2">
                                            <label className="d-sm-block d-none font-family model-label">LINKS BACKGROUND COLOR</label>
                                            <label className="d-sm-none d-block font-family fs-4">LINKS BACKGROUND COLOR</label>
                                            <input type="text" onChange={(e) => { setLinksBColor(e.target.value) }} value={linksBColor} className="form-control shadow-none font-family mt-2 rounded-0" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 d-sm-flex d-block my-2">
                                        <div className="col-sm-6 pe-sm-2 pe-0">
                                            <label className="d-sm-block d-none font-family model-label">ACTIVE LINK COLOR</label>
                                            <label className="d-sm-none d-block font-family fs-4">ACTIVE LINK COLOR</label>
                                            <input type="text" onChange={(e) => { setAlinkColor(e.target.value) }} value={aLinkColor} className="form-control shadow-none font-family mt-2 rounded-0" required />
                                        </div>
                                        <div className="col-sm-6 ps-sm-2 ps-0 my-sm-0 my-2">
                                            <label className="d-sm-block d-none font-family model-label">ACTIVE LINK BACKGROUND COLOR</label>
                                            <label className="d-sm-none d-block font-family fs-4">ACTIVE LINK BACKGROUND COLOR</label>
                                            <input type="text" onChange={(e) => { setAlinkBColor(e.target.value) }} value={aLinkBColor} className="form-control shadow-none font-family mt-2 rounded-0" required />
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

export default Headermanagement;