from simple_websocket_server import WebSocketServer, WebSocket
from struct import *

class SimpleEcho(WebSocket):
	def handle(self):
	# echo message back to client
		self.send_message(self.data)
	
	def connected(self):
		print(self.address, 'connected')
		self.send_message(pack(">LLffffffffffffffff",1,1, 1.0,0.0,0.0,0.0, 0.0,1.0,0.0,0.0 ,0.0,0.0,1.0,0.0, 0.0,0.0,0.0,1.0))


	def handle_close(self):
		print(self.address, 'closed')


server = WebSocketServer('', 8000, SimpleEcho)
server.serve_forever()