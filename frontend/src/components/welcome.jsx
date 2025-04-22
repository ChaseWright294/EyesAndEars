import { useEffect, useState } from "react";
import axios from "axios";

function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5001/api/tbl_users", {headers: { Authorization: `Bearer ${token}`}
        });
        setUserName(response.data[0].u_name);
        console.log("username: ", response.data[0].u_name);
      } catch (error) {
        console.error("Error fetching user name", error);
      }
    };
    fetchUserName();
  }, []);

    return (
      <div className="welcome-section">
        <h1>
          Welcome Back <br />
          <span className="username">{userName}</span>!
        </h1>
      </div>
    );
  }
  
  export default Welcome;
  