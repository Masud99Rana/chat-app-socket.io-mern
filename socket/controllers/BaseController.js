class BaseController {
  socket;

  constructor(socket) {
    this.socket = socket;
  }
}


module.exports = BaseController;