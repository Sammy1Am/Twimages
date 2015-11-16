// ==UserScript==
// @name         Twimages
// @namespace    https://github.com/SammyIAm
// @version      0.3.1
// @description  Inline images (and other extras) for Twitch Chat
// @author       Sammy1Am
// @match        http://www.twitch.tv/*
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==
/* jshint -W097 */
'use strict';

//debugger;

var lastMessage = null; // Last message processed.
var imageRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp))/i; // Which image links to embed as an img tag
var twitchUsername = getTwitchUsername(); // Get username from GM value storage

// Meta tag for iframes to prevent sending referrer (and fix imgur redirects)
var referrerBlock = document.createElement("meta");
referrerBlock.name = "referrer";
referrerBlock.content = "never";


// Attempt to get a stored username, or prompt for a new one.
function getTwitchUsername() {
    if (GM_getValue("twimage_username",null) == null || GM_getValue("twimage_username", null) == ""){
        GM_setValue("twimage_username", prompt("Twimages: Please enter your Twitch username for chat highlighting.", ""));
    }
    return GM_getValue("twimage_username",null);
}

function getNewMessages(){
    if (lastMessage == null){
        lastMessage = document.getElementsByClassName("chat-lines")[0].children[document.getElementsByClassName("chat-lines")[0].children.length-1];
        return Array.prototype.slice.call(document.getElementsByClassName("chat-lines")[0].children);
    } else {
        var nextMessages = [];
        while (lastMessage.nextElementSibling != null){
            nextMessages.push(lastMessage.nextElementSibling);
            lastMessage = lastMessage.nextElementSibling;
        }
        return nextMessages;
    }
}

function embedImages(messageDiv){
    var message = messageDiv.getElementsByClassName("message")[0];
    var imageUrlMatches = message.textContent.match(imageRegex);
    
    if (imageUrlMatches != null){
        var imageUrl = imageUrlMatches[0]
        
        var imageFrame = document.createElement("iframe");
        
        // Insert right after the message <span>
        message.parentElement.appendChild(imageFrame); // Append early to initialize content body
        imageFrame.style.height = "122px"; // (Just enough room for the image and its border)
        imageFrame.style.border = "none";
        imageFrame.contentDocument.head.appendChild(referrerBlock);
        imageFrame.contentDocument.body.style.margin = "0px";
        
        // Create link so you can link to the URL
        var imageInsert = document.createElement("a");
        imageInsert.href = imageUrl;
        imageInsert.target = "_blank";
        imageInsert.style.display = "block";
        
        // Create image that's reasonably sized
        var newImage = document.createElement("img");
        newImage.src = imageUrl;
        newImage.style.border = "1px solid black";
        newImage.style.maxHeight = "120px";
        newImage.style.maxWidth = "100%";
        
        imageInsert.appendChild(newImage);

        imageFrame.contentDocument.body.appendChild(imageInsert);
    }
}

function highlightUsername(messageDiv){
    var message = messageDiv.getElementsByClassName("message")[0];
    if (message.textContent.toLowerCase().indexOf(twitchUsername.toLowerCase()) > -1){
        message.style.backgroundColor = "#C4B3DB";
    }
}

var refreshInterval = setInterval(function(){
    getNewMessages().forEach(function(newMessage){
        embedImages(newMessage);
        highlightUsername(newMessage);
    });
}, 500);
