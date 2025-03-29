import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const postsPerPage = 6;

  // Sample blog post data
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
      readTime: "5 min read",
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
      readTime: "7 min read",
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
      readTime: "10 min read",
      featured: false,
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
      readTime: "6 min read",
      featured: false,
    },
    {
      id: 5,
      title: "Understanding Car Rental Insurance Options",
      author: "Lisa Martinez",
      date: "February 20, 2025",
      image:
        "https://mltx6dihaxe1.i.optimole.com/cb:DR86.42fe/w:1200/h:800/q:75/f:best/https://www.emerywebb.com/wp-content/uploads/2024/03/Navigating-Rental-Car-Insurance-Understanding-Your-Coverage-Options.webp",
      excerpt:
        "Navigate the complex world of rental car insurance to ensure you're properly covered without overpaying.",
      categories: ["tips", "insurance"],
      readTime: "8 min read",
      featured: false,
    },
    {
      id: 6,
      title: "Family-Friendly Road Trip Games and Activities",
      author: "James Wilson",
      date: "February 15, 2025",
      image:
        "https://www.parents.com/thmb/827gLD7Q7xiv9S7Hm5HvT-QPGPw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1252669239-f85e366f03c14af4810a7a5f852d42a0.jpg",
      excerpt:
        "Keep everyone entertained on long drives with these fun games and activities for travelers of all ages.",
      categories: ["family", "tips"],
      readTime: "4 min read",
      featured: false,
    },
    {
      id: 7,
      title: "The Rise of Electric Rental Cars: What You Need to Know",
      author: "Sophia Lee",
      date: "February 10, 2025",
      image:
        "https://static01.nyt.com/images/2024/07/17/climate/16JPcli-EVrental-print/00cli-EVrental-01-videoSixteenByNine3000.jpg",
      excerpt:
        "As electric vehicles become more common in rental fleets, learn what to expect and how to make the most of your EV rental.",
      categories: ["cars", "technology"],
      readTime: "9 min read",
      featured: false,
    },
    {
      id: 8,
      title: "Budget-Friendly Car Rental Hacks",
      author: "Robert Garcia",
      date: "February 5, 2025",
      image:
        "https://visithendrycounty.com/wp-content/uploads/2022/09/smart-hacks-to-save-on-your-car-rental.jpg",
      excerpt:
        "Save money on your next car rental with these insider tips and tricks from industry experts.",
      categories: ["tips", "budget"],
      readTime: "7 min read",
      featured: false,
    },
    {
      id: 9,
      title: "Exploring National Parks by Car: The Ultimate Guide",
      author: "Jennifer Adams",
      date: "January 28, 2025",
      image:
        "https://www.reneeroaming.com/wp-content/uploads/2020/05/The-Ultimate-Guide-to-Exploring-Grand-Teton-National-Park-Teton-Range.jpg",
      excerpt:
        "Plan the perfect national park road trip with tips on routes, accommodations, and must-see attractions.",
      categories: ["travel", "destinations"],
      readTime: "12 min read",
      featured: false,
    },
    {
      id: 10,
      title: "How to Handle Car Rental Emergencies Abroad",
      author: "Thomas Brown",
      date: "January 20, 2025",
      image:
        "https://www.zestcarrental.com/blog/wp-content/uploads/2023/09/phone-after-accident.jpg",
      excerpt:
        "Be prepared for unexpected situations when renting a car in a foreign country with this comprehensive guide.",
      categories: ["international", "tips"],
      readTime: "8 min read",
      featured: false,
    },
  ];

  // Extract unique categories
  const categories = [
    "all",
    ...new Set(blogPosts.flatMap((post) => post.categories)),
  ];

  // Filter posts based on category and search query
  useEffect(() => {
    let filtered = blogPosts;

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter((post) =>
        post.categories.includes(activeCategory)
      );
    }

    // Filter by search query
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
    setCurrentPage(1); // Reset to first page when filters change
  }, [activeCategory, searchQuery]);

  // Get featured posts
  const featuredPosts = blogPosts.filter((post) => post.featured);

  // Get current posts for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total pages
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div>
      <Navbar />

      <div className="container mx-auto py-10 px-4 md:px-6">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Car Rental Blog
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Tips, guides, and insights to enhance your car rental and travel
            experiences
          </p>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {featuredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 transition-transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-60">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        By {post.author}
                      </span>
                      <button className="text-blue-600 font-medium hover:text-blue-800">
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
                  activeCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        {currentPosts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {currentPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-48">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.categories.map((cat) => (
                      <span
                        key={cat}
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full capitalize"
                        onClick={() => setActiveCategory(cat)}
                        style={{ cursor: "pointer" }}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      By {post.author}
                    </span>
                    <button className="text-blue-600 font-medium hover:text-blue-800">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No articles found
            </h3>
            <p className="mt-1 text-gray-500">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 text-blue-600 font-medium hover:text-blue-800"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {filteredPosts.length > postsPerPage && (
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center">
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`mx-1 px-3 py-1 rounded-md ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                // Show current page, first page, last page, and one page before and after current
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 &&
                    pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => paginate(pageNumber)}
                      className={`mx-1 px-3 py-1 rounded-md ${
                        currentPage === pageNumber
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                } else if (
                  (pageNumber === 2 && currentPage > 3) ||
                  (pageNumber === totalPages - 1 &&
                    currentPage < totalPages - 2)
                ) {
                  return (
                    <span key={pageNumber} className="mx-1">
                      ...
                    </span>
                  );
                }
                return null;
              })}

              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`mx-1 px-3 py-1 rounded-md ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Next
              </button>
            </nav>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8 max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-600">
              Get the latest articles, tips, and travel insights delivered
              straight to your inbox.
            </p>
          </div>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
