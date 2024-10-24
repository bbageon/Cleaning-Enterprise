import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import locale from 'dayjs/locale/ko';

const formatTime = (timestamp) => {
    return dayjs.unix(timestamp).tz('Asia/Seoul').format('HH:mm');
};

export default formatTime;