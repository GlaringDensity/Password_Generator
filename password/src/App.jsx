import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css' 
import { useCallback } from 'react';

function App() {
  const [len, setlen] = useState(8);
  const [num, setnum] = useState(false);
  const [charall, setcharall] = useState(false);
  const [pwd, setpwd] = useState("");

  const passwordRef = useRef(null);

  const pwdgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
    if(num) str += "0123456789";
    if(charall) str += "/,.;'[]-{}<>?:;`+@#";
    
    for(let i = 0; i <= len; i++) {
      let char = Math.floor(Math.random()*str.length);
      pass += str.charAt(char);
    }
    setpwd(pass);
    
  }, [len, num, charall, setpwd])

  const copypwd = useCallback(() => {
      passwordRef.current?.select();
      window.navigator.clipboard.writeText(pwd);
  }, [pwd]);

  useEffect(() => {
    pwdgenerator();
  }, [len, num, charall])

  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center my-3 text-xl'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-8'>
            <input type='text' value={pwd} className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref={passwordRef}></input>
            <button onClick={copypwd} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
              <div className='flex items-center gap-x-1'>
                  <input type='range' min={6} max={100} value={len} className='cursor-pointer' onChange={(e) => {setlen(e.target.value)}}></input>
                  <label>Length: {len}</label>
              </div>
              <div className='flex items-center gap-x-1'>
                <input type='checkbox' defaultChecked={num} id='numberInput' onChange={() => {
                  setnum((prev) => !prev);
                }}></input>
                <label htmlFor='numberInput'>Numbers</label>
              </div>

              <div className='flex items-center gap-x-1'>
                <input type='checkbox' defaultChecked={num} id='charInput' onChange={() => {
                  setcharall((prev) => !prev);
                }}></input>
                <label htmlFor='charInput'>Characters</label>
              </div>
        </div>
     </div>
    </>
  )
}

export default App
