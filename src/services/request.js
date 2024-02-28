const RequestDb = require("../dbAccess/request");

module.exports = {
  createRequest: async (params) => {
    try {
      return await RequestDb.createRequest(params);
    } catch (error) {
      throw error;
    }
  },
  findAll: async () => {
    try {
      const requests = await RequestDb.findAll();
      return requests;
    } catch (error) {
      throw error;
    }
  },
  findByIdAndUpdate: async (id, update) => {
    try {
      return await RequestDb.findByIdAndUpdate(id, update);
    } catch (error) {
      throw error;
    }
  },
  findByIdAndDelete: async (id) => {
    try {
      return await RequestDb.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  },
  findSelfRequest: async (id) => {
    try {
      return await RequestDb.findSelfRequest(id);
    } catch (error) {
      throw error;
    }
  },
  getRequestStatus: async (id) => {
    try {
      return await RequestDb.getRequestStatus(id);
    } catch (error) {
      throw error;
    }
  },
  getRequestByStatus: async (id, status) => {
    try {
      return await RequestDb.getRquestByStatus(id, status);
    } catch (error) {
      throw error;
    }
  },
};
