import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from "../components/AdminNavbar";
import AdminFooter from "../components/AdminFooter";

const initialCars = [
  {
    id: 1,
    make: "Toyota",
    model: "Camry",
    year: 2022,
    price: 25000,
    color: "Silver",
    available: true,
  },
  {
    id: 2,
    make: "Honda",
    model: "Civic",
    year: 2021,
    price: 22000,
    color: "Blue",
    available: true,
  },
  {
    id: 3,
    make: "Ford",
    model: "Mustang",
    year: 2023,
    price: 45000,
    color: "Red",
    available: false,
  },
];

const CarSchema = Yup.object().shape({
  make: Yup.string()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("Make is required"),
  model: Yup.string()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("Model is required"),
  year: Yup.number()
    .min(1900, "Year must be after 1900")
    .max(new Date().getFullYear() + 1, "Year cannot be in the future")
    .required("Year is required"),
  price: Yup.number()
    .min(0, "Price cannot be negative")
    .required("Price is required"),
  color: Yup.string().required("Color is required"),
  description: Yup.string().max(5000, "Too long"),
});

export default function AdminCars() {
  const [cars, setCars] = useState(initialCars);

  const handleAddCar = (values, { resetForm }) => {
    const newCar = {
      id: cars.length > 0 ? Math.max(...cars.map((car) => car.id)) + 1 : 1,
      make: values.make,
      model: values.model,
      year: values.year,
      price: values.price,
      color: values.color,
      description: values.description,
      available: values.available,
    };

    setCars([...cars, newCar]);
    toast.success(`${values.make} ${values.model} successfully added!`);
    resetForm();
  };

  const handleDeleteCar = (id) => {
    const carToDelete = cars.find((car) => car.id === id);
    setCars(cars.filter((car) => car.id !== id));
    toast.info(`${carToDelete?.make} ${carToDelete?.model} has been removed`);
  };

  return (
    <>
      <AdminNavbar />
      <section className="my-10 lg:my-0 lg:flex lg:flex-col lg:justify-center lg:min-h-screen bg-white p-4">
        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md max-w-4xl mx-auto w-full mb-8">
          <h2 className="text-gray-800 text-center text-2xl font-semibold mb-8">
            Admin Car Management
          </h2>
          <ToastContainer theme="colored" position="top-center" />

          <div className="mb-10">
            <h3 className="text-gray-800 text-xl font-medium mb-4">
              Add New Car
            </h3>
            <Formik
              initialValues={{
                make: "",
                model: "",
                year: new Date().getFullYear(),
                price: "",
                color: "",
                description: "",
                available: true,
              }}
              validationSchema={CarSchema}
              onSubmit={handleAddCar}
            >
              {({ errors, touched }) => (
                <Form className="grid gap-4">
                  <div>
                    <Field
                      name="make"
                      placeholder="Make"
                      className="p-2 w-full border border-gray-300 rounded"
                    />
                    <ErrorMessage
                      name="make"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <Field
                      name="model"
                      placeholder="Model"
                      className="p-2 w-full border border-gray-300 rounded"
                    />
                    <ErrorMessage
                      name="model"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <Field
                      name="year"
                      type="number"
                      placeholder="Year"
                      className="p-2 w-full border border-gray-300 rounded"
                    />
                    <ErrorMessage
                      name="year"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <Field
                      name="price"
                      type="number"
                      placeholder="Price"
                      className="p-2 w-full border border-gray-300 rounded"
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <Field
                      name="color"
                      placeholder="Color"
                      className="p-2 w-full border border-gray-300 rounded"
                    />
                    <ErrorMessage
                      name="color"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <Field
                      name="description"
                      as="textarea"
                      placeholder="Description"
                      className="p-2 w-full border border-gray-300 rounded"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                   
                  </div>
                  <button
                    type="submit"
                    className="bg-[#3a8aee] text-white py-2 px-4 rounded hover:bg-blue-700"
                  >
                    Add Car
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md max-w-4xl mx-auto w-full">
          <h3 className="text-gray-800 text-xl font-medium mb-4">
            Manage Existing Cars
          </h3>

          {cars.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No cars available in the inventory
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-gray-800 border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-2 border-b">Make</th>
                    <th className="p-2 border-b">Model</th>
                    <th className="p-2 border-b">Year</th>
                    <th className="p-2 border-b">Price</th>
                    <th className="p-2 border-b">Color</th>
                    <th className="p-2 border-b">Available</th>
                    <th className="p-2 border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((car) => (
                    <tr key={car.id} className="hover:bg-gray-50">
                      <td className="p-2 border-b border-gray-100">
                        {car.make}
                      </td>
                      <td className="p-2 border-b border-gray-100">
                        {car.model}
                      </td>
                      <td className="p-2 border-b border-gray-100">
                        {car.year}
                      </td>
                      <td className="p-2 border-b border-gray-100">
                        ${car.price}
                      </td>
                      <td className="p-2 border-b border-gray-100">
                        {car.color}
                      </td>
                      <td className="p-2 border-b border-gray-100">
                        {car.available ? "Yes" : "No"}
                      </td>
                      <td className="p-2 border-b border-gray-100">
                        <button
                          onClick={() => handleDeleteCar(car.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
      <AdminFooter />
    </>
  );
}
