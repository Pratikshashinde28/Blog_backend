const mongoose = require ("mongoose");

const ProfileSchema = new mongoose.Schema(
 {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true,
      unique: true
    },

    bio: {
      type: String,
      maxlength: 300
    },

    avatar: {
      type: String // image URL
    },

    isPublic: {
      type: Boolean, //true=public, false=private
      default: true
    }
 }, 
 {timestamps: true}
);

module.exports = mongoose.model("Profile",ProfileSchema);