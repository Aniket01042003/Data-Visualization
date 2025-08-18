import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, googlelogin, login } from "../../Redux/Auth/Action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, message } = useSelector((store) => store.auth);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("jwt", token);
      dispatch(googlelogin(token));
      dispatch(getUser(token));
      toast.success("Google Login Successful!");
      setTimeout(() => navigate("/"), 1000);
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    dispatch(login(userData))
      .then((res) => {
        if (res.success) {
          toast.success("Login Successful");
          setTimeout(() => navigate("/"), 1000);
        } else {
          toast.error(res.message || "Invalid Credentials");
        }
      })
      .catch(() => toast.error("Something went wrong. Try again!"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  flex items-center justify-center from-black via-gray-900 to-black text-[#00acc1] py-10 px-4">
      <div className="w-full max-w-4xl flex flex-col justify-center lg:flex-row bg-black/40 backdrop-blur-md rounded-xl overflow-hidden shadow-[0_0_30px_5px_#00acc1]">

        {/* Left Panel */}
        <div className="lg:w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-2 tracking-wide">Welcome Back 👋</h1>
          <p className="text-[#00acc1]/70 mb-6">Please login to your account</p>

          {/* Google Login */}
          <Link to="http://localhost:5000/auth/google" className="w-full">
            <button className="w-full py-3 border border-[#00acc1] rounded-md text-[#00acc1]  transition-all duration-300 flex items-center justify-center gap-2 mb-6">
              <div className=" p-2 rounded-full">
                <svg className="w-4" viewBox="0 0 533.5 544.3">
                  <path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4" />
                  <path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853" />
                  <path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04" />
                  <path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335" />
                </svg>
              </div>
              <span>Sign in with Google</span>
            </button>
          </Link>

          {/* Divider */}
          <div className="relative text-center my-6">
            <span className="px-4 bg-black z-10 relative text-sm tracking-wider">OR</span>
            <div className="absolute top-1/2 left-0 w-full h-px bg-[#00acc1]/40 transform -translate-y-1/2"></div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 text-sm">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-transparent border border-[#00acc1] rounded-md placeholder-[#00acc1]/50 text-[#00acc1] focus:outline-none focus:ring-2 focus:ring-[#00acc1]/80 transition"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Password</label>
              <input
                type="password"
                name="password"
                required
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-transparent border border-[#00acc1] rounded-md placeholder-[#00acc1]/50 text-[#00acc1] focus:outline-none focus:ring-2 focus:ring-[#00acc1]/80 transition"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#00acc1] text-black font-semibold rounded-md hover:bg-[#00cde0] transition-all duration-300 shadow-md"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-xs text-[#00acc1]/70 text-center">
            By signing in, you agree to our{" "}
            <a href="#" className="underline hover:text-white">Terms</a> &{" "}
            <a href="#" className="underline hover:text-white">Privacy Policy</a>
          </p>
        </div>

        {/* Right Panel */}
        <div className="flex-1 justify-center items-center text-center hidden lg:flex">
          {/* <img src="src/assets/login.jpg" className="" alt="img not loaded" /> */}
          <div className="w-[70%] h-[70%]" >
            <img src="src/assets/g1.svg" className="" alt="img not loaded" />
            {/* <span onClick={()=>alert('Please login to access your account')}>click me</span> */}

          </div>


        </div>
      </div>
    </div>
  );
};

export default Login;


// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getUser, googlelogin, login } from "../../Redux/Auth/Action";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Link, useNavigate } from "react-router-dom";
// // import loginImage from '../../assets/login.jpeg';


// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { error, message } = useSelector((store) => store.auth);


//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const token = params.get("token")
//     console.log("logineffect token ", token);

//     if (token) {
//       localStorage.setItem("jwt", token);
//       dispatch(googlelogin(token));
//       dispatch(getUser(token));
//       toast.success("Google Login Successful!");

//       setTimeout(() => {
//         navigate("/");
//       }, 1000);
//     }
//   }, [location]);


//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const data = new FormData(e.currentTarget);
//     console.log("userData ", data)
//     const userData = {
//       email: data.get("email"),
//       password: data.get("password")
//     };
//     dispatch(login(userData))
//       .then((res) => {
//         if (res.success) {
//           toast.success("Login Successful");
//           setTimeout(() => {
//             navigate("/");
//             // setFile(null);
//           }, 1000);
//         } else {
//           toast.error(res.message || "Invalid Credentials");
//         }
//       })
//       .catch(() => {
//         toast.error("Something went wrong. Try again!");
//       });
//     console.log("userData ", userData)

//   }


//   return (
//     <div className="min-h-screen bg-green-00 text-gray-900 flex justify-center">
//       <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
//         <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
//           <div>
//             <img
//               src="https://tailwindflex.com/images/logo.svg"
//               className="w-[2rem] h-[2rem]"
//               alt="Logo"
//             />
//           </div>
//           <div className="mt-12 flex flex-col items-center">
//             <div className="w-full flex-1 mt-8">
//               <Link to='http://localhost:5000/auth/google' >
//                 <div className="flex flex-col items-center">
//                   <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
//                     <div className="bg-white p-2 rounded-full">
//                       <svg className="w-4" viewBox="0 0 533.5 544.3">
//                         <path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4" />
//                         <path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853" />
//                         <path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04" />
//                         <path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335" />
//                       </svg>
//                     </div>
//                     <span className="ml-4">LogIn with Google
//                     </span>
//                   </button>

//                 </div>
//               </Link>
//               <div className="my-12 border-b text-center">
//                 <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
//                   Or sign In with Cartesian E-mail
//                 </div>
//               </div>
//               <form onSubmit={handleSubmit} >
//                 <div className="mx-auto max-w-xl">
//                   <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" type="email" name='email' required placeholder="Email" />
//                   <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5" type="password" name='password' required placeholder="Password" />
//                   <button type='submit' className="mt-5 tracking-wide font-semibold bg-green-400 text-white w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
//                     <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
//                       <circle cx="8.5" cy="7" r="4" />
//                       <path d="M20 8v6M23 11h-6" />
//                     </svg>
//                     <span className="ml-2">Sign In</span>
//                   </button>
//                   <p className="mt-6 text-xs text-gray-600 text-center">
//                     I agree to abide by Cartesian Kinetics
//                     <a href="#" className="border-b border-gray-500 border-dotted"> Terms of Service </a>
//                     and its
//                     <a href="#" className="border-b border-gray-500 border-dotted"> Privacy Policy </a>
//                   </p>
//                 </div></form>
//             </div>
//           </div>
//         </div>
//         <div className="flex-1 bg-green-100 text-center hidden lg:flex">
//           <img src="src/assets/login.jpg" className="" alt="img not loaded" />


//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
