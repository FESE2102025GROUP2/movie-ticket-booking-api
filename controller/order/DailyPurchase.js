'use strict';
const { Sequelize } = require("sequelize");
const db = require("../../models");

const getDailyPurchases = async (req, res) => {
  try {
    // Simple query to check if we can fetch data
    const simpleData = await db.Order.findAll({
      attributes: ['created_at', 'total_price'],
      limit: 5
    });

    console.log("Simple Data: ", simpleData);  // Check if we can fetch basic data

    const dailyData = await db.Order.findAll({
      attributes: [
        [Sequelize.fn("DATE", Sequelize.col("created_at")), "date"],  // Extract the date part from created_at
        [Sequelize.fn("SUM", Sequelize.col("total_price")), "totalPurchased"]  // Sum up the total_price
      ],
      group: [Sequelize.fn("DATE", Sequelize.col("created_at"))],  // Group by date
      order: [[Sequelize.fn("DATE", Sequelize.col("created_at")), "ASC"]],  // Order by date
      logging: console.log  // Log the SQL query for debugging
    });

    if (dailyData.length === 0) {
      console.log("No daily purchases found.");
      return res.status(404).json({ message: "No daily purchases found." });
    }

    res.status(200).json(dailyData);  // Return the data if available
  } catch (error) {
    console.error("Error fetching daily purchases:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = getDailyPurchases;
