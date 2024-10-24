import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/ko';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('ko');

const formatDate = (timestamp) => {
    return dayjs.unix(timestamp).tz('Asia/Seoul').format('YYYY. MM. DD. (ddd)');
}

export default formatDate;