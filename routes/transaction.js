const express = require('express');
const QRCode = require('qrcode');
const Transaction = require('../models/Transaction');
const router = express.Router();

// Generate QR Code for transaction
router.post('/generate', async (req, res) => {
    const { data } = req.body;
    const qrCodeData = await QRCode.toDataURL(data);
    const transaction = new Transaction({ data, userId: req.userId });
    await transaction.save();
    res.render('result', { qrCodeData });
});

// Sync transactions
router.post('/sync', async (req, res) => {
    try {
      const transactions = await Transaction.find({ userId: req.userId, synced: false });
      for (const transaction of transactions) {
        transaction.synced = true;
        await transaction.save();
      }
      res.json({ message: 'Synced successfully', transactions });
    } catch (err) {
      res.status(500).send({ error: 'Sync failed' });
    }
  });

  router.get('/process', async (req, res) => {
    try {
      const { data } = req.query;  // Get data from the QR code scan
  
      if (!data) {
        return res.status(400).send('No transaction data found.');
      }
  
      // Process the transaction data or save it as needed
      res.render('result', { data, qrCodeData: data });  // Render result.ejs with transaction data
    } catch (error) {
      console.error('Error processing transaction:', error);
      res.status(500).send('Failed to process transaction.');
    }
  });
  

module.exports = router;
