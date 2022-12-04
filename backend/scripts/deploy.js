const { ethers } = require('hardhat');

async function main() {
  /* 
    Deployement of the Verification Contract.
  */
  const verificationContract = await ethers.getContractFactory('Verification');
  const deployedVerificationContract = await verificationContract.deploy();
  await deployedVerificationContract.deployed();
  console.log('Sleeping.....');
  await sleep(50000);
  await hre.run('verify:verify', {
    address: deployedVerificationContract.address,
  });
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
  console.log('Sleeping.....');
  await sleep(50000);
  await hre.run('verify:verify', {
    address: deployNFTMintingContract.address,
    constructorArguments: [deployedVerificationContract.address],
  });
  console.log(
    'NFTMinting contract is deployed at: ',
    deployNFTMintingContract.address
  );

  /*
    Deployment of the Country DAO contract Address.
  */
  const countryName = 'India';
  const countryDAOContract = await ethers.getContractFactory('MainDAO');
  const deployCountryDAOContract = await countryDAOContract.deploy(countryName);
  await deployCountryDAOContract.deployed();
  console.log('Sleeping.....');
  await sleep(50000);
  await hre.run('verify:verify', {
    address: deployCountryDAOContract.address,
    constructorArguments: [countryName],
  });
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
  console.log('Sleeping.....');
  await sleep(50000);
  await hre.run('verify:verify', {
    address: deployUPStateDAOContract.address,
    constructorArguments: [
      'Uttar Pradesh',
      1,
      deployNFTMintingContract.address,
    ],
  });
  console.log(
    'Uttar Pradesh State DAO contract is deployed at: ',
    deployUPStateDAOContract.address
  );
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

/*
Sleeping.....
Nothing to compile
Successfully submitted source code for contract
contracts/Verification.sol:Verification at 0x21D45f4C8102F9665B938Fafc471366E2F36dEE2
for verification on the block explorer. Waiting for verification result...

Successfully verified contract Verification on Etherscan.
https://mumbai.polygonscan.com/address/0x21D45f4C8102F9665B938Fafc471366E2F36dEE2#code
Verification contract deployed at 0x21D45f4C8102F9665B938Fafc471366E2F36dEE2
Sleeping.....
Compiled 15 Solidity files successfully
Successfully submitted source code for contract
contracts/NFTMinting.sol:NFTMinting at 0xBe89C0F04056F43b4397A4AC49149Df8A606F9f5
for verification on the block explorer. Waiting for verification result...

Successfully verified contract NFTMinting on Etherscan.
https://mumbai.polygonscan.com/address/0xBe89C0F04056F43b4397A4AC49149Df8A606F9f5#code
NFTMinting contract is deployed at:  0xBe89C0F04056F43b4397A4AC49149Df8A606F9f5
Sleeping.....
Nothing to compile
Successfully submitted source code for contract
contracts/MainDAO.sol:MainDAO at 0x0fe0FA841Fe426a7d2529b3dEB344fF8D1d41893
for verification on the block explorer. Waiting for verification result...

Successfully verified contract MainDAO on Etherscan.
https://mumbai.polygonscan.com/address/0x0fe0FA841Fe426a7d2529b3dEB344fF8D1d41893#code
Country DAO contract is deployed at:  0x0fe0FA841Fe426a7d2529b3dEB344fF8D1d41893
Sleeping.....
Nothing to compile
Successfully submitted source code for contract
contracts/StateDAO.sol:StateDAO at 0xFdcbbf41e9bc5043De844Be8Bbe7e723A787E534
for verification on the block explorer. Waiting for verification result...

Successfully verified contract StateDAO on Etherscan.
https://mumbai.polygonscan.com/address/0xFdcbbf41e9bc5043De844Be8Bbe7e723A787E534#code
Uttar Pradesh State DAO contract is deployed at:  0xFdcbbf41e9bc5043De844Be8Bbe7e723A787E534
Sleeping.....
Nothing to compile
Successfully submitted source code for contract
contracts/StateDAO.sol:StateDAO at 0xfCfa3Ae5AD5414cB8066C4dF50b9Be69645d9010
for verification on the block explorer. Waiting for verification result...

*/
