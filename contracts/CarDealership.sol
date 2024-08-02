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

    function getCar(string memory vin) public view returns (string memory carModel, uint256 price, string memory vinNumber) {
        for (uint256 i = 0; i < cars.length; i++) {
            if (keccak256(abi.encodePacked(cars[i].vin)) == keccak256(abi.encodePacked(vin))) {
                Car memory car = cars[i];
                return (car.carModel, car.price, car.vin);
            }
        }
        revert("Car not found");
    }

    function getCars() public view returns (Car[] memory) {
        return cars;
    }
}
