const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const nodemailer = require("nodemailer")



const { User, Role, AuthToken, RolePermission, Permission, State, City, listOfUsersLikes } = require('../../models');
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




const writeFiles = async ({ files, profile, cover }) => {
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
    };

    if (profileData.password) {
      userObj.password = await bcrypt.hash(profileData.password, 12);
    }
    if (profileData.userType === "College") {
      userObj.active = false;
    }
    const roleDetail = await Role.findOne({ where: { key: roles[0] } });

    if (roleDetail.id) {
      userObj.roleId = await roleDetail.id;
    }

    const otp = generateOTP();
    console.log(otp, '900090')
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
      result = await User.update(userObj, { where: { id: profileData.id }, returning: true });

    } else {

      result = await User.create(userObj);
    }


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

    const userResult = await User.findOne({
      where: { id: result.id },
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
        'password',
        'collegeWebsite',
        'collegeId',
        'roleId'
      ]
    })

    return { success: true, user: userResult, roleDetail };
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
    console.log(error,'8989898989')
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
    let whereCondition = {};
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
      'password',
      'collegeWebsite',
      'collegeId',
      'roleId'
    ]
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

  try{
  const loggedUser = await User.findOne({
    where:{email:req.body.email}
  });
console.log(loggedUser,'9898989')
  const hashedPassword = await bcrypt.hash(req.body.password,12);

  const updateUser = await User.update(
    
      {password: hashedPassword},
   { where: {email: req.body.email}} ,
  );
  if(updateUser){
    message="Password Change Succesfully"
  }
  return { newData: updateUser,message, success: true };
    } catch (error) {
      return { newData: null, success: false };
    }
};


const forgotUserPassword = async (req, res) => {
  const loggedUser = await User.findOne({
  where: { email: req.body.email}
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
      console.log(error,'989898989898');
    } else {
      console.log("Email sent: " + info.response);
      // do something useful
    }
  });

  return {  success: true };

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
  forgotUserPassword
};
