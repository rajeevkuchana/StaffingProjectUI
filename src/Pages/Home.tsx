import React from 'react'
import Image1 from './../Images/image1.png'
import grouth from './../Images/grouth.png'
import speed from './../Images/speed.png'
import req from './../Images/req.png'
import './Home.css'
const Home: React.FC = () => {
  return (
    <>

      <div className="hero-container" id="hero-sec">
        <div className="container-fluid ">
          <div className="row d-flex">
            <div className="col align-middle">
              <div className="px-2 py-2">
                <img src="https://img.freepik.com/free-vector/happy-freelancer-with-computer-home-young-man-sitting-armchair-using-laptop-chatting-online-smiling-vector-illustration-distance-work-online-learning-freelance_74855-8401.jpg?w=900&t=st=1667037491~exp=1667038091~hmac=7c71ea8afc8f3cc8065c5ccc05d105e3c8a7b76f0133016cb210a7882dc19611" className="img-fluid" alt="..." />
              </div>
            </div>
            <div className="col">
              <div className="px-5 py-5 mt-5">
                <div className="px-2 py-2 align-middle">
                  <h4>            Welcome to Quantlytix
                  </h4>
                  <p>  We're thrilled to have you here. Our team of experts is committed to understanding your
                    unique needs and delivering tailored solutions that exceed your expectations.
                  </p>
                </div>

              </div>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col item">
              <img src={req} className="card-img-top" style={{ width: "100px" }} alt="..." />

              <div className="card shadow p-3 mb-5 bg-white rounded" >
                <div className="card-body">
                  <h5 className="card-title">Recruitment</h5>
                  <p className="card-text">  Empowering businesses with top-tier talent, one hire at a time. Discover your
                    next star employee with our expert recruitment services.</p>
                </div>
              </div>
            </div>
            <div className="col item ">
              <div className="card shadow p-3 mb-5 bg-white rounded" >
                <img src={speed} className="card-img-top" style={{ width: "100px" }} alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Speed</h5>
                  <p className="card-text">  Accelerating your recruitment process with precision and efficiency. Streamline
                    hiring and secure top talent faster than ever before. </p>
                </div>
              </div>
            </div>
            <div className="col item">
              <div className="card shadow p-3 mb-5 bg-white rounded" >
                <div>
                  <img src={grouth} className="card-img-top" style={{ width: "100px" }} alt="..." />
                  <div className="card-body">
                  <h5 className="card-title">Growth</h5>
                  <p className="card-text"> Fuel your organization's rapid expansion with our agile recruitment strategies.
                    Harnessing speed and precision to propel your team towards unparalleled success.</p>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </>
  )
}

export default Home
