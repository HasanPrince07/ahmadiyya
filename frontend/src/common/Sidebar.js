import { useState } from "react";
import { NavLink } from "react-router-dom";

const styles = {
    sidebarDiv: {
        backgroundColor: "#dbdbdb",
    },
    sidebarBtn: {
        color: "#000000",
        backgroundColor: "#ffffff"
    },
    sidebarBtnHover: {
        color: "#ffffff",
        backgroundColor: "#000000"
    }
}

function Sidebar() {

    const [dashboardBtn, setDashboardBtn] = useState(null)

    return (
        <>
            <div style={styles.sidebarDiv} className="col-sm-3 overflow-auto">
                <div className="d-sm-block d-none sidebar-div">
                    <NavLink to="/adminmanagement" className="text-decoration-none"><button style={dashboardBtn === 1 ? styles.sidebarBtnHover : styles.sidebarBtn} onMouseEnter={() => { setDashboardBtn(1) }} onMouseLeave={() => { setDashboardBtn(null) }} className="font-family fw-normal btn form-control sidebar-btn shadow-none rounded-0 my-2">ADMIN MANAGEMENT</button></NavLink>
                    <NavLink to="/headermanagement" className="text-decoration-none"><button style={dashboardBtn === 2 ? styles.sidebarBtnHover : styles.sidebarBtn} onMouseEnter={() => { setDashboardBtn(2) }} onMouseLeave={() => { setDashboardBtn(null) }} className="font-family fw-normal btn form-control sidebar-btn shadow-none rounded-0 my-2">HEADER MANAGEMENT</button></NavLink>
                    <NavLink to="/mainmanagement" className="text-decoration-none"><button style={dashboardBtn === 3 ? styles.sidebarBtnHover : styles.sidebarBtn} onMouseEnter={() => { setDashboardBtn(3) }} onMouseLeave={() => { setDashboardBtn(null) }} className="font-family fw-normal btn form-control sidebar-btn shadow-none rounded-0 my-2">MAIN MANAGEMENT</button></NavLink>
                    <NavLink to="/imagesmanagement" className="text-decoration-none"><button style={dashboardBtn === 4 ? styles.sidebarBtnHover : styles.sidebarBtn} onMouseEnter={() => { setDashboardBtn(4) }} onMouseLeave={() => { setDashboardBtn(null) }} className="font-family fw-normal btn form-control sidebar-btn shadow-none rounded-0 my-2">IMAGES MANAGEMENT</button></NavLink>
                    <NavLink to="/reviewmanagement" className="text-decoration-none"><button style={dashboardBtn === 5 ? styles.sidebarBtnHover : styles.sidebarBtn} onMouseEnter={() => { setDashboardBtn(5) }} onMouseLeave={() => { setDashboardBtn(null) }} className="font-family fw-normal btn form-control sidebar-btn shadow-none rounded-0 my-2">REVIEW MANAGEMENT</button></NavLink>
                    <NavLink to="/eventmanagement" className="text-decoration-none"><button style={dashboardBtn === 6 ? styles.sidebarBtnHover : styles.sidebarBtn} onMouseEnter={() => { setDashboardBtn(6) }} onMouseLeave={() => { setDashboardBtn(null) }} className="font-family fw-normal btn form-control sidebar-btn shadow-none rounded-0 my-2">EVENT MANAGEMENT</button></NavLink>
                    <NavLink to="/footermanagement" className="text-decoration-none"><button style={dashboardBtn === 7 ? styles.sidebarBtnHover : styles.sidebarBtn} onMouseEnter={() => { setDashboardBtn(7) }} onMouseLeave={() => { setDashboardBtn(null) }} className="font-family fw-normal btn form-control sidebar-btn shadow-none rounded-0 my-2">FOOTER MANAGEMENT</button></NavLink>
                    <NavLink to="/aboutmanagement" className="text-decoration-none"><button style={dashboardBtn === 8 ? styles.sidebarBtnHover : styles.sidebarBtn} onMouseEnter={() => { setDashboardBtn(8) }} onMouseLeave={() => { setDashboardBtn(null) }} className="font-family fw-normal btn form-control sidebar-btn shadow-none rounded-0 my-2">ABOUT MANAGEMENT</button></NavLink>
                    <NavLink to="/resultmanagement" className="text-decoration-none"><button style={dashboardBtn === 9 ? styles.sidebarBtnHover : styles.sidebarBtn} onMouseEnter={() => { setDashboardBtn(9) }} onMouseLeave={() => { setDashboardBtn(null) }} className="font-family fw-normal btn form-control sidebar-btn shadow-none rounded-0 my-2">RESULT MANAGEMENT</button></NavLink>
                    <NavLink to="/facilitymanagement" className="text-decoration-none"><button style={dashboardBtn === 10 ? styles.sidebarBtnHover : styles.sidebarBtn} onMouseEnter={() => { setDashboardBtn(10) }} onMouseLeave={() => { setDashboardBtn(null) }} className="font-family fw-normal btn form-control sidebar-btn shadow-none rounded-0 my-2">FACILITY MANAGEMENT</button></NavLink>
                    <NavLink to="/historymanagement" className="text-decoration-none"><button style={dashboardBtn === 11 ? styles.sidebarBtnHover : styles.sidebarBtn} onMouseEnter={() => { setDashboardBtn(11) }} onMouseLeave={() => { setDashboardBtn(null) }} className="font-family fw-normal btn form-control sidebar-btn shadow-none rounded-0 my-2">HISTORY MANAGEMENT</button></NavLink>
                    <NavLink to="/contactmanagement" className="text-decoration-none"><button style={dashboardBtn === 12 ? styles.sidebarBtnHover : styles.sidebarBtn} onMouseEnter={() => { setDashboardBtn(12) }} onMouseLeave={() => { setDashboardBtn(null) }} className="font-family fw-normal btn form-control sidebar-btn shadow-none rounded-0 my-2">CONTACT MANAGEMENT</button></NavLink>
                    <NavLink to="/allimagemanagement" className="text-decoration-none"><button style={dashboardBtn === 13 ? styles.sidebarBtnHover : styles.sidebarBtn} onMouseEnter={() => { setDashboardBtn(13) }} onMouseLeave={() => { setDashboardBtn(null) }} className="font-family fw-normal btn form-control sidebar-btn shadow-none rounded-0 my-2">ALL IMAGE MANAGEMENT</button></NavLink>

                </div>
                <div className="d-sm-none overflow-auto d-flex py-2">
                    <div className="col-12 p-2">
                        <NavLink to="/adminmanagement" className="text-decoration-none"><button style={dashboardBtn === 1 ? styles.sidebarBtnHover : styles.sidebarBtn} onMouseEnter={() => { setDashboardBtn(1) }} onMouseLeave={() => { setDashboardBtn(null) }} className="font-family fw-normal btn form-control fs-5 shadow-none rounded-0">ADMIN MANAGEMENT</button></NavLink>
                    </div>
                    <div className="col-12 p-2">
                        <NavLink to="/headermanagement" className="text-decoration-none"><button style={dashboardBtn === 2 ? styles.sidebarBtnHover : styles.sidebarBtn} onMouseEnter={() => { setDashboardBtn(2) }} onMouseLeave={() => { setDashboardBtn(null) }} className="font-family fw-normal btn form-control fs-5 shadow-none rounded-0">HEADER MANAGEMENT</button></NavLink>
                    </div>
                    <div className="col-12 p-2">
                        <NavLink to="/mainmanagement" className="text-decoration-none"><button style={dashboardBtn === 3 ? styles.sidebarBtnHover : styles.sidebarBtn} onMouseEnter={() => { setDashboardBtn(3) }} onMouseLeave={() => { setDashboardBtn(null) }} className="font-family fw-normal btn form-control fs-5 shadow-none rounded-0">MAIN MANAGEMENT</button></NavLink>
                    </div>
                    <div className="col-12 p-2">
                        <NavLink to="/imagesmanagement" className="text-decoration-none"><button style={dashboardBtn === 4 ? styles.sidebarBtnHover : styles.sidebarBtn} onMouseEnter={() => { setDashboardBtn(4) }} onMouseLeave={() => { setDashboardBtn(null) }} className="font-family fw-normal btn form-control fs-5 shadow-none rounded-0">IMAGES MANAGEMENT</button></NavLink>
                    </div>
                    <div className="col-12 p-2">
                        <NavLink to="/reviewmanagement" className="text-decoration-none"><button style={dashboardBtn === 5 ? styles.sidebarBtnHover : styles.sidebarBtn} onMouseEnter={() => { setDashboardBtn(5) }} onMouseLeave={() => { setDashboardBtn(null) }} className="font-family fw-normal btn form-control fs-5 shadow-none rounded-0">REVIEW MANAGEMENT</button></NavLink>
                    </div>
                    <div className="col-12 p-2">
                        <NavLink to="/eventmanagement" className="text-decoration-none"><button style={dashboardBtn === 6 ? styles.sidebarBtnHover : styles.sidebarBtn} onMouseEnter={() => { setDashboardBtn(6) }} onMouseLeave={() => { setDashboardBtn(null) }} className="font-family fw-normal btn form-control fs-5 shadow-none rounded-0">EVENT MANAGEMENT</button></NavLink>
                    </div>
                    <div className="col-12 p-2">
                        <NavLink to="/footermanagement" className="text-decoration-none"><button style={dashboardBtn === 7 ? styles.sidebarBtnHover : styles.sidebarBtn} onMouseEnter={() => { setDashboardBtn(7) }} onMouseLeave={() => { setDashboardBtn(null) }} className="font-family fw-normal btn form-control fs-5 shadow-none rounded-0">FOOTER MANAGEMENT</button></NavLink>
                    </div>
                    <div className="col-12 p-2">
                        <NavLink to="/aboutmanagement" className="text-decoration-none"><button style={dashboardBtn === 8 ? styles.sidebarBtnHover : styles.sidebarBtn} onMouseEnter={() => { setDashboardBtn(8) }} onMouseLeave={() => { setDashboardBtn(null) }} className="font-family fw-normal btn form-control fs-5 shadow-none rounded-0">ABOUT MANAGEMENT</button></NavLink>
                    </div>
                    <div className="col-12 p-2">
                        <NavLink to="/resultmanagement" className="text-decoration-none"><button style={dashboardBtn === 9 ? styles.sidebarBtnHover : styles.sidebarBtn} onMouseEnter={() => { setDashboardBtn(9) }} onMouseLeave={() => { setDashboardBtn(null) }} className="font-family fw-normal btn form-control fs-5 shadow-none rounded-0">RESULT MANAGEMENT</button></NavLink>
                    </div>
                    <div className="col-12 p-2">
                        <NavLink to="/facilitymanagement" className="text-decoration-none"><button style={dashboardBtn === 10 ? styles.sidebarBtnHover : styles.sidebarBtn} onMouseEnter={() => { setDashboardBtn(10) }} onMouseLeave={() => { setDashboardBtn(null) }} className="font-family fw-normal btn form-control fs-5 shadow-none rounded-0">FACILITY MANAGEMENT</button></NavLink>
                    </div>
                    <div className="col-12 p-2">
                        <NavLink to="/historymanagement" className="text-decoration-none"><button style={dashboardBtn === 11 ? styles.sidebarBtnHover : styles.sidebarBtn} onMouseEnter={() => { setDashboardBtn(11) }} onMouseLeave={() => { setDashboardBtn(null) }} className="font-family fw-normal btn form-control fs-5 shadow-none rounded-0">HISTORY MANAGEMENT</button></NavLink>
                    </div>
                    <div className="col-12 p-2">
                        <NavLink to="/contactmanagement" className="text-decoration-none"><button style={dashboardBtn === 12 ? styles.sidebarBtnHover : styles.sidebarBtn} onMouseEnter={() => { setDashboardBtn(12) }} onMouseLeave={() => { setDashboardBtn(null) }} className="font-family fw-normal btn form-control fs-5 shadow-none rounded-0">CONTACT MANAGEMENT</button></NavLink>
                    </div>
                    <div className="col-12 p-2">
                        <NavLink to="/allimagemanagement" className="text-decoration-none"><button style={dashboardBtn === 13 ? styles.sidebarBtnHover : styles.sidebarBtn} onMouseEnter={() => { setDashboardBtn(13) }} onMouseLeave={() => { setDashboardBtn(null) }} className="font-family fw-normal btn form-control fs-5 shadow-none rounded-0">ALL IMAGE MANAGEMENT</button></NavLink>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;