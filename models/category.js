import mongoose from "mongoose";
const { Schema } = mongoose;

const songSchema = new Schema({
  songName: {
    type: String,
    required: true,
  },
  album: {
    type: String,
  },
  year: {
    type: Number,
  },
  description: {
    type: String,
  },
  youtubeUrl: {
    type: String,
  },
  setup: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    songs: [songSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Category", categorySchema, "artists");
