module.exports = {
  apps: [
    {
      name: 'Hobohippie-Backend',
      script: './server.js', // Entry point for your backend application
      instances: '1', // Number of instances to run
      exec_mode: 'cluster', // Cluster mode for load balancing
      watch: process.env.NODE_ENV !== 'production', // Enable watch mode in development
      env: {
        NODE_ENV: 'development', // Environment variable for development
        PORT: 3000, // Port for development
        MONGODB_URI: 'mongodb+srv://free:7130TulipTrail3723542@hobohippie.rdv1r.mongodb.net/?retryWrites=true&w=majority&appName=HoboHippie', // Development MongoDB URI
      },
      env_production: {
        NODE_ENV: 'production', // Environment variable for production
        PORT: 3000, // Port for production
        MONGODB_URI: 'mongodb+srv://free:7130TulipTrail3723542@hobohippie.rdv1r.mongodb.net/?retryWrites=true&w=majority&appName=HoboHippie', // Production MongoDB URI
      },
    },
  ],
};
