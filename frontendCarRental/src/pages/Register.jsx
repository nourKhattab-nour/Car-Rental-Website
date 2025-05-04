import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = object().shape({
    email: string()
      .email("Invalid email address")
      .required("Email is required")
      .matches(/^[^@]+@[^@]+\.[^@]+$/, "Invalid email format")
      .test(
        "no-test-domain",
        "Email domain '.test' is not supported",
        (value) => {
          return value && !value.endsWith(".test");
        }
      ),
    password: string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
      .notOneOf(["password"], 'Password cannot be "password"')
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      console.log(values);

      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Register failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "/HomePage";
    } catch (error) {
      console.log(error.errors);

      setErrors({ password: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary text-white flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold">
              Sign up a new account
            </h2>
          </div>

          <div className="mt-8 bg-[#111111] border border-zinc-800 rounded-lg p-8 shadow-lg">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-1"
                    >
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
                        className="w-full bg-[#111111] border border-zinc-700 rounded-md py-2 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="you@example.com"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="mt-1 text-red-500 text-xs"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium mb-1"
                    >
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
                        className="w-full bg-[#111111] border border-zinc-700 rounded-md py-2 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="mt-1 text-red-500 text-xs"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                        isSubmitting
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-[#4d9fff] hover:bg-[#3a8aee] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      }`}
                    >
                      {isSubmitting ? "Signing up..." : "Sign up"}
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
  );
}

export default Register;
