"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { object, string } from "yup"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function Login() {
  const [showPassword, setShowPassword] = useState(false)

  // Validation schema using Yup
  const validationSchema = object().shape({
    email: string().email("Invalid email address").required("Email is required"),
    password: string().min(8, "Password must be at least 8 characters").required("Password is required"),
  })

  const handleSubmit = (values, { setSubmitting }) => {
    // Here you would typically handle authentication
    console.log("Login submitted:", values)

    // Simulate API call
    setTimeout(() => {
      alert("Login successful!")
      setSubmitting(false)
      // Here you would redirect to dashboard or home page
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold">Sign in to your account</h2>
            <p className="mt-2 text-sm text-gray-400">
              Or{" "}
              <Link to="/register" className="text-blue-400 hover:text-blue-500">
                create a new account
              </Link>
            </p>
          </div>

          <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-lg p-8">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="you@example.com"
                      />
                    </div>
                    <ErrorMessage name="email" component="div" className="mt-1 text-red-500 text-xs" />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <Field
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-md py-2 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    <ErrorMessage name="password" component="div" className="mt-1 text-red-500 text-xs" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 bg-zinc-800 border-zinc-700 rounded focus:ring-blue-500 focus:ring-offset-zinc-900"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <Link to="/forgot-password" className="text-blue-400 hover:text-blue-500">
                        Forgot your password?
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                        isSubmitting
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      }`}
                    >
                      {isSubmitting ? "Signing in..." : "Sign in"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Login

