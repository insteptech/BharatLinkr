const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const nodemailer = require("nodemailer")



const { User,
  Role,
  AuthToken,
  RolePermission,
  Permission, State,
  City,
  listOfUsersLikes,
  userFriendList,
  college,
  organisationPost,
  organisationLikesCount,
  userPost,
  masterFilter,
  organisation,
  mainStream,subStream,course,exam,corporateRegister,Status } = require('../../models');
const { roles } = require('../../config/roles');

function generateOTP() {
  // Declare a digits variable
  // which stores all digits
  const digits = '12345678910';
  let OTP = '';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
});


const writeFiles = async ({ files, profile, cover,imageFile }) => {
  const baseDir = path.join(__dirname, '../../');

  const dir = `${baseDir}/documents/userProfile`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  if (files && files.length > 0) {
    await Promise.all(
      files.map((file) => {
        fs.writeFile(path.resolve(dir, `${file.originalname}`), file.buffer, () => console.log('image downloaded3'));
      })
    );
  }

  if (profile && profile.length > 0) {
    await Promise.all(
      profile.map((file) => {
        fs.writeFile(path.resolve(dir, `${file.originalname}`), file.buffer, () => console.log('image downloaded3'));
      })
    );
  }

  if (cover && cover.length > 0) {
    await Promise.all(
      cover.map((file) => {
        fs.writeFile(path.resolve(dir, `${file.originalname}`), file.buffer, () => console.log('image downloaded3'));
      })
    );
  }

  if (imageFile && imageFile.length > 0) {
    await Promise.all(
      imageFile.map((file) => {
        fs.writeFile(path.resolve(dir, `${file.originalname}`), file.buffer, () => console.log('image downloaded2'));
      })
    );
  }



};



const register = async (req) => {
  try {
    const profileData = JSON.parse(req.body.profileData);
    const { profile, cover } = req.files;

    let existingUserById = null;

    if (profileData.id) {
      existingUserById = await User.findOne({
        where: { id: profileData.id },
      });
    }

    await writeFiles(req.files);

    if (profile && profile.length > 0) {
      const fileExist = profile.find((file) => file.originalname);
      if (fileExist) {
        if (existingUserById && existingUserById.profilePhoto) {
          if (fs.existsSync(path.resolve(dir, `${existingUserById.profilePhoto}`)))
            fs.unlinkSync(path.resolve(dir, `${existingUserById.profilePhoto}`));
        }
        profileData.profilePhoto = fileExist.originalname;
      }
    }
    if (cover && cover.length > 0) {
      const fileExist = cover.find((file) => file.originalname);
      if (fileExist) {
        if (existingUserById && existingUserById.coverPhoto) {
          if (fs.existsSync(path.resolve(dir, `${existingUserById.coverPhoto}`)))
            fs.unlinkSync(path.resolve(dir, `${existingUserById.coverPhoto}`));
        }
        profileData.coverPhoto = fileExist.originalname;
      }
    }

    const userObj = {
      userType: profileData.userType,
      name: profileData.name,
      designation: profileData.designation,
      email: profileData.email,
      mobileNumber: profileData.mobileNumber,
      stateId: profileData.stateId,
      cityId: profileData.cityId,
      school_college_company: profileData.school_college_company,
      highestEducation: profileData.highestEducation,
      summary: profileData.summary,
      areaOfExpertise: profileData.areaOfExpertise,
      accomplishments: profileData.accomplishments,
      totalExperience: profileData.totalExperience,
      profilePhoto: profileData.profilePhoto,
      coverPhoto: profileData.coverPhoto,
      password: profileData.password,
      collegeWebsite: profileData.collegeWebsite,
      collegeId: profileData.collegeId,
      organisationId: profileData.organisationId
    };

    if (profileData.password) {
      userObj.password = await bcrypt.hash(profileData.password, 12);
    }
    let roleDetail;
    ////// roles differentiating
    if (profileData.userType === "Organisation") {
      userObj.active = false;
      roleDetail = await Role.findOne({ where: { key: roles[6] } });
    } else if (profileData.userType === "College") {
      userObj.active = false;
      roleDetail = await Role.findOne({ where: { key: roles[4] } });
    }
    // this for confirmation from bharatlinker after it will active true 
    else {

      roleDetail = await Role.findOne({ where: { key: roles[0] } });
    }

    if (roleDetail.id) {
      userObj.roleId = await roleDetail.id;
    }

    const otp = generateOTP();
    userObj.otp = otp;
    userObj.ExpiresAt = Date.now() + 120000;

    let existingUser

    if (profileData.email) {
      existingUser = await User.findOne({ where: { email: profileData.email.toLowerCase() } });
    }
    console.log(existingUser && existingUser.id !== profileData.id, "existingUser && existingUser.id !== profileData.id")
    if (existingUser && existingUser.id !== profileData.id) {
      return { success: false, user: null, token: null, message: 'User Already exists' };
    }
    let result;
    if (profileData.id) {
      result = await User.update(userObj, { where: { id: profileData.id } });

    } else {

      result = await User.create(userObj);



      const mailOptions = {
        from: process.env.EMAIL,
        to: profileData.email,
        subject: "Email Verification",
        text: `Hi your OTP for verification is ${userObj.otp}. Please note that this OTP will get expired after 2 minutes`,
        // html: '<a href="www.google.com">Click this link to verify your account</a>',
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          // do something useful
        }
      });

    }
    let userDetail;
    if (result.id) {
      userDetail = await User.findOne({
        where: { id: result.id },
        attributes: [

          'id',
          'isNumberVerified',
          'userType',
          'name',
          'designation',
          'email',
          'mobileNumber',
          'stateId',
          'cityId',
          'school_college_company',
          'highestEducation',
          'summary',
          'areaOfExpertise',
          'accomplishments',
          'totalExperience',
          'profilePhoto',
          'coverPhoto',
          'collegeWebsite',
          'collegeId',
          'roleId',
          'organisationId'
        ],
      })
    }

    return { success: true, user: userDetail, roleDetail };
  } catch (error) {
    throw new Error(error);
  }
};

