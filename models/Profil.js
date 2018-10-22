const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfilSchema = new Schema({
  user: {
    //aici asociem profilul cu userul
    type: Schema.Types.ObjectId,
    ref: "useri"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  companie: {
    type: String
  },
  website: {
    type: String
  },
  locatie: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  abilitati: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  gitUser: {
    type: String
  },
  experienta: [
    {
      titlu: {
        type: String,
        required: true
      },
      companie: {
        type: String,
        required: true
      },
      locatie: {
        type: String
      },
      deLa: {
        type: Date,
        required: true
      },
      panaLa: {
        type: Date
      },
      curent: {
        type: Boolean,
        default: false
      },
      descriere: {
        type: String
      }
    }
  ],
  educatie: [
    {
      scoala: {
        type: String,
        required: true
      },
      tipul: {
        type: String,
        required: true
      },
      specializare: {
        type: String,
        required: true
      },
      deLa: {
        type: Date,
        required: true
      },
      panaLa: {
        type: Date
      },
      curent: {
        type: Boolean,
        default: false
      },
      descriere: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    linkedIn: {
      type: String
    },
    insta: {
      type: String
    },
    fbk: {
      type: String
    }
  },
  data: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profil = mongoose.model("profil", ProfilSchema);
