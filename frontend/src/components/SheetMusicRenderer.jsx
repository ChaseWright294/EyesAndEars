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
                vexml.renderMusicXML(musicString, rendererRef.current); //render new score
            } catch(error) {
                rendererRef.current.innerHTML ='<p>Error reading .musicxml file. Please be sure you are using the correct type of .musicxml for your OS.</p>'

            }
        }
    }, [musicString]);

    return (
        <div>
            <button className='play-btn' onClick={onPlayButtonClick}>▶</button>
            <div className='gap' />
            <div className='outer-div'>
                <div className='cursor' />
                <div className='renderer'>
                    <div className='score' ref={rendererRef} />
                </div>
            </div>
        </div>
    );
}

export default SheetMusicRenderer;