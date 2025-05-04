import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from "../components/AdminNavbar";
import AdminFooter from "../components/AdminFooter";

// Validation Schema
const CarSchema = Yup.object().shape({
  make: Yup.string().min(2).max(50).required("Make is required"),
  model: Yup.string().min(2).max(50).required("Model is required"),
  year: Yup.number()
    .min(1900)
    .max(new Date().getFullYear() + 1)
    .required("Year is required"),
  price: Yup.string().required("Price is required"),
  totalPrice: Yup.string().required("Total price is required"),
  color: Yup.string().required("Color is required"),
  img: Yup.string().required("Image path is required"),
  description: Yup.string().max(5000),
  rating: Yup.number().min(0).max(5).required("Rating is required"),
  category: Yup.string()
    .oneOf(["SUV", "Economy", "Luxury", "Business"])
    .required("Category is required"),
});

export default function AdminCars() {
  const [cars, setCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);

  const fetchCarsFromBackend = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/cars");
      const data = await res.json();
      setCars(data.data);
    } catch (error) {
      toast.error("Failed to fetch cars");
    }
  };

  const createCarInBackend = async (car) => {
    try {
      const res = await fetch("http://localhost:3000/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(car),
      });
      if (!res.ok) throw new Error("Failed to create");
      const newCar = await res.json();
      setCars((prev) => [...prev, newCar]);
      toast.success(`${newCar.make} ${newCar.model} added!`);
    } catch (error) {
      toast.error("Error adding car");
    }
  };

  const updateCarInBackend = async (car) => {
    try {
      const res = await fetch(`http://localhost:3000/api/cars/${car._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(car),
      });
      if (!res.ok) throw new Error("Failed to update");
      const updatedCar = await res.json();
      setCars((prev) =>
        prev.map((c) => (c._id === updatedCar._id ? updatedCar : c))
      );
      toast.success(`${updatedCar.make} ${updatedCar.model} updated!`);
      setEditingCar(null);
    } catch (error) {
      toast.error("Error updating car");
    }
  };

  const deleteCarFromBackend = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/cars/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      setCars((prev) => prev.filter((car) => car._id !== id));
      toast.info("Car deleted");
    } catch (error) {
      toast.error("Error deleting car");
    }
  };

  useEffect(() => {
    fetchCarsFromBackend();
  }, []);

  const handleFormSubmit = (values, { resetForm }) => {
    const carData = {
      make: values.make,
      model: values.model,
      year: values.year,
      price: `$${values.price}/day`,
      totalPrice: values.totalPrice,
      color: values.color,
      img: values.img,
      description: values.description,
      available: true,
      rating: values.rating,
      category: values.category,
    };

    if (editingCar) {
      updateCarInBackend({ ...carData, _id: editingCar._id });
    } else {
      createCarInBackend(carData);
    }

    resetForm();
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
              {editingCar ? "Edit Car" : "Add New Car"}
            </h3>
            <Formik
              enableReinitialize
              initialValues={
                editingCar || {
                  make: "",
                  model: "",
                  year: new Date().getFullYear(),
                  price: "",
                  totalPrice: "",
                  color: "",
                  img: "",
                  description: "",
                  rating: "",
                  category: "",
                }
              }
              validationSchema={CarSchema}
              onSubmit={handleFormSubmit}
            >
              <Form className="grid gap-4">
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

                <Field
                  name="price"
                  placeholder="Price per day"
                  className="p-2 w-full border border-gray-300 rounded"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <Field
                  name="totalPrice"
                  placeholder="Total Price"
                  className="p-2 w-full border border-gray-300 rounded"
                />
                <ErrorMessage
                  name="totalPrice"
                  component="div"
                  className="text-red-500 text-sm"
                />

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

                <Field
                  name="img"
                  placeholder="Image path (e.g., /assets/car.png)"
                  className="p-2 w-full border border-gray-300 rounded"
                />
                <ErrorMessage
                  name="img"
                  component="div"
                  className="text-red-500 text-sm"
                />

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

                <Field
                  name="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  placeholder="Rating (0 to 5)"
                  className="p-2 w-full border border-gray-300 rounded"
                />
                <ErrorMessage
                  name="rating"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <Field
                  as="select"
                  name="category"
                  className="p-2 w-full border border-gray-300 rounded"
                >
                  <option value="">Select Category</option>
                  <option value="SUV">SUV</option>
                  <option value="Economy">Economy</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Business">Business</option>
                </Field>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-[#3a8aee] text-white py-2 px-4 rounded hover:bg-blue-700"
                  >
                    {editingCar ? "Update Car" : "Add Car"}
                  </button>
                  {editingCar && (
                    <button
                      type="button"
                      onClick={() => setEditingCar(null)}
                      className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </Form>
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
                    <th className="p-2 border-b">Price per day</th>
                    <th className="p-2 border-b">Price of the car</th>
                    <th className="p-2 border-b">Color</th>
                    <th className="p-2 border-b">Rating</th>
                    <th className="p-2 border-b">Category</th>
                    <th className="p-2 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((car) => (
                    <tr key={car._id} className="hover:bg-gray-50">
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
                        {car.price}
                      </td>
                      <td className="p-2 border-b border-gray-100">
                        {car.totalPrice}
                      </td>
                      <td className="p-2 border-b border-gray-100">
                        {car.color}
                      </td>
                      <td className="p-2 border-b border-gray-100">
                        {car.rating}
                      </td>
                      <td className="p-2 border-b border-gray-100">
                        {car.category}
                      </td>
                      <td className="p-2 border-b border-gray-100 flex gap-2">
                        <button
                          onClick={() => setEditingCar(car)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteCarFromBackend(car._id)}
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
