// 例子 - 图书馆C区 C01起始位置dev_id = 100532224, 如果为C043 则 offsetPos = 43 - 1 = 42;

const CPos1 = 100532224;
const offsetPos = 42;

module.exports = {
    "id": "",
    "pwd": "",
    "act": "login",
    "currentTime": "2019-09-02",
    "startTime": "12:00",
    "endTime": "14:00",
    "dev_id": `${CPos1 + offsetPos}`
}