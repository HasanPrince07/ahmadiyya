import { useContext, useEffect, useState } from "react";
import AdminHeader from "../common/AdminHeader";
import Sidebar from "../common/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { context } from "../common/Context";
import { disabled } from "express/lib/application";

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

function Contactmanagement() {

    const [UFName, setUFName] = useState("")
    const [ULName, setULName] = useState("")
    const [UEmail, setUEmail] = useState("")
    const [UPhone, setUPhone] = useState("")
    const [UQuery, setUQuery] = useState("")
    const [USubject, setUSubject] = useState("")
    const [UReply, setUReply] = useState("")
    const [UId, setUId] = useState("")

    const [CData, setCData] = useState([])

    const [model, setModel] = useState(false)

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
                fetch("/admin/fetchContact").then((result) => { return result.json() }).then((data) => {
                    if (data.status === 200) {
                        setCData(data.data)
                    } else {
                        toast(data.message, { type: "error" })
                    }
                })
            }
        })
    }

    function replyFn(id) {
        setModel(true)
        fetch(`/admin/fetchContactById/${id}`).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                setUFName(data.data.UFName);
                setULName(data.data.ULName);
                setUEmail(data.data.UEmail);
                setUPhone(data.data.UPhone);
                setUQuery(data.data.UQuery);
                setUId(data.data._id);
            } else {
                toast(data.message, { type: "error" });
            }
        })
    }

    function handleform(e) {
        e.preventDefault();
        const formdata = { UEmail, USubject, UReply }
        fetch(`/admin/reply/${UId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata)
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                toast("Email sent successfully!", { type: "success" })
            } else {
                toast(data.message, { type: "error" });
            }
        })
    }

    function deleteFn(id) {
        fetch(`/admin/deleteContact/${id}`, {
            method: "DELETE",
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                fetchFn()
                toast("Successfully deleted!", { type: "success" })
            } else {
                toast("Failed to delete. Please try again.", { type: "error" })
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
                            <p style={styles.heading} className="d-sm-block d-none font-family text-center fw-bolder heading my-3">CONTACT MANAGEMENT PAGE</p>
                            <p style={styles.heading} className="d-sm-none d-block font-family text-center fw-bolder fs-5 my-2">CONTACT MANAGEMENT PAGE</p>
                            <div className="table-responsive">
                                <table className="table table-bordered text-center table-center font-family">
                                    <thead style={styles.tableHead} className="align-middle">
                                        <tr>
                                            <th>S.No.</th>
                                            <th>USER'S FIRST NAME</th>
                                            <th>USER'S LAST NAME</th>
                                            <th>USER'S EMAIL</th>
                                            <th>USER'S PHONE NUMBER</th>
                                            <th>STATUS</th>
                                            <th>DELETE</th>
                                            <th>REPLY</th>
                                        </tr>
                                    </thead>
                                    {CData.length !== 0 ?
                                        <tbody className="align-middle">
                                            {CData.map((data, key) => (
                                                <tr key={data._id}>
                                                    <td>{key + 1}</td>
                                                    <td>{data.UFName}</td>
                                                    <td>{data.ULName}</td>
                                                    <td>{data.UEmail}</td>
                                                    <td>{data.UPhone}</td>
                                                    <td>{data.UStatus}</td>
                                                    <td><button onClick={() => { deleteFn(data._id) }} style={styles.tableBtn} className="btn form-control shadow-none rounded-0">DELETE</button></td>
                                                    <td>
                                                        <button onClick={() => { replyFn(data._id) }} style={styles.tableBtn} className="btn form-control shadow-none rounded-0 text-uppercase">REPLY</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        :
                                        <tbody className="align-middle">
                                            <tr>
                                                <td colSpan="8">NO USER'S QUERY HERE</td>
                                            </tr>
                                        </tbody>
                                    }
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
                                        <p style={styles.heading} className="d-sm-block d-none font-family text-center fw-bolder model-heading m-0">REPLY SECTION HERE</p>
                                        <p style={styles.heading} className="d-sm-none d-block font-family text-center fw-bolder fs-5">REPLY SECTION HERE</p>
                                    </div>
                                    <div className="col-sm-2">
                                        <button style={styles.modelBtn} className="btn font-family form-control rounded-0" onClick={() => { setModel(false) }}>CLOSE</button>
                                    </div>
                                </div>
                                <form method="post" onSubmit={(e) => { handleform(e) }}>
                                    <div className="col-sm-12 d-sm-flex d-block my-2">
                                        <div className="col-sm-6 pe-sm-2 pe-0">
                                            <label className="d-sm-block d-none font-family model-label">TO</label>
                                            <label className="d-sm-none d-block font-family fs-4">TO</label>
                                            <input type="text" onChange={(e) => { setUEmail(e.target.value) }} value={UEmail} className="form-control shadow-none font-family mt-2 rounded-0" required disabled />
                                        </div>
                                        <div className="col-sm-6 ps-sm-2 ps-0 my-sm-0 my-2">
                                            <label className="d-sm-block d-none font-family model-label">FROM</label>
                                            <label className="d-sm-none d-block font-family fs-4">FROM</label>
                                            <input type="text" onChange={(e) => { setULName(e.target.value) }} value={ULName} className="form-control shadow-none font-family mt-2 rounded-0" required disabled />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 my-2">
                                        <label className="d-sm-block d-none font-family model-label">USER'S QUERY</label>
                                        <label className="d-sm-none d-block font-family fs-4">USER'S QUERY</label>
                                        <textarea rows="3" onChange={(e) => { setUQuery(e.target.value) }} value={UQuery} className="form-control shadow-none font-family mt-2 rounded-0" required disabled ></textarea>
                                    </div>
                                    <div className="col-sm-12 my-2">
                                        <label className="d-sm-block d-none font-family model-label">SUBJECT</label>
                                        <label className="d-sm-none d-block font-family fs-4">SUBJECT</label>
                                        <input type="text" onChange={(e) => { setUSubject(e.target.value) }} value={USubject} className="form-control shadow-none font-family mt-2 rounded-0" required />
                                    </div>
                                    <div className="col-sm-12 my-2">
                                        <label className="d-sm-block d-none font-family model-label">BODY</label>
                                        <label className="d-sm-none d-block font-family fs-4">BODY</label>
                                        <textarea rows="3" onChange={(e) => { setUReply(e.target.value) }} value={UReply} className="form-control shadow-none font-family mt-2 rounded-0" required ></textarea>
                                    </div>
                                    <div className="col-sm-12">
                                        <button style={styles.modelBtn} className="btn form-control font-family shadow-none rounded-0 mt-3">REPLY</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section></> : <></>
            }
        </>
    );
}

export default Contactmanagement;