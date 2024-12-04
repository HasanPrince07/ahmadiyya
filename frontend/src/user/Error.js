import { NavLink } from "react-router-dom";

const styles = {
    errorText: {
        color: "black"
    }
}

function Error() {
    return (
        <>
            <section className="d-flex justify-content-center align-items-center" id="error-page">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 d-flex justify-content-center">
                            <div className="col-sm-3 col-8">
                                <img src="media/error.png" alt="Not found" />
                            </div>
                        </div>
                        <div className="col-sm-12 d-sm-block d-none">
                            <p style={styles.errorText} className="text-center font-family fw-bolder error-text mt-5">404 Page Not Found</p>
                            <p className="text-center font-family fw-bolder error-link-text"><NavLink to={-1}>Go Back</NavLink></p>
                        </div>
                        <div className="col-sm-12 d-sm-none d-block">
                            <p style={styles.errorText} className="text-center font-family fw-bolder fs-3 mt-5">404 Page Not Found</p>
                            <p className="text-center font-family fw-bolder fs-4"><NavLink to={-1}>Go Back</NavLink></p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Error;