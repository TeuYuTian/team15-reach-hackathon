// Automatically generated with Reach 0.1.12 (0b231964)
/* eslint-disable */
export const _version = '0.1.12';
export const _versionHash = '0.1.12 (0b231964)';
export const _backendVersion = 25;

export function getExports(s) {
  const stdlib = s.reachStdlib;
  return {
    };
  };
export function _getEvents(s) {
  const stdlib = s.reachStdlib;
  return {
    };
  };
export function _getViews(s, viewlib) {
  const stdlib = s.reachStdlib;
  const ctc0 = stdlib.T_Address;
  const ctc1 = stdlib.T_UInt;
  
  return {
    infos: {
      },
    views: {
      1: [ctc0, ctc1, ctc1],
      3: [ctc0, ctc1, ctc1, ctc0],
      4: [ctc0, ctc1, ctc1, ctc0],
      5: [ctc0, ctc1, ctc1, ctc0, ctc0],
      6: [ctc0, ctc1, ctc1, ctc0, ctc0]
      }
    };
  
  };
export function _getMaps(s) {
  const stdlib = s.reachStdlib;
  const ctc0 = stdlib.T_Tuple([]);
  return {
    mapDataTy: ctc0
    };
  };
export async function Customer(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Customer expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Customer expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_UInt;
  const ctc1 = stdlib.T_Null;
  const ctc2 = stdlib.T_Bool;
  const ctc3 = stdlib.T_Address;
  
  
  const v176 = stdlib.protect(ctc0, interact.orderPrice, 'for Customer\'s interact field orderPrice');
  const v177 = stdlib.protect(ctc0, interact.transPrice, 'for Customer\'s interact field transPrice');
  
  const txn1 = await (ctc.sendrecv({
    args: [v176, v177],
    evt_cnt: 2,
    funcNum: 0,
    lct: stdlib.checkedBigNumberify('./index.rsh:50:5:dot', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc0, ctc0],
    pay: [stdlib.checkedBigNumberify('./index.rsh:50:5:decimal', stdlib.UInt_max, '0'), []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [v186, v187], secs: v189, time: v188, didSend: v34, from: v185 } = txn1;
      
      ;
      
      sim_r.isHalt = false;
      
      return sim_r;
      }),
    soloSend: true,
    timeoutAt: undefined /* mto */,
    tys: [ctc0, ctc0],
    waitIfNotPresent: false
    }));
  const {data: [v186, v187], secs: v189, time: v188, didSend: v34, from: v185 } = txn1;
  ;
  stdlib.protect(ctc1, await interact.orderNow(v186, v187), {
    at: './index.rsh:51:22:application',
    fs: ['at ./index.rsh:51:22:application call to [unknown function] (defined at: ./index.rsh:51:22:function exp)', 'at ./index.rsh:51:22:application call to "liftedInteract" (defined at: ./index.rsh:51:22:application)'],
    msg: 'orderNow',
    who: 'Customer'
    });
  
  const txn2 = await (ctc.recv({
    didSend: false,
    evt_cnt: 1,
    funcNum: 1,
    out_tys: [ctc0],
    timeoutAt: undefined /* mto */,
    waitIfNotPresent: false
    }));
  const {data: [v195], secs: v197, time: v196, didSend: v47, from: v194 } = txn2;
  ;
  const v198 = stdlib.eq(v195, stdlib.checkedBigNumberify('./index.rsh:62:25:decimal', stdlib.UInt_max, '0'));
  if (v198) {
    stdlib.protect(ctc1, await interact.reportOrderRejected(), {
      at: './index.rsh:64:55:application',
      fs: ['at ./index.rsh:64:9:application call to [unknown function] (defined at: ./index.rsh:64:24:function exp)'],
      msg: 'reportOrderRejected',
      who: 'Customer'
      });
    
    return;
    }
  else {
    stdlib.protect(ctc1, await interact.reportOrderAccepted(), {
      at: './index.rsh:69:55:application',
      fs: ['at ./index.rsh:69:9:application call to [unknown function] (defined at: ./index.rsh:69:24:function exp)'],
      msg: 'reportOrderAccepted',
      who: 'Customer'
      });
    
    const txn3 = await (ctc.sendrecv({
      args: [v185, v186, v187, v194],
      evt_cnt: 0,
      funcNum: 2,
      lct: v196,
      onlyIf: true,
      out_tys: [],
      pay: [v186, []],
      sim_p: (async (txn3) => {
        const sim_r = { txns: [], mapRefs: [], maps: [] };
        let sim_txn_ctr = stdlib.UInt_max;
        const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
        
        
        const {data: [], secs: v209, time: v208, didSend: v75, from: v207 } = txn3;
        
        sim_r.txns.push({
          amt: v186,
          kind: 'to',
          tok: undefined /* Nothing */
          });
        
        sim_r.isHalt = false;
        
        return sim_r;
        }),
      soloSend: true,
      timeoutAt: undefined /* mto */,
      tys: [ctc3, ctc0, ctc0, ctc3],
      waitIfNotPresent: false
      }));
    const {data: [], secs: v209, time: v208, didSend: v75, from: v207 } = txn3;
    ;
    const v212 = stdlib.addressEq(v185, v207);
    stdlib.assert(v212, {
      at: './index.rsh:70:7:dot',
      fs: [],
      msg: 'sender correct',
      who: 'Customer'
      });
    stdlib.protect(ctc1, await interact.reportPayment(v186, v195), {
      at: './index.rsh:71:49:application',
      fs: ['at ./index.rsh:71:9:application call to [unknown function] (defined at: ./index.rsh:71:24:function exp)'],
      msg: 'reportPayment',
      who: 'Customer'
      });
    
    const txn4 = await (ctc.recv({
      didSend: false,
      evt_cnt: 1,
      funcNum: 3,
      out_tys: [ctc2],
      timeoutAt: undefined /* mto */,
      waitIfNotPresent: false
      }));
    const {data: [v220], secs: v222, time: v221, didSend: v93, from: v219 } = txn4;
    ;
    if (v220) {
      stdlib.protect(ctc1, await interact.reportAcceptDelivery(), {
        at: './index.rsh:93:66:application',
        fs: ['at ./index.rsh:93:9:application call to [unknown function] (defined at: ./index.rsh:93:22:function exp)'],
        msg: 'reportAcceptDelivery',
        who: 'Customer'
        });
      
      const txn5 = await (ctc.sendrecv({
        args: [v185, v186, v187, v194, v219],
        evt_cnt: 0,
        funcNum: 4,
        lct: v221,
        onlyIf: true,
        out_tys: [],
        pay: [v187, []],
        sim_p: (async (txn5) => {
          const sim_r = { txns: [], mapRefs: [], maps: [] };
          let sim_txn_ctr = stdlib.UInt_max;
          const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
          
          
          const {data: [], secs: v238, time: v237, didSend: v126, from: v236 } = txn5;
          
          sim_r.txns.push({
            amt: v187,
            kind: 'to',
            tok: undefined /* Nothing */
            });
          sim_r.isHalt = false;
          
          return sim_r;
          }),
        soloSend: true,
        timeoutAt: undefined /* mto */,
        tys: [ctc3, ctc0, ctc0, ctc3, ctc3],
        waitIfNotPresent: false
        }));
      const {data: [], secs: v238, time: v237, didSend: v126, from: v236 } = txn5;
      ;
      const v241 = stdlib.addressEq(v185, v236);
      stdlib.assert(v241, {
        at: './index.rsh:95:7:dot',
        fs: [],
        msg: 'sender correct',
        who: 'Customer'
        });
      const v244 = stdlib.protect(ctc2, await interact.ackDelivery(), {
        at: './index.rsh:101:55:application',
        fs: ['at ./index.rsh:100:9:application call to [unknown function] (defined at: ./index.rsh:100:13:function exp)'],
        msg: 'ackDelivery',
        who: 'Customer'
        });
      
      const txn6 = await (ctc.sendrecv({
        args: [v185, v186, v187, v194, v219, v244],
        evt_cnt: 1,
        funcNum: 5,
        lct: v237,
        onlyIf: true,
        out_tys: [ctc2],
        pay: [stdlib.checkedBigNumberify('./index.rsh:104:5:decimal', stdlib.UInt_max, '0'), []],
        sim_p: (async (txn6) => {
          const sim_r = { txns: [], mapRefs: [], maps: [] };
          let sim_txn_ctr = stdlib.UInt_max;
          const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
          
          
          const {data: [v246], secs: v248, time: v247, didSend: v136, from: v245 } = txn6;
          
          ;
          if (v246) {
            
            sim_r.txns.push({
              kind: 'from',
              to: v219,
              tok: undefined /* Nothing */
              });
            sim_r.txns.push({
              kind: 'from',
              to: v194,
              tok: undefined /* Nothing */
              });
            sim_r.txns.push({
              kind: 'halt',
              tok: undefined /* Nothing */
              })
            sim_r.isHalt = true;
            }
          else {
            sim_r.txns.push({
              kind: 'from',
              to: v185,
              tok: undefined /* Nothing */
              });
            sim_r.txns.push({
              kind: 'from',
              to: v185,
              tok: undefined /* Nothing */
              });
            sim_r.txns.push({
              kind: 'halt',
              tok: undefined /* Nothing */
              })
            sim_r.isHalt = true;
            }
          return sim_r;
          }),
        soloSend: true,
        timeoutAt: undefined /* mto */,
        tys: [ctc3, ctc0, ctc0, ctc3, ctc3, ctc2],
        waitIfNotPresent: false
        }));
      const {data: [v246], secs: v248, time: v247, didSend: v136, from: v245 } = txn6;
      ;
      const v249 = stdlib.addressEq(v185, v245);
      stdlib.assert(v249, {
        at: './index.rsh:104:5:dot',
        fs: [],
        msg: 'sender correct',
        who: 'Customer'
        });
      if (v246) {
        stdlib.protect(ctc1, await interact.reportOrderReceived(), {
          at: './index.rsh:116:65:application',
          fs: ['at ./index.rsh:116:9:application call to [unknown function] (defined at: ./index.rsh:116:22:function exp)'],
          msg: 'reportOrderReceived',
          who: 'Customer'
          });
        
        ;
        ;
        return;
        }
      else {
        ;
        ;
        return;
        }
      
      
      
      }
    else {
      ;
      stdlib.protect(ctc1, await interact.reportRejectDelivery(), {
        at: './index.rsh:88:66:application',
        fs: ['at ./index.rsh:88:9:application call to [unknown function] (defined at: ./index.rsh:88:22:function exp)'],
        msg: 'reportRejectDelivery',
        who: 'Customer'
        });
      
      return;
      }
    
    
    
    }
  
  
  
  };
