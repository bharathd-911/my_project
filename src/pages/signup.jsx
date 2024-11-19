import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import PopUp from '../components/PopUp'
const Signup = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('user'))
    if (auth)
      navigate('/employee')
  }, [])

  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  const pressedButton = () => {
    if (name === "" || email === "" || password === "") {
      setIsOpen(true);
      return;
    }
    const data = { name, email, password }
    localStorage.setItem('user', JSON.stringify(data));
    navigate('/employee', { state: data });

  };



  return (
    <div className='min-h-screen bg-cover bg-transparent bg-center brightness-100 bg-[url("https://wallpapercave.com/wp/wp9209517.jpg")]'>

      <div className='contrast-200'>
        <div className='text-4xl text-center pt-14  font-serif font-extrabold text-emerald-950'>RESOURCE MANAGEMENT SYSTEM</div>
        <div>
          <h1 className='text-4xl text-center pt-28 font-semibold  text-white'>REGISTER</h1>
          <div className='text-center pt-4'>
            <div className="pt-6"><input className='text-1xl text-center font-mono text-black border-black  border-2 rounded-lg' type='text' maxlength="50" placeholder='ENTER USERNAME' value={name} onChange={(e) => setname(e.target.value)} /></div>
            <div className="pt-6"><input className='text-1xl text-center font-mono text-black border-black  border-2 rounded-lg' type='text' maxlength="50" placeholder='ENTER EMAIL' value={email} onChange={(e) => setemail(e.target.value)} /></div>
            <div className="pt-6"><input className='text-1xl text-center font-mono text-black border-black border-2 rounded-lg' type='password' placeholder='ENTER PASSWORD' value={password} onChange={(e) => setpassword(e.target.value)} /></div>
          </div>

          <div className='text-center pt-8 text-black '> <button className="bg-indigo-600 text-white hover:bg-indigo-800 w-24 border-2 rounded-lg " onClick={pressedButton}>SIGN UP</button></div>
        </div>
      </div> 
      <PopUp isOpen={isOpen} onClose={handleClose}>
          <h2 className="text-xl  text-white font-semibold">PLEASE FILL ALL THE DETAILS</h2>
`       </PopUp>
    </div>
  )
}

export default Signup