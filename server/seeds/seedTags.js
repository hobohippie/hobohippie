const mongoose = require('mongoose');
const connectionString = process.env.MONGODB_URI
const Tag = require('../models/tag-model'); 

mongoose.connect(connectionString)
  .then(() => console.log('Mongoose connected to the database'))
  .catch((err) => console.log(`Mongoose connection error: ${err}`));

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

const tags = [
    { name: 'Herbal' },
    { name: 'Organic' },
    { name: 'Natural' },
    { name: 'Wellness' },
    { name: 'Tea' },
    { name: 'Aromatherapy' },
    { name: 'Essential Oils' },
    { name: 'Home Remedies' },
    { name: 'Vegan' },
    { name: 'Sustainable' },
    { name: 'Eco-Friendly' },
    { name: 'Holistic' },
    { name: 'Meditation' },
    { name: 'Self-Care' },
    { name: 'Stress Relief' },
];


const seedTags = async () => {
    try {
        await Tag.deleteMany({});
        console.log('Existing tags deleted');

        const createdTags = await Tag.insertMany(tags);
        console.log('Tags created:', createdTags);
    } catch (error) {
        console.error('Error seeding tags:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedTags();
