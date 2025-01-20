// photoController.js
export const photoController = {
  async create(req, res) {
    try {
      // If the file is uploaded successfully
      if (!req.file) {
        return res.status(400).send({ message: "No file uploaded" });
      }

      console.log(req.file); // Log the file details (you can save it to DB, etc.)

      // Send back the file URL as response
      return res.json({
        message: "File uploaded successfully",
        url: `http://localhost:2222/uploads/${req.file.filename}`,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};
