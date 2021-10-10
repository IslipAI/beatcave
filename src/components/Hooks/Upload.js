import React, {useRef} from "react";

function Upload(){
    const fileinput = useRef();

    const handleClick = event => {
        event.preventdefault();
        console.log(fileinput.current);

    };

    return(
        <>
        <form onSubmit={handleClick}>
            <input type='file' ref={fileinput} />
            <button type='submit'>Upload</button>
        </form>
        </>
    )
}

export default Upload;