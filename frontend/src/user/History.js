import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../common/Footer";
import Header from "../common/Header";

const styles = {
    historyHeading: {
        color: "black"
    },
    historyText: {
        color: "black"
    }
}

function History() {

    const [HText, setHText] = useState("");

    useEffect(() => {
        fetchFn();
    }, [])

    function fetchFn() {
        fetch("/user/fetchHistory").then((result) => {
            return result.json();
        }).then((data) => {
            if (data.status === 200) {
                setHText(data.data.HText);
            } else {
                toast(data.message, { type: "error" });
            }
        })
    }

    return (
        <>
            <ToastContainer />
            <Header />
            <section id="history-page">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 my-sm-5 my-4">
                            <p style={styles.historyHeading} className="text-center d-sm-block d-none font-family fw-bolder history-head m-0">OUR HISTORY</p>
                            <p style={styles.historyHeading} className="text-center d-sm-none d-block font-family fw-bolder fs-3 m-0">OUR HISTORY</p>
                            <p style={styles.historyText} className="text-center d-sm-block d-none font-family fw-normal history-text m-0">{HText}</p>
                            <p style={styles.historyText} className="text-center d-sm-none d-block font-family fw-normal fs-5 m-0">{HText}</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default History;