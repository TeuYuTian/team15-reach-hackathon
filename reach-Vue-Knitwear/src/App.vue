<template>

  <div id="app" class="mx-4 my-5">
    current state: <b>{{state.value}}</b><BR/>
    <H3>page 1 :Choose Role</H3>
    <H5>Welcome! Which One are You?</H5>
    <b-button class="mr-2" variant ="success" size="sm" @click="customer()" > Customer </b-button>
    <b-button class="mr-2" variant ="success" size="sm" @click="designer()"> Designer </b-button>
    <b-button class="mr-2" variant ="success" size="sm" @click="transporter()"> Transporter </b-button>
    <hr>
    <hr>
    
   <H5>Section: Wallet</H5>
   addr: {{ addr}} <BR/>
   bal: {{ bal }} <BR/>
   balAtomic: {{ balAtomic }}<BR/>
   <button @click="updateBalance()">updateBalance</button>
    <hr>

    <div v-if="role==0">
    <H3>page 2 :Customer</H3>  
    <hr>
      <H5>Section: Shop</H5>
    <b-row>
      <div v-for="i,index in products" :key="i.name" :index="index">
        <b-col>
          <b-card class="mt-4">
            {{i.name}}
            <br/>
            <img :src="i.image" width="100%"/>
            <br>

            Price: {{i.price}}
            <br>
            <b-button variant="success" size="sm" @click="decrease(i)"> - </b-button>
            {{i.quantity}}
            <b-button variant="success" size="sm" @click="increase(i)"> + </b-button>
            <br/>
            <b-button variant="success" size="sm" class="my-3"> Add to Cart </b-button>
            <!-- Subtotal: RM{{i.quantity*i.price}} -->
          </b-card>
        </b-col>    
      </div>
    </b-row>

    <hr>
      <H5>Section: Your Cart</H5>

Item Qty Price Subtotal
<div v-for="i,index in products" :key="i.name" :index="index">
  <div v-if="i.quantity > 0" >
    {{i.name}} {{i.quantity2}} {{i.price}} Sub:{{i.quantity2*i.price}}
  </div>
</div>

total sales: {{calcTotal}} <br>
Shipping Fees: {{calcShippingFees}} <br>
Grand Total: {{calcTotal+calcShippingFees}}<br>

<hr>
      <H5>Section: Your Contract</H5>
        <div v-show="state.matches('appInit')">
          <b-button variant="danger" @click="createContract()">Order (Deploy Contract)</b-button><BR/>
          contract: (Copy below to Designer and Transport)<BR/> 
          <h3>{{ ctcInfoStr }}</h3><BR /><BR />
          </div>

              order Price : {{orderPrice}} <BR/>
              transport Price : {{transPrice}} <BR/>

       <div v-if="pickupDone">
          Confirm order delivery ? 
          <button @click="yesnoDelivery(true)">YES</button>
          <button @click="yesnoDelivery(false)">NO</button>
      </div>

      <hr>
      <hr>

</div> 


<div v-else-if="role==1">
<H3>page 3 :Designer</H3>
<hr>
<H5>Section: Your Wallet</H5>
<hr>
<H5>Section: Incoming Order(attach contract)</H5>
<input v-model="ctcStr" placeholder="paste contract here"> <b-button @click="attachContract1()">Attach Contract</b-button>
<BR/><BR/>

    <div v-if="orderPrice>0">
    Do you want to paccpet this order for {{orderPrice}} ? 
    <button @click="yesnoAcceptOrder(true)">YES</button>
    <button @click="yesnoAcceptOrder(false)">NO</button>
    <BR/><BR/>
    </div> 
<hr>
<hr>
</div> 


<div v-else-if="role==2">
<H3>page 4 :Transporter</H3>
<hr>
<H5>Section: Your Wallet</H5>
<hr>
<H5>Section: Incoming Order(attach contract)</H5>
<input v-model="ctcStr" placeholder="paste contract here"> <b-button @click="attachContract2()">Attach Contract</b-button>
<BR/><BR/>
    <div v-if="paymentDone">
    Do you want to deliver this for {{transPrice}} ? 
    <button @click="yesnoTransport(true)">YES</button>
    <button @click="yesnoTransport(false)">NO</button>
    </div>
