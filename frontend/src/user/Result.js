import Header from "../common/Header";
import Footer from "../common/Footer";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const styles = {
    resultHeading: {
        color: "black"
    },
    resultText: {
        color: "black"
    }
}

function Result() {

    const [BColor, setBColor] = useState("")

    const [SData, setSData] = useState([])

    useEffect(() => {
        fetchFn();
    }, [])

    function fetchFn() {
        fetch("/user/fetchResult").then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                setBColor(data.data.BColor)
            } else {
                toast(data.message, { type: "error" })
            }
        })
        fetch("/user/fetchStudents").then((result) => {
            return result.json();
        }).then((data) => {
            if (data.status === 200) {
                setSData(data.data);
            } else {
                toast(data.message, { type: "error" });
            }
        })
    }

    return (
        <>
            <ToastContainer />
            <Header />
            <section id="result-page">
                <div className="container">
                    <div className="row">
                        <div style={styles.resultHeading} className="col-sm-12 d-sm-block d-none text-center mt-5 font-family fw-bolder result-heading">OUR STUDENTS RESULT</div>
                        <div style={styles.resultHeading} className="col-sm-12 d-sm-none d-block text-center mt-4 font-family fw-bolder fs-4">OUR STUDENTS RESULT</div>
                    </div>
                </div>
                <div style={{ backgroundColor: BColor }} className="container my-sm-5 my-4 px-3">
                    <div className="row">
                        {SData.map((data, key) => (
                            <div key={data._id} className="col-sm-3 p-3 my-2">
                                <img src={data.SImage} alt="class-img-not-found" />
                                <p style={styles.resultText} className="text-center d-sm-block d-none fw-bold my-2 font-family result-name">{data.SName}</p>
                                <p style={styles.resultText} className="text-center d-sm-block d-none fw-normal m-0 font-family result-class">{data.SPercentage}</p>
                                <p style={styles.resultText} className="text-center d-sm-block d-none fw-normal m-0 font-family result-text">{data.SClass}</p>
                                <p style={styles.resultText} className="text-center d-sm-none d-block fw-bold my-2 font-family fs-4">{data.SName}</p>
                                <p style={styles.resultText} className="text-center d-sm-none d-block fw-normal m-0 font-family fs-5">{data.SPercentage}</p>
                                <p style={styles.resultText} className="text-center d-sm-none d-block fw-normal m-0 font-family fs-5">{data.SClass}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Result;