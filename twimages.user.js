// ==UserScript==
// @name         Twimages
// @namespace    https://github.com/SammyIAm
// @version      0.2
// @description  Inline images (and other extras) for Twitch Chat
// @author       Sammy1Am
// @match        http://www.twitch.tv/*
// ==/UserScript==
/* jshint -W097 */
'use strict';

//debugger;

var lastMessage = null;
var imageRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp))/i;

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

function processMessage(messageDiv){
    var message = messageDiv.getElementsByClassName("message")[0];
    var imageUrl = message.innerText.match(imageRegex);
    if (imageUrl != null){
        // Create link so you can link to the URL
        var imageInsert = document.createElement("a");
        imageInsert.href = imageUrl[0];
        imageInsert.style.display = "block";
        
        // Create image that's reasonably sized
        var newImage = document.createElement("img");
        newImage.src = imageUrl[0];
        newImage.style.border = "1px solid black";
        newImage.style.maxHeight = "120px";
        newImage.style.maxWidth = "100%";
        
        imageInsert.appendChild(newImage);
        
        // Insert right after the message <span>
        message.parentElement.appendChild(imageInsert);
    }
}

var refreshInterval = setInterval(function(){
    getNewMessages().forEach(function(newMessage){
        processMessage(newMessage);
    });
}, 1000);
