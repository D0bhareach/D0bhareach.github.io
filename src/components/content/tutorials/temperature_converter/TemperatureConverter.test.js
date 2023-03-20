import React from 'react';
import {roundToString, celsiusToFahrenheit, celsiusToKelvin,
    kelvinToCelsius, fahrenheitToCelsius} from './TemperatureConverter';


it('test celsiusToFahrenheit', ()=>{
    expect(celsiusToFahrenheit(0)).toBe(32);
    expect(celsiusToFahrenheit(1)).toBe(33.8);
    expect(celsiusToFahrenheit(10)).toBe(50);
    expect(celsiusToFahrenheit(50)).toBe(122);
    expect(celsiusToFahrenheit(100)).toBe(212);
    expect(celsiusToFahrenheit(1000)).toBe(1832);

});

it('test celsiusToKelvin', ()=>{
    expect(celsiusToKelvin(-273.15)).toBe(0);
    expect(celsiusToKelvin(0)).toBe(273.15);
    expect(celsiusToKelvin(1)).toBe(274.15);
    expect(celsiusToKelvin(10)).toBe(283.15);
    expect(celsiusToKelvin(50)).toBe(323.15);
    expect(celsiusToKelvin(100)).toBe(373.15);
    expect(celsiusToKelvin(1000)).toBe(1273.15);

});

it('test kelvinToCelsius', ()=>{
    expect(kelvinToCelsius(0)).toBe(-273.15);
    expect(kelvinToCelsius(1)).toBe(-272.15);
    expect(kelvinToCelsius(10)).toBe(-263.15);
    expect(kelvinToCelsius(50)).toBe(-223.14999999999998);
    expect(kelvinToCelsius(100)).toBe(-173.14999999999998);
    expect(kelvinToCelsius(1000)).toBe(726.85);

});

it('test fahrenheitToCelsius', ()=>{
    expect(fahrenheitToCelsius(0)).toBe(-17.77777777777778);
    expect(fahrenheitToCelsius(1)).toBe(-17.22222222222222);
    expect(fahrenheitToCelsius(10)).toBe(-12.222222222222221);
    expect(fahrenheitToCelsius(50)).toBe(10);
    expect(fahrenheitToCelsius(100)).toBe(37.77777777777778);
    expect(fahrenheitToCelsius(1000)).toBe(537.7777777777778);

});

it('test roundToString', ()=>{
    expect(roundToString(-17.77777777777778)).toBe('-17.78');
    expect(roundToString(-17.22222222222222)).toBe('-17.22');
    expect(roundToString(-12.222222222222221)).toBe('-12.22');
    expect(roundToString(10)).toBe('10');
    expect(roundToString(37.77777777777778)).toBe('37.78');
    expect(roundToString(537.7777777777778)).toBe('537.78');
    expect(roundToString(-223.14999999999998)).toBe('-223.15');
    expect(roundToString(-173.14999999999998)).toBe('-173.15');
    expect(roundToString(-273.15)).toBe('-273.15');

});
