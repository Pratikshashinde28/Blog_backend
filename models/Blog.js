const mongoose = required ("mongoose");

const BlogSchema = new mongoose.Schema
(
 {
    title:{
        type: String,
        required: true
     },
    content:{
        type: String,
        required: true
     },
    author:{
        type: mongoose.Schema.Types.objectId,
        ref: "User",
        required: true
     },
    likes:{
        type: Number,
        default:0
    },
    dislike:{
        type: Number,
        default:0
    }    
 },
 {timestamps: true}
);

module.exports = mongoose.model("Blog",BlogSchema);