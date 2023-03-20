import React, { useRef, useEffect, useState } from 'react'

export default function Email() {

    const mailRef = useRef()
    const initialState = window.innerWidth > 480 ? "inline-block" : "none";
    // const [emailWidth, setEmailWidth] = useState(initialWidth);
    const [display, setDisplay] = useState(initialState);

    const first = "viacheslav.modestov";
    const second = "gmail.com";
    const str = `${first}@${second}`;

    const WindowResizeHandler = ()=>{
        const  windowWidth = window.innerWidth;
        if (windowWidth > 480) {
            setDisplay("inline-block");
        } 
        else if (windowWidth <= 479) {
            setDisplay("none");
        }
    }


  useEffect(() => {
    window.addEventListener("resize", WindowResizeHandler)
    const mail = mailRef.current
    const ctx = mail.getContext('2d')
    ctx.font = "16px Arial";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(str, 0, 20);
      
    return ()=>{
        window.removeEventListener("resize", WindowResizeHandler)
    }  
  });

    return (
        <canvas  ref={mailRef} style={{display}} width="240" height="26"/>
    );
}

/**
 * Show my email to visitor. Plan in the future to bring contact form, but need to
 * make capcha. When capcha will be ready this may become a reactive button and icon
 * on smaller screens. 
 * The reason why all this complicated logic is in the component instead of scss file
 * is the way canvas is created it must to have width and height set inside the tag.
 * At first I was setting widht and font size dynamically, but later realized that this
 * is not required since I still not have contact form ready so I just hid component
 * on smaller screens.
 */
