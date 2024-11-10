import dayjs from "dayjs";

const formatTime = (timestamp) => {
    return dayjs.unix(timestamp).tz('Asia/Seoul').format('HH:mm');
};

export default formatTime;