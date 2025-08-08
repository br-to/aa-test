// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract PostBoard {
    event PostCreated(address indexed author, string cid);

    function createPost(string calldata cid) external {
        require(bytes(cid).length != 0, "empty cid");
        emit PostCreated(msg.sender, cid);
    }
}
