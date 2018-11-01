const registerStaus = {
	closed: "CLOSED",
	insuff: "INSUFFICIENT_FUNDS",
	open: "OPEN"
};

function checkCashRegister(price, cash, cid) {
	const cashRegister = { status: '', change: cid};
	const changeNeeded = parseFloat(cash - price).toFixed(2);
	const changeAvalible = getTotalDrawer(cid);
	cashRegister.status = getStatus(changeNeeded, changeAvalible);

	if(cashRegister.staus === registerStaus.insuff) {
		cashRegister.change = [];
		return cashRegister;
	}

	cashRegister.change = getChange(changeNeeded, cid);

	if (changeNeeded > getTotalDrawer(cashRegister.change)) {
		cashRegister.status = registerStaus.insuff;
		cashRegister.change = [];
	}

	if (cashRegister.status === registerStaus.closed) {
		cashRegister.change = [...cid];
	}
	return cashRegister;
}

function getChange(changeNeeded, cid) {
	const change = [];
	const cashList = {
   			"PENNY": 0.01,
	   		"NICKEL": 0.05,
	   		"DIME": 0.1,
	   		"QUARTER": 0.25,
	   		"ONE": 1,
	   		"FIVE": 5,
	   		"TEN": 10,
	   		"TWENTY": 20,
	   		"ONE HUNDRED": 100
  		}

  	for (let i = cid.length - 1; i >= 0; i--) {
  		const coinName = cid[i][0];
  		const coinTotal = cid[i][1];
  		const coinVal = cashList[coinName];
  		let coinAmount = (coinTotal / coinVal).toFixed(2);
  		let coinReturn = 0;

  		while(changeNeeded >= coinVal && > 0) {
  			changeNeeded -= coinVal;
  			changeNeeded = changeNeeded.toFixed(2);
  			coinAmount--;
  			coinReturn++;
  		}

  		if (coinReturn > 0) {
  			change.push([coinName, coinReturn * coinVal]);
  		}
  	}

  	return change;
}

function getStatus(changeNeeded, changeAvalible) {
	if(Number(changeNeeded) > Number(changeAvalible)) {
		return registerStaus.insuff;
	}

	if(Number(changeNeeded) < Number(changeAvalible)) {
		return registerStaus.open;
	}

	return registerStaus.closed;
}

function getTotalDrawer(cid) {
	let total = 0;
	for (let change of cid) {
		let value = change[1];
		total += value;
	}
	return total.toFixed(2);
}
