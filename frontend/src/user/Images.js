import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../common/Footer";
import Header from "../common/Header";

const styles = {
    Heading: {
        color: "black"
    },
    modelDiv1: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
}

function Images() {

    const [Adata, setAData] = useState([]);
    const [AImage, setAImage] = useState("");

    const [model, setModel] = useState(false);

    useEffect(() => {
        fetchFn();
    }, [])

    function modelFn(img) {
        setModel(true);
        setAImage(img);
    }

    function fetchFn() {
        fetch("/user/fetchAImage").then((result) => {
            return result.json();
        }).then((data) => {
            if (data.status === 200) {
                setAData(data.data);
            } else {
                toast(data.message, { type: "error" });
            }
        })
    }

    return (
        <>
            <ToastContainer />
            <Header />
            <section id="image-page">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 my-sm-5 my-4">
                            <p style={styles.Heading} className="text-center d-sm-block d-none font-family fw-bolder heading m-0">ALL IMAGES</p>
                            <p style={styles.Heading} className="text-center d-sm-none d-block font-family fw-bolder fs-3 m-0">ALL IMAGES</p>
                        </div>
                    </div>
                </div>
                <div className="container mb-3">
                    <div className="row">
                        {Adata.map((data, key) => (
                            <div onClick={() => { modelFn(data.AImage) }} key={data._id} className="col-sm-4 p-2">
                                <img src={data.AImage} alt="Not found" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />

            {model ? (
                <>
                    <section style={styles.modelDiv1} id="model" className="overflow-auto" >
                        <div className="container">
                            <div className="row mt-5">
                                <div className="col-sm-2">
                                </div>
                                <div className="col-sm-8 col-10 mt-sm-0 mt-5 pe-sm-1 pe-0 col-10">
                                    <img src={AImage} alt="Not found" />
                                </div>
                                <div className="col-sm-1 col-2 mt-sm-0 mt-5">
                                    <img onClick={() => { setModel(false) }} src="media/close.png" alt="Not found" />
                                </div>
                                <div className="col-sm-1">
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            ) : (
                <></>
            )}

        </>
    );
}

export default Images;