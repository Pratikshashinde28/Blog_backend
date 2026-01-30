const Blog = require("../models/Blog");

// Create Blog
exports.createBlog = async (req, res) => {
  const { title, content } = req.body;

  const blog = new Blog({     // create document
    title, 
    content,
    author: req.userId
  });

  await blog.save();
  res.status(201).json(blog);
};

// Get All Blogs
exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find().populate("author", "name email"); //Replaces author ObjectId with user data include name and email
  res.json(blogs);
};

// Edit Blog (Only Owner)
exports.updateBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  if (blog.author.toString() !== req.userId) {       // blog.author is objectId
    return res.status(403).json({ message: "Not authorized" });
  }

  blog.title = req.body.title;
  blog.content = req.body.content;

  await blog.save();
  res.json(blog);
};

// PATCH Blog (Partial Update)
exports.patchBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  // Ownership check
  if (blog.author.toString() !== req.userId) {
    return res.status(403).json({ message: "Not authorized" });
  }

  // Update only provided fields
  if (req.body.title !== undefined) {
    blog.title = req.body.title;
  }

  if (req.body.content !== undefined) {
    blog.content = req.body.content;
  }

  await blog.save();
  res.json(blog);
};

// Delete Blog (Only Owner)
exports.deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  if (blog.author.toString() !== req.userId) {
    return res.status(403).json({ message: "Not authorized" });
  }

  await blog.deleteOne();
  res.json({ message: "Blog deleted" });
};

// Like Blog
exports.likeBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  blog.likes += 1;
  await blog.save();
  res.json(blog);
};

// Dislike Blog
exports.dislikeBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  blog.dislike += 1;
  await blog.save();
  res.json(blog);
};
