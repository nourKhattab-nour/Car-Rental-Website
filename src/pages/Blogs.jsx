import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
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
      content: `
        <p>Road trips offer freedom, adventure, and the chance to create unforgettable memories. Whether you're planning a weekend getaway or a cross-country journey, proper preparation can make all the difference. Here are ten essential tips to ensure your road trip is comfortable, safe, and memorable:</p>
        
        <h3>1. Plan Your Route, But Stay Flexible</h3>
        <p>While it's important to have a general itinerary, some of the best road trip experiences come from spontaneous detours. Use navigation apps like Google Maps or Waze, but don't be afraid to take that interesting side road or stop at an unexpected attraction.</p>
        
        <h3>2. Get Your Vehicle Road-Trip Ready</h3>
        <p>Before setting off, ensure your rental car is in optimal condition. Check tire pressure, fluid levels, brakes, and lights. Familiarize yourself with the vehicle's features and make sure you know how to operate everything from the headlights to the emergency brake.</p>
        
        <h3>3. Pack an Emergency Kit</h3>
        <p>Be prepared for unexpected situations by packing a basic emergency kit including a first-aid kit, flashlight, basic tools, jumper cables, and a portable phone charger.</p>
        
        <h3>4. Download Entertainment in Advance</h3>
        <p>Prepare for areas with poor connectivity by downloading music playlists, podcasts, audiobooks, or movies (for passengers) before your trip.</p>
        
        <h3>5. Bring Plenty of Snacks and Water</h3>
        <p>Pack a cooler with healthy snacks and plenty of water. This not only saves money but also gives you the flexibility to keep driving when you're in a rhythm rather than having to stop frequently for food.</p>
      `,
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
      content: `
        <p>Selecting the right rental car can significantly impact your travel experience. Whether you're planning a business trip, family vacation, or solo adventure, the vehicle you choose should align with your specific needs, preferences, and budget. Here's a comprehensive guide to help you make the best choice:</p>
        
        <h3>Assess Your Specific Requirements</h3>
        <p>Before browsing rental options, consider these key factors:</p>
        <ul>
          <li><strong>Number of passengers:</strong> How many people will be traveling with you? Make sure there's comfortable seating for everyone.</li>
          <li><strong>Luggage capacity:</strong> Consider how much luggage you'll be bringing and whether it will fit in the trunk or cargo area.</li>
          <li><strong>Trip type:</strong> City driving requires different features than highway travel or off-road adventures.</li>
          <li><strong>Terrain:</strong> Will you be navigating steep hills, rough roads, or snowy conditions? This might necessitate specific vehicle types.</li>
          <li><strong>Fuel efficiency:</strong> For longer trips, a fuel-efficient vehicle can save you significant money.</li>
        </ul>
        
        <h3>Understanding Car Categories</h3>
        
        <p><strong>Economy/Compact Cars:</strong> Ideal for solo travelers or couples with minimal luggage. These vehicles offer excellent fuel efficiency and are easy to park in crowded urban areas.</p>
        
        <p><strong>Mid-size Sedans:</strong> A good balance of comfort, space, and fuel efficiency. These vehicles comfortably seat four adults and have adequate trunk space for several suitcases.</p>
        
        <p><strong>SUVs:</strong> Available in various sizes, SUVs offer more space and higher seating positions. They're ideal for families, groups, or those needing extra cargo capacity.</p>
      `,
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
      content: `
        <p>Exploring Europe by car offers unparalleled freedom to discover charming villages, scenic landscapes, and hidden gems that might be missed when traveling by train or bus. However, driving in foreign countries comes with its own set of challenges and considerations.</p>
        
        <h3>Before You Go: Essential Preparations</h3>
        
        <p><strong>International Driving Permit (IDP):</strong> Obtain this translation of your license from AAA or similar organizations before traveling to countries where it's required or recommended.</p>
        
        <p><strong>Insurance Coverage:</strong> Ensure you have adequate insurance coverage. The minimum requirement in Europe is third-party liability insurance, but comprehensive coverage is highly recommended.</p>
        
        <p><strong>Vehicle Requirements:</strong> Different countries have different mandatory equipment requirements. Generally, you should have:</p>
        <ul>
          <li>Warning triangle</li>
          <li>Reflective vests (one per passenger)</li>
          <li>First aid kit</li>
          <li>Headlamp beam deflectors (for driving on the right if your car is from the UK)</li>
        </ul>
        
        <h3>Understanding Road Rules and Signs</h3>
        
        <p><strong>Driving Side:</strong> Most European countries drive on the right side of the road, with the exception of the United Kingdom, Ireland, Malta, and Cyprus, which drive on the left.</p>
        
        <p><strong>Speed Limits:</strong> Speed limits vary by country and road type, but are generally:</p>
        <ul>
          <li>Urban areas: 50 km/h (31 mph)</li>
          <li>Rural roads: 80-100 km/h (50-62 mph)</li>
          <li>Highways/Motorways: 120-130 km/h (75-81 mph)</li>
        </ul>
      `,
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
      content: `
        <p>When the workweek ends, there's nothing quite like hitting the open road for a refreshing weekend escape. These five scenic drives are all within a few hours of major metropolitan areas, making them perfect for quick getaways that feel worlds away from city life.</p>
        
        <h3>1. Pacific Coast Highway, California</h3>
        
        <p><strong>Starting Point:</strong> San Francisco or Los Angeles<br>
        <strong>Distance:</strong> 123 miles (Big Sur section)<br>
        <strong>Driving Time:</strong> 5 hours without stops</p>
        
        <p>California's iconic Highway 1 offers some of the most spectacular coastal views in the world. The stretch between Carmel and San Simeon (known as the Big Sur section) features dramatic cliffs, crashing waves, and the famous Bixby Bridge.</p>
        
        <h3>2. Blue Ridge Parkway, Virginia & North Carolina</h3>
        
        <p><strong>Starting Point:</strong> Washington D.C. area<br>
        <strong>Distance:</strong> 469 miles total (choose a section for a weekend)<br>
        <strong>Driving Time:</strong> Variable depending on section</p>
        
        <p>Known as "America's Favorite Drive," the Blue Ridge Parkway winds through the Appalachian Highlands with stunning mountain vistas, especially spectacular during fall foliage season.</p>
      `,
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
      content: `
        <p>When renting a car, one of the most confusing aspects is deciding which insurance options to accept or decline. The rental counter agent often presents various coverage options with unfamiliar acronyms and limited time to make decisions.</p>
        
        <h3>Common Rental Car Insurance Options</h3>
        
        <p><strong>Collision Damage Waiver (CDW) or Loss Damage Waiver (LDW)</strong></p>
        <p>This isn't technically insurance but rather a waiver that relieves you of financial responsibility if the rental car is damaged or stolen. Without this coverage, you could be liable for the full value of the vehicle.</p>
        <ul>
          <li><strong>Cost:</strong> Typically $15-$30 per day</li>
          <li><strong>Should you get it?</strong> Check if your personal auto insurance or credit card already provides this coverage.</li>
        </ul>
        
        <p><strong>Liability Insurance</strong></p>
        <p>This covers damage you might cause to other people's property or injuries to others while driving the rental car.</p>
        <ul>
          <li><strong>Cost:</strong> Approximately $10-$15 per day</li>
          <li><strong>Should you get it?</strong> Your personal auto insurance policy likely extends liability coverage to rental cars.</li>
        </ul>
      `,
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
      content: `
        <p>Long car rides with family can create wonderful memories, but they can also test everyone's patience. The key to an enjoyable family road trip is having a variety of engaging activities ready to combat boredom and keep spirits high.</p>
        
        <h3>Classic Road Trip Games</h3>
        
        <p><strong>License Plate Game</strong></p>
        <p>Challenge your family to spot license plates from different states or countries. You can play competitively (first to spot wins) or cooperatively (try to find all 50 states together).</p>
        
        <p><strong>I Spy</strong></p>
        <p>This timeless game works well for all ages. One player says, "I spy with my little eye, something..." and describes an object visible from the car. Other players take turns guessing what it might be.</p>
        
        <p><strong>20 Questions</strong></p>
        <p>One person thinks of a person, place, or thing, and others ask up to 20 yes-or-no questions to figure out what it is. This game exercises deductive reasoning and works well for older children and adults.</p>
        
        <p><strong>Alphabet Game</strong></p>
        <p>Players look for words on signs, buildings, or vehicles that start with each letter of the alphabet, working from A to Z. You can play individually or as a team.</p>
      `,
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
      content: `
        <p>Electric vehicles (EVs) are rapidly transforming the automotive landscape, and the car rental industry is no exception. Major rental companies are adding thousands of EVs to their fleets, giving travelers the opportunity to experience electric driving without the commitment of ownership.</p>
        
        <h3>Benefits of Renting an Electric Vehicle</h3>
        
        <p><strong>Environmental Impact</strong></p>
        <p>EVs produce zero tailpipe emissions, significantly reducing your travel carbon footprint. For environmentally conscious travelers, choosing an electric rental aligns with sustainable travel goals.</p>
        
        <p><strong>Cost Savings</strong></p>
        <p>While EV rentals may have slightly higher daily rates, you'll save substantially on fuel costs. Charging an EV typically costs 50-70% less than fueling a comparable gas vehicle.</p>
        
        <p><strong>Performance Experience</strong></p>
        <p>EVs offer instant torque, providing smooth and powerful acceleration. The quiet operation and advanced technology features give a premium driving experience that many renters find surprisingly enjoyable.</p>
        
        <h3>Planning Your Electric Rental Experience</h3>
        
        <p><strong>Choosing the Right Vehicle</strong></p>
        <p>Rental companies now offer various EV models, from compact cars to luxury SUVs. Consider factors like range, size and capacity, and charging speed when selecting your vehicle.</p>
      `,
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
      content: `
        <p>Car rental costs can quickly add up, especially with rising rates and additional fees. However, with some insider knowledge and strategic planning, you can significantly reduce your expenses without sacrificing quality or convenience.</p>
        
        <h3>Booking Strategies</h3>
        
        <p><strong>Book Early, But Keep Checking</strong></p>
        <p>Reserve your car well in advance, especially for peak travel periods. Unlike flights, most car rentals can be canceled without penalty, so you can book early to secure a vehicle, then continue monitoring prices.</p>
        
        <p><strong>Use Comparison Sites Strategically</strong></p>
        <p>Start with aggregator sites like Kayak, Expedia, or AutoSlash to compare baseline prices, but don't stop there. Check the rental company's own website, which may offer lower rates or special promotions.</p>
        
        <p><strong>Consider Alternative Pickup Locations</strong></p>
        <p>Airport locations typically charge premium rates and additional fees. Check prices at off-airport locations, which can be significantly cheaper even after factoring in the cost of a rideshare to reach them.</p>
        
        <h3>Vehicle Selection Strategies</h3>
        
        <p><strong>Book the Smallest Car You Can Manage</strong></p>
        <p>Reserve the smallest, most economical car that meets your minimum needs. Rental locations often run out of economy cars and will upgrade you for free.</p>
      `,
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
      content: `
        <p>America's national parks offer some of the most spectacular landscapes in the world, and exploring them by car provides unparalleled freedom and access to these natural wonders.</p>
        
        <h3>Planning Your National Park Road Trip</h3>
        
        <p><strong>Choose the Right Season</strong></p>
        <p>Each park has optimal visiting times based on weather, crowd levels, and accessibility:</p>
        <ul>
          <li><strong>Summer (June-August):</strong> Peak season for most parks with all facilities open, but expect larger crowds and higher prices.</li>
          <li><strong>Fall (September-October):</strong> Often the sweet spot with mild weather, fewer visitors, and beautiful foliage in many parks.</li>
          <li><strong>Spring (April-May):</strong> Excellent for desert parks and viewing waterfalls at their most powerful, though some mountain roads may still be closed.</li>
          <li><strong>Winter (November-March):</strong> Perfect for experiencing parks like Death Valley or the Everglades, while snow transforms parks like Yosemite and Grand Teton into winter wonderlands with minimal crowds.</li>
        </ul>
        
        <p><strong>Create a Realistic Itinerary</strong></p>
        <p>The most common mistake is trying to see too much in too little time. Consider these guidelines:</p>
        <ul>
          <li>Allow at least 2-3 full days for major parks like Yellowstone or Yosemite</li>
          <li>Factor in driving time between destinations (which often takes longer than expected on scenic or mountainous roads)</li>
          <li>Build in rest days and flexibility for weather changes or unexpected discoveries</li>
        </ul>
      `,
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
      content: `
        <p>Renting a car abroad offers unparalleled freedom to explore at your own pace, but it also comes with unique challenges when things go wrong. From minor inconveniences to serious emergencies, knowing how to handle unexpected situations in a foreign country can make the difference between a temporary setback and a ruined vacation.</p>
        
        <h3>Before You Go: Essential Preparations</h3>
        
        <p><strong>Documentation and Insurance</strong></p>
        <ul>
          <li><strong>International Driving Permit (IDP):</strong> Obtain this translation of your license from AAA or similar organizations before traveling to countries where it's required or recommended.</li>
          <li><strong>Insurance Documentation:</strong> Print physical copies of your rental insurance policy, including coverage details and emergency contact numbers.</li>
          <li><strong>Rental Agreement:</strong> Keep both digital and physical copies of your rental agreement accessible.</li>
        </ul>
        
        <p><strong>Emergency Contact Information</strong></p>
        <p>Create a document with these essential contacts:</p>
        <ul>
          <li>Rental company's local and international emergency numbers</li>
          <li>Local emergency services (equivalent to 911)</li>
          <li>Your country's embassy or consulate in your destination</li>
          <li>Your travel insurance emergency assistance hotline</li>
        </ul>
        
        <h3>Common Emergencies and How to Handle Them</h3>
        
        <p><strong>Vehicle Breakdown</strong></p>
        <ol>
          <li><strong>Move to safety:</strong> If possible, pull completely off the road, activate hazard lights, and set up warning triangles.</li>
          <li><strong>Assess the situation:</strong> Determine if it's a simple issue you can resolve or something requiring professional assistance.</li>
          <li><strong>Contact the rental company:</strong> Most have 24/7 roadside assistance.</li>
        </ol>
      `,
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
    <div className="bg-black text-white">
      <Navbar />

      {/* Blog Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="min-h-screen px-4 flex items-center justify-center">
            <div className="bg-black w-full max-w-4xl rounded-lg shadow-xl max-h-[90vh] overflow-y-auto border border-gray-800">
              <div className="relative">
                <img
                  src={selectedPost.image || "/placeholder.svg"}
                  alt={selectedPost.title}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 bg-black rounded-full p-2 shadow-md hover:bg-gray-900"
                >
                  <svg
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedPost.categories.map((cat) => (
                    <span
                      key={cat}
                      className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-full capitalize"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <div className="flex items-center text-sm text-gray-400 mb-2">
                  <span>{selectedPost.date}</span>
                  <span className="mx-2">•</span>
                  <span>{selectedPost.readTime}</span>
                </div>

                <div className="mb-6">
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">
                    {selectedPost.title}
                  </h1>
                  <p className="text-gray-400">By {selectedPost.author}</p>
                </div>

                <div
                  className="prose prose-lg max-w-none prose-invert"
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                />

                <div className="mt-8 pt-6 border-t border-gray-800">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-6 rounded-md"
                  >
                    Back to Blogs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto py-10 px-4 md:px-6">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Car Rental Blog
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
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
                  className="bg-gray-900 rounded-lg overflow-hidden shadow-md border border-gray-800 transition-transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-60">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-400 mb-2">
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-gray-400 mb-4">{post.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">
                        By {post.author}
                      </span>
                      <button
                        onClick={() => setSelectedPost(post)}
                        className="text-blue-400 font-medium hover:text-blue-300"
                      >
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
              className="pl-10 pr-4 py-2 border border-gray-700 bg-gray-900 rounded-md w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white"
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
                    ? "bg-blue-400 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
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
                className="bg-gray-900 rounded-lg overflow-hidden shadow-md border border-gray-800 transition-transform hover:-translate-y-1 hover:shadow-lg"
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
                        className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-full capitalize"
                        onClick={() => setActiveCategory(cat)}
                        style={{ cursor: "pointer" }}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-sm text-gray-400 mb-2">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">
                      By {post.author}
                    </span>
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="text-blue-400 font-medium hover:text-blue-300"
                    >
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
              className="mx-auto h-12 w-12 text-gray-500"
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
            <h3 className="mt-2 text-lg font-medium text-white">
              No articles found
            </h3>
            <p className="mt-1 text-gray-400">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 text-blue-400 font-medium hover:text-blue-300"
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
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-gray-300 hover:bg-gray-800"
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
                          ? "bg-blue-400 text-white"
                          : "text-gray-300 hover:bg-gray-800"
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
                    <span key={pageNumber} className="mx-1 text-gray-400">
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
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                Next
              </button>
            </nav>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gray-900 rounded-lg p-8 max-w-3xl mx-auto border border-gray-800">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-400">
              Get the latest articles, tips, and travel insights delivered
              straight to your inbox.
            </p>
          </div>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-2 border border-gray-700 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white"
              required
            />
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-6 rounded-md"
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
