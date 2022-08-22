// 1. Getting API Key.

const $ = require("axios");

let apiKey = null;
let chainId = 4690;
let contractInfo = null;

async function getAPIKey() {
	try {
		let response = await $.get('https://thentic.tech/api/key');
		return response.data;
	} catch (err) {
		console.log('error occured in getAPIKey', err);
		return null;
	}
}

async function createContract() {
	try {
		let response = await $.post('https://thentic.tech/api/nfts/contract', {
			key : apiKey,
			chain_id : chainId,
			name : 'TestContract',
			short_name : 'TC'
		});
		return response.data;
	} catch (err) {
		console.log('error occured in createContract', err);
		return null;
	}
}

async function getNFTContracts() {
	try {
		let response = await $.get('https://thentic.tech/api/contracts', {
			data : {
				key : apiKey,
				chain_id : chainId
			}
		});
		return response.data;
	} catch (err) {
		console.log('error occured in getNFTContracts', err);
		return null;
	}
}

async function main() {
	apiKey = await getAPIKey();
	if (apiKey == null) return;
	console.log('apiKey', apiKey);
	
	contractInfo = await createContract();
	if (contractInfo == null) return;
	console.log('contractInfo', contractInfo.request_id);


	console.log('contractList', await getNFTContracts());
}

main();