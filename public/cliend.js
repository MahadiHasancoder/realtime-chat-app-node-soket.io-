
const  socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')

do{
    name = prompt('Please enter your name')
}while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
        e.target.value = ''
    }
})


function sendMessage(message){
    let msg = {
        user: name,
        message: message.trim()
    }
    //Append
    appendMessage(msg, 'outgoing')

    sccrollBottom()
    
    //Send to server
    socket.emit('message', msg)
}

function appendMessage(msg, type){
    let mainDev = document.createElement('dev')
    let className = type
    mainDev.classList.add(className, 'message')

    console.log("1");


    let markup = `
        <h4> ${msg.user} </h4>
        <p> ${msg.message} </p>
    `
    mainDev.innerHTML = markup
    messageArea.appendChild(mainDev)
}


//Recive Message

socket.on('message', (msg)=>{
    appendMessage(msg, 'incoming')
    sccrollBottom()
})

function sccrollBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}



