// AbroadEducation/src/pages/Blog_Id/BlogId.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './style.css';

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth/blogeditor`;
const BlogId = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = {
                    'Authorization': `Bearer ${token}`
                };
                const response = await axios.get(`${API_URL}/${id}`, { headers });
                setBlog(response.data.editorContent);

                // Fetch image data for each blog
                const imageData = await fetchImageData(response.data.editorContent.image.map(img => img.data)); // Pass the IDs
                response.data.editorContent.image = imageData; // Update the blog's image data
                setBlog(response.data.editorContent); // Update the blog state with the new image data

            } catch (error) {
                setError("Failed to fetch blog");
                console.error("Error fetching blog:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

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

    return (
        <div className='flex justify-center items-center'>


            <div className='mt-10  w-full p-4 md:w-2/3 flex justify-center items-center'>

                {loading ? (
                    <div>Loading...</div>
                ) : error ? (


                    <div>{error}</div>
                ) : (
                    <div className=''>
                        <div className="w-full "> {/* Full width on small screens, 3/4 on medium and up */}
                            <h3 className="font-medium text-4xl text-left mb-4 text-blue-300">{blog.title}</h3>
                            <div className="flex items-center hover:scale-105 transition-all duration-300 cursor-pointer mb-6">

                                {blog.authorImage && blog.authorImage.data ? (
                                    <img
                                        src={blog.authorImage.data.startsWith('http') ? blog.authorImage.data : `data:${blog.authorImage.contentType};base64,${blog.authorImage.data}`}
                                        alt="Author Image"
                                        className="h-auto w-16 object-cover rounded-full mr-2"
                                    />
                                ) : (
                                    "No author image available"
                                )}
                                <p className="text-lg text-white text-right"></p>
                                <div>
                                    <p className="text-lg text-white">{blog.authorName}</p>
                                    <p className="text-sm text-white">Founder of Abroad Education</p>
                                    <p className="text-sm text-white block "> Published at: {new Date(blog.createdAt).toLocaleDateString()}</p>
                                </div>

                            </div>
                           
                            <p className="text-sm text-gray-500 flex justify-center">
                                {Array.isArray(blog.image) && blog.image.length > 0 ? (
                                    blog.image.map((img, index) => (
                                        <img
                                            key={index}
                                            src={`data:${img.contentType};base64,${img.data}`} // Assuming img.data is Base64
                                            alt={`Blog Image ${index + 1}`}
                                            className="h-auto w-auto object-cover rounded" // Add any desired styling
                                        />
                                    ))
                                ) : (
                                    "" // Fallback text if no images are present
                                )}
                            </p>
                            
                                <p className="description-container  " dangerouslySetInnerHTML={{ __html: blog.description }} ></p>
                        
                            <div className='flex justify-between flex-wrap items-center mt-4'>
                                <div>
                                    <p className='text-blue-300 '>Category: </p>
                                    <p className="text-sm text-white ">{blog.category}</p>
                                </div>
                                <div className=''>
                                    <p className='text-blue-300 '>Tags: </p>
                                    <p className="text-sm text-white">{Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags}</p>
                                </div>



                            </div>


                        </div>


                    </div>

                )}
            </div>
        </div>
    );
}

export default BlogId;