<hr>

</div>

  <H5>Section: Tracking</H5>
  <BR/>
  <div v-if="paymentDone">
   {{ paymentMsg }}
   </div>

 <BR/>
  <div v-if="pickupDone">
   {{ pickupMsg }}
   </div>

 <BR/>
  <div v-if="deliveryDone">
   {{ deliveryMsg }}
   </div>

  </div>
</template>



<script>
// xstate stuff
//import { Machine, assign } from "xstate"

import { Machine, assign, interpret } from "xstate"
//import { interpret } from "xstate-vue2"

const increment = (context) => context.count + 1;
const decrement = (context) => context.count - 1;

const reachMachine = Machine({
  predictableActionArguments: true,
  id: "reach",
  initial : "appInit",
  context: {
    count:0
  },
  states: {
    appInit: {
      on: { 
        DEPLOY: {
          target: "step"
        }
      }
    },
    step: {
      on: {
        ONLY: {
          action: assign( {count:increment} ), 
          target: "localStep",
        },
        EACH: {
          action: assign({count:decrement}), 
          target: "localStep"
          },
        PUBLISH: {
          target: "consensus"
          },
        PAY: {
          target: "consensus"
          }
        }
    },
    localStep: {
      on: {
        ONLY: {
          action: assign({count:increment}), 
          target: "step"
        },
        EACH: {
          action: assign({count:decrement}),
          target: "step"
        }
      }
    },
    consensus: {
      on: {
        COMMIT: {
          target: "step"
        },
        ONLY: {
          target: "localStep"
        },
        EACH: {
          target: "localStep"
        },
      }
    }
  }
})


import * as backend from '../build/index.main.mjs';
import { loadStdlib } from '@reach-sh/stdlib';
//const stdlib = loadStdlib(process.env);

// Run in cmdline with 
// REACH_CONNECTOR_MODE=ALGO-Live
// ../reach devnet
const stdlib = loadStdlib("ALGO");
stdlib.setProviderByName("TestNet")

console.log(`The consensus network is ${stdlib.connector}.`);

const suStr = stdlib.standardUnit;
console.log("Unit is ", suStr)
const toAU = (su) => stdlib.parseCurrency(su);
const toSU = (au) => stdlib.formatCurrency(au, 4);

// Defined all interact as global for backend calls, later convert them to Vue methods
let commonInteract = { };
let customerInteract = { };
let designerInteract = { };
let transportInteract= { };

// Setup secret seed here, loaded in .env.local
const secret = process.env.VUE_APP_SECRET1
const secret2 = process.env.VUE_APP_SECRET2
const secret3 = process.env.VUE_APP_SECRET3

