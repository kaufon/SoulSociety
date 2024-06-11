// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

struct Request{
  uint id;
  address author;
  string title;
  string target;
  string description;
  uint payment;
  bool open;
  string creator;
  string targetLocation;
  uint timestamp;
}

contract SoulSociety {
  uint public LastID = 0;
  
  mapping (uint=>Request) public requests;
  
  function openRequest(string memory creator,string memory title,string memory target,string memory description,uint payment,string memory targetLocation) public {
  LastID++;
  requests[LastID] = Request({
    id: LastID,
    title: title,
    creator: creator,
    target: target,
    description: description,
    targetLocation: targetLocation,
    payment: payment,
    open: true,
    timestamp: block.timestamp,
    author: msg.sender
  }); 
}
 function closeRequest(uint id) public{
   address author = requests[id].author;
   uint payment = requests[id].payment;
   address killer = msg.sender;
   require(requests[id].open == true && (killer != author),"You cant close the request buddy");

   requests[id].open = false;

   if(payment > 0){
     requests[id].payment =0;
     payable(killer).transfer(payment);
   } 
 }
 function upgradeBounty(uint id) public payable {
   require(requests[id].open == true && (msg.sender == requests[id].author));
   requests[id].payment += msg.value;
   
 }
}

