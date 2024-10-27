const Tag = require('../models/tag-model'); 

const tagController = {

    getAllTags: async (req, res) => {
        try {
            const tags = await Tag.find();
            res.status(200).json(tags);
        } catch (error) {
            console.error('Error fetching tags:', error);
        }
    },


    createTag: async (req, res) => {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Tag name is required.' });
        }

        try {
            const newTag = new Tag({ name });
            await newTag.save();
            res.status(201).json(newTag);
        } catch (error) {
            console.error('Error creating tag:', error);
            res.status(500).json({ message: 'Server error while creating tag.' });
        }
    },

    deleteTag: async (req, res) => {
      const { name } = req.params;
      try {
          const tag = await Tag.findOneAndDelete({ name: name });
          if (!tag) {
              return res.status(404).json({ message: 'Tag not found.' });
          }
          res.status(204).send(); 
      } catch (error) {
          console.error('Error deleting tag:', error);
          res.status(500).json({ message: 'Server error while deleting tag.' });
      }
  }
  
};

module.exports = tagController;
