const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '../../');

const dir = `${baseDir}/documents/userProfile`;

const { User, Role, AuthToken, RolePermission, Permission } = require('../../models');
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

const writeFiles = async ({ files }) => {
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
    const roleDetail = await Role.findOne({ where: { key: roles[0] } });

    if (roleDetail.id) {
      userObj.roleId = await roleDetail.id;
    }

    const otp = generateOTP();
    userObj.otp = otp;
    userObj.ExpiresAt = Date.now() + 60000;

    const existingUser = await User.findOne({ where: { email: profileData.email.toLowerCase() } });
    if (existingUser) {
      return { success: false, user: null, token: null, message: 'User Already exists' };
    }
    const result = await User.create(userObj);

    return { success: true, user: result, roleDetail };
  } catch (error) {
    throw new Error(error);
  }
};

const login = async (req) => {
  try {
    const user = await User.findOne({
      where: { email: req.email.toLowerCase() },
      include: [
        {
          model: Role,
          attributes: ['id', 'key', 'title'],
        },
      ],
    });
    if (!user) {
      return { success: false, data: null, message: 'User does not exist.' };
    }

    const roleDetail = await Role.findOne({ where: { id: user.Role.id } });

  
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
    const expire = Date.now() + 60000;

    const requestOTP = await User.findOne({
      where: { id: req.body.id },
    });
    const updateOtp = await User.update({ otp, ExpiresAt: expire }, { where: { id: req.body.id } });
    return { success: true };
  } catch (error) {
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
    const userdel = await User.findOne({
      where: { id: req.id },
    });
    await userdel.update({ active: false });

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
};
