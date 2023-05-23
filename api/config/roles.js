const roleAccess = {
  user: [],
  admin: [],
  superadmin: [],
  operator: [],
  college: [],
  student: [],
};
const roles = Object.keys(roleAccess);
const roleRights = roleAccess;

module.exports = {
  roles,
  roleRights,
};
