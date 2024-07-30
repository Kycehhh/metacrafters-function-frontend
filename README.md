# Car Dealership DApp

## Description

This project demonstrates a decentralized application (DApp) built on the Ethereum blockchain using Solidity smart contracts and a React.js frontend. The DApp allows users to interact with a smart contract to manage car listings, including adding new cars and viewing available cars.

## Smart Contract Functions

The smart contract deployed for this DApp includes the following functions:

- **addCar**: Allows users to add a new car to the dealership with the car model, price, and VIN.
- **getCars**: Returns a list of all cars available in the dealership.
- **getCar**: Returns details of a specific car by its index.

## Frontend Features

### Installing

After cloning the GitHub repository, follow these steps to get the code running on your computer:

1. Inside the project directory, install dependencies:

   ```bash
   npm install
   ```

2. Open two additional terminals in your VS code.

3. In the second terminal, start the Hardhat development network:

   ```bash
   npx hardhat node
   ```

4. In the third terminal, deploy the smart contract to the local network:

   ```bash
   npx hardhat run --network localhost scripts/deploy.js
   ```

5. Back in the first terminal, start the frontend development server:

   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000` to view the application.

### Executing Program

To use the Car Dealership DApp:

- Connect your MetaMask wallet to the DApp.
- View the list of cars available in the dealership.
- Add new cars by providing the car model, price, and VIN.
- View details of a specific car by its index.

## Help

For common problems or issues, please refer to the troubleshooting section in the README.md file.

## Authors

- [Allen Kyle Sabilala](https://github.com/Kycehhh)

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
