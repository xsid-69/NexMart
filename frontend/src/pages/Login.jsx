import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import { asyncLoginUsers } from '../store/actions/userActions';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LoginHandler = async (user) => {
    const data = await dispatch(asyncLoginUsers(user));
    if (data && data.length > 0) {
      navigate("/products");
      toast.success("User Logged-in");
    } else {
      toast.error("Invalid credentials");
    }
  };

	return (
		<div className="flex items-center justify-center min-h-screen bg-blue-300">
			<div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
				<div className="flex flex-col justify-center p-8 md:p-14">
					<span className="mb-3 text-4xl font-bold">Welcome back</span>
					<span className="font-light text-gray-400 mb-8">
						Welcome back! Please enter your details
					</span>
					<form onSubmit={handleSubmit(LoginHandler)}>
						<div className="py-4">
							<span className="mb-2 text-md text-black">Email</span>
							<input
								{...register("email")}
								type="email"
								className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
								name="email"
								id="email"
							/>
						</div>
						<div className="py-4">
							<span className="mb-2 text-md text-black">Password</span>
							<input
								{...register("password")}
								type="password"
								name="pass"
								id="pass"
								className="w-full p-2 border border-gray-300 rounded-md  placeholder:color-black"
							/>
						</div>

						<button
							type="submit"
							className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
						>
							Sign in
						</button>
					</form>
					<div className="text-center text-gray-400">
						Dont have an account?
						<Link to="/register" className="font-bold text-black">
							Sign up for free
						</Link>
					</div>
				</div>

				<div className="relative">
					<img
						src="https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074076.jpg"
						alt="img"
						className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
					/>
				</div>
			</div>
		</div>
	);
};

export default Login;
