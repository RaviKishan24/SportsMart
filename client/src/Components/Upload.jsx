import React from 'react'
import { useEffect, useRef } from 'react'

function Upload() {
    const cloudinaryRef = useRef();
    const WidgetRef = useRef();
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        WidgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dz1q2cvvc',
            uploadPreset:'iwhry85z',
        }, function (error, result) {
            console.log(result)
            console.log(error)
        })
    }, []);
    return (

        <div>
            <h1>React& cloudinary uload widget</h1>
            <button onClick={() => WidgetRef.current.open()}>Upload</button>
        </div>
    )
}

export default Upload;
