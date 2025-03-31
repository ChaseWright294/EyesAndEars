import * as vexml from '@stringsync/vexml';
import { useEffect, useRef } from 'react';

function SheetMusicRenderer({ musicString }) {
    const rendererRef = useRef(null);

    useEffect(() => {
        if (rendererRef.current && musicString) {
            vexml.renderMusicXML(musicString, rendererRef.current);
        }
    }, [musicString]);

    return (
        <div>
            <div id="renderer" ref={rendererRef}></div>
        </div>
    );
}

export default SheetMusicRenderer;