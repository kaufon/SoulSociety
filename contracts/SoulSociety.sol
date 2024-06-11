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
}

