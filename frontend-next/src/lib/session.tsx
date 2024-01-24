"use client"
import { useEffect, useState } from "react";

export const getToken = () => localStorage.getItem('jwt');
export const getExpires = () => localStorage.getItem('exp');


export const useToken = () => {
  const [isExpired, setIsExpired] = useState<Boolean>(false);

  useEffect(()=>{
    const token = getToken();
    const expiration = getExpires();

    //console.log(expiration);
    const date = new Date();
    const toISO = date.toISOString();
    //console.log(toISO)

    if(token && expiration){
      if(toISO > expiration){
        setIsExpired(true)
        //console.log("ya caduco");
      } else {
        setIsExpired(false)
        //console.log("aun falta")
      }
    }
  },[]);
  return isExpired;
}