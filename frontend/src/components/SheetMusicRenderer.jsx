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
    let cursorProgress = 100;

    //reset the renderer
    const resetRenderer = () => {
        stopScroll();

        //reset the cursor
        cursorProgress = 100;
        document.getElementById('cursor').style.marginLeft = '100px';

        //reset scroll
        const vexflowDiv = rendererRef.current?.querySelector('.vexml-root.vexml-scroll-container');
        vexflowDiv.scrollLeft = 0;
    }

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
                cursorProgress += scrollSpeed; //move cursor instead of scroll bar
                document.getElementById('cursor').style.marginLeft = `${cursorProgress}px`;

                if(cursorProgress >= 1200)
                {
                    resetRenderer();
                    return;
                }

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
            <div className='btn-holder'>
                <button id='play-btn' className='play-btn' onClick={scrollToggle}>
                    {scrolling ? '❚❚' : '▶'}
                </button>
            <button className='reset-btn' onClick={resetRenderer}>Reset</button>
            </div>

            <div className='outer-div'>
                <div id='cursor' className='cursor' />
                <div className='renderer'>
                    <div id='score-div' className='score' ref={rendererRef} />
                </div>
            </div>
        </div>
    );
}

export default SheetMusicRenderer;