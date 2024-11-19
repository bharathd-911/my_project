import React from 'react' 
import { useNavigate } from 'react-router-dom'
const Home = () => {  
    const navigate=useNavigate();
    const fun=()=>{
        navigate('/SignUp')
    };
  return ( 
    <div className='min-h-screen w-full bg-cover bg-local  bg-center bg-no-repeat  bg-[url("https://th.bing.com/th/id/R.0c03fd93548e16d33e2a387560a41b3e?rik=T4dPtA6d%2bECbvQ&riu=http%3a%2f%2fhdqwalls.com%2fwallpapers%2fbmw-f82-dark-side-car-digital-art-4k-3d.jpg&ehk=kZWPR%2fO62Ad9zBOBF%2f0SQgqHVNURiUUC0QVnkyPcLB0%3d&risl=1&pid=ImgRaw&r=0")]'> 
        <div className='text-white text-3xl font-bold pt-20 px-12'>WELCOME TO BMW <br/><br/></div>
        <div className='text-white text-2xl font-semibold pt-1 px-4'>RESOURCE MANAGEMENT SYSTEM</div>
        <div className=' pt-12 text-black px-32'> <button className="bg-gray-600 text-white hover:bg-gray-800 w-24 border-2 rounded-lg " onClick={fun}>SIGN UP</button></div>
    </div>
  )
}

export default Home