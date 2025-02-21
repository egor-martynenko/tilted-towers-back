import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
@Injectable()
export class SocketService
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log(`WebSocket Gateway server started on  ${server}`);
  }

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId;
    console.log(`Client connected: ${client.id}, User ID: ${userId}`);
    client.emit('connected', { message: 'Welcome to WebSocket server!' });
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('send-message')
  handleMessage(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log('Message received from:', client.id, 'Data:', data);
    this.server.emit('send-message', data);
  }
}
