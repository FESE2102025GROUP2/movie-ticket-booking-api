const db = require("../../models");

const getTopOrderedMovies = async (req, res) => {
  try {
    const topMovies = await db.OrderItem.findAll({
      attributes: [
        'movieId', // Assuming OrderItem has movieId
        [db.sequelize.fn('SUM', db.sequelize.col('quantity')), 'totalQuantity'], // Sum of quantity for each movie
      ],
      include: [
        {
          model: db.Movie, // Assuming OrderItem has a relationship with Movie
          as: 'movie', // Use the correct alias here (make sure it matches the association alias)
          attributes: ['id', 'title'], // Include movie details
        },
      ],
      group: ['movieId'], // Group by movieId to sum quantities for each movie
      order: [[db.sequelize.fn('SUM', db.sequelize.col('quantity')), 'DESC']], // Order by total quantity in descending order
      limit: 10, // Limit to top 10
    });

    res.status(200).json(topMovies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = getTopOrderedMovies;
