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

export const getAllUsers = async(req, res) => {
    try {
        const users = await UserModel.find();

        return res.status(200).json({
            success:true,
            count:users.length,
            users,
        });
    } catch (error) {
        console.error("Get All Users Error : ", error);
        return res.status(500).json({
            success:false,
            message:"Failed to fetch Users",
        });
    }
}