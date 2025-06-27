

const mongoose = require('mongoose');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

exports.healthCheck = asyncHandler(async (req, res) => {
    const dbStatus = mongoose.connection.readyState;

    const healthStatus = {
      status: 'OK',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: {
        status: dbStatus === 1 ? 'Connected' : 'Disconnected',
        readyState: dbStatus
      },

      memory: {
        rss: process.memoryUsage().rss / 1024 / 1024 + ' MB',
        heapTotal: process.memoryUsage().heapTotal / 1024 / 1024 + ' MB',
        heapUsed: process.memoryUsage().heapUsed / 1024 / 1024 + ' MB'
      }
    };

    return res.status(dbStatus === 1 ? 200 : 503).json(new ApiResponse(200, "OK", healthStatus));
})