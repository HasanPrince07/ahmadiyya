import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import Footer from "../common/Footer"
import Header from "../common/Header"

const styles = {
    aboutHeading: {
        color: "black",
    },
    aboutText: {
        color: "black",
    },
    aboutTeacherHeading: {
        color: "black",
    }
}

function About() {

    const [Image, setImage] = useState("")
    const [About, setAbout] = useState("")
    const [BColor, setBColor] = useState("")
    const [HColor, setHColor] = useState("")
    const [TColor, setTColor] = useState("")
    const [PName, setPName] = useState("")
    const [PDetail, setPDetail] = useState("")

    const [TData, setTData] = useState([])

    useEffect(() => {
        fetchFn();
    }, [])

    function fetchFn() {
        fetch("/user/fetchAbout").then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                setImage(data.data.Image)
                setAbout(data.data.About)
                setBColor(data.data.BColor)
                setHColor(data.data.HColor)
                setTColor(data.data.TColor)
                setPName(data.data.PName)
                setPDetail(data.data.PDetail)
            } else {
                toast(data.message, { type: "error" })
            }
        })
        fetch("/user/fetchTeachers").then((result) => {
            return result.json();
        }).then((data) => {
            if (data.status === 200) {
                setTData(data.data);
            } else {
                toast(data.message, { type: "error" });
            }
        })
    }

    return (
        <>
            <ToastContainer />
            <Header />
            <section id="about-page">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 py-sm-5 py-4">
                            <p style={styles.aboutHeading} className="text-center d-sm-block d-none font-family fw-bolder about-heading m-0">OUR SCHOOL</p>
                            <p style={styles.aboutHeading} className="text-center d-sm-none d-block font-family fw-bolder fs-3 m-0">OUR SCHOOL</p>
                            <p style={styles.aboutText} className="text-center d-sm-block d-none font-family fw-normal about-text m-0">{About} </p>
                            <p style={styles.aboutText} className="text-center d-sm-none d-block font-family fw-normal fs-5 m-0">{About} </p>
                        </div>
                        <div style={{ backgroundColor: BColor }} className="col-sm-12 d-sm-flex align-items-center d-block p-0">
                            <div className="col-sm-6 p-2">
                                <img className="about-principal-img" src={Image} alt="image not found" />
                            </div>
                            <div className="col-sm-6 p-2">
                                <p style={{ color: HColor }} className="text-center d-sm-block d-none font-family fw-bolder about-principal-heading">{PName}</p>
                                <p style={{ color: HColor }} className="text-center d-sm-none d-block font-family fw-bolder fs-3">{PName}</p>
                                <p style={{ color: TColor }} className="text-center d-sm-block d-none font-family fw-normal about-principal-text">{PDetail}</p>
                                <p style={{ color: TColor }} className="text-center d-sm-none d-block font-family fw-normal fs-5">{PDetail}</p>
                            </div>
                        </div>
                        <div className="my-3"></div>
                        {TData.map((data, key) => (
                            <div key={data._id} className="col-sm-4 my-2 p-3">
                                <p style={styles.aboutTeacherHeading} className="text-center d-sm-block d-none font-family fw-bold about-teacher-heading m-0">{data.TName}</p>
                                <p style={styles.aboutTeacherHeading} className="text-center d-sm-none d-block font-family fw-bold fs-3 m-0">{data.TName}</p>
                                <p style={styles.aboutTeacherHeading} className="text-center d-sm-block d-none font-family fw-normal about-teacher-subdetail">{data.TSubject}</p>
                                <p style={styles.aboutTeacherHeading} className="text-center d-sm-none d-block font-family fw-normal fs-4">{data.TSubject}</p>
                                <p style={styles.aboutTeacherHeading} className="text-center d-sm-block d-none font-family fw-normal about-teacher-detail m-0">{data.TDetail}</p>
                                <p style={styles.aboutTeacherHeading} className="text-center d-sm-none d-block font-family fw-normal fs-5 m-0">{data.TDetail}</p>
                            </div>
                        ))}
                        <div className="my-3"></div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default About;