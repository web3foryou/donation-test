task("donation", "make donation")
    .addParam("account", "The account address")
    .addParam("amount", "Amount donate")
    .setAction(async (taskArgs) => {
        const CONTRACT_DONATION_ADDRESS = process.env.CONTRACT_DONATION_ADDRESS;
        const ContractArtifact = require('./../artifacts/contracts/Donation.sol/Donation.json');

        const signer = await ethers.getSigner(taskArgs.account);

        let contract = new ethers.Contract(CONTRACT_DONATION_ADDRESS, ContractArtifact.abi, signer);

        let contractSigner = contract.connect(signer);

        let overrides = {
            value: taskArgs.amount,
        };

        let tx = await contractSigner.makeDonation(overrides);

        await tx.wait();

        let donationAmount = await contractSigner.donationOf(signer.address);

        console.log("Total donation: " + donationAmount);
        console.log("Contract balance: " + await ethers.provider.getBalance(CONTRACT_DONATION_ADDRESS));
    });

