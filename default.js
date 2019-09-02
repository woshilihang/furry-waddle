const defaultConfig = {
    login: {
      id: "", // 默认没有， 需要补充报错
      pwd: "",
      act: "login"
    },
    getSeat: {
      currentTime: "",
      startTime: "0800",
      endTime: "1200"
    }
  };
  
 const errText = {
    home: "Access home page error",
    login: "Login failed",
    seat: "Location reservation failed"
  };

  exports.defaultConfig = defaultConfig;
  exports.errText = errText;