const login = async (req) => {
  try {
    const user = await User.findOne({
      where: { email: req.email.toLowerCase(), active: true, isNumberVerified: true },
      include: [
        {
          model: Role,
          required: false,
          as: 'Roles',
          attributes: ['id', 'key', 'title'],

        },
      ],
    });
    if (!user) {
      return { success: false, data: null, message: 'User does not exist.' };
    }

    const roleDetail = await Role.findOne({ where: { id: user.Roles.id } });


    const isEqual = await bcrypt.compare(req.password, user.password);
    if (!isEqual) {
      return { success: false, data: null, message: 'Password is incorrect!' };
    }


    return { success: true, user, roleDetail };
  } catch (error) {
    throw new Error(error);
  }
};

const verificationOtp = async (req) => {
  try {
    const existOtp = await User.findOne({
      where: { mobileNumber: req.body.mobileNumber, otp: req.body.otp },
    });

    if (!existOtp) {
      const Message = 'Invalid OTP';
      throw new Error(Message);
    }
    if (existOtp.ExpiresAt < Date.now()) {
      // await UserApply.destroy({ where: { MobileNumber: req.body.MobileNumber } });
      throw new Error('OTP expired');
    }

    const updateData = await User.update(
      { isNumberVerified: true, otp: null },
      { where: { mobileNumber: req.body.mobileNumber, otp: req.body.otp }, returning: true }
    );
    return { newData: updateData, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const resendOtp = async (req) => {
  try {
    const otp = generateOTP();
    const expire = Date.now() + 120000;


    const requestOTP = await User.findOne({
      where: { id: req.body.id },
    });
    const updateOtp = await User.update({ otp, ExpiresAt: expire }, { where: { id: req.body.id } });

    const mailOptions = {
      from: process.env.EMAIL,
      to: requestOTP.email,
      subject: "Email Verification",
      text: `Hi your OTP for verification is ${otp}. Please note that this OTP will get expired after 2 minutes`,
      // html: '<a href="www.google.com">Click this link to verify your account</a>',
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        // do something useful
      }
    });



    return { success: true };
  } catch (error) {
    console.log(error, '8989898989')
    throw new Error(error);
  }
};

const saveProxyAuthToken = async (req) => {
  try {
    await AuthToken.destroy({ where: {} });
    await AuthToken.create(req);
    return { success: true, data: req };
  } catch (error) {
    throw new Error(error);
  }
};

const getProxyAuthToken = async () => {
  try {
    const result = await AuthToken.findOne({ where: {} });
    return { success: true, data: result };
  } catch (error) {
    throw new Error(error);
  }
};

const userList = async (req) => {
  try {
    let whereCondition = { roleId: [3, 4] };
    if (req.body.id) {
      whereCondition = req.body.id;
    }
    const result = await User.findAndCountAll({
      where: whereCondition,
      include: [
        {
          model: Role,
          required: false,
          as: 'Roles',
        },
        {
          model: State,
          required: false,
          as: 'States',
        },
        {
          model: City,
          required: false,
          as: 'Cities',
        },

        {
          model: userFriendList,
          required: false,
          as: 'Friends',
          where: { status: true },
          include: [
            {
              model: User,
              required: false,
              as: 'Approved Friends',
              attributes: [

                'id',
                'isNumberVerified',
                'userType',
                'name',
                'designation',
                'email',
                'mobileNumber',
                'stateId',
                'cityId',
                'school_college_company',
                'highestEducation',
                'summary',
                'areaOfExpertise',
                'accomplishments',
                'totalExperience',
                'profilePhoto',
                'coverPhoto',
                'collegeWebsite',
                'collegeId',
                'roleId'
              ],

            }

          ]
        },
        {
          model: userFriendList,
          required: false,
          as: 'FriendsSent',
          where: { status: false },
          include: [
            {
              model: User,
              required: false,
              as: 'SentReqFriendsDetails',
              attributes: [

                'id',
                'isNumberVerified',
                'userType',
                'name',
                'designation',
                'email',
                'mobileNumber',
                'stateId',
                'cityId',
                'school_college_company',
                'highestEducation',
                'summary',
                'areaOfExpertise',
                'accomplishments',
                'totalExperience',
                'profilePhoto',
                'coverPhoto',
                'collegeWebsite',
                'collegeId',
                'roleId'
              ],
            },
          ]
        },



      ],
      attributes: [

        'id',
        'isNumberVerified',
        'userType',
        'name',
        'designation',
        'email',
        'mobileNumber',
        'stateId',
        'cityId',
        'school_college_company',
        'highestEducation',
        'summary',
        'areaOfExpertise',
        'accomplishments',
        'totalExperience',
        'profilePhoto',
        'coverPhoto',
        'collegeWebsite',
        'collegeId',
        'roleId'
      ],
      distinct: true
    });
    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const userDelete = async (req) => {
  try {
    await User.destroy({
      where: { id: req.id },
    });

    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const userActive = async (req) => {
  try {
    const existUser = await User.findOne({
      where: { id: req.body.id },
    });
    await existUser.update({ active: true });

    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};



//// this api for user list who liked the number of post for matching the same post the like , so that user cannot like the same post 

const userPostLikeList = async (req) => {
  try {
    let whereCondition = {};
    let result;
    if (req.body.userId && req.body.categoryTypes) {
      whereCondition = { userId: req.body.userId, categoryTypes: req.body.categoryTypes };
      result = await listOfUsersLikes.findAndCountAll({
        where: whereCondition,
      });
    }

    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};


//// this api for user list who liked the number of post for matching the same post the like , so that user cannot like the same post 


const updateUserPassword = async (req) => {

  try {
    const loggedUser = await User.findOne({
      where: { email: req.body.email }
    });
    console.log(loggedUser, '9898989')
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const updateUser = await User.update(

      { password: hashedPassword },
      { where: { email: req.body.email } },
    );
    if (updateUser) {
      message = "Password Change Succesfully"
    }
    return { newData: updateUser, message, success: true };
  } catch (error) {
    return { newData: null, success: false };
  }
};


const forgotUserPassword = async (req, res) => {
  const loggedUser = await User.findOne({
    where: { email: req.body.email }
  });


  if (!loggedUser) {
    // return res.status(400).send({ message: "User not found", success: false });
    return { success: false, data: null, message: 'User does not exist.' };
  }

  const mailOptions = {
    from: process.env.EMAIL,
    to: loggedUser.email,
    subject: "Update password",
    // text: `Hi your OTP for verification is. Please note that this OTP will get expired after 2 minutes`,
    html: `<p> Please click on this <a href=http://localhost:4000/auth/userPasswordUpdate>link</a> to change your password. </p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error, '989898989898');
    } else {
      console.log("Email sent: " + info.response);
      // do something useful
    }
  });

  return { success: true };

};


const addFriend = async (req) => {
  try {
    const stream1 = [];
    await Promise.all(
      req.body.Friends.map(async (item) => {
        const prg = await userFriendList.findOne({ where: { recieverId: item.recieverId, senderId: item.senderId, deleted: false } });
        if (!prg) {
          const result = await userFriendList.create({ ...item, returning: true });
          stream1.push(result);
          return result;
        }
        stream1.push({ mainStreamName: item.mainStreamName, status: 'Request Already Sent' });
      })
    );
    return { data: stream1, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const userPendingFriendRequest = async (req) => {
  try {
    let whereCondition = {};
    if (req.body.recieverId) {
      whereCondition = { recieverId: req.body.recieverId, status: false };
    }

    const result = await userFriendList.findAndCountAll({
      where: whereCondition,
      include: [

        {
          model: User,
          required: false,
          as: 'FriendsDetail',
          attributes: ['id',
            'isNumberVerified',
            'userType',
            'name',
            'designation',
            'email',
            'profilePhoto',
            'coverPhoto'
          ],
        }
      ],

      distinct: true
    });
    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};


const approveFriendRequest = async (req) => {
  try {
    const stream1 = [];
    await Promise.all(
      req.body.FriendRequest.map(async (item) => {

        const result = await userFriendList.update({
          status: item.status,
          returning: true
        }, { where: { recieverId: item.recieverId, senderId: item.senderId } });
        if (item.status === true) {

          stream1.push({ status: 'Freiend Added SuccessFully' });
        } else {
          const friendDel = await userFriendList.findOne({ where: { recieverId: item.recieverId, senderId: item.senderId } })
          await userFriendList.destroy({ where: { senderId: friendDel.senderId } })
          stream1.push({ status: 'Freiend Deleted SuccesFully' });

        }
        return result;
      }),
    );
    return { data: stream1, success: true };
  } catch (error) {
    throw new Error(error);
  }
};

const collegeRegisterPendingList = async (req) => {
  try {
    const pageNo = req.body.pageNo ? req.body.pageNo : 1;
    const size = req.body.pageSize ? req.body.pageSize : 10;
    let whrCondition = { deleted: false, active: false };
    if (req.body.id) {
      whrCondition = { id: req.body.id }
    }
    if (req.body.search) {
      const obj = {
        name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', `%${req.body.search.toLowerCase()}%`),
      };
      whrCondition = { ...obj, ...whrCondition };
    }



    const result = await User.findAndCountAll({
      where: whrCondition,
      include: [
        {
          model: State,
          required: false,
          as: 'States',
        },
        {
          model: City,
          required: false,
          as: 'Cities',
        },
        {
          model: college,
          required: false,
          as: 'CollegeDetails',
        },
      ],
      attributes: ['id',
        'isNumberVerified',
        'userType',
        'name',
        'designation',
        'email',
        'mobileNumber',
        'stateId',
        'cityId',
        'school_college_company',
        'highestEducation',
        'summary',
        'areaOfExpertise',
        'accomplishments',
        'totalExperience',
        'profilePhoto',
        'coverPhoto',
        'collegeWebsite',
        'collegeId',
        'roleId'],
      offset: (pageNo - 1) * size,
      limit: size,
      distinct: true
    });
    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};


const approveCollegeRegisterByAdmin = async (req) => {
  try {
    const stream1 = [];
    await Promise.all(
      req.body.PendingRequest.map(async (item) => {

        const result = await User.update({
          active: item.active,
          returning: true
        }, { where: { id: item.id } });
        if (item.active === true) {

          stream1.push({ status: 'College Approved SuccessFully' });
        } else {
          const collegeDel = await User.findOne({ where: { id: item.id } })
          await User.destroy({ where: { id: collegeDel.id } })
          stream1.push({ status: 'College Deleted SuccesFully' });

        }
        return result;
      }),
    );
    return { data: stream1, success: true };
  } catch (error) {
    throw new Error(error);
  }
};



const userPostList = async (req) => {
  try {
    let whereCondition = { roleId: [3, 4] };
    if (req.body.id) {
      whereCondition = req.body.id;
    }
    const result = await User.findAndCountAll({
      where: whereCondition,
      attributes: ['name', 'userType'],
      include: [

        {
          model: userFriendList,
          required: false,
          as: 'Friends',
          where: { status: true },
          include: [
            {
              model: User,
              required: false,
              as: 'Approved Friends',
              attributes: [

                'id',
                'userType',
                'name',

              ],
              include: [
                {
                  model: organisationPost,
                  required: false,
                  as: 'UserPost',
                  include: [

                    {
                      model: organisationLikesCount,
                      required: false,
                      as: 'Post Likes Counts',
                    }

                  ]
                },

              ]

            }

          ]
        },




      ],

      distinct: true
    });
    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};


const addUserPosts = async (req) => {
  try {
    const userPostData = JSON.parse(req.body.userPostData);

    const { imageFile } = req.files;

    await writeFiles({ imageFile });
    let result;

    await Promise.all(
      userPostData.payload.map(async (item) => {

        let objUserPost = {
          userId: item.userId,
          postTypes: item.postTypes,
          title: item.title,
          description: item.description,
          department: item.department,
          subDepartment: item.subDepartment,
          state: item.state,
          city: item.city,
          workMode: item.workMode,
          jobType: item.jobType,
          jobRole: item.jobRole,
          eligibility: item.eligibility,
          college: item.college,
          course: item.course,
          exam: item.exam,
          corporate: item.corporate,
          status: item.status,
        }

        let jR = item.jobRole
        if (typeof jR === 'string') {
          jobName = await masterFilter.create({ name: jR, types: 'jobrole', statusId: 1 })
          const jobRoleId = await masterFilter.findOne({
            where: { name: jR }
          })
          if (jobRoleId.id) {
            objUserPost.jobRole = jobRoleId.id
          }
        }
        if (imageFile && imageFile.length > 0) {
          const fileExist = imageFile.find((image1) => image1.originalname);
          if (fileExist) {
            objUserPost.image = fileExist.originalname;
          }
        }
        result = await userPost.create(objUserPost, { returning: true });

        return result;
      })
    );
    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};



const updateUserPost = async (req) => {
  try {


    const userPostData = JSON.parse(req.body.userPostData);
    const { imageFile } = req.files;
    await writeFiles(req.files);

    if (imageFile && imageFile.length > 0) {
      const fileExist = imageFile.find(
        (file) => file.originalname.split('_')[0].replace(/\.[^/.]+$/, '') == userPostData.uniqueId
      );
      if (fileExist) {
        if (imageFile && imageFile.image)
          if (fs.existsSync(path.resolve(dir, `${imageFile.image}`))) {
            fs.unlinkSync(path.resolve(dir, `${imageFile.image}`));
          }

        userPostData.image = fileExist.originalname;
      }
    }

    const updateData = await userPost.update(userPostData, { where: { id: userPostData.id }, returning: true });



    return { data: updateData, success: true };
  } catch (error) {
    return { data: null, message: error.message, success: false };
  }
};



const userFullPostList = async (req) => {
  try {
    const pageNo = req.body.pageNo ? req.body.pageNo : 1;
    const size = req.body.pageSize ? req.body.pageSize : 10;
    let whrCondition = { deleted: false, status: 1 };
    if (req.body.search) {
      const obj = {
        title: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('title')), 'LIKE', `%${req.body.search.toLowerCase()}%`),
      };
      whrCondition = { ...obj, ...whrCondition };
    }
    if (req.body.id) {
      whrCondition = { id: req.body.id, deleted: false, status: 1 }
    }

    const result = await userPost.findAndCountAll({
      where: whrCondition,
      include: [
        {
          model: User,
          required: false,
          as: 'Users'
        },
     
        {
          model: mainStream,
          required: false,
          as: 'DepartMent'
        },
        {
          model: subStream,
          required: false,
          as: 'SubDepartment'
        },
        {
          model: State,
          required: false,
          as: 'States'
        },
        {
          model: City,
          required: false,
          as: 'Cities'
        },
        {
          model: masterFilter,
          required: false,
          as: 'JobRole'
        },
        {
          model: masterFilter,
          required: false,
          as: 'Eligibility'
        },
        {
          model: college,
          required: false,
          as: 'College'
        },
        {
          model: course,
          required: false,
          as: 'Course'
        },
        {
          model: exam,
          required: false,
          as: 'Exams'
        },
        {
          model: corporateRegister,
          required: false,
          as: 'Corporate'
        },
        {
          model: Status,
          required: false,
          as: 'Status'
        },
      ],

      offset: (pageNo - 1) * size,
      limit: size,
      distinct: true,
    });
    return { data: result, success: true };
  } catch (error) {
    throw new Error(error);
  }
};



const userPostDelete = async (req) => {
  try {
    const collg = await userPost.findOne({
      where: { id: req.id },
    });

    await collg.update({ deleted: true });
    return { success: true };
  } catch (error) {
    throw new Error(error);
  }
};


module.exports = {
  register,
  login,
  saveProxyAuthToken,
  getProxyAuthToken,
  userList,
  userDelete,
  userActive,
  verificationOtp,
  resendOtp,
  userPostLikeList,
  updateUserPassword,
  forgotUserPassword,
  addFriend,
  userPendingFriendRequest,
  approveFriendRequest,
  collegeRegisterPendingList,
  approveCollegeRegisterByAdmin,
  userPostList,
  addUserPosts,
  updateUserPost,
  userFullPostList,
  userPostDelete
};
