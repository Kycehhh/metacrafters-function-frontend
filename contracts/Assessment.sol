// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CarDealership {
    struct Car {
        string carModel;
        uint256 price;
        string vin; // Vehicle Identification Number
    }

    Car[] private cars;

    function addCar(string memory carModel, uint256 price, string memory vin) public {
        cars.push(Car(carModel, price, vin));
    }

    function getCars() public view returns (Car[] memory) {
        return cars;
    }

    function getCar(uint256 index) public view returns (string memory carModel, uint256 price, string memory vin) {
        require(index < cars.length, "Car index out of range");
        Car memory car = cars[index];
        return (car.carModel, car.price, car.vin);
    }
}
