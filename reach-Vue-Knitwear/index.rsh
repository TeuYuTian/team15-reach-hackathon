'reach 0.1';

// Common Function
const commonInteract = {
  // orderPrice: UInt,
  // transPrice: UInt,

  // transportCancellation: Fun([], Null),
  //Designer accept order(acceptOrder)
  reportOrderAccepted: Fun([], Null),
   //Designer reject order(acceptOrder)
  reportOrderRejected: Fun([], Null),
  //cutomer pay order price to contract
  reportPayment: Fun([UInt, UInt],Null),
  //transporter accepted (confirmDelivery)
  reportAcceptDelivery: Fun([], Null),
  //transporter rejected (confirmDelivery)
  reportRejectDelivery:Fun([], Null),
  //Customer recieved order (ackdelivery)
  reportOrderReceived:Fun([], Null),

  //Customer not recieved order (ackdelivery) might not need this
  // reportOrderNotReceived:Fun([], Null)
};

// functions related to customer
const customerInteract = {
  ...commonInteract,
  showProduct: Fun([UInt,UInt,UInt,UInt],Null),
  orderPrice: Fun([],UInt),

  // orderNow: Fun([UInt, UInt], Null),
  selectProduct: Fun ([UInt],UInt),
  ackDelivery: Fun([], Bool),
};

// functions related to designer
const designerInteract = {
  ...commonInteract,
  // priceA: UInt,
  // priceB: UInt,
  // priceC: UInt,
  // transPrice: UInt,
  getProduct: Fun([],UInt, UInt, UInt, UInt),
  acceptOrder: Fun([UInt], UInt),
};

const transportInteract = {
  ...commonInteract,
  confirmDelivery: Fun([UInt], Bool),
};

//Define constant to represent participant
export const main = Reach.App(() => {
  const C = Participant('Customer', customerInteract);
  const D = Participant('Designer', designerInteract);
  const T = Participant('Transport', transportInteract);
  init();

//1. designer set product price,name, transport price , then publish

D.only(() => {     
  const {priceA,priceB,priceC,transPrice} = declassify( interact.getProduct() );
});
D.publish(priceA,priceB,priceC,transPrice);
commit();

//2. customer attach contract, send the product to frontend (productReady)
C.only(()=> {
  declassify(interact.showProduct(priceA,priceB,priceC,transPrice)) ; 
//3. customer select product and place order
  const {orderPrice} = declassify (interact.selectProduct());
  C.publish(orderPrice);
    commit();
});

//4. Designer receive order, choose argee order or not
D.only(() => {     
  const agreeordertime = declassify( interact.acceptOrder(orderPrice) ); 
});
//5. Send result of order success to smart contract for all participants
D.publish(agreeordertime);

// if answer is no , send notice and exit
if (agreeordertime == 0) {
  commit();
  each([C, D, T], () => interact.reportOrderRejected());
  exit();
} else {
  // if answer is yes, customer pay to contract and send orderAccepted to every participants
  commit();
  each([C, D, T], () => interact.reportOrderAccepted());
  C.pay(orderPrice);
  each([C, D, T], () => interact.reportPayment(orderPrice, agreeordertime));
  commit();
}

  //....Order success
  //6. Pass control to Transport, asking to accept delivery with transPrice
  T.only(() => { 
    const willDeliver = declassify( interact.confirmDelivery(transPrice) ); 
  });

  //7. Send result of willDeliver to smart contract for participants
  T.publish(willDeliver);

  // if answer no, transfer fund from smart contract back to Buyer and exit
  // Cannot leave any extra funds in smart contract before exit
  if ( !willDeliver ) {
    transfer(orderPrice).to(C);
    commit();
    each([C,D,T], () => declassify( interact.reportRejectDelivery()) );
    exit();
  } else {
    // Send accept delivery report to all and Customer pays transPrice to contract
    commit();
    each([C,D,T], () => declassify( interact.reportAcceptDelivery()) );

    C.pay(transPrice);
    commit();
  }

  //8. Send result of delivered to smart contract for participants
  C.only(() => { 
    const delivered = declassify( interact.ackDelivery() ); 
  });
  //8. Final step, ask Customers to acknowledge delivery order
  C.publish(delivered)

  // Customer does not ack delivery, return funds to Customer and exit, this is a simplified version 
  // In actual situation, T will confirm delivery with proof instead of B or use an oracle
  if ( !delivered ) {
    transfer(transPrice).to(C);
    transfer(orderPrice).to(C);
    commit();
    exit();

  } else {
    // Buyer ack the delivery, transfer payment to D & T, contract ends
    each([C,D,T], () => declassify( interact.reportOrderReceived() ));
    transfer(transPrice).to(T);
    transfer(orderPrice).to(D);
    commit();
  }
  exit();

});



  // C.only(() => { 
  //   const orderPrice = declassify(interact.orderPrice);
  //   const transPrice = declassify(interact.transPrice);
  //  });
  // C.publish(orderPrice, transPrice);
  // C.interact.orderNow(orderPrice, transPrice);
  // commit();

  