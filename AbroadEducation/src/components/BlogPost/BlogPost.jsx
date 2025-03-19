import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { TbExternalLink } from "react-icons/tb";
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth/blogeditor`;

const BlogPost = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Login to see posts");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched blogs: ", response.data);
        const blogs = response.data.editorContents || [];

        for (const blog of blogs) {
          const imageData = await fetchImageData(blog.image.map(img => img.data));
          blog.image = imageData;
        }

        setBlogs(blogs);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError("Login to see posts");
        } else {
          setError("Failed to fetch blogs");
        }
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const fetchImageData = async (imageIds) => {
    const token = localStorage.getItem("token");
    const imagePromises = imageIds.map(id =>
      axios.get(`${API_URL}/image/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    );

    try {
      const responses = await Promise.all(imagePromises);
      return responses.map(response => response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
      return [];
    }
  };

  // Define responsive settings for the carousel
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 3 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <div className="relative mt-10">
      <div className="text-white text-center text-3xl flex justify-between p-4 items-center">
        <h2 className="flip-up cursor-pointer">Trending Blogs</h2>
        <a href="/blog">
          <TbExternalLink size={30} />
        </a>
      </div>

      {loading ? (
        <div className="text-white text-center">Loading...</div>
      ) : error ? (
        <div className="text-white text-center">{error}</div>
      ) : (
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={3000}
          keyBoardControl
          customTransition="transform 0.5s ease-in-out"
          transitionDuration={500}
          containerClass="carousel-container"
          itemClass="carousel-item"
        >
          {blogs.map((blog) => (
            <div key={blog._id} className="flex flex-col items-center mx-2 mb-4">
              <div>
                <p className="text-sm text-gray-500">
                  {Array.isArray(blog.image) && blog.image.length > 0 ? (
                    <a href={`/blog/${blog._id}`}>
                      <img
                        src={`data:${blog.image[0].contentType};base64,${blog.image[0].data}`}
                        alt="Blog Image"
                        className="w-auto h-96 object-contain rounded-lg shadow-lg hover:shadow-xl text-white"
                      />
                    </a>
                  ) : (
                    <a href={`/blog/${blog._id}`}>
                      <img
                        src="https://blog.lipsumhub.com/wp-content/uploads/2024/09/what-is-an-example-of-placeholder-content-lipsumhub.jpg"  // Update with the actual path of your placeholder image
                        alt="Placeholder"
                        className="w-auto h-96 object-contain rounded-lg shadow-lg hover:shadow-xl text-gray-400"
                      />
                    </a>
                  )}
                </p>
                <a href={`/blog/${blog._id}`}>

                <h3 className="mt-2 text-center text-sm font-semibold text-white">
                  {blog.title}
                </h3>
                </a>
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default BlogPost;
