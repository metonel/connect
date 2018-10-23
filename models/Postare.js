const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostareSchema = new Schema({
  user: {
    //aici asociem profilul cu userul
    type: Schema.Types.ObjectId,
    ref: "useri"
  },
  text: {
    type: String,
    required: true
  },
  nume: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    //cand un user da like, i se salveaza id-ul aici, cand da dislike i se sterge
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "useri"
      }
    }
  ],
  comentari: [
    //cand un user da like, i se salveaza id-ul aici, cand da dislike i se sterge
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "useri"
      },
      text: {
        type: String,
        required: true
      },
      nume: {
        type: String
      },
      avatar: {
        type: String
      },
      data: {
        type: Date,
        default: Date.now
      }
    }
  ],

  data: {
    type: Date,
    default: Date.now
  }
});

module.exports = Postare = mongoose.model("postare", PostareSchema);
