import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { adminLogin } from "../../Redux/Admin/Action";
import { useNavigate } from "react-router-dom";

const AdminLoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const res = useSelector((store) => store.adminLogin);
  console.log("Full Redux Store:", res.adminInfo);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log("mai2", res);
    if (res.adminInfo) {
      navigate("/admin");
    }
  }, [res.adminInfo, navigate]);

  const handleLogin = () => {
    dispatch(adminLogin(email, password));
  };

  return (
    <div>
      <div className="dark:bg-gradient-to-l from-gray-900 to-gray-600 flex justify-center items-center w-screen h-screen p-5">
        <div className="bg-white shadow-md dark:shadow-gray-600 rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full md:w-1/3 dark:bg-gray-800">
          <h1 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-200">
            Admin Login
          </h1>
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                id="email"
                type="email"
                placeholder="Email"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
                className="shadow appearance-none border border-red-500 rounded-md w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                id="password"
                type="password"
                placeholder="******************"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-green-500 hover:bg-green-700 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-green-600"
                type="button"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginForm;
