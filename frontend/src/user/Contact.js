import { useEffect, useState } from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const styles = {
    contactHeading: {
        color: "black",
    },

    queryDiv: {
        backgroundColor: "#edf3fc",
    },
    queryHeading: {
        color: "black",
    },
    queryLabel: {
        color: "black",
    },
    queryInput: {
        color: "black",
    },
    contactBtn: {
        color: "#1d1d36",
        backgroundColor: "white"
    },
    contactBtnHover: {
        color: "white",
        backgroundColor: "#1d1d36"
    },
}

function Contact() {

    const [contactBtn, setContactBtn] = useState(true)

    const [BColor, setBColor] = useState("")
    const [HColor, setHColor] = useState("")
    const [TColor, setTColor] = useState("")
    const [CImage, setCImage] = useState("")
    const [Address, setAddress] = useState("")
    const [MAddress, setMAddress] = useState("")
    const [Email, setEmail] = useState("")
    const [Phone, setPhone] = useState("")

    const [UFName, setUFName] = useState("")
    const [ULName, setULName] = useState("")
    const [UEmail, setUEmail] = useState("")
    const [UPhone, setUPhone] = useState("")
    const [UQuery, setUQuery] = useState("")

    useEffect(() => {
        fetchFn();
    }, [])

    function fetchFn() {
        fetch("/user/fetchFooter").then((result) => {
            return result.json();
        }).then((data) => {
            if (data.status === 200) {
                setBColor(data.data.BColor);
                setHColor(data.data.HColor);
                setTColor(data.data.TColor);
                setCImage(data.data.CImage);
                setAddress(data.data.Address);
                setMAddress(data.data.MAddress);
                setEmail(data.data.Email);
                setPhone(data.data.Phone);
            } else {
                toast(data.message, { type: "error" });
            }
        })
    }

    function handleform(e) {
        e.preventDefault()
        const formdata = { UFName, ULName, UEmail, UPhone, UQuery }
        fetch("/user/addQuery", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata)
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 201) {
                toast("Query was submitted successfully!", { type: "success" })
            } else {
                toast(data.message, { type: "error" })
            }
        })
    }

    return (
        <>
            <Header />
            <section id="contact-page">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 py-sm-5 py-4">
                            <p style={styles.contactHeading} className="text-center m-0 d-sm-block d-none font-family fw-bolder contact-head">CONTACT US</p>
                            <p style={styles.contactHeading} className="text-center m-0 d-sm-none d-block font-family fw-bolder fs-4">CONTACT US</p>
                        </div>
                        <div style={{ backgroundColor: BColor }} className="col-sm-12 d-sm-flex d-block p-3">
                            <div className="col-sm-6">
                                <img src={CImage} alt="contact-image-not-found" />
                            </div>
                            <div className="col-sm-6 d-flex align-items-center justify-content-center align-items-center">
                                <div className="d-sm-block d-none">
                                    <p style={{ color: HColor }} className="text-center font-family fw-bold contact-heading m-0">Office Number</p>
                                    <p style={{ color: TColor }} className="text-center font-family fw-normal contact-text mb-4">{Phone}</p>
                                    <p style={{ color: HColor }} className="text-center font-family fw-bold contact-heading m-0">Email Address</p>
                                    <p style={{ color: TColor }} className="text-center font-family fw-normal contact-text mb-4">{Email}</p>
                                    <p style={{ color: HColor }} className="text-center font-family fw-bold contact-heading m-0">Office Address</p>
                                    <p style={{ color: TColor }} className="text-center font-family fw-normal contact-text m-0">{Address}</p>
                                </div>
                                <div className="d-sm-none d-block pt-2">
                                    <p style={{ color: HColor }} className="text-center font-family fw-bold fs-3 m-0">Office Number</p>
                                    <p style={{ color: TColor }} className="text-center font-family fw-normal fs-5 mb-4">{Phone}</p>
                                    <p style={{ color: HColor }} className="text-center font-family fw-bold fs-3 m-0">Email Address</p>
                                    <p style={{ color: TColor }} className="text-center font-family fw-normal fs-5 mb-4">{Email}</p>
                                    <p style={{ color: HColor }} className="text-center font-family fw-bold fs-3 m-0">Office Address</p>
                                    <p style={{ color: TColor }} className="text-center font-family fw-normal fs-5 m-0">{Address}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 p-0 my-5">
                            <iframe className="contact-map" src={MAddress} title="Location map" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                        <div style={styles.queryDiv} className="col-sm-12 p-sm-5 p-3 mb-5">
                            <p style={styles.queryHeading} className="d-sm-block d-none query-heading font-family text-center fw-bolder">ASK YOUR QUERY</p>
                            <p style={styles.queryHeading} className="d-sm-none d-block fs-3 font-family text-center fw-bolder">ASK YOUR QUERY</p>
                            <div className="col-sm-12">
                                <form method="post" onSubmit={(e) => { handleform(e) }}>
                                    <div className="col-sm-12 d-sm-flex d-block">
                                        <div className="col-sm-6 col-12 p-2">
                                            <label style={styles.queryLabel} className="d-sm-block d-none font-family query-label">First Name</label>
                                            <label style={styles.queryLabel} className="d-sm-none d-block font-family fs-4">First Name</label>
                                            <input style={styles.queryInput} onChange={(e) => { setUFName(e.target.value) }} value={UFName} type="text" className="form-control form-control shadow-none font-family mt-2 rounded-0" required />
                                        </div>
                                        <div className="col-sm-6 col-12 p-2">
                                            <label style={styles.queryLabel} className="d-sm-block d-none font-family query-label">Last Name</label>
                                            <label style={styles.queryLabel} className="d-sm-none d-block font-family fs-4">Last Name</label>
                                            <input style={styles.queryInput} onChange={(e) => { setULName(e.target.value) }} value={ULName} type="text" className="form-control form-control shadow-none font-family mt-2 rounded-0" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 d-sm-flex d-block">
                                        <div className="col-sm-6 p-2">
                                            <label style={styles.queryLabel} className="d-sm-block d-none font-family query-label">Email</label>
                                            <label style={styles.queryLabel} className="d-sm-none d-block font-family fs-4">Email</label>
                                            <input style={styles.queryInput} onChange={(e) => { setUEmail(e.target.value) }} value={UEmail} type="email" className="form-control form-control shadow-none font-family mt-2 rounded-0" required />
                                        </div>
                                        <div className="col-sm-6 p-2">
                                            <label style={styles.queryLabel} className="d-sm-block d-none font-family query-label">Phone</label>
                                            <label style={styles.queryLabel} className="d-sm-none d-block font-family fs-4">Phone</label>
                                            <input style={styles.queryInput} onChange={(e) => { setUPhone(e.target.value) }} value={UPhone} type="number" className="form-control form-control shadow-none font-family mt-2 rounded-0" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 p-2">
                                        <label style={styles.queryLabel} className="d-sm-block d-none font-family query-label">Query</label>
                                        <label style={styles.queryLabel} className="d-sm-none d-block font-family fs-4">Query</label>
                                        <textarea rows={3} style={styles.queryInput} onChange={(e) => { setUQuery(e.target.value) }} value={UQuery} className="form-control form-control shadow-none font-family mt-2 rounded-0" required ></textarea>
                                    </div>
                                    <div className="col-sm-12 p-2">
                                        <button style={contactBtn ? styles.contactBtn : styles.contactBtnHover} onMouseLeave={() => { setContactBtn(true) }} onMouseEnter={() => { setContactBtn(false) }} className="d-sm-block d-none mt-3 query-btn fw-normal form-control font-family rounded-0">SUBMIT</button>
                                        <button style={contactBtn ? styles.contactBtn : styles.contactBtnHover} onMouseLeave={() => { setContactBtn(true) }} onMouseEnter={() => { setContactBtn(false) }} className="d-sm-none d-block mt-3 query-btn fs-5 form-control font-family rounded-0">SUBMIT</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Contact;