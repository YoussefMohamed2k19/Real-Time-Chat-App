// Connect to websocket
var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
console.log("Developed by Youssef Mohamed.");
console.log('New connection from ' + location.protocol + '//' + document.domain);

document.addEventListener('DOMContentLoaded', () => {
    // When connected, configure button
    socket.on('connect', () => {

        // Notify the server user has joined
        socket.emit('joined');
        

        // Forget user's last channel when clicked on '+ Channel'
        document.querySelector('#newChannel').addEventListener('click', () => {
            localStorage.removeItem('last_channel');
        });


        // Forget user's last channel when logged out
        document.querySelector('#logout').addEventListener('click', () => {
            localStorage.removeItem('last_channel');
        });

       
        // Send button emits a "message sent" event
        document.querySelector('#send-button').addEventListener("click", () => {
            var value = document.getElementById('comment').value;
            if (value !== '' && value !== null && value.length > 0) {
                // Save time in format HH:MM:SS
                let timestamp = new Date;
                timestamp = timestamp.toLocaleTimeString();

                // Save user input
                let msg = document.getElementById("comment").value;

                socket.emit('send message', msg, timestamp);
                
                // Clear input
                document.getElementById("comment").value = "";
                $(".emoji-wysiwyg-editor").empty();
                $(".emoji-wysiwyg-editor").css("white-space", "pre-wrap");
                // Send the chat box to scroll automatically to the latest message
                $('.chat ').animate({
                    scrollTop: $('.chat li.left:last').offset().top
                });
                console.log("good")
                return true;
            }
        });
    });
    // When user joins a channel, add a message and on users connected.
    socket.on('status', data => {
        // Broadcast message of joined user.
        const li = document.createElement('li');
        li.innerHTML = `<div class="user_join">
                        <h4>${data.msg}</h4>
                    </div>`;
        document.querySelector('.chat').append(li);
        // Save user current channel on localStorage
        localStorage.setItem('last_channel', data.channel)
    })

    // When a message is announced, add it to the textarea.
    socket.on('announce message', data => {
        const li = document.createElement('li');
        // Format message
        li.innerHTML = `<li class="left clearfix">
                            <span class="chat-img float-left">
                                <img src="../static/images/user.png" alt="User Avatar" class="rounded-circle" />
                            </span>
                            <div class="chat-body clearfix">
                                <div class="header">
                                    <strong class="primary-font">${data.user}</strong> 
                                    <small class="float-right text-muted">
                                        <span> <i class="far fa-clock"></i> </span>
                                        <span class="time_msg">${data.timestamp}</span>
                                    </small>
                                </div>
                                <p>
                                ${data.msg}
                                </p>
                            </div>
                            <hr class="style2">
                        </li>`;
        document.querySelector('.chat').append(li);
    })

    
});