task("donationOf", "donationOf")
    .addParam("account", "The account address")
    .setAction(async (taskArgs) => {
        const CONTRACT_DONATION_ADDRESS = process.env.CONTRACT_DONATION_ADDRESS
        const ContractArtifact = require('./../artifacts/contracts/Donation.sol/Donation.json')

        const signer = await ethers.getSigner(taskArgs.account);

        let contract = new ethers.Contract(CONTRACT_DONATION_ADDRESS, ContractArtifact.abi, signer)

        let contractSigner = contract.connect(signer)

        let donationAmount = await contractSigner.donationOf(signer.address);

        console.log("Donation: " + donationAmount)
    });

