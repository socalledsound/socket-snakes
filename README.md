# socket snakes

-- for UCB art 173 Fall 2022

socket.io based snake game similar slither.io, etc.

unlike the games we looked at in class, in this case the game logic is running on a server and
the browser just draws it to the screen, and sends update messages when the mouse is clicked

this way, everyone can get everyone else's snakey information

libraries used:

--node.js
--express.js
--socket.io
and of course, p5.js, on the client side

oh, and also a vector library on the server side, since I can't use p5 there.
--https://github.com/basics/vector

STILL TO DO:
deploy
add different rooms/sessions
implement dying
at least one more type of food
choose color screen
more detail for the game
chat?