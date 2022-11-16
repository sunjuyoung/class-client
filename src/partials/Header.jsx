import React, { useContext, useEffect, useState } from 'react';
import SearchModal from './header/SearchModal';
import Notifications from './header/Notifications';
import Help from './header/Help';
import UserMenu from './header/UserMenu';
import AuthContext from '../context/AuthProvider';
import { Link } from 'react-router-dom';

function Header({
  sidebarOpen,
  setSidebarOpen
}) {

  const {auth} = useContext(AuthContext);
  console.log(auth)
  const [searchModalOpen, setSearchModalOpen] = useState(false)

  
  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">

          {/* Header: Left side */}
          <div className="flex">
            <p className=' text-gray-700 font-adel font-serif text-2xl'>
              <Link to="/">Study Class</Link></p>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center">

            <button
              className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition duration-150 rounded-full ml-3 ${searchModalOpen && 'bg-slate-200'}`}
              onClick={(e) => { e.stopPropagation(); setSearchModalOpen(true); }}
              aria-controls="search-modal"
            >
              <span className="sr-only">Search</span>
              <svg className="w-4 h-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path className="fill-current text-slate-500" d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                <path className="fill-current text-slate-400" d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
              </svg>
            </button>
            <SearchModal id="search-modal" searchId="search" modalOpen={searchModalOpen} setModalOpen={setSearchModalOpen} />
            <Notifications />
            <Help />
            {/*  Divider */}
            <hr className="w-px h-6 bg-slate-200 mx-3" />

            {auth ? (<UserMenu />) : 
            (<><Link to="/login">Sign In</Link> <hr className="w-px h-6 bg-slate-200 mx-3" /><Link to="/signUp">Sign Up</Link></>)}
            
            
           
            
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;