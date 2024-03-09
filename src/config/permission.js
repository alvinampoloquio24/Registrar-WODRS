const roles = {
  admin: {
    User: ["manage"],
    Request: ["manage"],
    Transaction: ["manage"],
    Course: ["manage"],
  },
  student: {
    User: ["readSelf", "updateSelf"],
    Request: ["readSelf", "create", "updateSelf", "deleteSelf"],
    Course: ["read"],
  },
  registrar: {
    User: ["manage"],
    Request: ["manage"],
    Transaction: ["manage"],
    Course: ["manage"],
  },
  cashier: {
    User: ["manage"],
    Request: ["manage"],
    Transaction: ["manage"],
    Course: ["manage"],
  },
};

module.exports = roles;
