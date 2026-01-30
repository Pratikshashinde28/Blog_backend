const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createBlog,
  getAllBlogs,
  updateBlog,
  patchBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog
} = require("../controllers/blogController");

router.get("/", getAllBlogs);                    // GET-/api/blogs
router.post("/", auth, createBlog);              // POST-/api/blogs    auth middleware runs first
router.put("/:id", auth, updateBlog);            // PUT- /api/blogs/id
router.patch("/:id", auth, patchBlog);           // PATCH- /api/blogs/id                            
router.delete("/:id", auth, deleteBlog);         // DELETE- /api/blogs/id
router.post("/:id/like", auth, likeBlog);        // POST- /api/blogs/id/like
router.post("/:id/dislike", auth, dislikeBlog);  // POST- /api/blogs/id/dislike

module.exports = router;
