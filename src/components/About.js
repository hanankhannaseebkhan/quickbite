import React from "react";
import AboutImg from "../assets/images/about-img";
const About = () => {
  return (
    <>
      <section className="about" id="about">
        <h1 className="heading">
          <span>about</span> us Adeenwork
        </h1>

        <div className="row">
          <div className="image">
            <img src={AboutImg} alt="" />
          </div>

          <div className="content">
            <h3>what makes our food special?</h3>
            <p>
            QuickBite.. indeed a temporary escape from something 
            similar to reasoning a work, meanwhile however? Which no 
            one easily desires. From, the?...
            </p>
            <p>
            Quick_Bite they hate what is true, nothing is of value!
             Nor is it consecrated, but they seem wise...
            </p>
            <a href="#" className="btn">
              learn more
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
