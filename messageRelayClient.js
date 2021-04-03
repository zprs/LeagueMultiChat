var socket;
var clientId;

var connectionEstablished = false;

function setupClient() {
    var host = connectionip + ':' + connectionPort;
    socket = io.connect(host);
    console.log("trying to connect to: " + host);

    clientId = socket.io.engine.id;
    socket.on('message', IncommingMessage);
    socket.on('connectionEstabilshed', connected);

    $("#searchingForConnection").show();
}

function sendMessageOnServer(data)
{
    socket.emit('message', data);
}

function connected()
{
    $("#searchingForConnection").hide();
    $("#connectServerOptions").hide();

    $("#connected").show();
    $("#receiveSendMessagesChoice").show();

    connectionEstablished = true;

    // just in case we reconnect or something
    if(!sender)
        socket.emit("setReceiverId");
}

function setReceiveMessages()
{
    if(!connectionEstablished)
    {
        setTimeout(setReceiveMessages, 2000);
        console.log("connection not yet established, can't yet set socket to receiver");
        return;
    }

    if(!sender)
        socket.emit("setReceiverId");
}