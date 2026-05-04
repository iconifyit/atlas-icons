import { useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../../services/authService";
import { Navigate } from "react-router-dom";
import useInput from "../../hooks/use-input";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

const Loign = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const {
    value: email,
    isValid: emailValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(isEmail);

  const {
    value: password,
    isValid: passwordValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(isNotEmpty);

  let formIsValid = false;


  if (
    emailValid &&
    passwordValid
  ) {
    formIsValid = true;
  }


  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    setLoading(true)
    try {
      await auth.login(email, password)
      // navigate("/admin/package-list");
      window.location  = "/admin/package-list"
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setLoading(false)
        setError(err.response.data)
      }
    }
  };

  if (auth.getCurrentUser()) return <Navigate to="/admin/package-list" />;


  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-24 sm:px-6 lg:px-8">

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {
              error &&
              <div className="rounded-md bg-red-50 p-4 mb-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      {error}
                    </h3>
                  </div>
                </div>
              </div>
            }
            <form className="space-y-6" onSubmit={formSubmissionHandler}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={emailChangedHandler}
                    onBlur={emailBlurHandler}
                    value={email}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                {emailInputHasError && (
                  <p className="text-sm text-red-500">Please enter a valid email.</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={passwordChangedHandler}
                    onBlur={passwordBlurHandler}
                    value={password}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                {passwordInputHasError && (
                  <p className="text-sm text-red-500">Password is required.</p>
                )}
              </div>


              <div>
                {/* disabled={!formIsValid} */}
                <button
                  disabled={loading}
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {loading && <LoadingSpinner />}
                  {!loading && <span>Sign in</span>}

                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}


export default Loign;