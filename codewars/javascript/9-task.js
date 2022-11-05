// Your task in order to complete this Kata is to write
// a function which formats a duration,
// given as a number of seconds, in a human-friendly way.

// The function must accept a non-negative integer.
// If it is zero, it just returns "now".
// Otherwise, the duration is expressed
// as a combination of years, days, hours, minutes and seconds.

// It is much easier to understand with an example:
// * For seconds = 62, your function should return 
//     "1 minute and 2 seconds"
// * For seconds = 3662, your function should return
//     "1 hour, 1 minute and 2 seconds"

// For the purpose of this Kata, a year is 365 days and a day is 24 hours.

// Note that spaces are important.
// Detailed rules

// The resulting expression
// is made of components like 4 seconds, 1 year, etc.

// In general, a positive integer and one of the
// valid units of time, separated by a space.
// The unit of time is used in plural if the integer is greater than 1.

// The components are separated by a comma and a space (", ").
// Except the last component, which is separated by " and ",
// just like it would be written in English.

// A more significant units of time will occur before
// than a least significant one.
// Therefore, 1 second and 1 year is not correct,
// but 1 year and 1 second is.

// Different components have different unit of times.
// So there is not repeated units like in 5 seconds and 1 second.

// A component will not appear at all if its value happens to be zero.
// Hence, 1 minute and 0 seconds is not valid,
// but it should be just 1 minute.

// A unit of time must be used "as much as possible".
// It means that the function should not return 61 seconds,
// but 1 minute and 1 second instead.
// Formally, the duration specified by of a component
// must not be greater than any valid more significant unit of time.


function formatDuration1(seconds) {
    if (seconds === 0) {
        return 'now';
    }
    const typeArr = ['year', 'day', 'hour', 'minute', 'second'];
    let second = 0;
    let minute = 0;
    let hour = 0;
    let day = 0;
    let year = 0;

    minute = Math.floor(seconds / 60);
    second = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    year = Math.floor(day / 365);
    day = day % 365;

    const resultTuple = [year, day, hour, minute, second];
    const resultStrArr = [];

    for (let i = 0; i < resultTuple.length; i++) {
        if (resultTuple[i] === 1) {
            resultStrArr.push(resultTuple[i] + ' ' + typeArr[i]);
        } else if (resultTuple[i] >= 2) {
            resultStrArr.push(resultTuple[i] + ' ' + typeArr[i] + 's');
        }
    }

    let resultStr = '';
    for (let i = 0; i < resultStrArr.length; i++) {
        if (i === resultStrArr.length - 2) {
            resultStr += resultStrArr[i] + ' and ' + resultStrArr[i + 1];
            break;
        }
        if (i !== resultStrArr.length - 1) {
            resultStr += resultStrArr[i] + ', ';
        } else {
            resultStr += resultStrArr[i];
        }
    }
    return resultStr;
}


function formatDuration2(seconds) {
    if (seconds === 0) {
        return 'now';
    }

    const time = {
        year: 60 * 60 * 24 * 365,
        day: 60 * 60 * 24,
        hour: 60 * 60,
        minute: 60,
        second: 1,
    };

    const result = [];

    for (let key in time) {
        if (seconds >= time[key]) {
            let val = Math.floor(seconds / time[key]);
            val += val > 1
                ? ' ' + key + 's'
                : ' ' + key
            result.push(val);
            seconds = seconds % time[key];
        }
    }

    // /,([^,]*)$/
    // https://regex101.com/ - regex explanation
    // 'aaa, bbb, ccc' -> 'aaa, bbb and ccc' 
    return (
        result.length > 1
            ? result.join(', ').replace(/,([^,]*)$/, ' and' + '$1')
            : result[0]
    );
}