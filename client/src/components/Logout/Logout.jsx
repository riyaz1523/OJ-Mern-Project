import React from 'react'
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { signOut } from '../../redux/user/userSlice'

export default function Logout() {
    const dispatch = useDispatch();

    const handleSignOut = async () => {
        try {
          await fetch('/api/auth/signout');
          dispatch(signOut())
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <button className='py-1.5 px-3 cursor-pointer rounded red-500' onClick={handleSignOut}>
        <FiLogOut />
    </button>
  )
}
