var server = app.listen(connectionPort, "0.0.0.0");
app.use(express.static('public'));

var io = require('socket.io')(server);
io.sockets.on('connection', connection);

var messageReceiverSockeIDs = [];

// sending to individual socketid (private message)

function connection(socket){

    serverLog("client connected");
    socket.emit("connectionEstabilshed", "ye buddy");

    socket.on("message", function(data){
        serverLog("received text: " + data.text);
        
        //Server is the one who should be receiveing the messages
        if(!sender)
            IncommingMessage(data);

        //relay the message to other clients if there are any
        if(messageReceiverSockeIDs.length > 0)
            relayMessageToReceivers(data);

    });

    socket.on("setReceiverId", function(data) {
        var alreadyInArray = false;

        for (let i = 0; i < messageReceiverSockeIDs.length; i++) {
            const id = messageReceiverSockeIDs[i];
            
            if(id == socket.id)
                alreadyInArray = true;
        }

        if(!alreadyInArray)
        {
            serverLog("new receiver: " + socket.id);
            messageReceiverSockeIDs.push(socket.id);
        }
    });

    socket.on('disconnect', function (data) {
        serverLog("socket disconnected");

        for (let i = 0; i < messageReceiverSockeIDs.length; i++) {
            const id  = messageReceiverSockeIDs[i];
            
            if(messageReceiverSockeIDs[id] == socket.id)
            {
                messageReceiverSockeIDs.splice(i, 1);
                break;
            }
        }
    });
}

//This function will only be called on the server client if the server client is a sender
function sendMessageOnServer(data)
{
    relayMessageToReceivers(data);
}

function relayMessageToReceivers(data)
{
    if(messageReceiverSockeIDs.length > 0)
    {
        var failedIds = "";

        for (let i = 0; i < messageReceiverSockeIDs.length; i++) {
            const id = messageReceiverSockeIDs[i];

            if(socketIsAlive(id))
                io.to(id).emit("message", data);
            else
                failedIds += i + " ";
        }

        if(failedIds != "")
            serverLog("failed to reach socket(s): " + failedIds + " (probably left)");
        
        serverLog("relaying message to " + messageReceiverSockeIDs.length + " receiver(s): " + data.text);
    }
    else
        serverLog("no receiver set - message not sent")
}

function socketIsAlive(id)
{
    return io.sockets.sockets.get(id) != undefined;
}

serverLog("server started on port " + connectionPort);