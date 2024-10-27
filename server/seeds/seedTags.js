const mongoose = require('mongoose');
const Tag = require('../models/tag'); 

mongoose.connect('mongodb://localhost:27017/yourdbname', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
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
