// 3kyu
// 1RM Calculator
// https://www.codewars.com/kata/595bbea8a930ac0b91000130


// Description:
// You just got done with your set at the gym, and you are wondering how much weight you could lift
// if you did a single repetition. Thankfully, a few scholars have devised formulas for this purpose (from Wikipedia) :
// Epley:     1 RM = w * (1 + r/30)
// McGlothin: 1 RM = 100*w / (101.3 - 2.67123*r)
// Lombardi:  1 RM = w*r^0.10
// Your function will receive a weight 'w' and 'a' number of repetitions 'r' and must return your projected one repetition maximum.
// Since you are not sure which formula to use and you are feeling confident, your function will return
// the largest value from the three formulas shown above, rounded to the nearest integer.
// However, if the number of repetitions passed in is 1 (i.e., it is already a one rep max),
// your function must return 'w'. Also, if the number of repetitions passed in is 0 (i.e., no repetitions were completed),
// your function must return 0.

function calculate1RM(w, r) {
  if (r === 0 || w === 0) {
    return 0;
  }
  
  if (r === 1) {
    return w;
  }
  
  const Epley = w * (1 + r / 30);
  const McGlothin = (100 * w) / (101.3 - 2.67123 * r);
  const Lombardi = w * r ** 0.1;
  
  return Math.round(Math.max(Epley, McGlothin, Lombardi));
}
