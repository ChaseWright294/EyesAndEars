import * as vexml from '@stringsync/vexml';
import { useEffect, useRef, useState } from 'react';
import '../css/SheetMusicRenderer.css'

function SheetMusicRenderer({ musicString }) {
    const rendererRef = useRef(null);
    
    const onPlayButtonClick = () => {
        alert("Boop!");
    }

    useEffect(() => {
        if (rendererRef.current && musicString) {
            rendererRef.current.innerHTML = ''; //clear old score
            try { //error checker, because Windows and Mac have different types of musicxml files it turns out
                const score = vexml.renderMusicXML(musicString, rendererRef.current); //render new score
            
            } catch(error) {
                rendererRef.current.innerHTML ='<p>Error reading .musicxml file. Please be sure you are using the correct type of .musicxml for your OS.</p>'
            }
        }
    }, [musicString]);

    return (
        <div>
            <button className='play-btn' onClick={onPlayButtonClick}>Play</button>
            <div className='renderer'>
                <div ref={rendererRef} style={{width: '1175px', overflowX: 'auto'}}/>
            </div>
        </div>
    );
}

export default SheetMusicRenderer;