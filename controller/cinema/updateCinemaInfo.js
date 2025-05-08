const db = require("../../models");

const updateCinema = async (req, res, next) => {
  try {
    const cinemaId = req.params.id;
    const updatedData = req.body;

    // Check if user exists
    const cinema = await db.Cinema.findByPk(cinemaId);
    if (!cinema) {
      return res.status(404).json({ error: "Cinema not found" });
    }

    // Perform the update
    const [updateCount] = await db.Cinema.update(updatedData, {
      where: { id: cinemaId }
    });

    if (updateCount === 0) {
      return res.status(400).json({ message: "No changes were made" });
    }

    return res.json({ message: `${updateCount} record(s) updated` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = updateCinema;
