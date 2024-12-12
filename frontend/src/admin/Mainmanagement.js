import { useContext, useEffect, useState } from "react";
import AdminHeader from "../common/AdminHeader";
import Sidebar from "../common/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { context } from "../common/Context";

const styles = {
    heading: {
        color: "#000000",
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

function Mainmanagement() {

    const [model, setModel] = useState(false)

    const [image, setImage] = useState("")
    const [sectionBColor, setSectionBColor] = useState("")
    const [heading, setHeading] = useState("")
    const [subHeading, setSubHeading] = useState("")
    const [headingColor, setHeadingColor] = useState("")
    const [button, setButton] = useState("")
    const [buttonColor, setButtonColor] = useState("")
    const [buttonBColor, setButtonBColor] = useState("")
    const [buttonHColor, setButtonHColor] = useState("")
    const [buttonHBColor, setButtonHBColor] = useState("")

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
                fetch("/admin/fetchMain").then((result) => { return result.json() }).then((data) => {
                    if (data.status === 200) {
                        setImage(data.data.image)
                        setSectionBColor(data.data.sectionBColor)
                        setHeading(data.data.heading)
                        setSubHeading(data.data.subHeading)
                        setHeadingColor(data.data.headingColor)
                        setButton(data.data.button)
                        setButtonColor(data.data.buttonColor)
                        setButtonBColor(data.data.buttonBColor)
                        setButtonHColor(data.data.buttonHColor)
                        setButtonHBColor(data.data.buttonHBColor)
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
        formdata.append("image", image)
        formdata.append("sectionBColor", sectionBColor)
        formdata.append("heading", heading)
        formdata.append("subHeading", subHeading)
        formdata.append("headingColor", headingColor)
        formdata.append("button", button)
        formdata.append("buttonColor", buttonColor)
        formdata.append("buttonBColor", buttonBColor)
        formdata.append("buttonHColor", buttonHColor)
        formdata.append("buttonHBColor", buttonHBColor)
        fetch("/admin/updateMain", {
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
                            <p style={styles.heading} className="d-sm-block d-none font-family text-center fw-bolder heading my-3">MAIN MANAGEMENT PAGE</p>
                            <p style={styles.heading} className="d-sm-none d-block font-family text-center fw-bolder fs-5 my-2">MAIN MANAGEMENT PAGE</p>
                            <div className="table-responsive">
                                <table className="table table-bordered text-center table-center font-family">
                                    <thead style={styles.tableHead} className="align-middle">
                                        <tr>
                                            <th>IMAGE</th>
                                            <th>SECTION BACKGROUND COLOR</th>
                                            <th>HEADING</th>
                                            <th>SUB HEADING</th>
                                            <th>HEADING COLOR</th>
                                            <th>BUTTON</th>
                                            <th>BUTTON COLOR</th>
                                            <th>BUTTON BACKGROUND COLOR</th>
                                            <th>BUTTON HOVER COLOR</th>
                                            <th>BUTTON HOVER BACKGROUND COLOR</th>
                                            <th>UPDATE</th>
                                        </tr>
                                    </thead>
                                    <tbody className="align-middle">
                                        <tr>
                                            <td><img src={image} alt="Not found" /></td>
                                            <td>{sectionBColor}</td>
                                            <td>{heading}</td>
                                            <td>{subHeading}</td>
                                            <td>{headingColor}</td>
                                            <td>{button}</td>
                                            <td>{buttonColor}</td>
                                            <td>{buttonBColor}</td>
                                            <td>{buttonHColor}</td>
                                            <td>{buttonHBColor}</td>
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
                                        <p style={styles.heading} className="d-sm-block d-none font-family text-center fw-bolder model-heading m-0">UPDATE MAIN SECTION HERE</p>
                                        <p style={styles.heading} className="d-sm-none d-block font-family text-center fw-bolder fs-5">UPDATE MAIN SECTION HERE</p>
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
                                    <div className="col-sm-12 my-2">
                                        <label className="d-sm-block d-none font-family model-label">HEADING</label>
                                        <label className="d-sm-none d-block font-family fs-4">HEADING</label>
                                        <input type="text" onChange={(e) => { setHeading(e.target.value) }} value={heading} className="form-control shadow-none font-family mt-2 rounded-0" required />
                                    </div>
                                    <div className="col-sm-12 my-2">
                                        <label className="d-sm-block d-none font-family model-label">SUB HEADING</label>
                                        <label className="d-sm-none d-block font-family fs-4">SUB HEADING</label>
                                        <input type="text" onChange={(e) => { setSubHeading(e.target.value) }} value={subHeading} className="form-control shadow-none font-family mt-2 rounded-0" required />
                                    </div>
                                    <div className="col-sm-12 my-2">
                                        <label className="d-sm-block d-none font-family model-label">BUTTON</label>
                                        <label className="d-sm-none d-block font-family fs-4">BUTTON</label>
                                        <input type="text" onChange={(e) => { setButton(e.target.value) }} value={button} className="form-control shadow-none font-family mt-2 rounded-0" required />
                                    </div>
                                    <div className="col-sm-12 d-sm-flex d-block my-2">
                                        <div className="col-sm-6 pe-sm-2 pe-0">
                                            <label className="d-sm-block d-none font-family model-label">SECTION BACKGROUND COLOR</label>
                                            <label className="d-sm-none d-block font-family fs-4">SECTION BACKGROUND COLOR</label>
                                            <input type="text" onChange={(e) => { setSectionBColor(e.target.value) }} value={sectionBColor} className="form-control shadow-none font-family mt-2 rounded-0" required />
                                        </div>
                                        <div className="col-sm-6 ps-sm-2 ps-0 my-sm-0 my-2">
                                            <label className="d-sm-block d-none font-family model-label">HEADING COLOR</label>
                                            <label className="d-sm-none d-block font-family fs-4">HEADING COLOR</label>
                                            <input type="text" onChange={(e) => { setHeadingColor(e.target.value) }} value={headingColor} className="form-control shadow-none font-family mt-2 rounded-0" required />
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

export default Mainmanagement;