export async function Designer(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Designer expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Designer expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_UInt;
  const ctc1 = stdlib.T_Null;
  const ctc2 = stdlib.T_Bool;
  const ctc3 = stdlib.T_Address;
  
  
  const txn1 = await (ctc.recv({
    didSend: false,
    evt_cnt: 2,
    funcNum: 0,
    out_tys: [ctc0, ctc0],
    timeoutAt: undefined /* mto */,
    waitIfNotPresent: false
    }));
  const {data: [v186, v187], secs: v189, time: v188, didSend: v34, from: v185 } = txn1;
  ;
  const v193 = stdlib.protect(ctc0, await interact.acceptOrder(v186), {
    at: './index.rsh:55:60:application',
    fs: ['at ./index.rsh:54:9:application call to [unknown function] (defined at: ./index.rsh:54:13:function exp)'],
    msg: 'acceptOrder',
    who: 'Designer'
    });
  
  const txn2 = await (ctc.sendrecv({
    args: [v185, v186, v187, v193],
    evt_cnt: 1,
    funcNum: 1,
    lct: v188,
    onlyIf: true,
    out_tys: [ctc0],
    pay: [stdlib.checkedBigNumberify('./index.rsh:59:5:decimal', stdlib.UInt_max, '0'), []],
    sim_p: (async (txn2) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [v195], secs: v197, time: v196, didSend: v47, from: v194 } = txn2;
      
      ;
      const v198 = stdlib.eq(v195, stdlib.checkedBigNumberify('./index.rsh:62:25:decimal', stdlib.UInt_max, '0'));
      if (v198) {
        sim_r.txns.push({
          kind: 'halt',
          tok: undefined /* Nothing */
          })
        sim_r.isHalt = true;
        }
      else {
        sim_r.isHalt = false;
        }
      return sim_r;
      }),
    soloSend: true,
    timeoutAt: undefined /* mto */,
    tys: [ctc3, ctc0, ctc0, ctc0],
    waitIfNotPresent: false
    }));
  const {data: [v195], secs: v197, time: v196, didSend: v47, from: v194 } = txn2;
  ;
  const v198 = stdlib.eq(v195, stdlib.checkedBigNumberify('./index.rsh:62:25:decimal', stdlib.UInt_max, '0'));
  if (v198) {
    stdlib.protect(ctc1, await interact.reportOrderRejected(), {
      at: './index.rsh:64:55:application',
      fs: ['at ./index.rsh:64:9:application call to [unknown function] (defined at: ./index.rsh:64:24:function exp)'],
      msg: 'reportOrderRejected',
      who: 'Designer'
      });
    
    return;
    }
  else {
    stdlib.protect(ctc1, await interact.reportOrderAccepted(), {
      at: './index.rsh:69:55:application',
      fs: ['at ./index.rsh:69:9:application call to [unknown function] (defined at: ./index.rsh:69:24:function exp)'],
      msg: 'reportOrderAccepted',
      who: 'Designer'
      });
    
    const txn3 = await (ctc.recv({
      didSend: false,
      evt_cnt: 0,
      funcNum: 2,
      out_tys: [],
      timeoutAt: undefined /* mto */,
      waitIfNotPresent: false
      }));
    const {data: [], secs: v209, time: v208, didSend: v75, from: v207 } = txn3;
    ;
    const v212 = stdlib.addressEq(v185, v207);
    stdlib.assert(v212, {
      at: './index.rsh:70:7:dot',
      fs: [],
      msg: 'sender correct',
      who: 'Designer'
      });
    stdlib.protect(ctc1, await interact.reportPayment(v186, v195), {
      at: './index.rsh:71:49:application',
      fs: ['at ./index.rsh:71:9:application call to [unknown function] (defined at: ./index.rsh:71:24:function exp)'],
      msg: 'reportPayment',
      who: 'Designer'
      });
    
    const txn4 = await (ctc.recv({
      didSend: false,
      evt_cnt: 1,
      funcNum: 3,
      out_tys: [ctc2],
      timeoutAt: undefined /* mto */,
      waitIfNotPresent: false
      }));
    const {data: [v220], secs: v222, time: v221, didSend: v93, from: v219 } = txn4;
    ;
    if (v220) {
      stdlib.protect(ctc1, await interact.reportAcceptDelivery(), {
        at: './index.rsh:93:66:application',
        fs: ['at ./index.rsh:93:9:application call to [unknown function] (defined at: ./index.rsh:93:22:function exp)'],
        msg: 'reportAcceptDelivery',
        who: 'Designer'
        });
      
      const txn5 = await (ctc.recv({
        didSend: false,
        evt_cnt: 0,
        funcNum: 4,
        out_tys: [],
        timeoutAt: undefined /* mto */,
        waitIfNotPresent: false
        }));
      const {data: [], secs: v238, time: v237, didSend: v126, from: v236 } = txn5;
      ;
      const v241 = stdlib.addressEq(v185, v236);
      stdlib.assert(v241, {
        at: './index.rsh:95:7:dot',
        fs: [],
        msg: 'sender correct',
        who: 'Designer'
        });
      const txn6 = await (ctc.recv({
        didSend: false,
        evt_cnt: 1,
        funcNum: 5,
        out_tys: [ctc2],
        timeoutAt: undefined /* mto */,
        waitIfNotPresent: false
        }));
      const {data: [v246], secs: v248, time: v247, didSend: v136, from: v245 } = txn6;
      ;
      const v249 = stdlib.addressEq(v185, v245);
      stdlib.assert(v249, {
        at: './index.rsh:104:5:dot',
        fs: [],
        msg: 'sender correct',
        who: 'Designer'
        });
      if (v246) {
        stdlib.protect(ctc1, await interact.reportOrderReceived(), {
          at: './index.rsh:116:65:application',
          fs: ['at ./index.rsh:116:9:application call to [unknown function] (defined at: ./index.rsh:116:22:function exp)'],
          msg: 'reportOrderReceived',
          who: 'Designer'
          });
        
        ;
        ;
        return;
        }
      else {
        ;
        ;
        return;
        }
      
      
      
      }
    else {
      ;
      stdlib.protect(ctc1, await interact.reportRejectDelivery(), {
        at: './index.rsh:88:66:application',
        fs: ['at ./index.rsh:88:9:application call to [unknown function] (defined at: ./index.rsh:88:22:function exp)'],
        msg: 'reportRejectDelivery',
        who: 'Designer'
        });
      
      return;
      }
    
    
    
    }
  
  
  
  };
