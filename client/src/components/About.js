import FadeIn from "react-fade-in";

const About = () => {
  return (
    <div className="container">
      <FadeIn>
        <div className="mt-5">
          <h1>About</h1>
        </div>
        <hr />
        <div className="mt-5 mb-5 text-left">
          <h5>Hello there,</h5>
          <br />
          <h5>
            My name is Amir Bajraktarević and I am a senior student at
            International University of Sarajevo (Computer Science Major).
          </h5>
          <br />
          <h5>
            Welcome to my Graduation Project:{" "}
            <strong>
              <em>CoronaTrack</em>
            </strong>
            <br />
            <br />, which is a web application whose goal is to serve doctors
            and the police.
          </h5>
          <hr />
          <h5>
            <strong>CoronaTrack</strong> was made in the <strong>MERN</strong>{" "}
            stack. The backend was developed in <strong>Node.js</strong> and{" "}
            <strong>Express.js</strong> using a <strong>MongoDB</strong>{" "}
            database and the frontend was developed in <strong>ReactJS</strong>.
          </h5>
          <br />
          <h4>
            <em>
              The main concept of the application is to be used by doctors and
              policemen.
            </em>
          </h4>
          <br />

          <h5>
            Doctors can create, update and delete citizens profiles. Firstly,
            they will make a profile for a citizen which contains their basic
            information (ID, first and last name, address) and then they will
            fill the questionare about their current COVID situation.
          </h5>
          <h5>
            After doing this, a citizen profile will be made containining all of
            this information which will be visible to both the doctors and the
            police. The doctor can later alter COVID status of the citizen in
            order to track and monitor their current status. Because of this
            there is a region whose sole purpose is to store the dates of
            important COVID related actions (vaccination status with the date of
            vaccination, revaccination status with date of revaccination,
            isolation status with the date of isolation expiration).
          </h5>
          <br />
          <h5>
            The police on the other hand cannot create new profiles, their role
            is to take notes of any offenses that the citizens make. They can
            search the database of citizen profiles, and can get their current
            status in seconds. Let's say a person is currently in isolation, and
            is stopped by the police for a casual check. The police officer can
            get the needed information in seconds instead of having to get in
            touch with the central so they can run checks on the citizen. There
            are badges in the User Interface which mark if a person is currently
            COVID infected and if the person is currently in isolaton. They
            could then issue a ticket in order for the given breach of COVID
            protocols and store it in the application. The applications
            interface also shows if a citizen is a repeat offender (meaning they
            have 3 or more offenses) which would help the police indentify
            people who are prone to COVID protocol breaches.
          </h5>

          <hr />
        </div>
        <footer className="mt-5 mb-4">Amir Bajraktarević &copy; 2021</footer>
      </FadeIn>
    </div>
  );
};

export default About;
