import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const styles = {
    headerDiv: {
        backgroundColor: "#1d1d36",
    },
    headerBtn: {
        backgroundColor: "white",
        color: "#1d1d36"
    },
    reviewHeading: {
        color: "black",
    },
    reviewLabel: {
        color: "black",
    },
    reviewInput: {
        color: "black",
    }
}

function Addreview() {

    const nameInput = useRef(null)
    const reviewInput = useRef(null)

    const [reviewBtn, setReviewBtn] = useState(true);

    const [name, setName] = useState("");
    const [review, setReview] = useState("");

    const [reviewBColor, setRBColor] = useState("");
    const [aReviewBtnColor, setARBtnColor] = useState("");
    const [aReviewBtnBColor, setARBtnBColor] = useState("");
    const [aReviewBtnHColor, setARBtnHColor] = useState("");
    const [aReviewBtnHBColor, setARBtnHBColor] = useState("");

    function nameFn(e) {
        setName(e.target.value);
        if (nameInput.current.value.length === 30) {
            toast("You have reached the maximum word limit of 30 words.", { type: "error" });
        }
    }
    function reviewFn(e) {
        setReview(e.target.value);
        if (reviewInput.current.value.length === 200) {
            toast("You have reached the maximum word limit of 200 words.", { type: "error" });
        }
    }

    useEffect(() => {
        fetchFn();
    }, [])

    function fetchFn() {
        fetch("/user/fetchReview").then((result) => {
            return result.json();
        }).then((data) => {
            if (data.status === 200) {
                setRBColor(data.data.BColor);
                setARBtnColor(data.data.aButtonColor);
                setARBtnBColor(data.data.aButtonBColor);
                setARBtnHColor(data.data.aButtonHColor);
                setARBtnHBColor(data.data.aButtonHBColor);
            } else {
                toast(data.message, { type: "error" });
            }
        })
    }

    function handleform(e) {
        e.preventDefault()
        const formdata = { name, review }
        fetch("/user/addReview", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata)
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 201) {
                toast("Thank you for your review!", { type: "success" })
            } else {
                toast(data.message, { type: "error" })
            }
        })
    }

    return (
        <>
            <ToastContainer position="top-center" />
            <section id="addreview-page">
                <div className="container-fluid">
                    <div className="row">
                        <div style={styles.headerDiv} className="col-sm-12 p-2">
                            <NavLink className="text-decoration-none" to="/"><button style={styles.headerBtn} className="btn font-family d-sm-block d-none review-header-btn rounded-0 px-5">Back To Home</button></NavLink>
                            <NavLink className="text-decoration-none" to="/"><button style={styles.headerBtn} className="btn text-decoration-none font-family d-sm-none d-block review-header-btn fs-5 rounded-0 px-5">Back To Home</button></NavLink>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12 py-sm-5 py-4">
                            <p style={styles.reviewHeading} className="text-center m-0 d-sm-block d-none font-family fw-bolder review-heading">ADD YOUR REVIEW</p>
                            <p style={styles.reviewHeading} className="text-center m-0 d-sm-none d-block font-family fw-bolder fs-4">ADD YOUR REVIEW</p>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-2"></div>
                        <div style={{ backgroundColor: reviewBColor }} className="col-sm-8 p-4">
                            <form method="post" onSubmit={(e) => { handleform(e) }}>
                                <label style={styles.reviewLabel} className="d-sm-block d-none font-family form-label review-label">Enter Your Name</label>
                                <label style={styles.reviewLabel} className="d-sm-none d-block font-family form-label fs-4">Enter Your Name</label>
                                <input ref={nameInput} maxLength={30} style={styles.reviewInput} value={name} onChange={(e) => { nameFn(e) }} type="text" className="form-control form-control shadow-none font-family rounded-0" required />
                                <label style={styles.reviewLabel} className="d-sm-block d-none font-family form-label mt-3 review-label">Enter Your Review</label>
                                <label style={styles.reviewLabel} className="d-sm-none d-block font-family form-label mt-3 fs-4">Enter Your Review</label>
                                <textarea ref={reviewInput} maxLength={200} style={styles.reviewInput} value={review} onChange={(e) => { reviewFn(e) }} className="form-control shadow-none font-family rounded-0" rows={5} required></textarea>
                                <button style={reviewBtn ? { color: aReviewBtnColor, backgroundColor: aReviewBtnBColor } : { color: aReviewBtnHColor, backgroundColor: aReviewBtnHBColor, border: `2px solid ${aReviewBtnBColor}` }} onMouseLeave={() => { setReviewBtn(true) }} onMouseEnter={() => { setReviewBtn(false) }} className="d-sm-block d-none fw-normal mt-3 review-btn form-control font-family rounded-0">SUBMIT</button>
                                <button style={reviewBtn ? { color: aReviewBtnColor, backgroundColor: aReviewBtnBColor } : { color: aReviewBtnHColor, backgroundColor: aReviewBtnHBColor, border: `2px solid ${aReviewBtnBColor}` }} onMouseLeave={() => { setReviewBtn(true) }} onMouseEnter={() => { setReviewBtn(false) }} className="d-sm-none d-block fw-normal mt-3 review-btn fs-5 form-control font-family rounded-0">SUBMIT</button>
                            </form>
                        </div>
                        <div className="col-sm-2"></div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Addreview;