// import { omit } from "lodash";
import UserModel from "../models/user.model.js";

export async function createUser(input) {
//   try {
    return UserModel.create(input);
    // return omit(user.toJSON(), "password");
    // return user.toJSON()
    // return user;
//   } catch (e) {
//     throw new Error(e);
//   }
}

// export async function validatePassword({
//   email,
//   password,
// }) {
//   const user = await UserModel.findOne({ email });

//   if (!user) {
//     return false;
//   }

//   const isValid = await user.comparePassword(password);

//   if (!isValid) return false;

//   return omit(user.toJSON(), "password");
// }

// export async function findUser(query) {
//   return UserModel.findOne(query).lean();
// }