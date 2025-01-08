const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { HttpsProxyAgent } = require('https-proxy-agent');

// const proxyUrl = process.env.PROXY_URL; // From .env
// const httpsAgent = new HttpsProxyAgent(proxyUrl);

// Create an HTTPS proxy agent
// const proxyAgent = new HttpsProxyAgent(proxyUrl);
// const prisma = new PrismaClient({
//     datasources: {
//       db: {
//         url: process.env.DATABASE_URL, // Database connection string
//       },
//     },
//     // Use the proxy at the network level
//     clientOptions: {
//       request: {
//         agent: httpsAgent,
//       },
//     },
//   });
// const prisma = new PrismaClient({
//     datasources: {
//       db: {
//         url: process.env.DATABASE_URL,
//         driverOptions: {
//           httpsAgent: proxyAgent,
//         },
//       },
//     },
//   });

const prisma = new PrismaClient();
const app = express();
const port = 443;

app.use(express.json());

// Create a new user
app.post('/users', async (req, res) => {
    try {
        console.log("create user route")
        const user = await prisma.user.create({
            data: req.body, // Expecting { username, email, phoneNo } in the request body
        });
        res.json(user);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// Get all users
app.get('/users', async (req, res) => {
    console.log("get all users route")
    const users = await prisma.user.findMany();
    res.json(users);
});

// Get a user by ID
app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        console.log("get user route")
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// Update a user
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        console.log("update user route")
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: req.body,
        });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});

// Delete a user
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.user.delete({
            where: { id: parseInt(id) },
        });
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});



// const express = require('express');
// const { PrismaClient } = require('@prisma/client');
// const { Pool } = require('pg');
// const { HttpsProxyAgent } = require('https-proxy-agent');

// // Load environment variables
// require('dotenv').config();

// const app = express();
// const port = 3000;

// // Set up proxy agent
// const proxyUrl = process.env.PROXY_URL; // From .env
// const httpsAgent = new HttpsProxyAgent(proxyUrl);

// // Create a PostgreSQL pool with proxy support
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
//   connectionOptions: {
//     agent: httpsAgent,
//   },
// });

// // Prisma Client setup
// const prisma = new PrismaClient({
//   datasources: {
//     db: {
//       url: process.env.DATABASE_URL,
//     },
//   },
// });

// // Middleware to parse JSON
// app.use(express.json());

// // Example route
// app.get('/', async (req, res) => {
//   try {
//     console.log("at get route");
//     const users = await prisma.user.findMany();
//     res.json(users);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Failed to fetch users' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

// module.exports = app;




// const express = require('express');
// const { PrismaClient } = require('@prisma/client');
// const { HttpsProxyAgent } = require('https-proxy-agent');

// // Load environment variables
// require('dotenv').config();

// const app = express();
// const port = 3000;

// // Set up proxy agent for Prisma
// const proxyUrl = process.env.PROXY_URL; // Ensure PROXY_URL is set in your .env file
// const proxyAgent = new HttpsProxyAgent(proxyUrl);

// const prisma = new PrismaClient({
//   datasources: {
//     db: {
//       url: process.env.DATABASE_URL, // Database connection string
//       driverOptions: {
//         httpsAgent: proxyAgent, // Assign proxy agent to Prisma
//       },
//     },
//   },
// });

// // Middleware to parse JSON requests
// app.use(express.json());

// // Route Handlers

// // Create a new user
// app.post('/users', async (req, res) => {
//   try {
//     const user = await prisma.user.create({
//       data: req.body, // Expects { username, email, phoneNo } in the request body
//     });
//     res.status(201).json(user);
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ error: 'Failed to create user' });
//   }
// });

// // Get all users
// app.get('/users', async (req, res) => {
//   try {
//     const users = await prisma.user.findMany();
//     res.json(users);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ error: 'Failed to fetch users' });
//   }
// });

// // Get a user by ID
// app.get('/users/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await prisma.user.findUnique({
//       where: { id: parseInt(id) },
//     });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.json(user);
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     res.status(500).json({ error: 'Failed to fetch user' });
//   }
// });

// // Update a user
// app.put('/users/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const updatedUser = await prisma.user.update({
//       where: { id: parseInt(id) },
//       data: req.body,
//     });
//     res.json(updatedUser);
//   } catch (error) {
//     console.error('Error updating user:', error);
//     res.status(500).json({ error: 'Failed to update user' });
//   }
// });

// // Delete a user
// app.delete('/users/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     await prisma.user.delete({
//       where: { id: parseInt(id) },
//     });
//     res.json({ message: 'User deleted' });
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     res.status(500).json({ error: 'Failed to delete user' });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });

// module.exports = app;
