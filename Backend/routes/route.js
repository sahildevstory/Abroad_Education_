const express = require('express');
const router = express.Router();
const {
  RegisterUser,
  LoginUser,
  EditorContent,
  AdminLoginUser,
  ImageModel,
  registerValidationSchema,
  loginValidationSchema,
  EditorContentValidationSchema,
  AdminLoginValidationSchema,
  ImageValidationSchema
} = require('../models/model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const authenticateToken = require('../Authchecks/authChecks');

const jwt_decode = require('jwt-decode');

const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = 'Admin@123'; // Hardcoded plain password



// Register Route
router.post('/register', async (req, res) => {
  try {
    // Validate request body
    const validatedData = registerValidationSchema.parse(req.body);

    // Check if user already exists
    const existingUser = await RegisterUser.findOne({ email: validatedData.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(validatedData.password, salt);

    // Create new user
    const user = await RegisterUser.create({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      password: hashedPassword
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    // Validate request body
    const validatedData = loginValidationSchema.parse(req.body);

    // Check if user exists
    const user = await RegisterUser.findOne({ email: validatedData.email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const validPassword = await bcrypt.compare(validatedData.password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create and send JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '198h' }
    );

    res.json({ token, userId: user._id });
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/adminlogin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email matches hardcoded admin email
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: ADMIN_EMAIL, role: 'admin' }, // Store role in token
      process.env.JWT_SECRET,
      { expiresIn: '50h' }
    );


    // Return response with token and user data
    res.json({
      token: token,
      user: {
        id: 1, // Hardcoded user ID
        email: email,
        role: 'admin'
      }
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }


});

// Multer storage configuration (in-memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// API for uploading images
router.post('/blogeditor/upload-image', upload.array('image', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    // Convert images to Base64 and save to MongoDB
    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        const base64String = file.buffer.toString('base64');

        // Create a new image document
        const newImage = new ImageModel({
          data: base64String,
          contentType: file.mimetype,
        });

        const savedImage = await newImage.save(); // Ensure image is saved

        return { id: savedImage._id.toString(), contentType: savedImage.contentType };
      })
    );

    res.json({ images: uploadedImages });  // Return stored image IDs
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ message: 'Failed to upload images', error });
  }
});


// API to fetch images by ID
router.get('/blogeditor/image/:id', async (req, res) => {
  try {
    const image = await ImageModel.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.json({ data: image.data, contentType: image.contentType });
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ message: 'Failed to fetch image', error });
  }
});

// POST route to create new blog editor content
router.post('/blogeditor', authenticateToken, async (req, res) => {
  try {
    // Validate the incoming request body using the schema
    const validatedData = EditorContentValidationSchema.parse(req.body);

    // Prepare the data to be saved in the database
    const editorContentData = {
      title: validatedData.title,
      description: validatedData.description,
      image: validatedData.image || [],  // Ensure image is an array (default to empty if not present)
      authorName: validatedData.authorName,
      authorImage: validatedData.authorImage,
      createdAt: new Date(),
      day: validatedData.day,
      month: validatedData.month,
      year: validatedData.year,
      link: validatedData.link,
      category: validatedData.category,
      tags: validatedData.tags || [],  // Ensure tags is an array (default to empty if not present)
      status: validatedData.status,
      isFeatured: validatedData.isFeatured ?? false,  // Default to false if undefined
      isTrending: validatedData.isTrending ?? false,
      isPublished: validatedData.isPublished ?? false,
      isDeleted: validatedData.isDeleted ?? false,
      isUpdated: validatedData.isUpdated ?? false,
      isActive: validatedData.isActive ?? true,  // Default to true if undefined
      isDraft: validatedData.isDraft ?? false,
      isPending: validatedData.isPending ?? false,
      isApproved: validatedData.isApproved ?? false,
      isRejected: validatedData.isRejected ?? false,
      isArchived: validatedData.isArchived ?? false,
      isTrashed: validatedData.isTrashed ?? false,
      updatedAt: new Date()
    };
    console.log("Received Description:", req.body.description);

    // Create the new editor content in the database
    const editorContent = await EditorContent.create(editorContentData);

    // Respond with success message and the created content
    res.status(201).json({ message: 'Editor content created successfully', editorContent });
  } catch (error) {
    // Handle validation errors or server errors
    if (error.errors) {
      return res.status(400).json({ errors: error.errors });
    }

    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// GET route to fetch blog editor content
router.get('/blogeditor/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;  // Extract the ID from the URL

    // Find the editor content by its ID
    const editorContent = await EditorContent.findById(id);

    // Check if content was found
    if (!editorContent) {
      return res.status(404).json({ message: 'Editor content not found' });
    }

    // Respond with the found content
    res.status(200).json({ message: 'Editor content retrieved successfully', editorContent });
  } catch (error) {
    // Handle server errors
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET route to fetch all blog editor content
router.get('/blogeditor', authenticateToken, async (req, res) => {
  try {
    // Retrieve all editor content from the database
    const editorContents = await EditorContent.find();

    // Check if no content was found
    if (editorContents.length === 0) {
      return res.status(404).json({ message: 'No editor content found' });
    }

    // Respond with the retrieved content
    res.status(200).json({ message: 'Editor content retrieved successfully', editorContents });
  } catch (error) {
    // Handle server errors
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT route to update blog editor content
router.post('/blogeditor/update/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const validatedData = EditorContentValidationSchema.parse(req.body);
    const editorContent = await EditorContent.findByIdAndUpdate(id, validatedData, { new: true });
    if (!editorContent) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.status(200).json({ message: 'Content updated successfully', editorContent });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});



// DELETE route to delete blog editor content
router.delete('/blogeditor/delete/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;  // Extract the ID from the URL

    // Find and delete the editor content
    const deletedEditorContent = await EditorContent.findByIdAndDelete(id);

    // Check if content was found and deleted
    if (!deletedEditorContent) {
      return res.status(404).json({ message: 'Editor content not found' });
    }

    // Respond with success message
    res.status(200).json({ message: 'Editor content deleted successfully' });
  } catch (error) {
    // Handle server errors
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


module.exports = router;