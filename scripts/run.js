const main = async () => {
  const [owner, randoPerson] = await hre.ethers.getSigners();

  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther('0.1'),
  });
  await waveContract.deployed();

  console.log("Contract deployed to:", waveContract.address);

  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    'Contract balance:',
    hre.ethers.utils.formatEther(contractBalance)
  );

  let waveCount;
  waveCount = await waveContract.getTotalWaves();

  let waveTxn = await waveContract.wave("Hello wave with message");
  await waveTxn.wait();

  waveTxn = await waveContract.wave("Hello third wave with message");
  await waveTxn.wait();

  waveTxn = await waveContract.connect(randoPerson).wave("Hello wave from random person");
  await waveTxn.wait();

  contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    'Contract after balance:',
    hre.ethers.utils.formatEther(contractBalance)
  );

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);


};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
