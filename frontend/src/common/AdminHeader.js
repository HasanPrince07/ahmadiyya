import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "./Context";

const styles = {
    headerDiv: {
        backgroundColor: "#dbdbdb"
    },
    headerText: {
        color: "#000000",
        cursor: "pointer"
    },
    headerBtn: {
        backgroundColor: "#000000",
        color: "#ffffff"
    },
    headerBtnHover: {
        backgroundColor: "#ffffff",
        color: "#000000"
    }
}

function AdminHeader() {

    const [headerBtn, setHeaderBtn] = useState(false);

    const navigate = useNavigate();

    const { setGAdmin, setGAdminName, setGMessage, gAdminName } = useContext(context);

    useEffect(() => {
        setGAdminName(JSON.parse(window.localStorage.getItem("admin_name")))
    }, [])

    function dashboardFn() {
        setGAdmin(null)
        navigate("/dashboard")
    }

    function logoutFn() {
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("admin_name")
        setGMessage(null)
        navigate("/login")
    }

    return (
        <>
            <section style={styles.headerDiv} id="admin-header">
                <div className="container">
                    <div className="row header-div d-sm-flex d-none justify-content-between align-items-center">
                        <div className="col-sm-6">
                            <p onClick={() => { dashboardFn() }} style={styles.headerText} className="font-family fw-bolder header-text text-uppercase m-0">welcome to {gAdminName}</p>
                        </div>
                        <div className="col-sm-3">
                            <button style={headerBtn ? styles.headerBtnHover : styles.headerBtn} onClick={() => { logoutFn() }} onMouseEnter={() => { setHeaderBtn(true) }} onMouseLeave={() => { setHeaderBtn(false) }} className="font-family fw-normal btn form-control header-btn shadow-none rounded-0">LOG OUT</button>
                        </div>
                    </div>
                    <div className="row d-sm-none d-flex py-3">
                        <div className="col-sm-12">
                            <p onClick={() => { dashboardFn() }} style={styles.headerText} className="text-center font-family fw-bolder fs-5 text-uppercase m-0">welcome to {gAdminName}</p>
                        </div>
                        <div className="col-sm-12">
                            <button style={headerBtn ? styles.headerBtnHover : styles.headerBtn} onClick={() => { logoutFn() }} onMouseEnter={() => { setHeaderBtn(true) }} onMouseLeave={() => { setHeaderBtn(false) }} className="font-family fw-normal btn form-control fs-5 shadow-none rounded-0 mt-2 text-decoration-none">LOG OUT</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AdminHeader;