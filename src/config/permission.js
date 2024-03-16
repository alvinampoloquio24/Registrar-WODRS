const roles = {
  admin: {
    User: ["manage"],
    Request: ["manage"],
    Transaction: ["manage"],
    Course: ["manage"],
    Feedback: ["manage"],
  },
  student: {
    User: ["readSelf", "updateSelf"],
    Request: ["readSelf", "create", "updateSelf", "deleteSelf"],
    Course: ["read"],
    Feedback: ["manage"],
    Transaction: ["readSelf"],
  },
  registrar: {
    User: ["manage"],
    Request: ["manage"],
    Transaction: ["manage"],
    Course: ["manage"],
    Feedback: ["manage"],
  },
  cashier: {
    User: ["manage"],
    Request: ["manage"],
    Transaction: ["manage"],
    Course: ["manage"],
    Feedback: ["manage"],
  },
};

module.exports = roles;
