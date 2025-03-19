// AbroadEducation/src/pages/Blog/Blog.jsx
"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { motion } from "framer-motion"

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth/blogeditor`;

const Blog = () => {
  const [blogs, setBlogs] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredBlogs, setFilteredBlogs] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 7;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: [],
    authorName: "",
    authorImage: "https://yt3.googleusercontent.com/iK1P5EcYD3z9MSAJGzw6RWpZncYOTX06HgRI5nqaGPQrXOcNc7c12ERXTH3EXgoakLVFPG5F=s160-c-k-c0x00ffffff-no-rj", // Adjusted to be an object
    category: "",
    tags: "",
    status: "draft",
    isFeatured: false,
    isTrending: false,
    isPublished: false,
    isDraft: true,
  })
  const [editingBlogId, setEditingBlogId] = useState(null)

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Fetched blogs: ", response.data);
      let blogs = response.data.editorContents || [];

      for (const blog of blogs) {
        const imageData = await fetchImageData(blog.image.map((img) => img.data));
        blog.image = imageData;
      }

      // Sort blogs by createdAt date in descending order (latest blog first)
      blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setBlogs(blogs);
      setFilteredBlogs(blogs);

    } catch (error) {
      setError("Login to Continue");
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Run fetchBlogs once when the component mounts
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchImageData = async (imageIds) => {
    const token = localStorage.getItem("token")
    const imagePromises = imageIds.map((id) =>
      axios.get(`${API_URL}/image/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    )

    try {
      const responses = await Promise.all(imagePromises)
      return responses.map((response) => response.data)
    } catch (error) {
      console.error("Error fetching images:", error)
      return []
    }
  }

  const handleSearch = (event) => {
    event.preventDefault()
    if (searchQuery.trim() === "") {
      setFilteredBlogs(blogs)
    } else {
      const filtered = blogs.filter((blog) => blog.title.toLowerCase().includes(searchQuery.toLowerCase()))
      setFilteredBlogs(filtered)
    }
  }

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Filter blogs by selected category
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const filtered = blogs.filter((blog) => blog.category === category);
    setFilteredBlogs(filtered);
    setCurrentPage(1); // Reset to the first page
  };

  return (
    <div className="relative mt-2 p-4">
      <div className="text-center mb-14 flex justify-between items-center">
        <form className="flex items-center w-1/2 mx-auto" onSubmit={handleSearch}>
          <label htmlFor="voice-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 21 21"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="voice-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search by title..."
              required
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                if (e.target.value.trim() === "") {
                  setFilteredBlogs(blogs)
                } else {
                  const filtered = blogs.filter((blog) =>
                    blog.title.toLowerCase().includes(e.target.value.toLowerCase()),
                  )
                  setFilteredBlogs(filtered)
                }
              }}
            />
          </div>
        </form>
      </div>

      <div className="flex flex-col md:flex-row ">
        <div className="w-full md:w-2/6 p-4">
          <div className="text-white text-3xl mb-4 cursor-pointer border rounded-lg">
            <h2 className="cursor-pointer text-blue-500 text-4xl p-4 text-left">Hello "👋🏻"</h2>

            <div className="text-white text-3xl flex flex-col justify-between p-4 items-center">
              {loading ? (
                <div className="text-white text-center">Loading...</div>
              ) : (
                blogs.length > 0 && (
                  <div key={blogs[0]._id} className="p-4 flex justify-between items-center">
                    <div>
                      <div className="flex items-center hover:scale-105 transition-all duration-300 cursor-pointer mb-6">
                        {blogs[0].authorImage && blogs[0].authorImage.data ? (
                          <img
                            src={
                              blogs[0].authorImage.data.startsWith("http")
                                ? blogs[0].authorImage.data
                                : `data:${blogs[0].authorImage.contentType};base64,${blogs[0].authorImage.data}`
                            }
                            alt="Author Image"
                            className="h-auto w-16 object-cover rounded-full mr-2"
                          />
                        ) : (
                          <p className="text-lg ">{blogs[0].authorName}</p>

                        )}
                        <div>
                          <p className="text-lg ">{blogs[0].authorName}</p>
                          <p className="text-sm text-white"> Founder Abroad Education | Operations Manager | Business Operations Optimization & Strategy</p>
                        </div>
                      </div>
                      <p className="text-sm text-white">


                        I’m Sohaib Khan, an Operations Manager passionate about turning ideas into action and systems into success. <br /> <br />
                        At Dirasa Private Limited, I’ve had the privilege of leading teams, optimizing processes, and creating impactful solutions that drive growth.
                        But that’s just one part of my journey. <br /> <br />
                        As the founder of an abroad education initiative, I’m on a mission to help students dream bigger and reach further.  <br /> <br />
                        I believe in more than just operations—I believe in innovation, inclusivity, and making every step count.
                      </p>

                      <motion.div
                        variants={staggerChildren}
                        className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12"
                      >
                        <motion.div
                          variants={fadeInUp}
                          className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8"
                        >
                          <motion.ul
                            variants={staggerChildren}
                            className="flex items-center space-x-3 mt-9"
                          >
                            <motion.li
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <a href="https://www.whatsapp.com/channel/0029Va86Cw19mrGZsTf0LJ42" target="_blank" rel="noopener noreferrer" title="" className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600">
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.139.562 4.146 1.552 5.885L0 24l6.333-1.643A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.959 9.959 0 0 1-5.226-1.473L4 21l.469-2.693A9.94 9.94 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm5.362-7.583c-.285-.144-1.689-.832-1.951-.926s-.452-.144-.642.144c-.191.285-.735.926-.903 1.119-.165.191-.333.217-.618.073-.285-.144-1.203-.443-2.291-1.413-.847-.75-1.416-1.678-1.582-1.963-.166-.285-.018-.438.126-.582.129-.128.285-.333.428-.499a1.986 1.986 0 0 0 .285-.474c.096-.191.048-.355-.024-.499-.073-.144-.642-1.545-.879-2.11-.231-.555-.463-.48-.642-.489a1.212 1.212 0 0 0-.438.044c-.144.032-.371.048-.566.272-.191.225-.744.727-.744 1.772s.76 2.061.868 2.205c.104.144 1.495 2.284 3.624 3.202.505.22.901.352 1.21.451.509.161.973.138 1.34.084.408-.062 1.689-.687 1.927-1.35.238-.663.238-1.232.166-1.35-.071-.118-.26-.19-.545-.333z"></path>
                                </svg>

                              </a>
                            </motion.li>

                            <motion.li
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <a href="https://www.linkedin.com/in/sohaib-khan-9259a7280" target="_blank" rel="noopener noreferrer" title="" className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600">
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.28h-3v-5.36c0-1.28-.03-2.92-1.78-2.92s-2.05 1.39-2.05 2.82v5.46h-3v-10h2.88v1.36h.04c.4-.76 1.38-1.56 2.85-1.56 3.05 0 3.61 2.01 3.61 4.62v5.58z" />
                                </svg>

                              </a>
                            </motion.li>

                            <motion.li
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <a href="https://www.instagram.com/abroad_educations_" target="_blank" rel="noopener noreferrer" title="" className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600">
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path>
                                  <circle cx="16.806" cy="7.207" r="1.078"></circle>
                                  <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"></path>
                                </svg>
                              </a>
                            </motion.li>

                            <motion.li
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <a href="https://www.youtube.com/@abroad_educations" target="_blank" rel="noopener noreferrer" title="" className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600">
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M23.498 6.186a2.91 2.91 0 0 0-2.05-2.058C19.094 3.5 12 3.5 12 3.5s-7.094 0-9.448.628a2.91 2.91 0 0 0-2.05 2.058C0 8.595 0 12 0 12s0 3.405.502 5.814a2.91 2.91 0 0 0 2.05 2.058C4.906 20.5 12 20.5 12 20.5s7.094 0 9.448-.628a2.91 2.91 0 0 0 2.05-2.058C24 15.405 24 12 24 12s0-3.405-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>

                              </a>
                            </motion.li>
                          </motion.ul>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="text-white text-3xl mb-4 cursor-pointer">
            <div className="text-white border rounded-lg p-4">
              <h2 className="cursor-pointer text-blue-500 text-4xl p-4">Latest Blogs</h2>

              {loading ? (
                <div className="text-white text-center">Loading...</div>
              ) : blogs.length > 0 && blogs[0]._id ? (  // ✅ Removed extra {}
                <div key={blogs[0]._id} className="p-4">
                  <a href={`/blog/${blogs[0]._id}`} className="text-xl text-white text-left">
                    <div>
                      {blogs[0].title}
                      <p className="text-xl text-white text-left">
                        {new Date(blogs[0].createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xl text-blue-500 text-left">More Tags</p>
                      <p className="text-xl text-white text-left">
                        {Array.isArray(blogs[0].tags) ? blogs[0].tags.join(", ") : blogs[0].tags}
                      </p>
                    </div>
                  </a>
                </div>
              ) : (
                <div className="text-white text-center">No blogs available</div> // ✅ Handle empty case
              )}

            </div>
          </div>

          <div className="text-white text-3xl mb-4 cursor-pointer">
            <div className="text-white border rounded-lg p-4">
              <h2 className="cursor-pointer text-blue-500 text-4xl p-4">Categories</h2>

              {loading ? (
                <div className="text-white text-center">Loading...</div>
              ) : (
                (() => {
                  const displayedCategories = new Set();
                  return blogs.map((blog) => {
                    if (!displayedCategories.has(blog.category)) {
                      displayedCategories.add(blog.category);
                      return (
                        <div key={blog._id} className="pl-4 pb-4">
                          <ul className="list-disc pl-4">
                            <li
                              className="list-disc text-xl text-white text-left cursor-pointer"
                              onClick={() => handleCategoryClick(blog.category)} // Set selected category on click
                            >
                              {blog.category}
                            </li>
                          </ul>
                        </div>
                      );
                    }
                    return null; // Skip rendering if the category is already displayed
                  });
                })()
              )}
            </div>
          </div>
        </div>

        <div className="w-full md:w-4/6 p-4 ">
          {loading ? (
            <div className="text-white text-center">Loading...</div>
          ) : currentBlogs.length === 0 ? (
            <div className="text-white text-center text-3xl">No blogs found</div>
          ) : (
            currentBlogs.map((blog) => (
              <a href={`/blog/${blog._id}`}>
                <div key={blog._id} className="p-4 flex flex-col justify-between items-center w-full border rounded mb-4">
                  <div className="w-full gap-4 " >
                    <h3 className="font-medium text-4xl text-left mb-4 text-blue-300">{blog.title}</h3>

                    <div className="flex items-center cursor-pointer mb-6">
                      {blog.authorImage && blog.authorImage.data ? (
                        <img
                          src={
                            blog.authorImage.data.startsWith("http")
                              ? blog.authorImage.data
                              : `data:${blog.authorImage.contentType};base64,${blog.authorImage.data}`
                          }
                          alt="Author Image"
                          className="h-auto w-16 object-cover rounded-full mr-2"
                        />
                      ) : (
                        <p className="text-lg ">{blogs[0].authorName}</p>
                      )}
                      <p className="text-sm text-white text-left pl-4 ">{blog.authorName} <br />{new Date(blog.createdAt).toLocaleDateString()} <br /> Founder Abroad Education | Operations Manager | Business Operations Optimization & Strategy</p>


                    </div>
                    <a href={`/blog/${blog._id}`}>
                      <p className="text-sm text-white">
                        {Array.isArray(blog.image) && blog.image.length > 0 ? (
                          <img
                            src={`data:${blog.image[0].contentType};base64,${blog.image[0].data}`}
                            alt="Blog Image"
                            className="w-full h-48 object-cover rounded-lg shadow-lg hover:shadow-xl text-white hover:scale-75 transition-all duration-300 cursor-pointer"
                          />
                        ) : (
                          ""
                        )}
                      </p>
                    </a>

                    <div className="flex flex-row flex-wrap justify-between items-center ">
                      <p className="text-sm text-white mt-2" ><b className="text-blue-500"> Categories</b>  <br />{blog.category}</p>
                      <p className="text-sm text-white w-1/2 mt-2 text-right"><b className="text-blue-500">Tags</b> <br />{Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags}</p>
                    </div>
                  </div>
                </div>
              </a>
            ))
          )}
          {/* Pagination Controls */}
          <div className="flex justify-center mt-4 h-max-screen ">
            {Array.from({ length: Math.ceil(filteredBlogs.length / blogsPerPage) }, (_, i) => (
              <button
                key={i}
                className={`mx-1 px-4 py-2 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'text-white'}`}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>


      </div>
    </div >
  )
}

export default Blog