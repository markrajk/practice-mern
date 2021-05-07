import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Post must belong to user.'],
  },
  message: {
    type: String,
    required: [true, 'Post must contain message.'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Post = new mongoose.model('Post', postSchema)

export default Post
