import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup" 
import { toast, ToastContainer } from "react-toastify";
import'react-toastify/dist/ReactToastify.css';
const ContactSchema = Yup.object().shape({
    firstName: Yup.string().min(2,"Too short!").max(72,"Too long!").required("First Name is required"),
    lastName: Yup.string().min(2,"Too short!").max(72,"Too long!").required("Last Name is required"),
    email: Yup.string().email('Invalid email').required('Please enter a valid email'),
    message: Yup.string().min(2,"Too short!").max(5000,"Too long").required("Required")
})
export default function ContactForm(){
return (
<section className="my-10 lg:my-0 lg:flex lg:items-center lg:justify-center lg:h-screen">
<div className=" bg-white p-4 rounded-lg shadow max-w-2xl mx-auto w-full"> 
    <h2 className="text-teal-950 text-center lg:text-left text-2xl font-semibold mb-8"> Contact Form </h2>
    <ToastContainer theme="colored" position="top-center"/> 

    <Formik initialValues={{
        firstName:"",
        lastName:"",
         email:"",
         message:"",
    }} validationSchema={ContactSchema} onSubmit={(values) =>toast.success("Form successfully submitted!") }>
 {({ errors, touched}) => (
    <Form className="grid gap-4"> 
        <div className="grid lg:grid-cols-2 gap-4">
            <article>
                <label htmlFor="first-name" className="mb-2"> First Name *</label>
                <Field  name="firstName" id="first-name"/>
                {errors.firstName && touched.firstName ? (
                    <div className=" text-rose-500 text-sm"> {errors.firstName}</div>
                ):null }
            </article>  
 
            <article>
                <label htmlFor="last-name" className="mb-2"> Last Name *</label>
                <Field name="lastName" id="last-name"/>
                {errors.lastName && touched.lastName ? (
                    <div className=" text-rose-500 text-sm"> {errors.lastName}</div>
                ):null }
            </article>
        </div>

        <div> 
            <label htmlFor="email-adress" className="mb-2"> Email Adress *</label>
            <Field name="email" id="email-address"/> 
            {errors.email && touched.email ? (
                    <div className=" text-rose-500 text-sm"> {errors.email}</div>
                ):null }
        </div>

        <div>
                <label htmlFor="query-type" className="mb-2"> Query Type *</label>
                <article className="grid gap-4 lg:grid-cols-2">
                <div className="border-2 border-slate-400 rounded py-2 px-4 text-sm hover:border-teal-700 focus:border-teal-700 transition">
                <input type="radio" name="general-enquiry" id="general-enquiry" className="w-auto"/> {" "}General Enquiry
                </div>
                <div className="border-2 border-slate-400 rounded py-2 px-4 text-sm hover:border-teal-700 focus:border-teal-700 transition">
                <input type="radio" name="support-request" id="support-request" className="w-auto"/> {" "}Support Request
                </div>
            </article>
        </div>
        <div>
            <label htmlFor="message" className=" mb-2"> Message *</label>
            <Field name="message" id="message" cols="30" rows="10"></Field>
            {errors.message && touched.message ? (
                    <div className=" text-rose-500 text-sm"> {errors.message}</div>
                ):null }
        </div>

        <div className="text-teal-800 text-sm">
            <input type="checkbox" name="conset" id="consent" className="w-auto"/> I consent to being contacted by the team *
        </div>

        <button type="submit" className="bg-teal-800 text-white font-semibold py-2 px-4 rounded hover:bg-teal-900 transition"> Submit</button>
    
    </Form>
 )}
    </Formik>
</div>
</section>
);
}