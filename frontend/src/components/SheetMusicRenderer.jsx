import * as vexml from '@stringsync/vexml';
import { useEffect, useRef } from 'react';
import '../css/SheetMusicRenderer.css'

function SheetMusicRenderer({ musicString }) {
    const rendererRef = useRef(null);
    console.log("MusicString: ", musicString); //log the music string to console
    console.log("RendererRef: ", rendererRef.current); //log the renderer ref to console

    useEffect(() => {
        if (rendererRef.current && musicString) {
            rendererRef.current.innerHTML = ''; //clear old score
            try { //error checker, because Windows and Mac have different types of musicxml files it turns out
                console.log("RendererRef 2: ", rendererRef.current);
                vexml.renderMusicXML(musicString, rendererRef.current); //render new score
            } catch(error) {
                rendererRef.current.innerHTML ='<p>Error reading .musicxml file. Please be sure you are using the correct type of .musicxml for your OS.</p>'
                console.log("Error reading .musicxml file: ", error); //log error to console
            }
        }
    }, [musicString]);

    return (
        <div className='renderer'>
            <div id="renderer" ref={rendererRef}></div>
        </div>
    );
}

export default SheetMusicRenderer;