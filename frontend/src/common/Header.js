import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const styles = {
    headerBtn: {
        border: "2px solid black"
    }
}

function Header() {

    const [open, setOpen] = useState(true);

    const [logo, setLogo] = useState(null)
    const [heading, setHeading] = useState(null)
    const [headingColor, setHeadingColor] = useState(null)
    const [headingBColor, setHeadingBColor] = useState(null)
    const [linksColor, setLinksColor] = useState(null)
    const [linksBColor, setLinksBColor] = useState(null)
    const [aLinkColor, setAlinkColor] = useState(null)
    const [aLinkBColor, setAlinkBColor] = useState(null)

    const headerBtnFn = () => {
        setOpen(!open);
    }

    function headerBtnColorFn() {
        if (open == true) {
            document.getElementById("header-btn").style.backgroundColor = linksBColor
        } else {
            document.getElementById("header-btn").style.backgroundColor = aLinkBColor
        }
    }

    useEffect(() => {
        headerBtnColorFn();
    }, [open])

    useEffect(() => {
        fetchFn()
    }, [])

    function fetchFn() {
        fetch("/user/fetchHeader").then((result) => { return result.json() }).then((data) => {
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

    return (
        <>
            <ToastContainer position="top-center" />
            <section id="header">
                <div className="container-fluid">
                    <div style={{ backgroundColor: headingBColor }} className="row">
                        <div className="col-sm-12 d-flex justify-content-center align-items-center p-2">
                            <img className="col-sm-1 col-2" src={logo} alt="image not found" />
                            <p style={{ color: headingColor }} className="font-family fw-bolder ps-4 m-0 d-sm-block d-none header-heading">{heading}</p>
                            <p style={{ color: headingColor }} className="font-family fw-bold ps-3 m-0 d-sm-none d-block fs-5">{heading}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div style={{ backgroundColor: linksBColor }} className="col-sm-12 justify-content-center d-sm-flex d-none">
                            <ul className="p-0 my-3">
                                <li className="font-family fw-bold d-inline-block"><NavLink style={({ isActive }) => (isActive ? { color: aLinkColor, backgroundColor: aLinkBColor } : { color: linksColor })} to="/" className="text-decoration-none px-5 py-1">Home</NavLink></li>
                                <li className="font-family fw-bold d-inline-block"><NavLink style={({ isActive }) => (isActive ? { color: aLinkColor, backgroundColor: aLinkBColor } : { color: linksColor })} to="/about" className="text-decoration-none px-5 py-1">About</NavLink></li>
                                <li className="font-family fw-bold d-inline-block"><NavLink style={({ isActive }) => (isActive ? { color: aLinkColor, backgroundColor: aLinkBColor } : { color: linksColor })} to="/event" className="text-decoration-none px-5 py-1">Event</NavLink></li>
                                <li className="font-family fw-bold d-inline-block"><NavLink style={({ isActive }) => (isActive ? { color: aLinkColor, backgroundColor: aLinkBColor } : { color: linksColor })} to="/result" className="text-decoration-none px-5 py-1">Result</NavLink></li>
                                <li className="font-family fw-bold d-inline-block"><NavLink style={({ isActive }) => (isActive ? { color: aLinkColor, backgroundColor: aLinkBColor } : { color: linksColor })} to="/review" className="text-decoration-none px-5 py-1">Review</NavLink></li>
                                <li className="font-family fw-bold d-inline-block"><NavLink style={({ isActive }) => (isActive ? { color: aLinkColor, backgroundColor: aLinkBColor } : { color: linksColor })} to="/facility" className="text-decoration-none px-5 py-1">Facility</NavLink></li>
                                <li className="font-family fw-bold d-inline-block"><NavLink style={({ isActive }) => (isActive ? { color: aLinkColor, backgroundColor: aLinkBColor } : { color: linksColor })} to="/history" className="text-decoration-none px-5 py-1">History</NavLink></li>
                                <li className="font-family fw-bold d-inline-block"><NavLink style={({ isActive }) => (isActive ? { color: aLinkColor, backgroundColor: aLinkBColor } : { color: linksColor })} to="/contact" className="text-decoration-none px-5 py-1">Contact</NavLink></li>
                            </ul>
                        </div>
                        <div style={{ backgroundColor: linksBColor }} className="col-12 justify-content-end d-sm-none d-flex py-2">
                            <div style={styles.headerBtn} id="header-btn" className="col-1">
                                <button onClick={headerBtnFn} className="btn p-1 shadow-none d-flex">
                                    <img className="img-responsive header-btn-img" src="media/headerbtn.png" alt="image not found" />
                                </button>
                            </div>
                        </div>
                        {open ? <></> : <>
                            <div style={{ backgroundColor: linksBColor }} className="col-12 d-sm-none d-block header-link-div">
                                <ul className="ps-3 my-2">
                                    <li className="font-family fw-bold d-block py-2"><NavLink style={({ isActive }) => (isActive ? { color: aLinkColor, backgroundColor: aLinkBColor } : { color: linksColor })} to="/" className="text-decoration-none px-2 py-1 fs-5">Home</NavLink></li>
                                    <li className="font-family fw-bold d-block py-2"><NavLink style={({ isActive }) => (isActive ? { color: aLinkColor, backgroundColor: aLinkBColor } : { color: linksColor })} to="/about" className="text-decoration-none px-2 py-1 fs-5">About</NavLink></li>
                                    <li className="font-family fw-bold d-block py-2"><NavLink style={({ isActive }) => (isActive ? { color: aLinkColor, backgroundColor: aLinkBColor } : { color: linksColor })} to="/event" className="text-decoration-none px-2 py-1 fs-5">Event</NavLink></li>
                                    <li className="font-family fw-bold d-block py-2"><NavLink style={({ isActive }) => (isActive ? { color: aLinkColor, backgroundColor: aLinkBColor } : { color: linksColor })} to="/result" className="text-decoration-none px-2 py-1 fs-5">Result</NavLink></li>
                                    <li className="font-family fw-bold d-block py-2"><NavLink style={({ isActive }) => (isActive ? { color: aLinkColor, backgroundColor: aLinkBColor } : { color: linksColor })} to="/review" className="text-decoration-none px-2 py-1 fs-5">Review</NavLink></li>
                                    <li className="font-family fw-bold d-block py-2"><NavLink style={({ isActive }) => (isActive ? { color: aLinkColor, backgroundColor: aLinkBColor } : { color: linksColor })} to="/facility" className="text-decoration-none px-2 py-1 fs-5">Facility</NavLink></li>
                                    <li className="font-family fw-bold d-block py-2"><NavLink style={({ isActive }) => (isActive ? { color: aLinkColor, backgroundColor: aLinkBColor } : { color: linksColor })} to="/history" className="text-decoration-none px-2 py-1 fs-5">History</NavLink></li>
                                    <li className="font-family fw-bold d-block py-2"><NavLink style={({ isActive }) => (isActive ? { color: aLinkColor, backgroundColor: aLinkBColor } : { color: linksColor })} to="/contact" className="text-decoration-none px-2 py-1 fs-5">Contact</NavLink></li>
                                </ul>
                            </div>
                        </>}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Header;