export async function Transport(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Transport expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Transport expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_UInt;
  const ctc1 = stdlib.T_Null;
  const ctc2 = stdlib.T_Bool;
  const ctc3 = stdlib.T_Address;
  
  
  const txn1 = await (ctc.recv({
    didSend: false,
    evt_cnt: 2,
    funcNum: 0,
    out_tys: [ctc0, ctc0],
    timeoutAt: undefined /* mto */,
    waitIfNotPresent: false
    }));
  const {data: [v186, v187], secs: v189, time: v188, didSend: v34, from: v185 } = txn1;
  ;
  const txn2 = await (ctc.recv({
    didSend: false,
    evt_cnt: 1,
    funcNum: 1,
    out_tys: [ctc0],
    timeoutAt: undefined /* mto */,
    waitIfNotPresent: false
    }));
  const {data: [v195], secs: v197, time: v196, didSend: v47, from: v194 } = txn2;
  ;
  const v198 = stdlib.eq(v195, stdlib.checkedBigNumberify('./index.rsh:62:25:decimal', stdlib.UInt_max, '0'));
  if (v198) {
    stdlib.protect(ctc1, await interact.reportOrderRejected(), {
      at: './index.rsh:64:55:application',
      fs: ['at ./index.rsh:64:9:application call to [unknown function] (defined at: ./index.rsh:64:24:function exp)'],
      msg: 'reportOrderRejected',
      who: 'Transport'
      });
    
    return;
    }
  else {
    stdlib.protect(ctc1, await interact.reportOrderAccepted(), {
      at: './index.rsh:69:55:application',
      fs: ['at ./index.rsh:69:9:application call to [unknown function] (defined at: ./index.rsh:69:24:function exp)'],
      msg: 'reportOrderAccepted',
      who: 'Transport'
      });
    
    const txn3 = await (ctc.recv({
      didSend: false,
      evt_cnt: 0,
      funcNum: 2,
      out_tys: [],
      timeoutAt: undefined /* mto */,
      waitIfNotPresent: false
      }));
    const {data: [], secs: v209, time: v208, didSend: v75, from: v207 } = txn3;
    ;
    const v212 = stdlib.addressEq(v185, v207);
    stdlib.assert(v212, {
      at: './index.rsh:70:7:dot',
      fs: [],
      msg: 'sender correct',
      who: 'Transport'
      });
    stdlib.protect(ctc1, await interact.reportPayment(v186, v195), {
      at: './index.rsh:71:49:application',
      fs: ['at ./index.rsh:71:9:application call to [unknown function] (defined at: ./index.rsh:71:24:function exp)'],
      msg: 'reportPayment',
      who: 'Transport'
      });
    
    const v218 = stdlib.protect(ctc2, await interact.confirmDelivery(v187), {
      at: './index.rsh:77:61:application',
      fs: ['at ./index.rsh:76:9:application call to [unknown function] (defined at: ./index.rsh:76:13:function exp)'],
      msg: 'confirmDelivery',
      who: 'Transport'
      });
    
    const txn4 = await (ctc.sendrecv({
      args: [v185, v186, v187, v194, v218],
      evt_cnt: 1,
      funcNum: 3,
      lct: v208,
      onlyIf: true,
      out_tys: [ctc2],
      pay: [stdlib.checkedBigNumberify('./index.rsh:81:5:decimal', stdlib.UInt_max, '0'), []],
      sim_p: (async (txn4) => {
        const sim_r = { txns: [], mapRefs: [], maps: [] };
        let sim_txn_ctr = stdlib.UInt_max;
        const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
        
        
        const {data: [v220], secs: v222, time: v221, didSend: v93, from: v219 } = txn4;
        
        ;
        if (v220) {
          sim_r.isHalt = false;
          }
        else {
          sim_r.txns.push({
            kind: 'from',
            to: v185,
            tok: undefined /* Nothing */
            });
          sim_r.txns.push({
            kind: 'halt',
            tok: undefined /* Nothing */
            })
          sim_r.isHalt = true;
          }
        return sim_r;
        }),
      soloSend: true,
      timeoutAt: undefined /* mto */,
      tys: [ctc3, ctc0, ctc0, ctc3, ctc2],
      waitIfNotPresent: false
      }));
    const {data: [v220], secs: v222, time: v221, didSend: v93, from: v219 } = txn4;
    ;
    if (v220) {
      stdlib.protect(ctc1, await interact.reportAcceptDelivery(), {
        at: './index.rsh:93:66:application',
        fs: ['at ./index.rsh:93:9:application call to [unknown function] (defined at: ./index.rsh:93:22:function exp)'],
        msg: 'reportAcceptDelivery',
        who: 'Transport'
        });
      
      const txn5 = await (ctc.recv({
        didSend: false,
        evt_cnt: 0,
        funcNum: 4,
        out_tys: [],
        timeoutAt: undefined /* mto */,
        waitIfNotPresent: false
        }));
      const {data: [], secs: v238, time: v237, didSend: v126, from: v236 } = txn5;
      ;
      const v241 = stdlib.addressEq(v185, v236);
      stdlib.assert(v241, {
        at: './index.rsh:95:7:dot',
        fs: [],
        msg: 'sender correct',
        who: 'Transport'
        });
      const txn6 = await (ctc.recv({
        didSend: false,
        evt_cnt: 1,
        funcNum: 5,
        out_tys: [ctc2],
        timeoutAt: undefined /* mto */,
        waitIfNotPresent: false
        }));
      const {data: [v246], secs: v248, time: v247, didSend: v136, from: v245 } = txn6;
      ;
      const v249 = stdlib.addressEq(v185, v245);
      stdlib.assert(v249, {
        at: './index.rsh:104:5:dot',
        fs: [],
        msg: 'sender correct',
        who: 'Transport'
        });
      if (v246) {
        stdlib.protect(ctc1, await interact.reportOrderReceived(), {
          at: './index.rsh:116:65:application',
          fs: ['at ./index.rsh:116:9:application call to [unknown function] (defined at: ./index.rsh:116:22:function exp)'],
          msg: 'reportOrderReceived',
          who: 'Transport'
          });
        
        ;
        ;
        return;
        }
      else {
        ;
        ;
        return;
        }
      
      
      
      }
    else {
      ;
      stdlib.protect(ctc1, await interact.reportRejectDelivery(), {
        at: './index.rsh:88:66:application',
        fs: ['at ./index.rsh:88:9:application call to [unknown function] (defined at: ./index.rsh:88:22:function exp)'],
        msg: 'reportRejectDelivery',
        who: 'Transport'
        });
      
      return;
      }
    
    
    
    }
  
  
  
  };
