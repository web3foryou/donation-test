task("withdrawal", "withdrawal")
    .addParam("account", "The account address")
    .addParam("amount", "Amount withdrawal")
    .setAction(async (taskArgs) => {
        const CONTRACT_DONATION_ADDRESS = process.env.CONTRACT_DONATION_ADDRESS;
        const ContractArtifact = require('./../artifacts/contracts/Donation.sol/Donation.json');

        const [signer] = await ethers.getSigners();

        let contract = new ethers.Contract(CONTRACT_DONATION_ADDRESS, ContractArtifact.abi, signer)

        console.log("Contract balance before: " + await ethers.provider.getBalance(CONTRACT_DONATION_ADDRESS));

        let contractSigner = contract.connect(signer)

        let tx = await contractSigner.withdrawal(taskArgs.account, taskArgs.amount);

        await tx.wait()

        console.log("Contract balance after: " + await ethers.provider.getBalance(CONTRACT_DONATION_ADDRESS));
    });

