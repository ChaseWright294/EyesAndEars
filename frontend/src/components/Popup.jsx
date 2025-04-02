import '../css/Popup.css';
import { Link } from "react-router-dom";

function Popup(props) {
    return(props.trigger) ? (
        <div classname="popup" >
            <div classname="popup-inner">
                <button classname="close-btn" onClick={() => props.setTrigger(false)}>Close</button>
                
                    <div>
                        <Link to ="/audio" >
                            <span>saved audios</span>
                        </Link>
                        
                        <Link to ="/sheetmusic">uploaded music</Link>
                    </div>
               
            </div>

        </div>
    ) : "";
}

export default Popup
