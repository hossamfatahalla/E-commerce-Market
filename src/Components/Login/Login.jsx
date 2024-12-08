import React, { useContext } from "react";
import Style from "./Login.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CounterContext } from "../../Context/CounnterContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("pls enter email")
    .email("pls enter valid email"),
  password: Yup.string()
    .required("pls enter valid pass")
    .matches(/[A-Z].{6,}/, "must start with....."),
});

export default function Login() {
  const { counter, setcounter } = useContext(CounterContext);
  const {token, setToken} = useContext(UserContext)
  useEffect(() => {
    console.log("mount is did");
  }, []);

  const [isLoading, setisLoading] = useState(false);
  const [errorMsg, seterrorMsg] = useState(null);
  const navigate = useNavigate();
  async function handelSubmit(userInfo) {
    try {
      setisLoading(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        userInfo
      );
      seterrorMsg(null);
      localStorage.setItem("token" , data.token);
      setToken(data.token)
      navigate('/home');
      console.log(data);
    } catch (err) {
      seterrorMsg("fe moshkla");
    } finally {
      setisLoading(false);
    }
  }

  const x = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: validationSchema,
    onSubmit: handelSubmit,
  });

  return (
    <div className="my-5">
      <form onSubmit={x.handleSubmit} className="max-w-sm mx-auto">
        {errorMsg ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {errorMsg}{" "}
          </div>
        ) : null}
        <h2 className="mb-5 text-green-500 font-bold">Login Form</h2>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
           
            Your email
          </label>
          <input
            name="email"
            onChange={x.handleChange}
            onBlur={x.handleBlur}
            value={x.values.email}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          />
        </div>
        {x.errors.email && x.touched.email ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {x.errors.email}{" "}
          </div>
        ) : null}
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            name="password"
            value={x.values.password}
            onChange={x.handleChange}
            onBlur={x.handleBlur}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          />
        </div>
        {x.errors.password && x.touched.password ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {x.errors.password}
          </div>
        ) : null}

        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {isLoading ? "loading...." : "submit"}
        </button>



        <p className="text-sm mt-2">
        <Link to="/resetPassword" className="text-blue-600 hover:underline">
          Forgot your password?
        </Link>
      </p>
      </form>
    </div>
  );
}
