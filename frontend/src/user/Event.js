import Header from "../common/Header";
import Footer from "../common/Footer";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const styles = {
    eventHeading: {
        color: "black",
    },
    eventName: {
        color: "black",
    },
    eventDetail: {
        color: "black",
    },
    eventsName: {
        color: "white",
    },
    eventBtn: {
        backgroundColor: "white",
        color: "#1d1d36",
        border: "2px solid #1d1d36"
    }
}

function Event() {

    const [eventBtn1, setEventBtn1] = useState(false)
    const [eventBtn2, setEventBtn2] = useState(true)
    const [eventsBtn, setEventsBtn] = useState(null)

    const [eventBColor, setEventBColor] = useState("")
    const [eBColor, setEBColor] = useState("")
    const [eButtonHBColor, setEButtonHBColor] = useState("")

    const [eventData, setEData] = useState([]);

    const [eImage, setEImage] = useState("");
    const [eName, setEName] = useState("");
    const [eDetail, setEDetail] = useState("");
    const [eDate, setEDate] = useState("");

    useEffect(() => {
        fetchFn();
        fetchAll();
        const id = window.localStorage.getItem("event_id")
        moreFn(id)
    }, [])

    function fetchFn() {
        fetch("/user/fetchEvent").then((result) => {
            return result.json();
        }).then((data) => {
            if (data.status === 200) {
                setEventBColor(data.data.eventBColor);
                setEBColor(data.data.eBColor);
                setEButtonHBColor(data.data.eButtonHBColor);
            } else {
                toast(data.message, { type: "error" });
            }
        })
    }

    function fetchAll() {
        fetch("/user/fetchEvents").then((result) => {
            return result.json();
        }).then((data) => {
            if (data.status === 200) {
                setEData(data.data);
            } else {
                toast(data.message, { type: "error" });
            }
        })
    }

    function btnFn(btn) {
        if (btn == "eventBtn") {
            setEventBtn1(false)
            setEventBtn2(true)
            fetchAll()
        } else {
            setEventBtn1(true)
            setEventBtn2(false)
            fetch("/user/fetchUpcomingEvents").then((result) => {
                return result.json();
            }).then((data) => {
                if (data.status === 200) {
                    setEData(data.data);
                } else {
                    toast(data.message, { type: "error" });
                }
            })
        }
    }

    function moreFn(id) {
        window.localStorage.setItem("event_id", id)
        fetch(`/user/fetchMoreEventsById/${id}`).then((result) => {
            return result.json();
        }).then((data) => {
            if (data.status === 200) {
                setEImage(data.data.eImage);
                setEName(data.data.eName);
                setEDetail(data.data.eDetail);
                setEDate(data.data.eDate);
            } else {
                toast(data.message, { type: "error" });
            }
        })
    }

    return (
        <>
            <ToastContainer />
            <Header />
            <section id="event-page">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 my-sm-5 my-4 d-flex align-items-center justify-content-center">
                            <p style={styles.eventHeading} className="text-center d-sm-block d-none font-family fw-bolder event-heading m-0">SCHOOL EVENTS</p>
                            <p style={styles.eventHeading} className="text-center d-sm-none d-block font-family fw-bolder fs-4 m-0">SCHOOL EVENTS</p>
                        </div>
                        {!eName ? "" :
                            <div className="d-sm-flex d-block align-items-center col-sm-12">
                                <div className="col-sm-6 col-12">
                                    <img src={eImage} alt="image not found" />
                                </div>
                                <div className="col-6 p-2 d-sm-block d-none">
                                    <p style={styles.eventName} className="text-center font-family fw-bolder event-name">{eName}</p>
                                    <p style={styles.eventDetail} className="text-center font-family fw-normal event-detail">{eDetail}</p>
                                    <p style={styles.eventDetail} className="text-center font-family fw-normal event-date m-0">{eDate}</p>
                                </div>
                                <div className="col-12 p-2 d-sm-none d-block">
                                    <p style={styles.eventName} className="text-center font-family fw-bolder fs-3">{eName}</p>
                                    <p style={styles.eventDetail} className="text-center font-family fw-normal fs-5">{eDetail}</p>
                                    <p style={styles.eventDetail} className="text-center font-family fw-normal m-0 fs-5">{eDate}</p>
                                </div>
                            </div>
                        }
                        <div style={{ backgroundColor: eventBColor }} className="col-sm-12 p-4 mt-5">
                            <div className="d-sm-flex d-block justify-content-end col-sm-12 mb-4">
                                <div className="col-sm-3 col-12">
                                    <button style={eventBtn1 ? { color: eBColor, backgroundColor: "white", border: `2px solid ${eBColor}` } : { color: "white", backgroundColor: eBColor, border: `2px solid ${eBColor}` }} onClick={() => { btnFn("eventBtn") }} className="btn form-control d-sm-block d-none font-family fw-bold rounded-0 event-btn shadow-none">Events</button>
                                    <button style={eventBtn1 ? { color: eBColor, backgroundColor: "white", border: `2px solid ${eBColor}` } : { color: "white", backgroundColor: eBColor, border: `2px solid ${eBColor}` }} onClick={() => { btnFn("eventBtn") }} className="btn form-control d-sm-none d-block font-family fw-bold rounded-0 fs-5 shadow-none">Events</button>
                                </div>
                                <div className="col-sm-3 col-12">
                                    <button style={eventBtn2 ? { color: eBColor, backgroundColor: "white", border: `2px solid ${eBColor}` } : { color: "white", backgroundColor: eBColor, border: `2px solid ${eBColor}` }} onClick={() => { btnFn("upcomingEventBtn") }} className="btn form-control d-sm-block d-none font-family fw-bold rounded-0 event-btn shadow-none">Upcoming Events</button>
                                    <button style={eventBtn2 ? { color: eBColor, backgroundColor: "white", border: `2px solid ${eBColor}` } : { color: "white", backgroundColor: eBColor, border: `2px solid ${eBColor}` }} onClick={() => { btnFn("upcomingEventBtn") }} className="btn form-control d-sm-none d-block font-family fw-bold rounded-0 fs-5 shadow-none">Upcoming Events</button>
                                </div>
                            </div>
                            {eventData.length === 0 ?
                                <>
                                    <p style={styles.eventHeading} className="text-center d-sm-block d-none font-family fw-bolder events-heading m-0">SELECT A OPTION</p>
                                    <p style={styles.eventHeading} className="text-center d-sm-none d-block font-family fw-bolder fs-4 m-0">SELECT A OPTION</p>
                                </>
                                :
                                <>
                                    {eventData.map((data, key) => (
                                        <div key={data._id} style={{ backgroundColor: eBColor }} className="d-sm-flex d-block col-sm-12 justify-content-between align-items-center p-3 mt-2">
                                            <p style={styles.eventsName} className="d-sm-block d-none font-family fw-bolder events-name m-0">{data.eName}</p>
                                            <p style={styles.eventsName} className="d-sm-none d-block font-family text-center fw-bolder fs-5 m-0">{data.eName}</p>
                                            <button style={eventsBtn === key + 1 ? { backgroundColor: eButtonHBColor, color: eBColor } : { backgroundColor: "white", color: eBColor }} onClick={() => { moreFn(data._id) }} onMouseLeave={() => { setEventsBtn(null) }} onMouseEnter={() => { setEventsBtn(key + 1) }} className="btn d-sm-block d-none font-family fw-bold events-btn rounded-0 shadow-none">KNOW MORE</button>
                                            <button style={eventsBtn === key + 1 ? { backgroundColor: eButtonHBColor, color: eBColor } : { backgroundColor: "white", color: eBColor }} onClick={() => { moreFn(data._id) }} onMouseLeave={() => { setEventsBtn(null) }} onMouseEnter={() => { setEventsBtn(key + 1) }} className="btn d-sm-none d-block font-family fw-bold events-btn form-control mt-sm-0 mt-2 rounded-0 fs-5">KNOW MORE</button>
                                        </div>
                                    ))}
                                </>
                            }
                        </div>
                        <div className="col-sm-12 my-sm-5 my-3"></div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Event;