import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ContactSchema = Yup.object().shape({
  firstName: Yup.string().min(2).max(72).required("First Name is required"),
  lastName: Yup.string().min(2).max(72).required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter a valid email"),
  message: Yup.string().min(2).max(5000).required("Required"),
  queryType: Yup.string()
    .oneOf(["General Enquiry", "Support Request"])
    .required("Query Type is required"),
  consent: Yup.boolean().oneOf([true], "Consent is required"),
});

export default function ContactForm() {
  return (
    <section className="my-10 lg:my-0 lg:flex lg:items-center lg:justify-center lg:h-screen bg-secondary">
      <div className="bg-[#111111] p-4 rounded-lg shadow-md max-w-2xl mx-auto w-full">
        <h2 className="text-white text-center lg:text-left text-2xl font-semibold mb-8">
          {" "}
          Contact Form{" "}
        </h2>
        <ToastContainer theme="colored" position="top-center" />

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            message: "",
            queryType: "",
            consent: false,
          }}
          validationSchema={ContactSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              const response = await fetch(
                "http://localhost:3000/api/contact",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(values),
                }
              );

              const data = await response.json();

              if (!response.ok) {
                throw new Error(data.error || "Failed to submit");
              }

              toast.success("Form successfully submitted!");
              resetForm();
            } catch (err) {
              toast.error(err.message || "Submission failed.");
            }
          }}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <Form className="grid gap-4">
              <div className="grid lg:grid-cols-2 gap-4">
                <article>
                  <label htmlFor="first-name" className="mb-2 text-gray-300">
                    {" "}
                    First Name *
                  </label>
                  <Field name="firstName" id="first-name" />
                  {errors.firstName && touched.firstName ? (
                    <div className=" text-rose-500 text-sm">
                      {" "}
                      {errors.firstName}
                    </div>
                  ) : null}
                </article>

                <article>
                  <label htmlFor="last-name" className="mb-2 text-gray-300">
                    {" "}
                    Last Name *
                  </label>
                  <Field name="lastName" id="last-name" />
                  {errors.lastName && touched.lastName ? (
                    <div className=" text-rose-500 text-sm">
                      {" "}
                      {errors.lastName}
                    </div>
                  ) : null}
                </article>
              </div>

              <div>
                <label htmlFor="email-adress" className="mb-2 text-gray-300">
                  {" "}
                  Email Adress *
                </label>
                <Field name="email" id="email-address" />
                {errors.email && touched.email ? (
                  <div className=" text-rose-500 text-sm"> {errors.email}</div>
                ) : null}
              </div>

              <div>
                <label htmlFor="query-type" className="mb-2 text-gray-300">
                  {" "}
                  Query Type *
                </label>
                <article className="grid gap-4 lg:grid-cols-2">
                  {["General Enquiry", "Support Request"].map((option) => (
                    <div
                      key={option}
                      className={`border-2 rounded py-2 px-4 text-sm transition text-white cursor-pointer ${
                        values.queryType === option
                          ? "border-[#4d9fff]"
                          : "border-gray-700 hover:border-[#4d9fff]"
                      }`}
                      onClick={() => setFieldValue("queryType", option)}
                    >
                      <input
                        type="radio"
                        name="queryType"
                        value={option}
                        checked={values.queryType === option}
                        onChange={() => setFieldValue("queryType", option)}
                        className="w-auto mr-2"
                      />
                      {option}
                    </div>
                  ))}
                </article>
              </div>
              <div>
                <label htmlFor="message" className=" mb-2 text-gray-300">
                  {" "}
                  Message *
                </label>
                <Field name="message" id="message" cols="30" rows="10"></Field>
                {errors.message && touched.message ? (
                  <div className=" text-rose-500 text-sm">
                    {" "}
                    {errors.message}
                  </div>
                ) : null}
              </div>

              <div className="text-white text-sm">
                <div className="flex items-center gap-2">
                  <label>
                    <input
                      type="checkbox"
                      name="consent"
                      checked={values.consent}
                      onChange={(e) =>
                        setFieldValue("consent", e.target.checked)
                      }
                      className="w-auto text-white"
                    />
                  </label>
                  <span> I consent to being contacted by the team *</span>
                </div>

                {errors.consent && touched.consent && (
                  <div className="text-rose-500 text-sm">{errors.consent}</div>
                )}
              </div>

              <button
                type="submit"
                className="bg-[#4d9fff] text-white font-semibold py-2 px-4 rounded hover:bg-[#3a8aee] transition"
              >
                {" "}
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
