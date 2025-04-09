import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for a Smooth Road Trip Experience",
      author: "Sarah Johnson",
      date: "March 15, 2025",
      image:
        "https://static.blog.bolt.eu/LIVE/wp-content/uploads/2024/11/25142351/Road-trip-tips-1-1024x536.jpg",
      excerpt:
        "Planning a road trip? Check out these essential tips to make your journey comfortable, safe, and memorable.",
      categories: ["tips", "travel"],
      featured: true,
    },
    {
      id: 2,
      title: "How to Choose the Perfect Rental Car for Your Needs",
      author: "Michael Chen",
      date: "March 10, 2025",
      image:
        "https://www.japjitravel.com/blog/wp-content/uploads/2024/01/Rental-Car-For-Your-Needs-1.webp",
      excerpt:
        "From compact cars to luxury SUVs, learn how to select the ideal rental vehicle for your specific requirements and budget.",
      categories: ["tips", "cars"],
      featured: true,
    },
    {
      id: 3,
      title: "The Ultimate Guide to Driving in Europe",
      author: "Emma Wilson",
      date: "March 5, 2025",
      image:
        "https://www.islands.com/img/gallery/follow-one-crucial-rule-to-avoid-looking-like-a-tourist-while-driving-in-italy/intro-1718391441.jpg",
      excerpt:
        "Everything you need to know about driving regulations, road signs, and cultural differences when driving across European countries.",
      categories: ["travel", "international"],
    },
    {
      id: 4,
      title: "5 Scenic Routes for Your Next Weekend Getaway",
      author: "David Thompson",
      date: "February 28, 2025",
      image:
        "https://cdn.shopify.com/s/files/1/0032/3423/4479/files/pch_grande.jpg?v=1595604829",
      excerpt:
        "Discover breathtaking drives within a few hours of major cities that make for perfect weekend escapes.",
      categories: ["travel", "destinations"],
    },
  ];

  // Extract unique categories
  const categories = [
    "all",
    ...new Set(blogPosts.flatMap((post) => post.categories)),
  ];

  useEffect(() => {
    let filtered = blogPosts;

    if (activeCategory !== "all") {
      filtered = filtered.filter((post) =>
        post.categories.includes(activeCategory)
      );
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query)
      );
    }

    setFilteredPosts(filtered);
  }, [activeCategory, searchQuery]);

  const featuredPosts = blogPosts.filter((post) => post.featured);

  return (
    <div className="bg-secondary text-white">
      <Navbar />

      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Car Rental Blog</h1>
          <p className="text-gray-400">
            Tips and insights for your car rental experience
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 bg-gray-900 rounded-md w-full md:w-64"
          />

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1 rounded-full text-sm capitalize ${
                  activeCategory === category
                    ? "bg-blue-400 text-white"
                    : "bg-gray-800 text-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-[#111111] rounded-lg overflow-hidden border border-gray-800"
              >
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex gap-2 mb-2">
                    {post.categories.map((cat) => (
                      <span
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className="bg-gray-800 text-xs px-2 py-1 rounded-full capitalize cursor-pointer"
                      >
                        {cat}
                      </span>
                    ))}
                    {post.featured && (
                      <span className="bg-blue-400 text-white text-xs px-2 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-400 mb-3 text-sm">{post.excerpt}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">{post.date}</span>
                    <button
                      onClick={() => alert(`Viewing "${post.title}" article`)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-lg">No articles found</p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="mt-2 text-blue-400"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
