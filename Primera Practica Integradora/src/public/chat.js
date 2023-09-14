let user = ''

const button_enter = document.getElementById('button_enter')
const input_name = document.getElementById('input_name')
const login_box = document.getElementById('login_box')
const submitNewUser = (e) => {

  e.preventDefault()
  e.target.disabled = true

  user = input_name.value
  input_name.disabled = true
  socket.emit("Client:NewUser", user)
  
  login_box.classList.remove('flex')
  login_box.classList.add('hidden')
  input_name.value = ""
}
button_enter.addEventListener("click", submitNewUser)
input_name.addEventListener("keypress", (e) => {
  if (e.key == 'Enter') {
    submitNewUser(e)
  }
})

socket.on('Server:UpdateUserList', (userList) => {
  console.log("aqui");
  setTimeout(() => {

    let $userList = ''
    userList.forEach((user) => {
      $userList += `<p>${user.name}</p>`
    })

    const users_in_chat = document.getElementById('users_in_chat')
    users_in_chat.innerHTML = $userList
  }, 1000)
})

// CONVERSATION UI CONTRUCTOR
const conversation_box = document.getElementById('conversation_box')
const $buildSpeech = ({ user, msg }) => {
  conversation_box.innerHTML += `<div class="py-1 bg-gray-100 hover:bg-gray-200">
      <span class="px-1 text-sm font-bold">${user}</span>
      <p class="px-1">${msg}</p>
    </div>`
}

// GET LATEST MESSAGES
socket.on('Server:UpdateLastMessages', (messages) => {
  messages.forEach(message => {
    $buildSpeech(message)
  })
})

// SEND MESSAGES
const button_sendmsg = document.getElementById('button_sendmsg')
const msg_box = document.getElementById('msg_box')
const submitMessage = (e) => {
    e.preventDefault()

    socket.emit('Client:SendMsg', { user, msg: msg_box.value })
}
button_sendmsg.addEventListener('click', submitMessage)
msg_box.addEventListener('keypress', (e) => {
  if (e.key == 'Enter') {
    submitMessage(e)
  }
})

// GET THE LAST MESSAGE
socket.on('Server:MsgReceived', (message) => {
  msg_box.value = ''
  $buildSpeech(message)
})
