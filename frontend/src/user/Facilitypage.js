import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify";

const styles = {
    headerDiv: {
        backgroundColor: "#1d1d36",
    },
    headerBtn: {
        backgroundColor: "white",
        color: "#1d1d36"
    },
    facilityName: {
        color: "#1d1d36",
    },
    facilityDetail: {
        color: "black",
    }
}

function Facilitypage() {

    const [FImage, setFImage] = useState("");
    const [FName, setFName] = useState("");
    const [FDetail, setFDetail] = useState("");

    useEffect(() => {
        const id = window.localStorage.getItem("facility_id")
        fetchFn(id)
    }, [])

    function fetchFn(id) {
        fetch(`/user/fetchFacilitiesById/${id}`).then((result) => {
            return result.json();
        }).then((data) => {
            if (data.status === 200) {
                setFImage(data.data.FImage);
                setFName(data.data.FName);
                setFDetail(data.data.FDetail);
            } else {
                toast(data.message, { type: "error" });
            }
        })
    }

    return (
        <>
            <ToastContainer />
            <section id="facility-page">
                <div className="container-fluid">
                    <div className="row">
                        <div style={styles.headerDiv} className="col-sm-12 p-2">
                            <NavLink className="text-decoration-none" to="/facility"><button style={styles.headerBtn} className="btn font-family d-sm-block d-none facility-header-btn rounded-0 px-5">Back To Page</button></NavLink>
                            <NavLink className="text-decoration-none" to="/facility"><button style={styles.headerBtn} className="btn text-decoration-none font-family d-sm-none d-block facility-header-btn fs-5 rounded-0 px-5">Back To Page</button></NavLink>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 my-sm-5 my-4">
                            <p style={styles.facilityName} className="text-center d-sm-block d-none font-family fw-bolder facility-name m-0">{FName}</p>
                            <p style={styles.facilityName} className="text-center d-sm-none d-block font-family fw-bolder fs-4 m-0">{FName}</p>
                        </div>
                        <div className="d-flex justify-content-center col-sm-12">
                            <div className="col-sm-6">
                                <img src={FImage} alt="Not found" />
                            </div>
                        </div>
                        <div className="col-12 mt-5">
                            <p style={styles.facilityDetail} className="text-center d-sm-block d-none font-family fw-normal facility-detail">{FDetail}</p>
                            <p style={styles.facilityDetail} className="text-center d-sm-none d-block font-family fw-normal fs-5">{FDetail}</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Facilitypage;