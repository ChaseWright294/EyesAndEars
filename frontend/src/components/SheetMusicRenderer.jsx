import * as vexml from '@stringsync/vexml';
import { useEffect, useRef, useState } from 'react';
import '../css/SheetMusicRenderer.css'

function SheetMusicRenderer({ musicString }) {
    const rendererRef = useRef(null); //renderer for sheet music

    //auto scroll functionality
    const scrollSpeed = 1; //pixels per frame -update with fetch from metronome!
    const scrollInterval = 16; //roughly 60 frames per second
    let scrollIntervalID = null;
    
    const onPlayButtonClick = () => {
        const vexflowDiv = rendererRef.current?.querySelector('.vexml-root.vexml-scroll-container');
        if(vexflowDiv)
        {
            if(scrollIntervalID) //clear the interval if it is already running
            {
                clearInterval(scrollIntervalID);
            }

            scrollIntervalID = setInterval(() => {
                vexflowDiv.scrollLeft += scrollSpeed;

                if(vexflowDiv.scrollLeft + vexflowDiv.clientWidth >= vexflowDiv.scrollWidth)
                {
                    clearInterval(scrollIntervalID);
                }
            }, scrollInterval);
        }
        else
        {
            alert("Error finding .vexml-root.vexml-scroll-container for autoscroll");
        }
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
                    <div id='score-div' className='score' ref={rendererRef} />
                </div>
            </div>
        </div>
    );
}

export default SheetMusicRenderer;