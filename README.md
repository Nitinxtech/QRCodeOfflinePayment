# Offline-Payments-QR-System
A digital payment solution for rural areas with unreliable internet, enabling secure QR code-based transactions that sync with Vultr cloud services once connectivity is restored. This project supports financial inclusion by providing cashless payment methods in underserved regions.



#Setup Instructions:
1. Prerequisites: Install Node.js, PostgreSQL, and create a Vultr account.
2. Server Setup: Clone repo, install dependencies, configure Vultr PostgreSQL in .env.
3. Database Setup: Use pgAdmin to create a transactions table.
4. Run the Server: Execute node app.js.

#Usage Instructions:
- Generate QR Code: Enter transaction details, generate QR code.
- Scan and Save: Scan QR codes, store transactions.
- Data Sync: Automatically syncs to Vultr database on internet availability.


![image](https://github.com/user-attachments/assets/67c45aeb-fa3d-4f6a-a719-a8b271115e1f)
