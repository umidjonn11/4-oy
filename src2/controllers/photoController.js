export const photoController = {
  async create(req, res) {
    try {
      if (!req.file) {
        return res.status(400).send({ message: "No file uploaded" });
      }

      console.log(req.file); 

      return res.json({
        message: "File uploaded successfully",
        url: `http://localhost:2222/uploads/${req.file.filename}`,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};
