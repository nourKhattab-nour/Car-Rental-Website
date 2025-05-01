import { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar.jsx";
import Feedback from "../components/Home Components/Feedback/Feedback.jsx";
import AdminFooter from "../components/AdminFooter.jsx";
import { Star, Trash2 } from "lucide-react";

const ManageReviews = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/contact");
        const data = await res.json();
        setContacts(data);
      } catch (err) {
        console.error("Failed to fetch contact requests", err);
      }
    };

    fetchContacts();
  }, []);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadReviews = () => {
      const savedReviews = localStorage.getItem("customerReviews");
      if (savedReviews) {
        setReviews(JSON.parse(savedReviews));
      }
    };

    // Load reviews initially
    loadReviews();

    // Set up event listener for storage changes
    // This ensures the component updates if reviews are added from another component
    const handleStorageChange = () => {
      loadReviews();
    };

    window.addEventListener("storage", handleStorageChange);

    // Clean up event listener
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Delete a review
  const deleteReview = (reviewId) => {
    const updatedReviews = reviews.filter((review) => review.id !== reviewId);
    setReviews(updatedReviews);
    localStorage.setItem("customerReviews", JSON.stringify(updatedReviews));
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <AdminNavbar />

      {/* Admin Reviews Management Section */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Manage Customer Reviews
        </h1>

        {reviews.length === 0 ? (
          <div className="bg-gray-100 rounded-lg p-8 text-center mb-12">
            <p className="text-gray-500">No reviews have been submitted yet.</p>
          </div>
        ) : (
          <div className="mb-12">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">
                        {review.name}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {formatDate(review.timestamp)}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteReview(review.id)}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                      title="Delete review"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex my-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          review.rating >= star
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-400"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="mt-3 text-gray-700">{review.comment}</p>
                  <p className="mt-2 text-sm text-gray-400">{review.email}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Feedback Component */}
      <Feedback />

      {/* Contact Requests Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Contact Requests
        </h2>

        {contacts.length === 0 ? (
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <p className="text-gray-500">No contact requests submitted yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg"
              >
                <h3 className="font-bold text-lg text-gray-800">
                  {contact.firstName} {contact.lastName}
                </h3>
                <p className="text-sm text-gray-400 mb-1">{contact.email}</p>
                <p className="text-sm text-gray-400 mb-1 italic">
                  {contact.queryType}
                </p>
                <p className="text-gray-700 mt-2">{contact.message}</p>
                <p className="text-xs text-gray-400 mt-3">
                  {new Date(contact.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <AdminFooter />
    </div>
  );
};

export default ManageReviews;
