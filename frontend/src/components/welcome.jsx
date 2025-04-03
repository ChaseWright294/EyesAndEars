function Welcome({ userName = "User" }) {
    return (
      <div className="welcome-section">
        <h1>Welcome Back <br /><span className="username">{userName}</span>!</h1>
      </div>
    );
  }
  
  export default Welcome;
  