import '../css/Popup.css';
import { Link } from "react-router-dom";

function Popup(props) {
    console.log("pop up instrument:", props.instrument);
    return(props.trigger) ? (
        <div className="popup" >
            <div className="popup-inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)}>Close</button>
                { props.children }
                    <div>
                        <Link to ="/saved-audio" className='save-nav'>saved audios</Link>
                        
                        <Link to ="/upload-sheetmusic"
                        state={{ instrument:props.instrument}} className='save-nav'>upload sheet music</Link>

                        {/*<Link to ="/dropdown" className='save-nav'>saved sheet music</Link>*/}
                    </div>
               
            </div>

        </div>
    ) : "";
    
}

export default Popup
