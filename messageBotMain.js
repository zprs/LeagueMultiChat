var $ = require("jquery");

const { ipcRenderer } = require('electron');

const express = require('express');
const app = express();

var sender = true;
var connectionPort = 8080;
var password = "";
var connectionip = "http://localhost";

var amClient = false;

function selectClientOrServer(isClient)
{
    amClient = isClient;

    if(isClient)
        $("#connectServerOptions").show();
    else
        $("#hostServerOptions").show();

    $("#clientOrServerChoice").hide();
}

function functionSendOrReceiveMessages(send)
{
    sender = send;
    $("#receiveSendMessagesChoice").hide();

    if(send)
        $("#messageSending").show();
    else
        $("#messageRecieving").show();


    if(!sender && amClient)
        setReceiveMessages();;
}

function connectToServer()
{
    addScript("node_modules/socket.io/client-dist/socket.io.js")
    addScript("messageRelayClient.js");

    connectionPort = $("#selectedPortConnect").val();
    password = $("#serverPassConnect").val();
    connectionip = $("#selectedIp").val();

    setTimeout(() => setTimeout(setupClient, 0), 1000);
}

function completeServerCreation()
{
    connectionPort = $("#selectedPort").val();
    password = $("#serverPass").val();

    addScript("messageRelayServer.js");

    $("#hostServerOptions").hide();
    $("#serverControls").show();
    $("#receiveSendMessagesChoice").show();
}

function addScript(file)
{
    let appendageScript = document.createElement("script");
    appendageScript.setAttribute("src", file);
    document.body.appendChild(appendageScript);
}

function serverLog(text)
{
    var newConsoleEntry = "";
    newConsoleEntry += "<p> - " + text + "<p>";
    newConsoleEntry += "<br>"

    $("#fauxConsole").html($("#fauxConsole").html() + newConsoleEntry);
    $('#fauxConsole').scrollTop($('#fauxConsole')[0].scrollHeight);
}

function sendMessage()
{
    var text = $("#inputText").val();
    $("#inputText").val("");

    var data = {text: text};

    sendMessageOnServer(data);
}

function IncommingMessage(data)
{
    //Show last message
    $("#lastMessage").text(data.text);

    var messageInChat = $("#enableTypingCheckbox").is(':checked');

    if(messageInChat && !sender)
        typeMessageInChat(data);   
}

function typeMessageInChat(data)
{
    ipcRenderer.send("typeText", data);
}

// Send Messages With enter key
var messageBox = document.getElementById("inputText");

messageBox.addEventListener("keydown", function(event) {
  if (event.code === "Enter") {
    event.preventDefault();
    document.getElementById("sendMessageButton").click();
  }
});