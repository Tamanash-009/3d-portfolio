import { MdArrowOutward } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Connect</h4>
            <p>
              <a
                href="https://www.linkedin.com/in/tamanashchakraborty"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                LinkedIn — tamanash-chakraborty
              </a>
            </p>
            <h4>Education</h4>
            <p>BCA, Brainware University — 2023–Present</p>
            <p>AI & Data Science Program — 2023–Present</p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/Tamanash-009"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="mailto:chakrabortytamanash@gmail.com"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Email <MdArrowOutward />
            </a>
          </div>
        </div>
        <div className="contact-copyright">
          <p>© 2026 Tamanash Chakraborty. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;