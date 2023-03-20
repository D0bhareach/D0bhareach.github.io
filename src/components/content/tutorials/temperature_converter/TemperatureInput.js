import React, {useState, useEffect} from "react";

export default function TemperatureInput(props) {
    const [input_value, setInputValue] = useState();

    useEffect(()=>{
        setInputValue(`${props.temperature}`);
    }, [props]);

    const scaleNames = {
        celsius: "Celsius \u00B0C",
        fahrenheit: "Fahrenheit \u00B0F",
        kelvin: "Kelvin \u00B0K"
    };


    //Without step attribute will mark floats as invalid.
    return (
        <div className="converter__input">
        <legend className="converter__input__legend">
        {scaleNames[props.inputType]}:
        </legend>

        <input type="number"
        step="0.00000000000000001"
        value={input_value || ""}
        className="converter__input__field"
        onChange={(event) => 
            props.onTemperatureChange(event, props.inputType)} />
        </div>
    );
}
