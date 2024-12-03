import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    showBtn: {
        backgroundColor: "#1d1d36",
        border: "1px solid #1d1d36",
        color: "white",
        cursor: "pointer"
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

function Resetpage() {

    const [loginBtn, setLoginBtn] = useState(true)

    const [password, setPassword] = useState("")
    const [repassword, setRepassword] = useState("")

    const navigate = useNavigate(null)

    const { setGReset, setGEmail } = useContext(context)

    function handleform(e) {
        e.preventDefault()
        const formdata = { password, repassword }
        fetch("/admin/resetPassword", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata)
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                window.localStorage.removeItem("g_email")
                setGEmail(window.localStorage.getItem("g_email"))
                setGReset("Password reset succesfully!")
                navigate("/login")
            } else if (data.status === 400) {
                toast("Passwords do not match.", { type: "error" })
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
                            <p style={styles.loginHeading} className="text-center d-sm-block d-none font-family fw-bolder login-heading m-0">RESET PAGE</p>
                            <p style={styles.loginHeading} className="text-center d-sm-none d-block font-family fw-bolder fs-3 m-0">RESET PAGE</p>
                            <form method="post" onSubmit={(e) => { handleform(e) }}>
                                <label style={styles.loginLabel} className="d-sm-block d-none form-label font-family login-label fw-normal pt-2">ENTER YOUR PASSWORD</label>
                                <label style={styles.loginLabel} className="d-sm-none d-block form-label font-family fs-4 fw-normal pt-2">ENTER YOUR PASSWORD</label>
                                <input style={styles.loginInput} onChange={(e) => { setPassword(e.target.value) }} type="text" className="form-control font-family shadow-none rounded-0" required />
                                <label style={styles.loginLabel} className="d-sm-block d-none form-label font-family login-label fw-normal pt-2">RE ENTER YOUR PASSWORD</label>
                                <label style={styles.loginLabel} className="d-sm-none d-block form-label font-family fs-4 fw-normal pt-2">RE ENTER YOUR PASSWORD</label>
                                <input style={styles.loginInput} onChange={(e) => { setRepassword(e.target.value) }} type="text" className="form-control font-family shadow-none rounded-0" required />
                                <button style={loginBtn ? styles.loginBtn : styles.loginBtnHover} onMouseLeave={() => { setLoginBtn(true) }} onMouseEnter={() => { setLoginBtn(false) }} className="d-sm-block d-none mt-4 login-btn fw-normal form-control font-family shadow-none rounded-0">RESET</button>
                                <button style={loginBtn ? styles.loginBtn : styles.loginBtnHover} onMouseLeave={() => { setLoginBtn(true) }} onMouseEnter={() => { setLoginBtn(false) }} className="d-sm-none d-block mt-4 login-btn fs-5 form-control font-family shadow-none rounded-0">RESET</button>
                            </form>
                        </div>
                        <div className="col-sm-2"></div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Resetpage;