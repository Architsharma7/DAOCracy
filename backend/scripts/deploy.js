const { ethers } = require('hardhat');

async function main() {
  /* 
    Deployement of the Verification Contract.
  */
  const verificationContract = await ethers.getContractFactory('Verification');
  const deployedVerificationContract = await verificationContract.deploy();
  await deployedVerificationContract.deployed();
  console.log(
    `Verification contract deployed at ${deployedVerificationContract.address}`
  );

  /*
    Deployment of NFTMinting Contract Address.
  */
  const nftMintingContract = await ethers.getContractFactory('NFTMinting');
  const deployNFTMintingContract = await nftMintingContract.deploy(
    deployedVerificationContract.address
  );
  await deployNFTMintingContract.deployed();
  console.log(
    'NFTMinting contract is deployed at: ',
    deployNFTMintingContract.address
  );

  /*
    Deployment of the Country DAO contract Address.
  */
  const countryDAOContract = await ethers.getContractFactory('MainDAO');
  const deployCountryDAOContract = await countryDAOContract.deploy('INDIA');
  await deployCountryDAOContract.deployed();
  console.log(
    'Country DAO contract is deployed at: ',
    deployCountryDAOContract.address
  );

  /*
    Deployment of the State DAO contract Address.
  */
  const upStateDAOContract = await ethers.getContractFactory('StateDAO');
  const deployUPStateDAOContract = await upStateDAOContract.deploy(
    'Uttar Pradesh',
    1,
    deployNFTMintingContract.address
  );
  await deployUPStateDAOContract.deployed();
  console.log(
    'Uttar Pradesh State DAO contract is deployed at: ',
    deployUPStateDAOContract.address
  );

  /*
    Deployment of the State DAO contract Address.
  */
  const kStateDAOContract = await ethers.getContractFactory('StateDAO');
  const deployKStateDAOContract = await kStateDAOContract.deploy(
    'Karnataka',
    2,
    deployNFTMintingContract.address
  );
  await deployKStateDAOContract.deployed();
  console.log(
    'Karnataka State DAO contract is deployed at: ',
    deployKStateDAOContract.address
  );

  /*
    Deployment of the State DAO contract Address.
  */
  const APStateDAOContract = await ethers.getContractFactory('StateDAO');
  const deployAPStateDAOContract = await APStateDAOContract.deploy(
    'Andhra Pradesh',
    3,
    deployNFTMintingContract.address
  );
  await deployAPStateDAOContract.deployed();
  console.log(
    'Andhra Pradesh State DAO contract is deployed at: ',
    deployAPStateDAOContract.address
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
