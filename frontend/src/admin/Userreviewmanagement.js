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
    }
}

function Userreviewmanagement() {

    const [headingBtn, setHeadingBtn] = useState(false)

    const [data, setData] = useState([])

    const navigate = useNavigate()

    const { setGMessage } = useContext(context)

    useEffect(() => {
        fetchFn()
    }, [])

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
                fetch("/admin/fetchUserReview").then((result) => { return result.json() }).then((data) => {
                    if (data.status === 200) {
                        setData(data.data)
                    } else {
                        toast(data.message, { type: "error" })
                    }
                })
            }
        })
    }

    function deleteFn(id) {
        fetch(`/admin/deleteUserReview/${id}`, {
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

    function statusFn(id) {
        fetch(`/admin/updateUserReview/${id}`, {
            method: "PUT",
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                fetchFn()
            } else {
                toast("Failed to update. Please try again.", { type: "error" })
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
                            <p style={styles.heading} className="d-sm-block d-none font-family text-center fw-bolder heading my-3">USER'S REVIEW MANAGEMENT PAGE</p>
                            <p style={styles.heading} className="d-sm-none d-block font-family text-center fw-bolder fs-5 my-2">USER'S REVIEW MANAGEMENT PAGE</p>
                            <div>
                                <NavLink to="/reviewmanagement" className="text-decoration-none"><button style={headingBtn ? styles.headingBtn : styles.headingBtnHover} onMouseLeave={() => { setHeadingBtn(false) }} onMouseEnter={() => { setHeadingBtn(true) }} className="d-sm-block d-none font-family fw-normal btn form-control heading-btn shadow-none rounded-0 my-2">REVIEW MANAGEMENT PAGE</button></NavLink>
                                <NavLink to="/reviewmanagement" className="text-decoration-none"><button style={headingBtn ? styles.headingBtn : styles.headingBtnHover} onMouseLeave={() => { setHeadingBtn(false) }} onMouseEnter={() => { setHeadingBtn(true) }} className="d-sm-none d-block font-family fw-normal btn form-control shadow-none rounded-0 my-2">REVIEW MANAGEMENT PAGE</button></NavLink>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-bordered text-center table-center font-family">
                                    <thead style={styles.tableHead} className="align-middle">
                                        <tr>
                                            <th>S.No.</th>
                                            <th>STUDENT NAME</th>
                                            <th>STUDENT REVIEW</th>
                                            <th>STATUS</th>
                                            <th>DELETE</th>
                                        </tr>
                                    </thead>
                                    {data.length !== 0 ?
                                        <tbody className="align-middle">
                                            {data.map((data, key) => (
                                                <tr key={data._id}>
                                                    <td>{key + 1}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.review}</td>
                                                    <td><button onClick={() => { statusFn(data._id) }} style={styles.tableBtn} className="btn form-control shadow-none rounded-0 text-uppercase">{data.status}</button></td>
                                                    <td><button onClick={() => { deleteFn(data._id) }} style={styles.tableBtn} className="btn form-control shadow-none rounded-0">DELETE</button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        :
                                        <tbody className="align-middle">
                                            <tr>
                                                <td colSpan="5">NO USER'S REVIEW HERE</td>
                                            </tr>
                                        </tbody>
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Userreviewmanagement;