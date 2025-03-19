// AbroadEducation/src/pages/Admin/Admin.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from 'react-quill'; // Import React Quill
import 'react-quill/dist/quill.snow.css'; // Import the Quill CSS
// import './style.css'
const API_URL = `${import.meta.env.VITE_API_URL}/api/auth/blogeditor`;

const Admin = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredBlog, setFilteredBlog] = useState(blogs || []); // Ensure it's initialized
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 4;

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: [], // This should be an array of objects
        authorName: "",
        authorImage: {},
        category: "",
        tags: "",
        status: "draft",
        isFeatured: false,
        isTrending: false,
        isPublished: false,
        isDraft: true,
    });
    const [editingBlogId, setEditingBlogId] = useState(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Fetched blogs: ", response.data);
            const blogs = response.data.editorContents || [];

            // Fetch image data for each blog
            for (const blog of blogs) {
                const imageData = await fetchImageData(blog.image.map(img => img.data)); // Pass the IDs
                blog.image = imageData; // Update the blog's image data
            }
            // Sort blogs by createdAt date in descending order
            blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setBlogs(blogs)
            setFilteredBlog(blogs)
        } catch (error) {
            setError("Login to Continue")
            console.error("Error fetching blogs:", error)
        } finally {
            setLoading(false)
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleFileChange = async (e) => {
        if (e.target.files?.length > 0) {
            const token = localStorage.getItem("token");
            const formData = new FormData();

            Array.from(e.target.files).forEach((file) => {
                if (file.size > 2000000) { // Example: limit to 2MB
                    setError("File size exceeds 2MB");
                    return; // Prevent further execution
                }
                formData.append("image", file); // Append each file to the FormData
            });

            try {
                const response = await axios.post(`${API_URL}/upload-image`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                });

                console.log("Image upload response: ", response.data); // Log the response

                if (response.data.images) { // Ensure the response contains the correct field
                    // Update formData.image to contain objects with data and contentType
                    setFormData((prev) => ({
                        ...prev,
                        image: [...prev.image, ...response.data.images.map(img => ({
                            data: img.id, // Use the ID returned from the server
                            contentType: img.contentType // Store the content type
                        }))],
                    }));
                } else {
                    setError("No images returned from the server."); // Handle case where no images are returned
                }
            } catch (error) {
                setError("Failed to upload images. Please try again.");
                console.error("Error uploading images:", error);
            }
        }
    };

    const removeImage = (index) => {
        setFormData((prev) => ({
            ...prev,
            image: prev.image.filter((_, i) => i !== index), // Remove the image at the specified index
        }));
    };

    const fetchImageData = async (imageIds) => {
        const token = localStorage.getItem("token");
        const imagePromises = imageIds.map(id =>
            axios.get(`${API_URL}/image/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
        );

        try {
            const responses = await Promise.all(imagePromises);
            return responses.map(response => response.data); // Return the image data
        } catch (error) {
            console.error("Error fetching images:", error);
            return [];
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const token = localStorage.getItem("token");

            const postData = {
                ...formData,
                image: formData.image.map(img => ({ data: img.data, contentType: img.contentType })), // Ensure image is an array of objects
                tags: formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean), // Split tags into an array
            };

            const response = editingBlogId
                ? await axios.post(`${API_URL}/update/${editingBlogId}`, postData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })
                : await axios.post(API_URL, postData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

            if (response.data.editorContent) {
                alert(editingBlogId ? "Blog updated successfully!" : "Blog created successfully!");
                fetchBlogs();
                setFormData({
                    title: "",
                    description: "",
                    image: [], // Reset image array
                    authorName: "",
                    authorImage: {}, // Reset author image
                    category: "",
                    tags: "",
                    status: "draft",
                    isFeatured: false,
                    isTrending: false,
                    isPublished: false,
                    isDraft: true,
                });
                setEditingBlogId(null); // Reset editing state after submit
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.errors?.[0]?.message ||
                error.response?.data?.message ||
                "Failed to save blog. Please check your input.";
            setError(errorMessage);
            console.error("Error details:", error.response?.data);
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${API_URL}/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Blog deleted successfully!");
            fetchBlogs();
        } catch (error) {
            setError("Failed to delete blog");
            console.error("Error deleting blog:", error);
        }
    };

    const handleEdit = (blog) => {
        setFormData({
            title: blog.title,
            description: blog.description,
            image: blog.image || [], // Ensure this is an array of objects
            authorName: blog.authorName,
            authorImage: blog.authorImage || {}, // Ensure this is an object
            category: blog.category,
            tags: blog.tags.join(","), // Assuming `tags` is an array
            status: blog.status,
            isFeatured: blog.isFeatured,
            isTrending: blog.isTrending,
            isPublished: blog.isPublished,
            isDraft: blog.isDraft,
        });
        setEditingBlogId(blog._id);
    };

    const handleDescriptionChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            description: value, // Update description with the Quill editor value
        }));
    };

    // Handle Search Function
    // Handle search input
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        if (query.trim() === "") {
            setFilteredBlog(blogs); // Reset to all blogs when search is empty
        } else {
            const filtered = blogs.filter((blog) =>
                blog.title.toLowerCase().includes(query)
            );
            setFilteredBlog(filtered);
        }
    };
    // Pagination logic
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = filteredBlog.slice(indexOfFirstBlog, indexOfLastBlog);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle Category Click
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        const filtered = blogs.filter((blog) => blog.category === category);
        setFilteredBlog(filtered);
        setCurrentPage(1); // Reset to the first page

    };

    // Update search field to trigger filtering immediately
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        if (value.trim() === "") {
            setFilteredBlog(blogs);
        } else {
            const filtered = blogs.filter((blog) =>
                blog.title.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredBlog(filtered);
        }
    };

    return (
        <div className="min-h-screen bg-black p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-white mb-8">Admin Blog Manager</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form className="bg-white p-6 rounded-lg shadow-lg space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        placeholder="Title"
                        className="w-full p-2 border rounded"
                        onChange={handleChange}
                        required
                    />

                    <ReactQuill
                        value={formData.description}
                        onChange={handleDescriptionChange}
                        placeholder="Description"
                        // className="quill-editor w-full border-none rounded"
                        className=" w-full border-none rounded"
                    />
                    <input
                        type="text"
                        name="authorName"
                        value={formData.authorName}
                        placeholder="Author Name"
                        className="w-full p-2 border rounded"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="url"
                        name="authorImage"
                        value={formData.authorImage.data || ""}
                        placeholder="Author Image URL (must be a valid URL)"
                        className="w-full p-2 border rounded"
                        onChange={(e) => setFormData({ ...formData, authorImage: { data: e.target.value, contentType: "image/jpeg" } })} // Adjust contentType as needed
                        required

                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Author Image url: <span className="text-blue-800">https://yt3.googleusercontent.com/iK1P5EcYD3z9MSAJGzw6RWpZncYOTX06HgRI5nqaGPQrXOcNc7c12ERXTH3EXgoakLVFPG5F=s160-c-k-c0x00ffffff-no-rj</span></label>

                    </div>

                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        placeholder="Category"
                        className="w-full p-2 border rounded"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        placeholder="Tags (comma separated)"
                        className="w-full p-2 border rounded"
                        onChange={handleChange}
                    />
                    <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded" required>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                        <option value="pending">Pending</option>
                    </select>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Blog Images</label>
                        <input type="file" name="image" onChange={handleFileChange} className="w-full p-2 border rounded" accept="image/*" multiple />

                        {formData.image.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.image.map((img, index) => (
                                    <div key={index} className="relative">
                                        <img src={`data:${img.contentType};base64,${img.data}`} alt={`Preview ${index + 1}`} className="h-20 w-20 object-cover rounded" />
                                        <button
                                            onClick={() => removeImage(index)}
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-evenly uppercase">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="isFeatured"
                                checked={formData.isFeatured}
                                onChange={handleChange}
                            />
                            <span>Featured</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="isTrending"
                                checked={formData.isTrending}
                                onChange={handleChange}
                            />
                            <span>Trending</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="isPublished"
                                checked={formData.isPublished}
                                onChange={handleChange}
                            />
                            <span>Published</span>
                        </label>
                    </div>
                    <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
                        {editingBlogId ? "Update Blog" : "Save Blog"}
                    </button>
                </form>

                <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-4xl font-bold mb-4 text-center">Blog List</h2>
                    <div className="text-center mb-14 flex justify-between items-center">
                        <form className="flex items-center w-1/2 mx-auto" onSubmit={handleSearch}>
                            <label htmlFor="search" className="sr-only">Search</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" fill="none" viewBox="0 0 21 21">
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
                                    id="search"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                                    placeholder="Search by title..."
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        if (e.target.value.trim() === "") {
                                            setFilteredBlog(blogs);
                                        } else {
                                            const filtered = blogs.filter((blog) =>
                                                blog.title.toLowerCase().includes(e.target.value.toLowerCase())
                                            );
                                            setFilteredBlog(filtered);
                                        }
                                    }}
                                />
                            </div>
                        </form>
                    </div>
                    {filteredBlog.length > 0 ? (
                        filteredBlog.map((blog) => (
                            <div key={blog._id} className="  flex justify-between items-center border mt-10 p-4">
                                <div>
                                    <h3 className="text-2xl font-bold mb-4 text-center text-blue-500 underline mt-10 ">{blog.title}</h3>
                                    {/* <p className="description-container border-none"> */}
                                    {/* <p className="w-1/2 md:w-full border-none">
                                    <ReactQuill value={blog.description} readOnly />
                                </p> */}

                                    <div className="flex justify-between items-center space-x-6 w-1/2 md:w-full">


                                        <p className="text-sm text-gray-500 mt-4">
                                            {blog.authorImage && blog.authorImage.data ? (
                                                <img
                                                    src={blog.authorImage.data.startsWith('http') ? blog.authorImage.data : `data:${blog.authorImage.contentType};base64,${blog.authorImage.data}`} // Check if it's a URL
                                                    alt="Author Image"
                                                    className="h-20 w-20 object-cover rounded-full"
                                                />
                                            ) : (
                                                "No author image available"
                                            )}
                                            <p className="text-sm text-black">{blog.authorName}</p>
                                            {/* <p className="text-sm text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</p> */}

                                        </p>
                                        {/* <button className=" px-3 py-1 text-sm shadow-lg w-80 h-auto mb-4 bg-gray-600 text-white rounded hover:bg-black transition duration-200 mt-4">{Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags}</button>

                                        <button className=" px-3 py-1 text-sm shadow-lg w-80 h-auto bg-gray-600 text-white rounded hover:bg-black transition duration-200 mt-4">{blog.category}</button> */}

                                        <p className="text-sm text-gray-500 mt-4">
                                            {Array.isArray(blog.image) && blog.image.length > 0 ? (
                                                blog.image.map((img, index) => (
                                                    <img
                                                        key={index}
                                                        src={`data:${img.contentType};base64,${img.data}`} // Assuming img.data is Base64
                                                        alt={`Blog Image ${index + 1}`}
                                                        className="h-20 w-20 object-cover rounded" // Add any desired styling
                                                    />
                                                ))
                                            ) : (
                                                "No images available" // Fallback text if no images are present
                                            )}


                                        </p>

                                    </div>
                                    <div className="flex justify-center text-center items-center space-x-6 w-1/2 md:w-full">

                                        <button
                                            className="px-3 py-1 text-lg shadow-lg bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                                            onClick={() => handleEdit(blog)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="px-3 py-1 text-lg shadow-lg bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                                            onClick={() => handleDelete(blog._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ))

                    ) : (
                        <p className="text-center text-gray-500 mt-4">No blogs found</p>
                    )}

                </div>
                {/* Pagination Controls */}
                <div className="flex justify-center mt-4 h-max-screen ">
                    {Array.from({ length: Math.ceil(filteredBlog.length / blogsPerPage) }, (_, i) => (
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
    );
};

export default Admin;