const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
  {
    username:{
        type: string,
        required: true,
        unique: true
    },
    email:{
        type: string,
        reuired: true,
        unique: true
    },
    password :{
        type: string,
        required: [true,"Password is required"]
    }
  },
  {timestamps: true}
);

module.export = mongoose.model("User",UserSchema);