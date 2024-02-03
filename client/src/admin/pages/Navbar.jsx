import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const [token,setToken] = useState("");
  const [isAdmin,setIsAdmin] = useState(false);
  const navigate = useNavigate();

  
 

  const storedToken = localStorage.getItem('authToken');

  useEffect(() => {
    setToken(storedToken);

    if(token){
      const decodeToken = jwtDecode(storedToken);
      if(decodeToken.role === 'admin'){
        setIsAdmin(true);
        // fetchData();
      }
      else{
        alert("you are unauthorized");
        navigate('admin/auth');
      }
    }
  }, [token]);
    
    const handleNavigate = () => {
      if(isAdmin){
        navigate('/admin');
      }
      else{
        navigate('/purchases');
      }
    }

    const handleSignout = () =>{
      localStorage.removeItem("authToken");
      setToken("");
      navigate("/");
    }
   

  return (
    <header className="text-gray-600 body-font">
  <div className="container mx-auto flex justify-between flex-wrap p-5 flex-col md:flex-row items-center">
    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href='/'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinejoin="round"  strokeWidth="2" className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
      <span className="ml-3 text-xl">Coursify</span>
    </a>
   
      {
        !token ?(
          <div>

    <button className="inline-flex items-center mx-5 bg-gray-100 border-0 py-2 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" onClick={() => navigate('/auth',{ state: { from: location.pathname } })}>SignUp
     
      
    </button>
    <button className="inline-flex items-center bg-gray-100 border-0 py-2 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" onClick={() => navigate('/auth',{ state: { from: location.pathname } })}>LogIn
    
    </button>
    </div>

        ): (
          <div className='flex align-center'>
          <button className="inline-flex items-center  border-0 mx-4  focus:outline-none rounded text-base mt-4 md:mt-0" onClick={() => handleNavigate()}>
          {/* <button className="inline-flex items-center  border-0 mx-4  focus:outline-none rounded text-base mt-4 md:mt-0" onClick={() => navigate('/purchases')}> */}

          <svg className="w-8 h-8 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                </svg>
                </button>
                <button className="inline-flex items-center bg-gray-100 border-0 py-2 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" onClick={handleSignout}>SignOut
    
                </button>
</div>

        )

      }
  </div>
</header>
  )
}

export default Navbar