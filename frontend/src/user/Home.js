import Header from "../common/Header";
import Footer from "../common/Footer";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const styles = {
    reviewHead: {
        color: "black"
    },
    reviewDiv: {
        backgroundColor: "white"
    },
    reviewText: {
        color: "black"
    },
    reviewBtn: {
        backgroundColor: "white",
        color: "#1d1d36",
        border: "2px solid #1d1d36"
    },
    reviewBtnHover: {
        color: "white",
        backgroundColor: "#1d1d36",
        border: "2px solid #1d1d36"
    },

    eventHeadText: {
        color: "black"
    },
    eventImgDiv: {
        backgroundImage: `url("media/mainImg.jpg")`,
    },
    eventBtn: {
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        color: "black"
    },
    eventBtnHover: {
        backgroundColor: "rgba(29, 29, 54, 0.5)",
        color: "white"
    }
}

function Home() {

    const [mainBtn, setMainBtn] = useState(true);
    const [reviewBtn, setReviewBtn] = useState(null);
    const [eventBtn, setEventBtn] = useState(null);
    const [eventFooterBtn, setEventFooterBtn] = useState(true);

    const [mainImage, setMainImage] = useState("");
    const [mainSectionBColor, setMainSectionBColor] = useState("");
    const [mainHeading, setMainHeading] = useState("");
    const [mainSubHeading, setMainSubHeading] = useState("");
    const [mainButton, setMainButton] = useState("");
    const [mainHeadingColor, setMainHeadingColor] = useState("");
    const [mainButtonColor, setMainButtonColor] = useState("");
    const [mainButtonBColor, setMainButtonBColor] = useState("");
    const [mainButtonHColor, setMainButtonHColor] = useState("");
    const [mainButtonHBColor, setMainButtonHBColor] = useState("");

    const [imageOne, setIOne] = useState("");
    const [imageTwo, setITwo] = useState("");
    const [imageThree, setIThree] = useState("");
    const [imageFour, setIFour] = useState("");

    const [reviewBColor, setRBColor] = useState("");
    const [reviewHColor, setRHColor] = useState("");
    const [reviewHBColor, setRHBColor] = useState("");
    const [reviewBtnColor, setRBtnColor] = useState("");
    const [reviewBtnBColor, setRBtnBColor] = useState("");
    const [reviewBtnHColor, setRBtnHColor] = useState("");
    const [reviewBtnHBColor, setRBtnHBColor] = useState("");

    const [reviewData, setRData] = useState([]);

    const [eventBColor, setEBColor] = useState("");
    const [eventSHeadingColor, setESubHeadingColor] = useState("");
    const [eventBtnColor, setEBtnColor] = useState("");
    const [eventBtnBColor, setEBtnBColor] = useState("");
    const [eventBtnHColor, setEBtnHColor] = useState("");
    const [eventBtnHBColor, setEBtnHBColor] = useState("");

    const [eventData, setEData] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        fetchFn();
    }, [])

    function moreFn(id) {
        navigate("/event")
        window.localStorage.setItem("event_id", id)
    }

    function fetchFn() {
        fetch("/user/fetchMain").then((result) => {
            return result.json();
        }).then((data) => {
            if (data.status === 200) {
                setMainImage(data.data.image);
                setMainSectionBColor(data.data.sectionBColor);
                setMainHeading(data.data.heading);
                setMainSubHeading(data.data.subHeading);
                setMainButton(data.data.button);
                setMainHeadingColor(data.data.headingColor);
                setMainButtonColor(data.data.buttonColor);
                setMainButtonBColor(data.data.buttonBColor);
                setMainButtonHColor(data.data.buttonHColor);
                setMainButtonHBColor(data.data.buttonHBColor);
            } else {
                toast(data.message, { type: "error" });
            }
        })
        fetch("/user/fetchImage").then((result) => {
            return result.json();
        }).then((data) => {
            if (data.status === 200) {
                setIOne(data.data.imageOne);
                setITwo(data.data.imageTwo);
                setIThree(data.data.imageThree);
                setIFour(data.data.imageFour);
            } else {
                toast(data.message, { type: "error" });
            }
        })
        fetch("/user/fetchReview").then((result) => {
            return result.json();
        }).then((data) => {
            if (data.status === 200) {
                setRBColor(data.data.BColor);
                setRHColor(data.data.headingColor);
                setRHBColor(data.data.headingBColor);
                setRBtnColor(data.data.buttonColor);
                setRBtnBColor(data.data.buttonBColor);
                setRBtnHColor(data.data.buttonHColor);
                setRBtnHBColor(data.data.buttonHBColor);
            } else {
                toast(data.message, { type: "error" });
            }
        })
        fetch("/user/fetchTwoReview").then((result) => {
            return result.json();
        }).then((data) => {
            if (data.status === 200) {
                setRData(data.data);
            } else {
                toast(data.message, { type: "error" });
            }
        })
        fetch("/user/fetchEvent").then((result) => {
            return result.json();
        }).then((data) => {
            if (data.status === 200) {
                setEBColor(data.data.BColor);
                setESubHeadingColor(data.data.sHeadingColor);
                setEBtnColor(data.data.buttonColor);
                setEBtnBColor(data.data.buttonBColor);
                setEBtnHColor(data.data.buttonHColor);
                setEBtnHBColor(data.data.buttonHBColor);
            } else {
                toast(data.message, { type: "error" });
            }
        })
        fetch("/user/fetchThreeEvents").then((result) => {
            return result.json();
        }).then((data) => {
            if (data.status === 200) {
                setEData(data.data);
            } else {
                toast(data.message, { type: "error" });
            }
        })
    }

    return (
        <>
            <ToastContainer />
            <Header />
            <section id="main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12 p-0">
                            <img className="img-responsive" src={mainImage} alt="Not found" />
                        </div>
                    </div>
                </div>
                <div className="main-div col-sm-6 d-sm-flex d-none align-items-center ms-5">
                    <div style={{ backgroundColor: mainSectionBColor }} className="p-5 col-sm-12">
                        <p style={{ color: mainHeadingColor }} className="font-family fw-bolder main-text1 m-0">{mainHeading}</p>
                        <p style={{ color: mainHeadingColor }} className="font-family fw-bold main-text2 my-2">{mainSubHeading}</p>
                        <NavLink to="/about"><button style={mainBtn ? { color: mainButtonColor, backgroundColor: mainButtonBColor } : { color: mainButtonHColor, backgroundColor: mainButtonHBColor }} onMouseLeave={() => { setMainBtn(true) }} onMouseEnter={() => { setMainBtn(false) }} className="font-family fw-normal btn main-text3 my-2 px-5 shadow-none">{mainButton}</button></NavLink>
                    </div>
                </div>
                <div className="main-div col-12 d-sm-none d-flex align-items-center justify-content-center p-0">
                    <div style={{ backgroundColor: mainSectionBColor }} className="p-3 col-10">
                        <p style={{ color: mainHeadingColor }} className="font-family fw-bolder fs-1 m-0">{mainHeading}</p>
                        <p style={{ color: mainHeadingColor }} className="font-family fw-bold fs-5 my-2">{mainSubHeading}</p>
                        <NavLink to="/about"><button style={mainBtn ? { color: mainButtonColor, backgroundColor: mainButtonBColor } : { color: mainButtonHColor, backgroundColor: mainButtonHBColor }} onMouseLeave={() => { setMainBtn(true) }} onMouseEnter={() => { setMainBtn(false) }} className="font-family fw-normal btn fs-5 col-8 mt-1 shadow-none">{mainButton}</button></NavLink>
                    </div>
                </div>
            </section>

            <section id="images" className="my-5">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 p-1">
                            <img className="images-div1 img-responsive" src={imageOne} alt="Not found" />
                        </div>
                        <div className="col-sm-6 px-sm-3 px-1">
                            <div className="col-sm-12 d-flex">
                                <div className="col-sm-6 p-1">
                                    <img className="images-div2 img-responsive" src={imageTwo} alt="Not found" />
                                </div>
                                <div className="col-sm-6 p-1">
                                    <img className="images-div3 img-responsive" src={imageThree} alt="Not found" />
                                </div>
                            </div>
                            <div className="col-sm-12 p-1">
                                <img className="images-div4 img-responsive" src={imageFour} alt="Not found" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section style={{ backgroundColor: reviewBColor }} id="review" className="mt-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <p style={styles.reviewHead} className="d-sm-block d-none text-center font-family fw-bolder my-5 review-head">SEE WHAT OUR STUDENT SAY</p>
                            <p style={styles.reviewHead} className="d-sm-none d-block text-center font-family fw-bolder my-3 fs-3">SEE WHAT OUR STUDENT SAY</p>
                        </div>
                        <div className="col-sm-2"></div>
                        {reviewData.map((data) => (
                            <div key={data._id} className="col-sm-4 p-2">
                                <div style={{ color: reviewHColor, backgroundColor: reviewHBColor }}>
                                    <p className="text-center d-sm-block d-none font-family fw-bolder review-heading m-0 px-2 py-1">{data.name}</p>
                                    <p className="text-center d-sm-none d-block font-family fw-bolder fs-3 m-0 px-2 py-1">{data.name}</p>
                                </div>
                                <div style={styles.reviewDiv} className="d-sm-block d-none review-div">
                                    <p style={styles.reviewText} className="text-center font-family fw-normal review-text m-0 p-3">{data.review}</p>
                                </div>
                                <div style={styles.reviewDiv} className="d-sm-none d-block">
                                    <p style={styles.reviewText} className="text-center font-family fw-normal fs-5 m-0 p-3">{data.review}</p>
                                </div>
                            </div>
                        ))}
                        <div className="col-sm-2"></div>
                        <div className="col-sm-12 d-sm-flex d-block justify-content-center py-sm-5 py-4">
                            <div className="col-sm-3 col-12">
                                <NavLink to="/addreview"><button style={reviewBtn === 1 ? { color: reviewBtnHColor, backgroundColor: reviewBtnHBColor, border: `2px solid ${reviewBtnHBColor}` } : { color: reviewBtnColor, backgroundColor: reviewBtnBColor, border: `2px solid ${reviewBtnColor}` }} onMouseLeave={() => { setReviewBtn(null) }} onMouseEnter={() => { setReviewBtn(1) }} className="btn d-sm-inline-block d-none font-family fw-normal text-center form-control rounded-0 review-btn shadow-none">ADD REVIEWS</button></NavLink>
                                <NavLink to="/addreview"> <button style={reviewBtn === 1 ? { color: reviewBtnHColor, backgroundColor: reviewBtnHBColor, border: `2px solid ${reviewBtnHBColor}` } : { color: reviewBtnColor, backgroundColor: reviewBtnBColor, border: `2px solid ${reviewBtnColor}` }} onMouseLeave={() => { setReviewBtn(null) }} onMouseEnter={() => { setReviewBtn(1) }} className="btn d-sm-none d-inline-block font-family fw-normal text-center form-control rounded-0 review-btn fs-5 my-1 shadow-none">ADD REVIEWS</button></NavLink>
                            </div>
                            <div className="col-sm-3 col-12">
                                <NavLink to="/review"><button style={reviewBtn === 2 ? { color: reviewBtnHColor, backgroundColor: reviewBtnHBColor, border: `2px solid ${reviewBtnHBColor}` } : { color: reviewBtnColor, backgroundColor: reviewBtnBColor, border: `2px solid ${reviewBtnColor}` }} onMouseLeave={() => { setReviewBtn(null) }} onMouseEnter={() => { setReviewBtn(2) }} className="btn d-sm-inline-block d-none font-family fw-normal text-center form-control rounded-0 review-btn shadow-none">SEE ALL REVIEWS</button></NavLink>
                                <NavLink to="/review"><button style={reviewBtn === 2 ? { color: reviewBtnHColor, backgroundColor: reviewBtnHBColor, border: `2px solid ${reviewBtnHBColor}` } : { color: reviewBtnColor, backgroundColor: reviewBtnBColor, border: `2px solid ${reviewBtnColor}` }} onMouseLeave={() => { setReviewBtn(null) }} onMouseEnter={() => { setReviewBtn(2) }} className="btn d-sm-none d-inline-block font-family fw-normal text-center form-control rounded-0 review-btn fs-5 my-1 shadow-none">SEE ALL REVIEWS</button></NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="event">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12 d-flex justify-content-center align-items-center py-sm-5 py-3 my-sm-5 my-3">
                            <p style={styles.eventHeadText} className="d-sm-block d-none event-head-text font-family fw-bolder">SEE OUR EVENTS</p>
                            <p style={styles.eventHeadText} className="m-0 d-sm-none d-block fs-3 font-family fw-bolder">SEE OUR EVENTS</p>
                        </div>
                        <div style={{ backgroundColor: eventBColor }} className="col-sm-12 d-sm-flex d-block justify-content-center mt-sm-5 mt-0">
                            {eventData.map((data, key) => (
                                <div key={data._id} className="col-sm-3 col-12 p-2">
                                    <div className="d-sm-block d-none event-div">
                                        <div className="event-img-div p-2 rounded-1 d-flex align-items-end" style={{ backgroundImage: `url(${data.eImage})` }}>
                                            <div className="col-sm-12">
                                                <p style={{ color: eventSHeadingColor }} className="event-text my-2 font-family fw-bolder">{data.eName}</p>
                                                <button style={eventBtn === key + 1 ? styles.eventBtnHover : styles.eventBtn} onClick={() => { moreFn(data._id) }} onMouseLeave={() => { setEventBtn(null) }} onMouseEnter={() => { setEventBtn(key + 1) }} className="btn form-control font-family fw-normal event-btn shadow-none border-0">KNOW MORE</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-sm-none d-block event-img-div-mob p-2 rounded-1 d-flex justify-content-center align-items-end" style={{ backgroundImage: `url(${data.eImage})` }}>
                                        <div className="col-12">
                                            <p style={{ color: eventSHeadingColor }} className="fs-3 my-2 font-family fw-bolder text-center">{data.eName}</p>
                                            <button style={eventBtn === key + 1 ? styles.eventBtnHover : styles.eventBtn} onClick={() => { moreFn(data._id) }} onMouseLeave={() => { setEventBtn(null) }} onMouseEnter={() => { setEventBtn(key + 1) }} className="btn form-control font-family fw-normal event-btn fs-5 shadow-none border-0">KNOW MORE</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ backgroundColor: eventBColor }} className="col-sm-12 py-sm-5 py-4 d-flex justify-content-center event-footer-div">
                            <div className="col-sm-4 col-12">
                                <NavLink className="text-decoration-none" to="/event"><button style={eventFooterBtn ? { color: eventBtnColor, backgroundColor: eventBtnBColor, border: `2px solid ${eventBtnBColor}` } : { color: eventBtnHColor, backgroundColor: eventBtnHBColor, border: `2px solid ${eventBtnBColor}` }} onMouseLeave={() => { setEventFooterBtn(true) }} onMouseEnter={() => { setEventFooterBtn(false) }} className="btn d-sm-block d-none form-control font-family fw-normal event-footer-btn rounded-0 shadow-none">SEE ALL EVENTS</button></NavLink>
                                <NavLink className="text-decoration-none" to="/event"><button style={eventFooterBtn ? { color: eventBtnColor, backgroundColor: eventBtnBColor, border: `2px solid ${eventBtnBColor}` } : { color: eventBtnHColor, backgroundColor: eventBtnHBColor, border: `2px solid ${eventBtnBColor}` }} onMouseLeave={() => { setEventFooterBtn(true) }} onMouseEnter={() => { setEventFooterBtn(false) }} className="btn d-sm-none d-block form-control font-family fw-normal event-footer-btn fs-5 rounded-0 shadow-none">SEE ALL EVENTS</button></NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Home;