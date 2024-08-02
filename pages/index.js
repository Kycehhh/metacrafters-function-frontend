import { useState, useEffect } from "react";
import { ethers } from "ethers";
import carDealershipAbi from "../artifacts/contracts/CarDealership.sol/CarDealership.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [carDealership, setCarDealership] = useState(undefined);
  const [cars, setCars] = useState([]);
  const [carModel, setCarModel] = useState("");
  const [price, setPrice] = useState("");
  const [vin, setVin] = useState("");
  const [carIndex, setCarIndex] = useState("");
  const [specificCar, setSpecificCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // State variables to control visibility
  const [showCarsList, setShowCarsList] = useState(false);
  const [showGetCar, setShowGetCar] = useState(false);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const carDealershipABI = carDealershipAbi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(new ethers.providers.Web3Provider(window.ethereum));
    }
  };

  const handleAccount = async () => {
    if (ethWallet) {
      const accounts = await ethWallet.listAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setAccount(undefined);
      }
    }
  };

  const connectAccount = async () => {
    try {
      if (!ethWallet) {
        alert("MetaMask wallet is required to connect");
        return;
      }

      const accounts = await ethWallet.send("eth_requestAccounts");
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Failed to connect MetaMask:", error);
    }
  };

  const getCarDealershipContract = () => {
    if (ethWallet && account) {
      const signer = ethWallet.getSigner();
      const carDealershipContract = new ethers.Contract(contractAddress, carDealershipABI, signer);
      setCarDealership(carDealershipContract);
    }
  };

  const addCar = async () => {
    try {
      if (carModel === "" || price === "" || vin === "") {
        setError("All fields are required.");
        return;
      }
  
      setLoading(true);
      setError("");
  
      if (carDealership) {
        const tx = await carDealership.addCar(carModel, ethers.utils.parseEther(price), vin);
        await tx.wait();
  
        const newCar = { carModel, price: ethers.utils.parseEther(price), vin };
        setCars((prevCars) => [...prevCars, newCar]);
      }
    } catch (error) {
      console.error("Error adding car:", error);
      setError("Failed to add car. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getCars = async () => {
    try {
      setLoading(true);
      setError("");
  
      if (cars.length > 0) {
        setShowCarsList(true);
        console.log('Cars:', cars);
      } else {
        setError("No cars available. Please add some cars first.");
      }
    } catch (error) {
      console.error("Error displaying cars:", error);
      setError("Failed to display cars. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getCar = async (index) => {
    try {
      if (carIndex === "") {
        setError("Car index is required.");
        return;
      }
  
      setLoading(true);
      setError("");
  
      const car = cars[index];
      if (car) {
        setSpecificCar(car);
        setShowGetCar(true);
      } else {
        setError("Car not found. Please check the index.");
      }
    } catch (error) {
      console.error("Error displaying car:", error);
      setError("Failed to display car. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask in order to use this application.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Please connect your MetaMask wallet</button>;
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <h2>Add Car</h2>
        <input
          type="text"
          placeholder="Car Model"
          value={carModel}
          onChange={(e) => setCarModel(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price (ETH)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="VIN"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
        />
        <button onClick={addCar}>Add Car</button>
        
        <h2>Cars List</h2>
        <button onClick={getCars}>Get Cars</button>
        {showCarsList && (
          <ul>
            {cars.map((car, index) => (
              <li key={index}>
                Index: {index}, Model: {car.carModel}, Price: {ethers.utils.formatEther(car.price)} ETH, VIN: {car.vin}
              </li>
            ))}
          </ul>
        )}

        <h2>Get Car by Index</h2>
        <input
          type="number"
          placeholder="Car Index"
          value={carIndex}
          onChange={(e) => setCarIndex(e.target.value)}
        />
        <button onClick={() => getCar(carIndex)}>Get Car</button>
        {showGetCar && specificCar && (
          <div>
            <h3>Car Details</h3>
            <p>Model: {specificCar.carModel}</p>
            <p>Price: {ethers.utils.formatEther(specificCar.price)} ETH</p>
            <p>VIN: {specificCar.vin}</p>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  useEffect(() => {
    handleAccount();
  }, [ethWallet]);

  useEffect(() => {
    getCarDealershipContract();
  }, [account]);

  return (
    <main className="container">
      <header><h1>Welcome to the Car Dealership App!</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
        }
      `}</style>
    </main>
  );
}
