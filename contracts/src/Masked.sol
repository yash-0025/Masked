// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';



contract Masked is Ownable {

    ERC20 public maskedToken;

    struct Post{
        address author;
        string username;
        string content;
        string imageHash;
        uint256 timestamp;
    }

    mapping(address => string) public usernames;
    mapping(address => bool) public isRegistered;
    mapping(address => address[]) public friends;
    mapping(address => mapping(address => bool)) public isFriend;

    mapping(address => mapping(address => bool)) public friendRequestsSent;
    mapping(address => mapping(address => bool)) public friendRequestsReceived;

    Post[] public posts;

    uint256 public postCost;
    uint256 public messageCost;


    event UserRegistered(address indexed user, string username);
    event PostCreated(address indexed author, string username, string content, string imageHash, uint256 timestamp, uint256 postId);
    event FriendRequestSent(address indexed sender, address indexed receiver);
    event FriendAccepted(address indexed user1, address indexed user2);
    event FriendRemoved(address indexed user1, address indexed user2);
    event TokensPaid(address indexed payer, uint256 amount, string action);


    constructor(address _maskedTokenAddress, uint256 _initialPostCost, uint256 _initialMessageCost) Ownable(msg.sender) {
        require(_maskedTokenAddress != address(0), "Invalid Token Address");
        maskedToken = ERC20(_maskedTokenAddress);
        postCost = _initialPostCost;
        messageCost = _initialMessageCost;
    }


    // -------------------------- USER FUNCTIONS -------------------------------
    function register(string memory _username) public {
        require(!isRegistered[msg.sender], "User Already Registered");
        require(bytes(_username).length > 0, "Username cannot be empty");

        for(uint i=0; i<posts.length; i++) {
            if(keccak256(abi.encodePacked(posts[i].username)) == keccak256(abi.encodePacked(_username))) {
                revert("Username Already Exists !!");
            }
        }
        usernames[msg.sender] = _username;
        isRegistered[msg.sender] = true;
        emit UserRegistered(msg.sender, _username);
    }

    function createPost(string memory _content, string memory _imageHash) public {
        require(isRegistered[msg.sender], "User is not registered");
        require(bytes(_content).length > 0 || bytes(_imageHash).length > 0, "Post cannot be empty !!");
        require(maskedToken.transferFrom(msg.sender, address(this), postCost), "Failed to Pay for the post");
        emit TokensPaid(msg.sender, postCost, "post");
        posts.push(Post({
            author: msg.sender,
            username: usernames[msg.sender],
            content: _content,
            imageHash: _imageHash,
            timestamp: block.timestamp
        }));
        emit PostCreated(msg.sender, usernames[msg.sender], _content, _imageHash, block.timestamp, posts.length - 1);
    }



    function sendFriendRequest(address _friendAddress) public {
        require(isRegistered[msg.sender], "Sender is not a registered user");
        require(isRegistered[_friendAddress], "Your friend is not a registered user");
        require(msg.sender != _friendAddress, "You cannot be your own friend");
        require(!isFriend[msg.sender][_friendAddress], "You are already friends");
        require(!friendRequestsSent[msg.sender][_friendAddress], "Already sent friend request to the friend");
        require(!friendRequestsReceived[msg.sender][_friendAddress], "Your friend has already sent you a friend request. Please accept it");

        friendRequestsSent[msg.sender][_friendAddress] = true;
        friendRequestsReceived[_friendAddress][msg.sender] = true;
        emit FriendRequestSent(msg.sender, _friendAddress);
    }

    function acceptFriendRequest(address _friendAddress)











    // ----------------------------- ONLY OWNER ----------------------------------
    function setPostCost(uint256 _newCost) public onlyOwner {
        postCost = _newCost;
    }

    function setMessageCost(uint256 _newCost) public onlyOwner {
        messageCost = _newCost;
    }

    function witdrawEth() public onlyOwner {
        (bool success,) = msg.sender.call{value: address(this).balance}("");
        require(success, "Failed to withdraw ETH . TRANSACTION FAILED");
    }

    receive() external payable {}
    fallback() external payable{}
}