const _ALGO = {
  ABI: {
    impure: [],
    pure: [],
    sigs: []
    },
  appApproval: `ByAKAAEFICgDBAgGAiYCAQAAIjUAMRhBAxspZEkiWzUBIQdbNQI2GgAXSUEAByI1BCM1BgA2GgIXNQQ2GgM2GgEXSSEFDEABgUkhBgxAAQBJJAxAAJQkEkQhCDQBEkQ0BEkiEkw0AhIRRChkSTUDSUlXACA1/yVbNf4hBFs1/Uk1BRc1/IAEsKWIUDT8FlEHCFCwNP8xABJENPxBACmxIrIBNP2yCCOyEDQDV1AgsgezsSKyATT+sggjshA0A1cwILIHs0ICH7EisgE0/bIII7IQNP+yB7OxIrIBNP6yCCOyEDT/sgezQgH8SCQ0ARJENARJIhJMNAISEUQoZEk1A0lKSVcAIDX/JVs1/iEEWzX9VzAgNfxXUCA1+4AEkSc087A0/YgCLDT/MQASRDT/NP4WUDT9FlA0/FA0+1AoSwFXAHBnSCEINQEyBjUCQgGxSCEGNAESRDQESSISTDQCEhFEKGRJNQNJSlcAIDX/JVs1/iEEWzX9VzAgNfxJNQUXNfuABGWxA100+xZRBwhQsDT7QQAiNP80/hZQNP0WUDT8UDEAUChLAVcAcGdIJDUBMgY1AkIBSrEisgE0/rIII7IQNP+yB7NCARxJIwxAAMZJIQkMQABeSCEFNAESRDQESSISTDQCEhFEKGRJNQNJSlcAIDX/JVs1/iEEWzX9VzAgNfyABEGxQE2wNP6IAUQ0/zEAEkQ0/zT+FlA0/RZQNPxQKEsBVwBQZ0ghBjUBMgY1AkIAzEgjNAESRDQESSISTDQCEhFEKGRJNQNJSVcAIDX/JVs1/iEEWzX9STUFFzX8gATVFRkUNPwWULA0/CISQQADQgBwNP80/hZQNP0WUDEAUChLAVcAUGdIIQU1ATIGNQJCAGtIgaCNBogAtSI0ARJENARJIhJMNAISEURJNQVJIls1/yEHWzX+gASs0R/DNP8WUDT+FlCwMQA0/xZQNP4WUChLAVcAMGdIIzUBMgY1AkIAGzEZJBJEsSKyASKyCCOyEDIJsgkyCrIHs0IABTEZIhJEKTQBFjQCFlBnNAZBAAqABBUffHU0B1CwNABJIwgyBBJEMRYSRCNDMRkiEkRC/98iMTQSRCEJMTUSRCIxNhJEIjE3EkQiNQEiNQJC/640AElKIwg1ADgHMgoSRDgQIxJEOAgSRIk=`,
  appClear: `Bw==`,
  companionInfo: null,
  extraPages: 0,
  mapDataKeys: 0,
  mapDataSize: 0,
  stateKeys: 1,
  stateSize: 112,
  unsupported: [],
  version: 11,
  warnings: []
  };
