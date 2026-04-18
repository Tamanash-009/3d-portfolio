import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My <span>journey</span>
          <br /> so far
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>BCA Student</h4>
                <h5>Brainware University</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Pursuing Bachelor of Computer Applications while completing intensive AI & Data Science program.
              Building real-world projects and learning cutting-edge technologies.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Projects</h4>
                <h5>Various</h5>
              </div>
              <h3>2025–NOW</h3>
            </div>
            <p>
              Built multiple AI/ML and full-stack projects including Whether weather dashboard,
              SmartSphere productivity hub, Handwritten Digit AI, and more.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Ambassador</h4>
                <h5>UNLOX & LetsUpgrade</h5>
              </div>
              <h3>2025–NOW</h3>
            </div>
            <p>
              Technology community ambassador, organizing events and helping fellow students
              learn programming and AI/ML skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;