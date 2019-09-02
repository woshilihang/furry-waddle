const request = require("request");
const userConfig = require("./config");
const { defaultConfig, errText } = require("./default");

const { id, pwd, act, currentTime, startTime, endTime, dev_id } = userConfig;
const loginFormData = Object.assign({}, defaultConfig.login, { id, pwd, act });
const getSeatData = Object.assign({}, defaultConfig.login, {
  currentTime,
  startTime,
  endTime
});

try {
  // 对请求必要参数进行非空校验
  const loginData = { ...loginFormData };
  let isNotNull = true;
  for(let i in loginData) {
      if(loginData.hasOwnProperty(i)) {
          if (!loginData[i]) {
            isNotNull = false;
          }
      }
  }
  if(!isNotNull) {
    throw new Error('请查看参数是否完成...');
  }
} catch (err) {
    console.log(err);
}

const transTimetoNum = time => {
  return time.split(":").join("");
};

const url = {
  home: "http://lib2.ecjtu.edu.cn/ClientWeb/pro/ajax/login.aspx",
  login: "http://lib2.ecjtu.edu.cn/ClientWeb/pro/ajax/login.aspx",
  getSeat: `http://lib2.ecjtu.edu.cn/ClientWeb/pro/ajax/reserve.aspx?dialogid=&dev_id=${dev_id}&lab_id=&kind_id=&room_id=&type=dev&prop=&test_id=&term=&number=&classkind=&test_name=0&start=${
    getSeatData.currentTime
  }+${encodeURIComponent(getSeatData.startTime)}&end=${
    getSeatData.currentTime
  }+${encodeURIComponent(getSeatData.endTime)}&start_time=${transTimetoNum(
    getSeatData.startTime
  )}&end_time=${transTimetoNum(
    getSeatData.endTime
  )}&up_file=&memo=&memo=&act=set_resv&_=${156738580 +
    Math.floor(Math.random() * 10000)}`
};

request(url.home, (err, res, body) => {
  if (err) {
    console.error(err);
    return {
      code: 1016,
      msg: errText,
      err
    };
  }
  // 第一次页面获取访问到的cookie
  const cookieHome = res.headers["set-cookie"].join();
  const cookies = cookieHome.split(";")[0];
  // 模拟登录
  const opts = {
    url: url.login,
    form: loginFormData,
    headers: {
      Cookie: cookies,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST"
  };
  request(opts, (err, res, body) => {
    console.log(`requesing ... \n ${JSON.stringify(opts)}`);
    if (err) {
      console.error(err);
      return {
        err: `${errText.login} \n ${err}`,
        code: 1017
      };
    }
    const resData =
      typeof res.body === "string" ? JSON.parse(res.body) : res.body;
    // 登录成功进行发起请求对位置进行预约
    if (res && resData.msg === "ok") {
      request(
        {
          url: url.getSeat,
          headers: {
            Cookie: cookieHome.split(";")[0],
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "GET"
        },
        (err, res, body) => {
          if (err) {
            console.error(err);
            return {
              code: 1019,
              err: `${errText.seat} \n ${err}`
            };
          }
          if (res && res.body) {
            const msg = JSON.parse(res.body).msg;
            console.log(msg);
            return msg;
          }
        }
      );
    } else {
      return {
        code: 1018,
        err: `${errText.login} \n ${err}`
      };
    }
  });
});
