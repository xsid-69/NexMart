import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { asyncdeleteUser, asyncLogoutUsers, asyncupdateUser } from '../../store/actions/userActions';

const UserProfile = () => {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      username: user?.username,
      email: user?.email,
      image: user?.image,
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        email: user.email,
        password: "",
      });
    }
  }, [user, reset]);

  const UpdateUserHandler = (data) => {
    const updatedUser = { ...user, ...data };
    dispatch(asyncupdateUser(updatedUser));
    navigate(-1);
  };

  if (!user) {
    return <div className="text-center text-2xl mt-10">User not found or loading...</div>;
  }
  
  const Deletehandler = ()=> {
      dispatch(asyncdeleteUser(user.id));
      navigate("/login")
    }
  const Logouthandler = ()=> {
      dispatch(asyncLogoutUsers());
      navigate("/login")
    }
  return (
    <div className="p-10 bg-blue-300 h-full">
      <h1 className="text-2xl font-bold mb-5">User Profile</h1>
      <form onSubmit={handleSubmit(UpdateUserHandler)} className='flex flex-col justify-start items-start'>
        <input
          {...register("username")}
          type="text"
          placeholder='Username'
          className='mb-3 outline-0 border-b p-2 text-2xl'
        />
        <input
          {...register("email")}
          type="email"
          placeholder='Email'
          className='mb-3 outline-0 border-b p-2 text-2xl'
        />
        <input
          {...register("password")}
          type="text"
          placeholder='********'
          className='mb-3 outline-0 border-b p-2 text-2xl'
        />
        <button
          className='h-10 w-40 mb-5 bg-blue-500 text-white rounded active:scale-105'
        >
          Update Profile
        </button>
      </form>
      <button  onClick={Deletehandler}
      className='bg-red-500 p-2 rounded'>
        Delete User
      </button>
      <button  onClick={Logouthandler}
      className='bg-red-400 p-2 m-3 rounded'>
        Logout User
      </button>
    </div>
  );
};

export default UserProfile;
