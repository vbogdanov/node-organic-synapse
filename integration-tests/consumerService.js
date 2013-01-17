module.exports = function Jack (plasma, config) {
    this.message = function (addr) {
      console.log("consumer recieved address: ", addr);
      plasma.message(addr, "success");
    };
}