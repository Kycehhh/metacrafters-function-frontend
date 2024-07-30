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

  const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
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
      if (carDealership) {
        const tx = await carDealership.addCar(carModel, ethers.utils.parseEther(price), vin);
        await tx.wait();
        getCars();
      }
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  const getCars = async () => {
    try {
      if (carDealership) {
        const cars = await carDealership.getCars();
        setCars(cars);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this application.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>;
    }

    return (
      <div>
        <p>Your Account: {account}</p>
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
        <ul>
          {cars.map((car, index) => (
            <li key={index}>
              Model: {car.carModel}, Price: {ethers.utils.formatEther(car.price)} ETH, VIN: {car.vin}
            </li>
          ))}
        </ul>
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

  const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
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
      if (carDealership) {
        const tx = await carDealership.addCar(carModel, ethers.utils.parseEther(price), vin);
        await tx.wait();
        getCars();
      }
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  const getCars = async () => {
    try {
      if (carDealership) {
        const cars = await carDealership.getCars();
        setCars(cars);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this application.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>;
    }

    return (
      <div>
        <p>Your Account: {account}</p>
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
        <ul>
          {cars.map((car, index) => (
            <li key={index}>
              Model: {car.carModel}, Price: {ethers.utils.formatEther(car.price)} ETH, VIN: {car.vin}
            </li>
          ))}
        </ul>
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

  const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
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
      if (carDealership) {
        const tx = await carDealership.addCar(carModel, ethers.utils.parseEther(price), vin);
        await tx.wait();
        getCars();
      }
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  const getCars = async () => {
    try {
      if (carDealership) {
        const cars = await carDealership.getCars();
        setCars(cars);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this application.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>;
    }

    return (
      <div>
        <p>Your Account: {account}</p>
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
        <ul>
          {cars.map((car, index) => (
            <li key={index}>
              Model: {car.carModel}, Price: {ethers.utils.formatEther(car.price)} ETH, VIN: {car.vin}
            </li>
          ))}
        </ul>
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
