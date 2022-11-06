import {loadStdlib} from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
import { ask } from '@reach-sh/stdlib';

const stdlib = loadStdlib(process.env);
console.log(`The consensus network is ${stdlib.connector}.`);
if (process.argv.length < 3 || ['c','d','t'].includes(process.argv[2]) == false) {
  console.log('Usage: reach run index [c|d|t]');
  process.exit(0);
}
const role = process.argv[2];
const suStr = stdlib.standardUnit;

const toAU = (su) => stdlib.parseCurrency(su);
const toSU = (au) => stdlib.formatCurrency(au, 4);
const iBalance = toAU(1000);
const showBalance = async (acc) => console.log(`Your balance is ${toSU(await stdlib.balanceOf(acc))} ${suStr}.`);



const commonInteract = {
  //dun have this
  // transportCancellation: () => { console.log(`The job was refused.`); },
  //accept order -- YES
  reportOrderAccepted: () => { console.log(`The designer accepted the order.`); },
  //accept order -- NO
  reportOrderRejected: () => { console.log(`The designer rejected the order, exiting...`); },
  //add this one for buyer cancel oreder?
  // buyerCancellation: () => { console.log(`The buyer cancelled the order.`); },
  //orderNow = make payment? make payment after deliver?
  reportPayment: (payment) => { console.log(`The buyer have made payment of ${toSU(payment)} ${suStr} to the contract`) },
  //confirmDelivery -- YES
  reportAcceptDelivery: () => { console.log(`The transporter have accepted the delivery.`) },
  //confirmDelivery -- NO
  reportRejectDelivery: () => { console.log(`The transporter have rejected the delivery, exiting...`) },
  //ackDelivery -- YES
  reportOrderReceived: () => { console.log(`The order have been delivered, exiting...`) },
};
console.log(`Your role is ${role}`);

// Designer
if (role === 'd'){
  const designerInteract = {
    ...commonInteract,
    priceA: toAU(5),
    priceB: toAU(5),
    priceC: toAU(5),
    transPrice: toAU(2),
    productReady: async (priceA, priceB, priceC, transPrice) => {
      console.log(`Your priceA is ${toSU(priceA)} ${suStr}.`);
      console.log(`Your priceB is ${toSU(priceB)} ${suStr}.`);
      console.log(`Your priceC is ${toSU(priceC)} ${suStr}.`);
      console.log(`Your transport price is ${toSU(transPrice)} ${suStr}.`);
      console.log(`Contract info: ${JSON.stringify(await ctc.getInfo())}`);
    },
    
    acceptOrder: async (orderPrice) => await ask.ask(`Do you want to accept this order for ${toSU(orderPrice)} ${suStr}?`, ask.yesno),
  };
  const acc = await stdlib.newTestAccount(iBalance);
  const info = await ask.ask('Paste contract info:', (c) => JSON.parse(c));
   // Other participants, attached the contract from customer
  const ctc = acc.contract(backend, info);
  await showBalance(acc);
  await ctc.participants.Designer(designerInteract);
  await showBalance(acc);
} 
// Customer
else if (role === 'c') {
  const customerInteract = {
    ...commonInteract,
    selectProduct: async (orderPrice) => await ask.ask( `Do you want to purchase this for ${toSU(orderPrice)} ${suStr}?`, ask.yesno ),
    ackDelivery: async () => await ask.ask( `Confirm order received ?`, ask.yesno ),
  },
 // create new test account with 1000 ALGO
 const acc = await stdlib.newTestAccount(iBalance); //create acc for designer
 await showBalance(acc);
  // First participant, deploy the contract
 const ctc = acc.contract(backend); //Get a reference to the contract.
 await ctc.participants.Customer(customerInteract); //Initiate interaction with contract for designer
 await showBalance(acc);
}
// Transporter
else if (role === 't'){
  const transportInteract = {
    ...commonInteract,
    confirmDelivery: async (transPrice) => ask.ask( `Do you want to deliver this for ${toSU(transPrice)} ${suStr}?`, ask.yesno ),
  };
  const acc = await stdlib.newTestAccount(iBalance);
  const info = await ask.ask('Paste contract info:', (d) => JSON.parse(d));
  
    // Other participants, attached the contract from customer
    const ctc = acc.contract(backend, info);
    await showBalance(acc);

    // transport interaction
    await ctc.participants.Transporter(transportInteract); 
    await showBalance(acc);

};

ask.done();





