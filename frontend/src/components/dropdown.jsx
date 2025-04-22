import { useState, useEffect } from "react";
import axios from "axios";

function Dropdown(props) {
    const [savedMusic, setsavedMusic] = useState([]);
    
    useEffect(() => {
        const fetchUserMusic = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:5001/api/music", {headers: { Authorization: `Bearer ${token}`}
                });
                setsavedMusic(response.data);             
                console.log("Fetched User Music: ", response.data);
            } catch(error){
                console.error("Error fetching user Music: ", error);
            }
        };
        fetchUserMusic();
        
    }, []); 
    

    return (
    <select name="dropdown"> 
        <option value="">{props.children.i_name}</option>
        {savedMusic.map((props) => (
        <option value="value1">{props.children.m_title}</option>
        ))};
    </select>
  );
}
export default Dropdown;