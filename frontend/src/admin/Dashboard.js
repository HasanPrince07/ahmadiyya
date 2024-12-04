import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import AdminHeader from "../common/AdminHeader";
import { context } from "../common/Context";
import Sidebar from "../common/Sidebar";

const styles = {
    dashboardHeading: {
        color: "black",
    }
}

function Dashboard() {

    const navigate = useNavigate()

    const { gAdmin, setGMessage } = useContext(context)

    useEffect(() => {
        const token = window.localStorage.getItem("token")
        fetch("/admin/authentication", {
            headers: { authorization: `Bearer ${JSON.parse(token)}` }
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 401) {
                window.localStorage.removeItem("token")
                setGMessage("Please Login.")
                navigate("/login")
            } else {
                if (gAdmin) {
                    toast(`Welcome To ${gAdmin}`, { type: "success" })
                }
            }
        })
    })


    return (
        <>
            <ToastContainer position="top-center" />
            <AdminHeader />
            <section id="dashboard">
                <div className="container-fluid">
                    <div className="row">
                        <Sidebar />
                        <div className="col-sm-9 d-flex align-items-center justify-content-center">
                            <p style={styles.dashboardHeading} className="d-sm-block d-none font-family fw-bolder dashboard-heading m-0">DASHBOARD PAGE</p>
                            <p style={styles.dashboardHeading} className="d-sm-none d-block font-family fw-bolder fs-1 mt-5">DASHBOARD PAGE</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Dashboard;