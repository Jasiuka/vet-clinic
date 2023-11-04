import Local from "passport-local";
import { findUser, validatePassword } from "../user/user-queries";

export const LocalStrategy = new Local.Strategy((username, password, done) => {
  findUser({ username })
    .then((user) => {
      if (user[0] && validatePassword(user[0].accountPassword, password)) {
        done(null, user);
      } else {
        done(new Error("Neteisingas slaptažodis arba el. paštas"));
      }
    })
    .catch((error) => done(error));
});
