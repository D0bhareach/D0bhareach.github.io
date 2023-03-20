import React, {useState} from "react";
import BoilingVerdict from "./BoilingVerdict";
import TemperatureInput from "./TemperatureInput";
// import {scales} from "./converter_constants";
import "./converter.scss";

// This mapping to strigs is required for later this value will be used 
// against map key in TemperatureInput Component for getting correct
// legend text for input fields.
const scales = {
  CELSIUS: "celsius",
  FAHRENHEIT: "fahrenheit",
  KELVIN: "kelvin"
};

    export const fahrenheitToCelsius = (tmp) => {
        return (+tmp - 32) * 5 / 9;
    }

    export const kelvinToCelsius = (tmp) => {
        return +tmp - 273.15;
    }

    export const celsiusToFahrenheit = (celsius) => {
    return +celsius * (9 / 5) + 32;
    }

    export const celsiusToKelvin = (celsius) => {
    return celsius + 273.15;
    }
    
    // input must be a number  return string.
    export const roundToString = (input) => {
    return (Math.round(input * 100) / 100).toString();
    }

export default function Calculator() {
    // initial state of temperature is empty string, but later float value will saved.
    const [celsius, setCelsius] = useState("");
    const [fahrenheit, setFahrenheit] = useState("");
    const [kelvin, setKelvin] = useState("");

    const reset = ()=>{
        setCelsius('');
        setFahrenheit('');
        setKelvin('');
    }


    const handleInputChange = (event, inputType) => {
    event.preventDefault();
    let value = event.target.value;
    // need this condition to totally empty the input otherwise last digit will stick there
    // forever.
    if(value === ''){
        reset();
    }
    // handle unusual start of the number
    if (value === '.') {
        value = '0.';
    }
    if(value === '0.0' || value === '0.'){
        switch(inputType){
            case scales.CELSIUS: {
                setCelsius(value);
                break;
            }
            case scales.FAHRENHEIT: {
                setFahrenheit(value);
                break;
            }
            case scales.KELVIN: {
                setKelvin(value);
                break;
            }
            default: break;
            
        }
        // do not go further
        return;
    } // end of handling special input.

    value = parseFloat(value);

  if (Number.isNaN(value)) {
      // when number is not NaN do nothing.
    return;
  }
    // when input type is number it does reset to empty when value is more than Infinity
    // In Firefox it never reaches here, but just in case if it will it's here.
    if(value === Infinity){
        alert("Who among us shall dwell with the devouring fire? Isaiah 33:14");
        reset();
        return;
    }
        // will have to swith between input types and update state.
        switch(inputType){
            case scales.CELSIUS: {
                const fahrenheit = celsiusToFahrenheit(value);
                const kelvin = celsiusToKelvin(value);
                setCelsius(value);
                setFahrenheit(roundToString(fahrenheit));
                setKelvin(roundToString(kelvin));
                break;
            }
            case scales.FAHRENHEIT: {
                setFahrenheit(value);
                const celsius = fahrenheitToCelsius(value);
                const kelvin = celsiusToKelvin(celsius);
                setCelsius(roundToString(celsius));
                setKelvin(roundToString(kelvin));
                break;
            }
            case scales.KELVIN: {
                setKelvin(value);
                const celsius = kelvinToCelsius(value);
                const fahrenheit = celsiusToFahrenheit(celsius);
                setCelsius(roundToString(celsius));
                setFahrenheit(roundToString(fahrenheit));
                break;
            }
            default: break;

        }
    } // end of handler func



    return (
      <div className="converter">
        <TemperatureInput
          temperature={celsius}
          inputType={scales.CELSIUS}
          onTemperatureChange={handleInputChange}
        />
        <TemperatureInput
          temperature={fahrenheit}
          inputType={scales.FAHRENHEIT}
          onTemperatureChange={handleInputChange}
        />
        <TemperatureInput
          temperature={kelvin}
          inputType={scales.KELVIN}
          onTemperatureChange={handleInputChange}
        />
        <BoilingVerdict temperature={celsius} />
      </div>
    );
}
