import mongoose from "mongoose";

const librarySchema = mongoose.Schema({
  product: [
    {
        gameID:{
        type: Number,
        required:true
      },

      gameName:{
        type: String,
        required:true
      },
    },
  ],
  userID: {
    type: String,
    required:true,
    ref: "User",
  },
});

const Library = mongoose.model("Library", librarySchema);
export default Library;