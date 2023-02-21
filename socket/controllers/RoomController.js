const Room = require("../../models/Room.js");
const BaseController = require("./BaseController.js");

class RoomController extends BaseController {
  joinRoom = ({ roomId }) => {
    this.socket.join(roomId);
  };

  newRoomCreated = ({ roomId, userId }) => {
    const room = new Room({
      name: "Test",
      roomId,
      userId,
    });
    room.save();
    this.socket.emit("new-room-created", { room });

    this.joinRoom(roomId);
  };

  roomRemoved = async ({ roomId }) => {
    await Room.deleteOne({ roomId });
    this.socket.emit("room-removed", { roomId });
  };
}

module.exports = RoomController;
