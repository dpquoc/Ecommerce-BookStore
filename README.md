# E-commerce Book Store Website

This is an e-commerce book store website built with React as the frontend and pure PHP as the backend. The website uses MySQL as the database to store books and user information.

## Features

- Browse and search books by categories, authors, titles, etc.
- Add books to cart and checkout with payment options
- Manage orders and track delivery status
- Create and edit user profile and preferences
- Rate and review books and provide feedback
- Admin dashboard to manage inventory, orders, users, etc.
- Forget Password and Reset Password by email.

## Getting Started

To get started with the project, you need to follow these instructions:

1. Clone the repository to your local machine.
2. Navigate to the root directory of the project and start the server to serve the `server` folder.
3. Navigate to the `client` folder and run `npm run dev`.

## Prerequisites

To run this project on your machine, you need to have the following installed:

- Node.js
- MySQL
- PHP

### Mailing Configuration

To enable the mailing function for password recovery and other email-related features, please follow these steps:

1. Add the PHPMailer library folder named `PHPMailer` to the `server` folder of the project. You can obtain the PHPMailer library from the official PHPMailer GitHub repository.

2. Configure the mailing settings in the `mailer.php` function located in the `server` folder. Update the SMTP server, port, authentication credentials, and other necessary configuration options based on your email service provider's requirements.

By adding the `PHPMailer` library and configuring the `mailer.php` function, you will enable the mailing functionality in the e-commerce bookstore website.

## Installing

1. Clone the repository to your local machine using the command
```
git clone https://github.com/dpquoc/Ecommerce-BookStore
```
2. Navigate to the root directory of the project and install the dependencies using the command `npm install`
3. Navigate to the `client` directory and install the dependencies using the command `npm install`

## Running the Server

To run the server, navigate to the `server` folder and run a local server to serve the folder. You can use tools like XAMPP, WAMP or MAMP for this. If not, navigate to the root directory of the project and run the following command:

```
php -S localhost:80 -t server
```

**Note:** If you are not using XAMPP, WAMP, or MAMP, and instead have your own MySQL configuration, please make sure to adjust the necessary settings in the project's code to ensure the server runs correctly.

## Running the Client

To run the client, navigate to the `client` directory and run the following command:

```
npm run dev
```

## Built With

- React
- PHP
- MySQL

## Contributing

If you wish to contribute to this project, feel free to submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

