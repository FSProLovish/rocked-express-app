const Video = require("../models/video");
const User = require("../models/user");
const validator = require("validator");

const getVideoById = async (req, res) => {
  try {
    // destructuring `id` from params
    const { id: videoId } = req.params;

    // validating videoId
    if (!validator.isNumeric(videoId)) {
      throw new Error(`Invalid video id = [${videoId}]`);
    }

    // get video by id
    const video = await Video.getVideoById(videoId, [
      "id",
      "title",
      "description",
      "url",
    ]);

    // throw error, if video not exists
    if (!video) {
      throw new Error(`Video not found by id = [${videoId}]`);
    }

    res.status(200).json({
      success: true,
      data: video,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

const submitVideo = async (req, res) => {
  try {
    // destructuring `id` from params
    const email = req.headers["x-user-email"];

    // throw error, if email is undefined
    if (!email) {
      throw new Error("Email not found!");
    }

    // get user by email
    const user = await User.getUserByEmail(email);

    // throw error, if user not exists
    if (!user) {
      throw new Error("User not found!");
    }

    // destructuring `id` from params
    const { id: videoId } = req.params;

    // get video by id
    const video = await Video.getVideoById(videoId, [
      "id",
      "title",
      "description",
      "url",
    ]);

    // throw error, if video not exists
    if (!video) {
      throw new Error(`Video not found by id = [${videoId}]`);
    }

    // update user stars
    await User.updateUserById(
      {
        stars: user.stars + 20,
      },
      user.id
    );

    res.status(200).json({
      success: true,
      message: "User is awarded with 20 stars.",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      err: err.message,
    });
  }
};

module.exports = {
  getVideoById,
  submitVideo,
};
