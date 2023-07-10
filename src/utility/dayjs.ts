import dayjs from "dayjs";
import "dayjs/locale/en"; // Import the desired locale (English in this case)
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

export default dayjs;