export default {
  name: "App",
   created() {
      // Start service on component creation
      this.reachService
        .onTransition((state) => {
          // Update the current state component data property with the next state
          this.state = state;
          // Update the context component data property with the updated context
          this.context = state.context;
        })
        .start();
    },
  components: {},
  data() {
    return {
      reachService: interpret(reachMachine),
      state: reachMachine.initialState,
      context: reachMachine.context,
      role: 0,
      acc: undefined,
      addr: undefined,
      balAtomic: undefined,
      bal: undefined,
      ctc: undefined,
      ctcInfoStr: undefined,
      orderPrice: undefined,
      transPrice: undefined,
      ctcStr: undefined,
      contractCreated: false,
      purchaseResult: undefined,
      transportResult: undefined,
      deliveryResult: undefined,
      paymentDone: undefined,
      paymentMsg: undefined,
      pickupDone: undefined,
      pickupMsg: undefined,
      deliveryDone: undefined,
      deliveryMsg: undefined,
      agreeOrderTime: undefined,

      name: "",
      quantity: 0,
      quantity2:0,
      totalSales: 0,
      pickupArea: 0,
      products: [
        {
          name: "Item A",
          quantity: 0,
          quantity2: 0,
          price: 1,
          stock: 0,
          image: "apple.jpg",
        },
        {
          name: "Item B",
          quantity: 0,
          quantity2: 0,
          price: 2,
          stock: 0,
          image: "orange.jpg",
        },
        {
          name: "Item C",
          quantity: 0,
          quantity2: 0,
          price: 3,
          stock: 0,
          image: "strawberry.jpg",
        },
      ],
    };
  },


  methods: {

          // xstate send in Vue format
      send(event) {
        this.reachService.send(event);
      },
      increment( ) {
          console.log("increment", this.context.count)
          this.context.count++
      },
      decrement() {
        console.log("decrement", this.context.count)
        this.context.count--
      },

      commonFunctions() {
        commonInteract = {
            transportCancellation: () => { console.log(`The job was refused.`); },
            reportOrderAccepted: () => { console.log(`The designer accepted the order.`); },
            reportOrderRejected: () => { console.log(`The designer rejected the order, exiting...`); },
            reportPayment: (payment, agreeOrderTime) => { this.reportPayment(payment, agreeOrderTime); },
            reportAcceptDelivery: () => { this.reportAcceptDelivery() },
            reportRejectDelivery: () => { console.log(`The transporter have rejected the delivery, exiting...`) },
            reportOrderReceived: () => { this.reportOrderReceived()  },
          }
      },

       reportOrderReceived() {
        this.send('EACH')
        this.deliveryDone = true;
        this.deliveryMsg = `The order have been delivered, exiting...`;
        console.log(`The order have been delivered, exiting...`)
        this.updateBalance();
       },

       reportAcceptDelivery() {
        this.send('EACH')
        this.pickupDone = true;
        this.pickupMsg = `The transporter have accepted the delivery.`;
        console.log(`The transporter have accepted the delivery.`)
      },

      reportPayment(payment, agreeOrderTime) {
        let result = new Date(parseInt(agreeOrderTime))

        this.send('EACH')
        this.paymentDone = true;
        this.paymentMsg = 'The buyer have made payment of ' + toSU(payment) + 
                            ' to the contract at ' + result;
        console.log('The buyer have made payment of ' + toSU(payment) + ' to the contract');
      },


      async createContract() {

            // Change state to deploy
            this.send('DEPLOY')

            // create the contract here
            // https://docs.reach.sh/frontend/#ref-frontends-js-ctc
            console.log("Creating contract...")

            this.ctc = await this.acc.contract(backend);
            this.ctc.p.Customer(customerInteract);

            const info = await this.ctc.getInfo();
            this.ctcInfoStr = JSON.stringify(info);
            console.log("this.ctcInfoStr: ", this.ctcInfoStr);

            this.contractCreated = true;
            await this.updateBalance();
      },

        async yesnoDelivery(res) {
        console.log("yesnoDelivery: ", res)
        this.deliveryResult = res;
    },

    async getDeliveryResult() {
      // return ONLY if not undefined
      if ( this.deliveryResult !== undefined ) {
        // Change state to consensus at the end 
        this.send('PUBLISH')
        return this.deliveryResult
      }
    },

    // 0 -customer , 1 - designer, 2 - transport

    //////////////////////////// Customer
    async customer() {
      this.commonFunctions();
      customerInteract = {
             ...commonInteract,
              orderPrice: toAU(1.2),
              transPrice: toAU(0.05),
              orderNow: async (orderPrice, transPrice) => {
                  this.sellPrice =  toSU(orderPrice);
                  this.tPrice = toSU(transPrice);
                  console.log("*** from backend orderNow", this.orderPrice , this.transPrice);
                  // Change state to consensus at the end 
                  this.send('PUBLISH');
              },

        reportPayment(payment, agreeOrderTime) {
        let result = new Date(parseInt(agreeOrderTime))

        this.send('EACH')
        this.paymentDone = true;
        this.paymentMsg = 'The buyer have made payment of ' + toSU(payment) + 
                            ' to the contract at ' + result;
        console.log('The buyer have made payment of ' + toSU(payment) + ' to the contract');
        },

          ackDelivery: async () => {
            console.log("*** from backend ackDelivery");
            this.send('ONLY')
            await this.waitUntil( () => this.deliveryResult !== undefined )
            return await this.getDeliveryResult()
          },
      }
      try {
        this.role = 0;
        this.acc = await stdlib.newAccountFromMnemonic(secret);
        this.addr = stdlib.formatAddress(this.acc.getAddress());
        this.balAtomic = await stdlib.balanceOf(this.acc);
        this.bal = String(stdlib.formatCurrency(this.balAtomic, 4));
      } 

      catch (err) {
        console.log(err);
      }

    },
 
    //////////////////////////// Designer
    async attachContract1() {

        // change state to deployed/attached
        this.send('DEPLOY')

        this.ctc = await this.acc.contract(backend, JSON.parse(this.ctcStr));     
        this.updateBalance();
        await this.ctc.p.Designer(designerInteract);
        await this.updateBalance();

        console.log("Contract attached: ",this.ctcStr)
    },

        async yesnoAcceptOrder(res) {
        console.log("AcceptOrder: ", res)
        this.orderResult = res;
    },

    async getOrderResult() {
      // return ONLY if not undefined
      if ( this.orderResult !== undefined ) {
        this.send('PUBLISH')
        return this.orderResult
      }
    },

        async designer() {
          this.commonFunctions();
           customerInteract = {
          ...commonInteract,
          acceptOrder: async (orderPrice) => {
          this.orderPrice = toSU(orderPrice)
          console.log("*** from backend acceptOrder: ", this.orderPrice);
            // change to localStep
            this.send('ONLY')
            console.log("orderResult: ", this.orderResult);
            await this.waitUntil( () => this.orderResult !== undefined )
            this.purchaseTime = Date.now();
            console.log("purchaseTime: ", this.agreeOrderTime)
            return await this.agreeOrderTime
          },
      }
      try {
        this.role = 1;
        this.acc = await stdlib.newAccountFromMnemonic(secret2);
        this.addr = stdlib.formatAddress(this.acc.getAddress());
        } 
        catch (err) {
        console.log(err);
      }

    },

        async transporter() {
          this.commonFunctions();
          transportInteract = {
           ...commonInteract,
           confirmDelivery: async (transPrice) => {
            this.tPrice = toSU(transPrice)
            console.log("*** from backend confirmDeliver", this.transPrice);
            // change to localStep
            this.send('ONLY')
            console.log("transportResult: ", this.transportResult);
            await this.waitUntil(() => this.transportResult !== undefined)
            return await this.getTransportResult()
            }
          }
          console.log("Transport: ",transportInteract);

      try {
        this.role = 2;
        this.acc = await stdlib.newAccountFromMnemonic(secret3);
        this.addr = stdlib.formatAddress(this.acc.getAddress());
        } 
        catch (err) {
        console.log(err);
      }
    },

    //////////// Common helper functions
    async updateBalance() {
      try {
        this.balAtomic = await stdlib.balanceOf(this.acc);
        this.bal = String(stdlib.formatCurrency(this.balAtomic, 4));
      } catch (err) {
        console.log(err);
      }
    },

    waitUntil (condition) {
    return new Promise((resolve) => {
        let interval = setInterval(() => {
            if (!condition()) {
                return
            }
            clearInterval(interval)
            resolve()
        }, 100)
      })
    },


    increase(i){
      return (i.quantity = i.quantity + 1);
    },
    decrease(i){
      return (i.quantity = i.quantity - 1);
    },
  },

   computed: {
    calcTotal() {
      let total = 0;
      for (let i = 0; i < this.products.length; i++) {
        total += this.products[i].quantity * this.products[i].price;
      }
      return total;
    },

    calcShippingFees() {
      let fees = 0;
      if (this.pickupArea == 0) {
        fees = 0.05;
      }
      return fees;
    },
  },
}

</script>

<style>
#app {
  font-family: 'Ubuntu', sans-serif;
  font-weight: 300;
}

</style>