const _ETH = {
  ABI: `[
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "v186",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "v187",
                "type": "uint256"
              }
            ],
            "internalType": "struct T1",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "internalType": "struct T2",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "stateMutability": "payable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "msg",
        "type": "uint256"
      }
    ],
    "name": "ReachError",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "v186",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "v187",
                "type": "uint256"
              }
            ],
            "internalType": "struct T1",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct T2",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e0",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "v195",
                "type": "uint256"
              }
            ],
            "internalType": "struct T4",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct T5",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e1",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "indexed": false,
        "internalType": "struct T7",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e2",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "bool",
                "name": "v220",
                "type": "bool"
              }
            ],
            "internalType": "struct T9",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct T10",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e3",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "indexed": false,
        "internalType": "struct T7",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e4",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "bool",
                "name": "v246",
                "type": "bool"
              }
            ],
            "internalType": "struct T11",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct T12",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e5",
    "type": "event"
  },
  {
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "inputs": [],
    "name": "_reachCreationTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_reachCurrentState",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_reachCurrentTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "v195",
                "type": "uint256"
              }
            ],
            "internalType": "struct T4",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "internalType": "struct T5",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_m1",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "internalType": "struct T7",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_m2",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "bool",
                "name": "v220",
                "type": "bool"
              }
            ],
            "internalType": "struct T9",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "internalType": "struct T10",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_m3",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "internalType": "struct T7",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_m4",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "bool",
                "name": "v246",
                "type": "bool"
              }
            ],
            "internalType": "struct T11",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "internalType": "struct T12",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_m5",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]`,
  Bytecode: `0x60806040526040516200129b3803806200129b83398101604081905262000026916200022e565b6000805543600355604080513381528251602080830191909152808401518051838501520151606082015290517fa736757a943474ef5983bb0422ab3a1e64bcd39e99635f4430c7765118231f959181900360800190a16200008b3415600762000127565b620000b9604051806060016040528060006001600160a01b0316815260200160008152602001600081525090565b338082526020838101805151828501908152905182015160408086019182526001600081905543905580518085019590955291518483015251606080850191909152815180850390910181526080909301905281516200011e92600292019062000151565b505050620002cb565b816200014d5760405163100960cb60e01b81526004810182905260240160405180910390fd5b5050565b8280546200015f906200028e565b90600052602060002090601f016020900481019282620001835760008555620001ce565b82601f106200019e57805160ff1916838001178555620001ce565b82800160010185558215620001ce579182015b82811115620001ce578251825591602001919060010190620001b1565b50620001dc929150620001e0565b5090565b5b80821115620001dc5760008155600101620001e1565b604080519081016001600160401b03811182821017156200022857634e487b7160e01b600052604160045260246000fd5b60405290565b600081830360608112156200024257600080fd5b6200024c620001f7565b835181526040601f19830112156200026357600080fd5b6200026d620001f7565b60208581015182526040909501518582015293810193909352509092915050565b600181811c90821680620002a357607f821691505b60208210811415620002c557634e487b7160e01b600052602260045260246000fd5b50919050565b610fc080620002db6000396000f3fe6080604052600436106100795760003560e01c8063a7661d541161004b578063a7661d54146100e1578063ab53f2c6146100f4578063ad9fa3d814610117578063e2186a081461012a57005b80631e93b0f1146100825780637eea518c146100a657806383230757146100b9578063873779a1146100ce57005b3661008057005b005b34801561008e57600080fd5b506003545b6040519081526020015b60405180910390f35b6100806100b4366004610c2d565b61013d565b3480156100c557600080fd5b50600154610093565b6100806100dc366004610c2d565b6102ea565b6100806100ef366004610c2d565b610474565b34801561010057600080fd5b50610109610618565b60405161009d929190610c50565b610080610125366004610c2d565b6106b5565b610080610138366004610c2d565b61090b565b61014d600360005414600d610ae0565b6101678135158061016057506001548235145b600e610ae0565b60008080556002805461017990610cad565b80601f01602080910402602001604051908101604052809291908181526020018280546101a590610cad565b80156101f25780601f106101c7576101008083540402835291602001916101f2565b820191906000526020600020905b8154815290600101906020018083116101d557829003601f168201915b505050505080602001905181019061020a9190610cfe565b90507f919263be6d51bec670ce110fb6a7df03fe323e3de4dade5355bccc6a4b06d950338360405161023d929190610d8b565b60405180910390a161025681602001513414600b610ae0565b805161026e906001600160a01b03163314600c610ae0565b610276610b05565b81516001600160a01b03908116825260208084015181840152604080850151818501526060808601519093169284019290925260046000554360015590516102c091839101610dc0565b604051602081830303815290604052600290805190602001906102e4929190610b3f565b50505050565b6102fa6001600054146009610ae0565b6103148135158061030d57506001548235145b600a610ae0565b60008080556002805461032690610cad565b80601f016020809104026020016040519081016040528092919081815260200182805461035290610cad565b801561039f5780601f106103745761010080835404028352916020019161039f565b820191906000526020600020905b81548152906001019060200180831161038257829003601f168201915b50505050508060200190518101906103b79190610df7565b6040805133815284356020808301919091528501358183015290519192507f3957da95a08a7316b724c4fe20ec058158ff5f626860362a6b6aafcb999f7225919081900360600190a161040c34156008610ae0565b602082013561042f576000808055600181905561042b90600290610bc3565b5050565b610437610b05565b81516001600160a01b031681526020808301518183015260408084015181840152336060840152600360005543600155516102c091839101610dc0565b6104846005600054146014610ae0565b61049e8135158061049757506001548235145b6015610ae0565b6000808055600280546104b090610cad565b80601f01602080910402602001604051908101604052809291908181526020018280546104dc90610cad565b80156105295780601f106104fe57610100808354040283529160200191610529565b820191906000526020600020905b81548152906001019060200180831161050c57829003601f168201915b50505050508060200190518101906105419190610e66565b90507faa99e317c364fb804a6b7e67b51beee98735c62eb3df9d8182015e63bb1907223383604051610574929190610d8b565b60405180910390a161058d816040015134146012610ae0565b80516105a5906001600160a01b031633146013610ae0565b6040805160a08101825260008082526020808301828152838501838152606080860185815260808088018781528a516001600160a01b039081168a528b8801519096528a8a015190945291890151841690528701519091169052600690915543600155915190916102c091839101610ef4565b60006060600054600280805461062d90610cad565b80601f016020809104026020016040519081016040528092919081815260200182805461065990610cad565b80156106a65780601f1061067b576101008083540402835291602001916106a6565b820191906000526020600020905b81548152906001019060200180831161068957829003601f168201915b50505050509050915091509091565b6106c56006600054146018610ae0565b6106df813515806106d857506001548235145b6019610ae0565b6000808055600280546106f190610cad565b80601f016020809104026020016040519081016040528092919081815260200182805461071d90610cad565b801561076a5780601f1061073f5761010080835404028352916020019161076a565b820191906000526020600020905b81548152906001019060200180831161074d57829003601f168201915b50505050508060200190518101906107829190610e66565b90507f663356c9bc60432e38c96f881aa1e2828a9a5648f65169c66c8c7722e9c2136533836040516107b5929190610f52565b60405180910390a16107c934156016610ae0565b80516107e1906001600160a01b031633146017610ae0565b6107f16040830160208401610f6f565b156108905780608001516001600160a01b03166108fc82604001519081150290604051600060405180830381858888f19350505050158015610837573d6000803e3d6000fd5b5080606001516001600160a01b03166108fc82602001519081150290604051600060405180830381858888f19350505050158015610879573d6000803e3d6000fd5b506000808055600181905561042b90600290610bc3565b805160408083015190516001600160a01b039092169181156108fc0291906000818181858888f193505050501580156108cd573d6000803e3d6000fd5b50805160208201516040516001600160a01b039092169181156108fc0291906000818181858888f19350505050158015610879573d6000803e3d6000fd5b61091b6004600054146010610ae0565b6109358135158061092e57506001548235145b6011610ae0565b60008080556002805461094790610cad565b80601f016020809104026020016040519081016040528092919081815260200182805461097390610cad565b80156109c05780601f10610995576101008083540402835291602001916109c0565b820191906000526020600020905b8154815290600101906020018083116109a357829003601f168201915b50505050508060200190518101906109d89190610cfe565b90507fa5a264ad7bcb9788928e7795891942e9811712d8346314f9c3672363842f4e353383604051610a0b929190610f52565b60405180910390a1610a1f3415600f610ae0565b610a2f6040830160208401610f6f565b15610aa3576040805160a0810182526000808252602080830182815283850183815260608086018581526080870186815289516001600160a01b0390811689528a8701519095528989015190935290880151909216909152339052600590915543600155915190916102c091839101610ef4565b805160208201516040516001600160a01b039092169181156108fc0291906000818181858888f19350505050158015610879573d6000803e3d6000fd5b8161042b5760405163100960cb60e01b81526004810182905260240160405180910390fd5b604051806080016040528060006001600160a01b03168152602001600081526020016000815260200160006001600160a01b031681525090565b828054610b4b90610cad565b90600052602060002090601f016020900481019282610b6d5760008555610bb3565b82601f10610b8657805160ff1916838001178555610bb3565b82800160010185558215610bb3579182015b82811115610bb3578251825591602001919060010190610b98565b50610bbf929150610c00565b5090565b508054610bcf90610cad565b6000825580601f10610bdf575050565b601f016020900490600052602060002090810190610bfd9190610c00565b50565b5b80821115610bbf5760008155600101610c01565b600060408284031215610c2757600080fd5b50919050565b600060408284031215610c3f57600080fd5b610c498383610c15565b9392505050565b82815260006020604081840152835180604085015260005b81811015610c8457858101830151858201606001528201610c68565b81811115610c96576000606083870101525b50601f01601f191692909201606001949350505050565b600181811c90821680610cc157607f821691505b60208210811415610c2757634e487b7160e01b600052602260045260246000fd5b80516001600160a01b0381168114610cf957600080fd5b919050565b600060808284031215610d1057600080fd5b6040516080810181811067ffffffffffffffff82111715610d4157634e487b7160e01b600052604160045260246000fd5b604052610d4d83610ce2565b81526020830151602082015260408301516040820152610d6f60608401610ce2565b60608201529392505050565b80358015158114610cf957600080fd5b6001600160a01b038316815281356020808301919091526060820190610db2908401610d7b565b151560408301529392505050565b81516001600160a01b0390811682526020808401519083015260408084015190830152606092830151169181019190915260800190565b600060608284031215610e0957600080fd5b6040516060810181811067ffffffffffffffff82111715610e3a57634e487b7160e01b600052604160045260246000fd5b604052610e4683610ce2565b815260208301516020820152604083015160408201528091505092915050565b600060a08284031215610e7857600080fd5b60405160a0810181811067ffffffffffffffff82111715610ea957634e487b7160e01b600052604160045260246000fd5b604052610eb583610ce2565b81526020830151602082015260408301516040820152610ed760608401610ce2565b6060820152610ee860808401610ce2565b60808201529392505050565b81516001600160a01b0390811682526020808401519083015260408084015190830152606080840151821690830152608092830151169181019190915260a00190565b80358252610f4760208201610d7b565b151560208301525050565b6001600160a01b038316815260608101610c496020830184610f37565b600060208284031215610f8157600080fd5b610c4982610d7b56fea264697066735822122090e24b8f4a624040488194e1ac628193a770b862db2f4e8c9742b08425a5ccb364736f6c634300080c0033`,
  BytecodeLen: 4763,
  Which: `oD`,
  version: 8,
  views: {
    }
  };
export const _stateSourceMap = {
  1: {
    at: './index.rsh:52:11:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    },
  2: {
    at: './index.rsh:63:13:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    },
  3: {
    at: './index.rsh:68:13:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    },
  4: {
    at: './index.rsh:72:13:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    },
  5: {
    at: './index.rsh:92:13:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    },
  6: {
    at: './index.rsh:96:13:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    },
  7: {
    at: './index.rsh:119:13:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    },
  8: {
    at: './index.rsh:111:13:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    },
  9: {
    at: './index.rsh:87:13:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    }
  };
export const _Connectors = {
  ALGO: _ALGO,
  ETH: _ETH
  };
export const _Participants = {
  "Customer": Customer,
  "Designer": Designer,
  "Transport": Transport
  };
export const _APIs = {
  };
