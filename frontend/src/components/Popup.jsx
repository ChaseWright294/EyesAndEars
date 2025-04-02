import '../css/Popup.css';
import { Link } from "react-router-dom";

function Popup(props) {
    return(props.trigger) ? (
        <div className="popup" >
            <div className="popup-inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)}>Close</button>
                
                    <div>
                        <Link to ="/audio" className='save-nav'>saved audios</Link>
                        
                        <Link to ="/sheetmusic" className='save-nav'>uploaded music</Link>
                    </div>
               
            </div>

        </div>
    ) : "";
}

export default Popup
