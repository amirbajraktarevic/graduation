import FadeIn from "react-fade-in";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="container">
      <FadeIn>
        <div className="mt-5">
          <h1>Your profile</h1>
          <hr />
          <div className="text-left">
            <h4>
              <strong>Name:</strong> {user.name}{" "}
            </h4>
            <br />
            <h4>
              <strong>E-mail:</strong> {user.email}
            </h4>
            <br />
            <h4>
              <strong>Role:</strong> {user.role}
            </h4>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default Profile;
