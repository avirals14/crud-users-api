import mongoose from "mongoose";
import UserModel from "../models/User.model.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, age, role } = req.body;

    if (!name || !email || !age) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const exisitingUser = await UserModel.findOne({ email });
    if (exisitingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const user = await UserModel.create({ name, email, age, role });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error("Create User Error : ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create user",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Get All Users Error : ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch Users",
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID format",
      });
    }

    const user = await UserModel.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Get user by ID error : ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age, role, isActive } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        success:false,
        message:"User ID Format is Invalid"
      });
    }

    const user = await UserModel.findById(id);
    if(!user){
      return res.status(404).json({
        success:false,
        message:"User Not Found"
      });
    }

    if(email && email!==user.email){
      const emailExists = await UserModel.findOne({email});
      if(emailExists){
        return res.status(409).json({
          success:false,
          message:"Email already in use"
        });
      }
    }

    if(name!==undefined) user.name = name;
    if(email!==undefined) user.email = email;
    if(age!==undefined) user.age = age;
    if(role!==undefined) user.role = role;
    if(isActive!==undefined) user.isActive = isActive;

    const updatedUser = await user.save();

    return res.status(200).json({
      success:true,
      message:"User Updated Successfully",
      user: updatedUser,
    })
  } catch (error) {
    console.error("Update User Error : ", error);
    return res.status(500).json({
      success:false,
      message:"Failed to Update User"
    });
  }
};