//strategia pt passport
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("useri"); //im modelu User am dat in module.exports useri
const chei = require("../config/keys");

const optiuni = {};

optiuni.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
optiuni.secretOrKey = chei.cheiaSecreta;

module.exports = passport => {
  passport.use(
    new JwtStrategy(optiuni, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user); //in loc de null am pune o eroare, dar acu nu e
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
}; //passport vine din server.js ca si parametru, si aici e folosit ca parametru intr-un arrow function
