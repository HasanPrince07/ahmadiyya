import Header from "../common/Header"
import Footer from "../common/Footer"
import { NavLink, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"

const styles = {
    facilityHeading: {
        color: "black"
    }
}

function Facility() {

    const [facility, setFacility] = useState(true)

    const [HColor, setHColor] = useState("");

    const [FData, setFData] = useState([]);

    useEffect(() => {
        fetchFn();
    }, [])

    const navigate = useNavigate()

    function moreFn(id) {
        window.localStorage.setItem("facility_id", id)
        navigate("/facilitypage")
    }

    function fetchFn() {
        fetch("/user/fetchFacility").then((result) => {
            return result.json();
        }).then((data) => {
            if (data.status === 200) {
                setHColor(data.data.HColor);
            } else {
                toast(data.message, { type: "error" });
            }
        })
        fetch("/user/fetchFacilities").then((result) => {
            return result.json();
        }).then((data) => {
            if (data.status === 200) {
                setFData(data.data);
            } else {
                toast(data.message, { type: "error" });
            }
        })
    }

    return (
        <>
            <ToastContainer />
            <Header />
            <section className="mb-5" id="facility-page">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12 py-sm-5 py-4">
                            <p style={styles.facilityHeading} className="text-center d-sm-block d-none font-family fw-bolder facility-head m-0">OUR FACILITY</p>
                            <p style={styles.facilityHeading} className="text-center d-sm-none d-block font-family fw-bolder fs-3 m-0">OUR FACILITY</p>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        {FData.map((data, key) => (
                            <div key={data._id} className="col-sm-4 p-2">
                                <NavLink to="/facilitypage" onClick={() => { moreFn(data._id) }} className="text-decoration-none">
                                    <div style={facility === key + 1 ? { boxShadow: "0px 0px 5px 5px rgba(185, 185, 185, 0.5)", backgroundImage: `url(${data.FImage})` } : { backgroundImage: `url(${data.FImage})` }} onMouseLeave={() => { setFacility(null) }} onMouseEnter={() => { setFacility(key + 1) }} className="facility-div rounded-1 p-2 d-flex align-items-end justify-content-center">
                                        <p style={{ color: HColor }} className="d-sm-block d-none font-family fw-bolder facility-text m-0">{data.FName}</p>
                                        <p style={{ color: HColor }} className="d-sm-none d-block font-family fw-bolder fs-3 m-0">{data.FName}</p>
                                    </div>
                                </NavLink>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Facility;