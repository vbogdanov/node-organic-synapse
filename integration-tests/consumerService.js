module.exports = function Jack (plasma, config) {
    this.message = function (addr, callback) {
      console.log("consumer recieved address: ", addr);
      plasma.message(addr, "success");
      callback("finished");
    };
}