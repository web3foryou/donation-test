task("viewDonators", "viewDonators")
    .setAction(async () => {
        const CONTRACT_DONATION_ADDRESS = process.env.CONTRACT_DONATION_ADDRESS
        const ContractArtifact = require('./../artifacts/contracts/Donation.sol/Donation.json')

        const [signer] = await ethers.getSigners();

        let contract = new ethers.Contract(CONTRACT_DONATION_ADDRESS, ContractArtifact.abi, signer)

        let contractSigner = contract.connect(signer)

        let donationAmount = await contractSigner.viewDonators();

        console.log(donationAmount)
    });

