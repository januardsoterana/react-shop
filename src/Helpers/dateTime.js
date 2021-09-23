/* eslint-disable max-len */
export const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

export const monthShortNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export const getWeek = (d) => {
    const curr = d || new Date();
    const week = [];
    for (let i = curr.getDate(); i <= (curr.getDate() + 6); i += 1) {
        const newFirstDate = new Date(curr);
        const weekDate = new Date(newFirstDate.setDate(i));
        week.push(weekDate);
    }
    return week;
};

export const getDateStringMMDDYY = (dateObj) => {
    const month = monthNames[dateObj.getMonth()];
    const date = dateObj.getDate();
    const year = dateObj.getFullYear();

    return `${month} ${date}, ${year}`;
};

export const getDateDDmm = (dateObj) => {
    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();
    return `${month}/${date}`;
};

export const getNumberOfDaysBetween = (dateObj) => {
    const currDate = new Date();
    const futureDate = dateObj;
    return  Math.ceil((futureDate - currDate) / (1000 * 60 * 60 * 24));
};

export const getGreeting = () => {
    const currTime = new Date(Date.now());
    const hour = currTime.getHours();
    let greeting = 'morning';
    if (hour > 11) {
        greeting = 'afternoon';
    } else if (hour > 17) {
        greeting = 'evening';
    } else {
        greeting = 'morning';
    }
    return greeting;
};

export const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours %= 12;
    hours = hours || 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hours}:${minutes} ${ampm}`;
    return strTime;
};

export const getWeekByFirstDate = (d) => {
    const curr = new Date(d);
    const firstDayOfWeek = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    const lastDayOfWeek = new Date(curr.setDate(firstDayOfWeek.getDate() + 6));
    const week = [];
    if (firstDayOfWeek.getMonth() === lastDayOfWeek.getMonth()) {
        for (let i = firstDayOfWeek.getDate(); i <= lastDayOfWeek.getDate(); i += 1) {
            const newDate = new Date(firstDayOfWeek);
            const date = new Date(newDate.setDate(i));
            week.push(date);
        }
        // TODO logic
    } else if (firstDayOfWeek.getDate() > 20) {
        for (let i = firstDayOfWeek.getDate(); i <= new Date(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth() + 1, 0).getDate(); i += 1) {
            const newDate = new Date(firstDayOfWeek);
            const date = new Date(newDate.setDate(i));
            week.push(date);
        }
        for (let i = 1; i <= lastDayOfWeek.getDate(); i += 1) {
            const newDate = new Date(lastDayOfWeek);
            const date = new Date(newDate.setDate(i));
            week.push(date);
        }
    }
    return week;
};

function weekCount(year, month) {
    const firstOfMonth = new Date(year, month - 1, 1);
    const lastOfMonth = new Date(year, month, 0);

    const used = firstOfMonth.getDay() + lastOfMonth.getDate();
    return Math.ceil(used / 7);
}

// too complex to habdke --- fix this
export const getMonth = (d) => {
    const month = [];
    const date = d || new Date();
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const isFirstDayOfMonthFirstDayOfWeek = getWeekByFirstDate(new Date(date)?.setDate(1))[0]?.getDate() === 1;
    const lastCount = weekCount(lastDayOfMonth?.getFullYear(), lastDayOfMonth?.getMonth() + 1);
    const weekCountIndex = isFirstDayOfMonthFirstDayOfWeek ? lastCount + 1 : lastCount;
    // TODO fix logic
    for (let i = 0; i < weekCountIndex; i += 1) {
        let newWeek = [];
        if (i === 0 && !isFirstDayOfMonthFirstDayOfWeek) {
            newWeek = getWeekByFirstDate(new Date(date).setDate(1));
        } else if (i !== 0) {
            newWeek = getWeekByFirstDate(new Date(date).setDate(i * 7));
        }
        const findLastDayInWeek = newWeek.find((day) => day.toDateString() === lastDayOfMonth.toDateString());
        if (findLastDayInWeek) {
            const lastDayIndex = newWeek.indexOf(findLastDayInWeek);
            const modifiedWeek = newWeek.slice(0, lastDayIndex + 1);
            month.push(modifiedWeek);
        } else {
            month.push(newWeek);
        }
    }
    return month;
};

export const getTimeFromDate = (d) => {
    const date = new Date(d);
    return formatAMPM(date);
};

export default {};
