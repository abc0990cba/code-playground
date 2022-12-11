// 6 kyu
// Are you available?
// https://www.codewars.com/kata/5603002927a683441f0000cb


// Task Description:
// The Problem
// Dan, president of a Large company could use your help. He wants to implement a system that will switch
// all his devices into offline mode depending on his meeting schedule.
// When he's at a meeting and somebody texts him, he wants to send an automatic message informing
// that he's currently unavailable and the time when he's going to be back.
// What To Do
// Your task is to write a helper function checkAvailability that will take 2 arguments:
// schedule, which is going to be a nested array with Dan's schedule for a given day.
// Inside arrays will consist of 2 elements - start and finish time of a given appointment,
// currentTime - is a string with specific time in hh:mm 24-h format for which the function will check
// availability based on the schedule.
// If no appointments are scheduled for currentTime, the function should return true. 
// If there are no appointments for the day, the output should also be true
// If Dan is in the middle of an appointment at currentTime, the function should return a string with the time he's going to be available.
// Examples:
// checkAvailability([["09:30", "10:15"], ["12:20", "15:50"]], "11:00"); should return true
// checkAvailability([["09:30", "10:15"], ["12:20", "15:50"]], "10:00"); should return "10:15"
// If the time passed as input is equal to the end time of a meeting, function should also return true. checkAvailability([["09:30", "10:15"], ["12:20", "15:50"]], "15:50"); should return true
// You can expect valid input for this kata

// Solution 1
function checkAvailability(schedule, currentTime) {
  let currentTimeNum = Number(currentTime.replace(/:/g, ''));
  let appointments = schedule.map(a => a.map(t => Number(t.replace(/:/g,''))));
  
  for (let i = 0; i < appointments.length; i++) {
    let tmp = [];
    for (let j = appointments[i][0]; j < appointments[i][1]; j++) {
      tmp.push(j)
    }
    if (tmp.includes(currentTimeNum)) {
      return schedule[i][1];
    }
  }
  return true;
}

// Solution 2
function checkAvailability(schedule, currentTime) {
  for (let [begin, end] of schedule)
    if (begin <= currentTime && currentTime < end)
      return end;
  return true;
}
