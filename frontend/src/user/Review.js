import Header from "../common/Header";
import Footer from "../common/Footer";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const styles = {
    reviewHeading: {
        color: "black"
    },
    reviewName: {
        color: "black"
    },
    reviewText: {
        color: "black"
    }
}

function Review() {

    const [reviewBColor, setRBColor] = useState("");

    const [reviewData, setRData] = useState([]);

    useEffect(() => {
        fetchFn();
    }, [])

    function fetchFn() {
        fetch("/user/fetchReview").then((result) => {
            return result.json();
        }).then((data) => {
            if (data.status === 200) {
                setRBColor(data.data.BColor);
            } else {
                toast(data.message, { type: "error" });
            }
        })
        fetch("/user/fetchAllReview").then((result) => {
            return result.json();
        }).then((data) => {
            if (data.status === 200) {
                setRData(data.data);
            } else {
                toast(data.message, { type: "error" });
            }
        })
    }

    return (
        <>
            <ToastContainer position="top-center" />
            <Header />
            <section id="review-page">
                <div className="container">
                    <div className="row">
                        <div style={styles.reviewHeading} className="col-sm-12 d-sm-block d-none text-center mt-5 font-family fw-bolder review-heading">WHAT OUR STUDENTS SAY</div>
                        <div style={styles.reviewHeading} className="col-sm-12 d-sm-none d-block text-center mt-4 font-family fw-bolder fs-4">WHAT OUR STUDENTS SAY</div>
                    </div>
                </div>
                <div className="container my-sm-5 my-4">
                    <div className="row">
                        {reviewData.map((data) => (
                            <div key={data._id} className="col-sm-4 p-2">
                                <div style={{ backgroundColor: reviewBColor }} className="p-4">
                                    <p style={styles.reviewName} className="text-center d-sm-block d-none fw-bold font-family student-name">{data.name}</p>
                                    <p style={styles.reviewText} className="text-center d-sm-block d-none fw-normal m-0 font-family student-text">{data.review}</p>
                                    <p style={styles.reviewName} className="text-center d-sm-none d-block fw-bold font-family fs-4">{data.name}</p>
                                    <p style={styles.reviewNreviewTextame} className="text-center d-sm-none d-block fw-normal m-0 font-family fs-5">{data.review}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Review;