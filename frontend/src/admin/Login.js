import { useContext, useEffect, useState } from "react";
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
    loginBtn: {
        color: "#1d1d36",
        backgroundColor: "white"
    },
    loginBtnHover: {
        color: "white",
        backgroundColor: "#1d1d36"
    }
}

function Login() {

    const [loginBtn, setLoginBtn] = useState(true)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate(null)

    const { gMessage, setGAdmin } = useContext(context)

    useEffect(() => {
        toast(gMessage, { type: "error" })
    }, [])

    function handleform(e) {
        e.preventDefault()
        const formdata = { username, password }
        fetch("/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata)
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                window.localStorage.setItem("token", JSON.stringify(data.token))
                window.localStorage.setItem("admin_name", JSON.stringify(data.username))
                setGAdmin(data.username)
                navigate("/dashboard")
            } else if (data.status === 401) {
                toast("Wrong Credentials", { type: "error" })
            } else {
                toast("Server error. Login again", { type: "error" })
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
                            <p style={styles.loginHeading} className="text-center d-sm-block d-none font-family fw-bolder login-heading m-0">ADMIN LOGIN</p>
                            <p style={styles.loginHeading} className="text-center d-sm-none d-block font-family fw-bolder fs-3 m-0">ADMIN LOGIN</p>
                            <form method="post" onSubmit={(e) => { handleform(e) }}>
                                <label style={styles.loginLabel} className="d-sm-block d-none form-label font-family login-label fw-normal pt-2">USERNAME</label>
                                <label style={styles.loginLabel} className="d-sm-none d-block form-label font-family fs-4 fw-normal pt-2">USERNAME</label>
                                <input style={styles.loginInput} onChange={(e) => { setUsername(e.target.value) }} type="text" className="form-control font-family shadow-none rounded-0" required />
                                <label style={styles.loginLabel} className="d-sm-block d-none form-label font-family login-label fw-normal pt-2">PASSWORD</label>
                                <label style={styles.loginLabel} className="d-sm-none d-block form-label font-family fs-4 fw-normal pt-2">PASSWORD</label>
                                <input style={styles.loginInput} onChange={(e) => { setPassword(e.target.value) }} type="password" className="form-control font-family shadow-none rounded-0" required />
                                <button style={loginBtn ? styles.loginBtn : styles.loginBtnHover} onMouseLeave={() => { setLoginBtn(true) }} onMouseEnter={() => { setLoginBtn(false) }} className="d-sm-block d-none mt-4 login-btn fw-normal form-control font-family shadow-none rounded-0">LOGIN</button>
                                <button style={loginBtn ? styles.loginBtn : styles.loginBtnHover} onMouseLeave={() => { setLoginBtn(true) }} onMouseEnter={() => { setLoginBtn(false) }} className="d-sm-none d-block mt-4 login-btn fs-5 form-control font-family shadow-none rounded-0">LOGIN</button>
                            </form>
                        </div>
                        <div className="col-sm-2"></div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;