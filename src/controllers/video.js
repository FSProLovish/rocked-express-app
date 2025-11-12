const Video = require("../models/video");
const User = require("../models/user");
const validator = require("validator");
const History = require("../models/history");
const dateFns = require("date-fns");
const { Op } = require("sequelize");

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

    // Calculate start and end of the current day
    const now = new Date();
    const startOfTheDay = dateFns.startOfDay(now);
    const endOfTheDay = dateFns.endOfDay(now);

    // get user by email
    // and user watched history for that particular day
    const userData = await User.findOne({
      where: {
        email,
      },
      include: [
        {
          model: History,
          where: {
            [Op.and]: [
              {
                createdAt: {
                  [Op.gte]: startOfTheDay,
                },
              },
              {
                updatedAt: {
                  [Op.lte]: endOfTheDay,
                },
              },
            ],
          },
          required: false,
        },
      ],
    });

    const user = userData ? userData.toJSON() : null;

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

    // calculating user reward for a particular day
    let userReward = 20;

    const uniqueWatchedVideoIds = Array.from(
      new Set((user.histories || []).map((row) => row.fkVideo))
    );

    if (uniqueWatchedVideoIds.includes(Number.parseInt(videoId))) {
      userReward = 0;
    } else {
      if (
        uniqueWatchedVideoIds.length >= 2 &&
        uniqueWatchedVideoIds.length < 5
      ) {
        userReward = 5;
      } else if (uniqueWatchedVideoIds.length >= 5) {
        userReward = 0;
      }
    }

    // create user video watched history
    await History.create({
      fkUser: user.id,
      fkVideo: videoId,
    });

    // update user stars
    await User.updateUserById(
      {
        stars: user.stars + userReward,
      },
      user.id
    );

    res.status(200).json({
      success: true,
      message: "User is awarded with stars. " + userReward,
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
