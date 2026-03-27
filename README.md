Platzi Fake Store API
A RESTful API built for learning and experimentation, inspired by Platzi’s Fake Store project. This API provides endpoints for managing products, categories, users, and orders, simulating a real-world e-commerce backend.

🚀 Features
Products API: Create, read, update, and delete products.

Categories API: Organize products into categories.

Users API: Manage user accounts and authentication.

Orders API: Simulate shopping cart and order workflows.

JSON-based responses for easy integration with frontends.

Built with Node.js + Express for simplicity and scalability.

📦 Installation:

Clone the repository: 

git clone https://github.com/JazzlikeResolve/platziFakeStoreAPI.git
cd platziFakeStoreAPI

Install dependencies:
npm install

Run the development server:
npm run dev

The API will be available at:
http://localhost:3000/api/v1

🔑 Endpoints Overview
Resource	Method	Endpoint	Description
Products	GET	/products	List all products
Products	POST	/products	Create a new product
Products	GET	/products/:id	Get product by ID
Categories	GET	/categories	List all categories
Users	POST	/users	Register a new user
Orders	POST	/orders	Create a new order

⚙️ Configuration
Environment variables can be set in a .env file:

PORT=3000
DB_URL=mongodb://localhost:27017/fakestore
JWT_SECRET=your_secret_key

🧪 Testing
Run tests with:
npm test

🤝 Contributing
Fork the repository

Create a new branch (git checkout -b feature/my-feature)

Commit your changes (git commit -m 'Add new feature')

Push to your branch (git push origin feature/my-feature)

Open a Pull Request

This project is licensed under the MIT License. 

