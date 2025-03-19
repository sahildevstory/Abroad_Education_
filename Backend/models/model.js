const mongoose = require('mongoose');
const { z } = require('zod');

// Mongoose schema for registration
const RegisterSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2 },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, minlength: 10 },
  password: { type: String, required: true, minlength: 6 }
});

// Mongoose schema for login
const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});
// Mongoose schema for Admin login
const AdminLoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});


const ImageSchema = new mongoose.Schema({
  data: { type: String, required: true }, // Store base64 string
  contentType: { type: String, required: true }, // Store MIME type
}, { timestamps: true });


const EditorContentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String }, // Optional
  image: [{ type: ImageSchema }], // Array of Base64 images
  authorName: { type: String }, // Optional author name
  authorImage: { type: ImageSchema }, // Single Base64 author image
  category: { type: String }, // Optional category
  tags: [{ type: String }], // Array of tags
  status: {
    type: String,
    enum: ['draft', 'published', 'archived', 'pending'],
    default: 'draft'
  },
  isFeatured: { type: Boolean, default: false },
  isTrending: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  isUpdated: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  isDraft: { type: Boolean, default: false },
  isApproved: { type: Boolean, default: false },
  isRejected: { type: Boolean, default: false },
  isArchived: { type: Boolean, default: false },
  isTrashed: { type: Boolean, default: false },
}, { timestamps: true });  // Auto-manages createdAt and updatedAt


// ✅ Zod Schema for Editor Content Validation

const ImageValidationSchema = z.object({
  data: z.string().min(1, "Image data (Base64) is required"),
  contentType: z.string().min(1, "Content Type is required"),
});

const EditorContentValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  image: z.array(ImageValidationSchema).optional(), // Array of image objects
  authorName: z.string().min(1, "Author Name is required").optional(),
  authorImage: ImageValidationSchema.optional(), // Single image object
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['draft', 'published', 'archived', 'pending']).optional(),
  isFeatured: z.boolean().optional(),
  isTrending: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  isUpdated: z.boolean().optional(),
  isActive: z.boolean().optional(),
  isDraft: z.boolean().optional(),
  isApproved: z.boolean().optional(),
  isRejected: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  isTrashed: z.boolean().optional(),
  updatedAt: z.date().optional(),
  createdAt: z.date().optional(),
});

// Zod schema for registration validation
const registerValidationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  //   confirmPassword: z.string()
  // }).refine((data) => data.password === data.confirmPassword, {
  //   message: "Passwords don't match",
  //   path: ["confirmPassword"],
});


// Zod schema for login validation
const loginValidationSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Zod schema for Admin login validation
const AdminLoginValidationSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});



// Export both mongoose models and zod schemas
module.exports = {
  RegisterUser: mongoose.model('RegisterUser', RegisterSchema),
  LoginUser: mongoose.model('LoginUser', LoginSchema),
  AdminLoginUser: mongoose.model('AdminLoginUser', AdminLoginSchema),
  EditorContent: mongoose.model('EditorContent', EditorContentSchema),
  ImageModel: mongoose.model('Image', ImageSchema),
  ImageValidationSchema,
  EditorContentValidationSchema,
  registerValidationSchema,
  loginValidationSchema,
  AdminLoginValidationSchema

};