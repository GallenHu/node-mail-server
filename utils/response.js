module.exports = {
  makeResponse: {
    success: function(data) {
      return {
        code: 0,
        data,
        message: 'success',
      };
    },
    error: function(message) {
      return {
        code: 1001,
        data: null,
        message,
      }
    }
  },
};
