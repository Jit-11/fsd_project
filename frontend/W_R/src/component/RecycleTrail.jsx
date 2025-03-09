import { Container } from "react-bootstrap";
import  Navigation  from "./Navigation";
import pic1 from "../assets/trail.png"
const RecycleTrail = () => {
  return (
    <>
      <Container className="mt-5 mb-5">
        <div>
          <p className="text-center h1 fw-bold p-4">Recycle Trail</p>
        </div>
        <br />
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h3 className="fw-bold">Let's explore and learn..!</h3>
              <br />
              Join us for an eye-opening waste awareness walk! Experience firsthand how waste is collected, sorted, and recycled while understanding its impact on communities and the environment.  
              The trail includes a guided visit with waste collectors and a stop at a Material Recovery Facility.  
              <br />
              Interested? Contact us at abc@gmail.com.
            </div>
            <div className="col-lg-4">
              <img src={pic1} className="img-fluid" alt="Recycle Trail" />
            </div>
          </div>
        </div>
        <br />
      </Container>
    </>
  );
};
export default RecycleTrail;