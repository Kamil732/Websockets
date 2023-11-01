import datetime
import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncJsonWebsocketConsumer


class ChatConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_name = self.room_name.replace(' ', '_')
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        response = json.loads(text_data)

        # event = response.get("event", None)
        # if event == 'START_CHAT':
        #  await self.channel_layer.group_send(
        #     self.room_group_name,
        #     {
        #         'type': 'send_message',
        #         'message': message,
        #         'utc_time': utc_time,
        #     }
        # )

        message = response.get("message", None)
        utc_time = datetime.datetime.now(datetime.timezone.utc)
        utc_time = utc_time.isoformat()

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'send_message',
                'message': message,
                'utc_time': utc_time,
            }
        )

    async def send_message(self, event):
        message = event['message']
        utc_time = event['utc_time']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'utc_time': utc_time,
        }))