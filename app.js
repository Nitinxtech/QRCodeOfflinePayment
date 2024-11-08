const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transaction');
const { Pool } = require('pg');


const pool = new Pool({
    user: 'vultradmin',
    host: 'vultr-prod-b74ecd45-d9cf-44ad-931f-ae976e38d3ef-vultr-prod-0e40.vultrdb.com',
    database: 'defaultdb',
    password: 'AVNS_Wy8zA-xo5kW87-qTQt2',
    port: '16751',
  });

  
const app = express();
connectDB();


const createTableQuery = `
  CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    data TEXT NOT NULL,
    synced BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

pool.query(createTableQuery)
  .then(() => console.log('Transactions table is ready.'))
  .catch(err => console.error('Error creating table:', err));

pool.connect((err) => {
    if (err) {
      console.error('Failed to connect to PostgreSQL:', err);
    } else {
      console.log('Connected to PostgreSQL on Vultr.');
    }
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', authRoutes);
app.use('/transaction', transactionRoutes);
// Add this code after setting up your middleware
app.set('views', path.join(__dirname, 'views'));  // Set views directory

app.get('/', (req, res) => {
    res.render('index');  // Render the index.ejs view
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
