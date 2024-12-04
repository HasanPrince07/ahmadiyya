import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { context } from "../common/Context";

const styles = {
    loginDiv: {
        backgroundColor: "#edf3fc"
    },
    loginHeading: {
        color: "black"
    },
    loginLabel: {
        color: "black"
    },
    loginInput: {
        color: "black"
    },
    loginBtn: {
        color: "#1d1d36",
        backgroundColor: "white"
    },
    loginBtnHover: {
        color: "white",
        backgroundColor: "#1d1d36"
    }
}

function Forgetpage() {

    const [loginBtn, setLoginBtn] = useState(true)

    const [email, setEmail] = useState("")

    const { setGEmail } = useContext(context)

    function handleform(e) {
        e.preventDefault()
        const formdata = { email }
        fetch("/admin/sendEmail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata)
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                window.localStorage.setItem("g_email", JSON.stringify(data.email))
                setGEmail(data.email)
                toast("We have sent a link on your email", { type: "success" })
            } else {
                toast(data.message, { type: "error" })
            }
        })
    }

    return (
        <>
            <ToastContainer position="top-center" />
            <section className="d-flex justify-content-center align-items-center" id="login">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-2"></div>
                        <div style={styles.loginDiv} className="col-sm-8 p-sm-5 p-3">
                            <p style={styles.loginHeading} className="text-center d-sm-block d-none font-family fw-bolder login-heading m-0">FORGOT PASSWORD</p>
                            <p style={styles.loginHeading} className="text-center d-sm-none d-block font-family fw-bolder fs-3 m-0">FORGOT PASSWORD</p>
                            <form method="post" onSubmit={(e) => { handleform(e) }}>
                                <label style={styles.loginLabel} className="d-sm-block d-none form-label font-family login-label fw-normal pt-2">ENTER YOUR EMAIL</label>
                                <label style={styles.loginLabel} className="d-sm-none d-block form-label font-family fs-4 fw-normal pt-2">ENTER YOUR EMAIL</label>
                                <input style={styles.loginInput} onChange={(e) => { setEmail(e.target.value) }} type="email" className="form-control font-family shadow-none rounded-0" required />
                                <button style={loginBtn ? styles.loginBtn : styles.loginBtnHover} onMouseLeave={() => { setLoginBtn(true) }} onMouseEnter={() => { setLoginBtn(false) }} className="d-sm-block d-none mt-4 login-btn fw-normal form-control font-family shadow-none rounded-0">SEND</button>
                                <button style={loginBtn ? styles.loginBtn : styles.loginBtnHover} onMouseLeave={() => { setLoginBtn(true) }} onMouseEnter={() => { setLoginBtn(false) }} className="d-sm-none d-block mt-4 login-btn fs-5 form-control font-family shadow-none rounded-0">SEND</button>
                            </form>
                            <NavLink to="/login" className="text-center d-block pt-2">Back to login page</NavLink>
                        </div>
                        <div className="col-sm-2"></div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Forgetpage;