import * as vexml from '@stringsync/vexml';
import { useEffect, useRef, useState } from 'react';
import '../css/SheetMusicRenderer.css'

function SheetMusicRenderer({ musicString }) {
    const rendererRef = useRef(null); //renderer for sheet music

    //auto scroll functionality
    const scrollSpeed = 1; //pixels per frame -update with fetch from metronome!
    const scrollInterval = 16; //roughly 60 frames per second
    let scrollIntervalID = useRef(null);
    const [scrolling, setScrolling] = useState(false);

    //start the autscroll
    const startScroll = () =>
    {

        const vexflowDiv = rendererRef.current?.querySelector('.vexml-root.vexml-scroll-container');
        if(!vexflowDiv)
        {
            return;
        }

        scrollIntervalID.current = setInterval(() => {
            vexflowDiv.scrollLeft += scrollSpeed;

            //stop scrolling if end reached
            if(vexflowDiv.scrollLeft + vexflowDiv.clientWidth >= vexflowDiv.scrollWidth)
            {
                clearInterval(scrollIntervalID);
            }
        }, scrollInterval);

        setScrolling(true);
    }

    //stop the autoscroll
    const stopScroll = () => {
        if(scrollIntervalID.current) 
        {
            clearInterval(scrollIntervalID.current);
            scrollIntervalID.current = null;
        }
        setScrolling(false);
    }

    const scrollToggle = () => {
        if(scrolling)
        {
            stopScroll();
        }
        else
        {
            startScroll();
        }
    };

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
            <button id='play-btn' className='play-btn' onClick={scrollToggle}>
                {scrolling ? '❚❚' : '▶'}
            </button>
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