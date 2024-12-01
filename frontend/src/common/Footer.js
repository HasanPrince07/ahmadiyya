import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Footer() {

    const [BColor, setBColor] = useState("")
    const [HColor, setHColor] = useState("")
    const [TColor, setTColor] = useState("")
    const [FImage, setFImage] = useState("")
    const [Heading, setHeading] = useState("")
    const [Address, setAddress] = useState("")
    const [Email, setEmail] = useState("")
    const [Phone, setPhone] = useState("")

    const [FData, setFData] = useState([])

    useEffect(() => {
        fetchFn();
    }, [])

    function fetchFn() {
        fetch("/user/fetchFooter").then((result) => {
            return result.json();
        }).then((data) => {
            if (data.status === 200) {
                setBColor(data.data.BColor);
                setHColor(data.data.HColor);
                setTColor(data.data.TColor);
                setFImage(data.data.FImage);
                setHeading(data.data.Heading);
                setAddress(data.data.Address);
                setEmail(data.data.Email);
                setPhone(data.data.Phone);
            } else {
                toast(data.message, { type: "error" });
            }
        })
        fetch("/user/fetchLinks").then((result) => {
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
            <section style={{ backgroundColor: BColor }} id="footer">
                <div className="container-fluid">
                    <div className="row p-sm-5 p-3">
                        <div className="col-sm-4 d-flex align-items-center">
                            <div className="col-sm-3 col-2">
                                <img className="img-responsive" src={FImage} alt="image not found" />
                            </div>
                            <p style={{ color: TColor }} className="font-family fw-normal d-sm-block d-none m-0 ps-3 footer-img-heading">{Heading}</p>
                            <p style={{ color: TColor }} className="font-family fw-normal d-sm-none d-block m-0 ps-4 fs-3">{Heading}</p>
                        </div>
                        <div className="col-sm-4 py-sm-0 py-3">
                            <p style={{ color: HColor }} className="font-family fw-bolder d-sm-block d-none footer-heading">STAY CONNECTED</p>
                            <p style={{ color: HColor }} className="font-family fw-bolder d-sm-none d-block fs-5 mb-2">STAY CONNECTED</p>
                            <ul className="d-sm-block d-none p-0 m-0">
                                {FData.map((data, key) => (
                                    <li key={data._id} className="d-sm-block d-none py-1">
                                        <Link to={data.LAddress} style={{ color: TColor }} className="text-decoration-none d-sm-block d-none footer-text font-family fw-normal">{data.LName}</Link>
                                        <Link to={data.LAddress} style={{ color: TColor }} className="text-decoration-none d-sm-none d-block fs-5 font-family fw-normal">{data.LName}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-4 d-sm-block d-none">
                            <p style={{ color: HColor }} className="font-family fw-bolder footer-heading">GET IN TOUCH</p>
                            <p style={{ color: TColor }} className="text-decoration-none footer-text font-family fw-normal"><span style={{ color: HColor }}>adrress :</span> {Address}</p>
                            <p style={{ color: TColor }} className="text-decoration-none footer-text font-family fw-normal"><span style={{ color: HColor }}>email :</span> {Email}</p>
                            <p style={{ color: TColor }} className="text-decoration-none footer-text font-family fw-normal"><span style={{ color: HColor }}>phone :</span> {Phone}</p>
                        </div>
                        <div className="col-sm-4 d-sm-none d-block">
                            <p style={{ color: HColor }} className="font-family fw-bolder fs-5 mb-2">GET IN TOUCH</p>
                            <p style={{ color: TColor }} className="text-decoration-none fs-5 font-family fw-normal mb-2"><span style={{ color: HColor }}>adrress :</span> {Address}</p>
                            <p style={{ color: TColor }} className="text-decoration-none fs-5 font-family fw-normal mb-2"><span style={{ color: HColor }}>email :</span> {Email}</p>
                            <p style={{ color: TColor }} className="text-decoration-none fs-5 font-family fw-normal mb-2"><span style={{ color: HColor }}>phone :</span> {Phone}</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Footer;