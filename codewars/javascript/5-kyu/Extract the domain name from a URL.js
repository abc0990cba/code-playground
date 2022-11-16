// 5 kyu
// Extract the domain name from a URL
// https://www.codewars.com/kata/514a024011ea4fb54200004b/

// Task description:
// Write a function that when given a URL as a string, parses out just the domain name and returns it as a string.
// For example:

// * url = "http://github.com/carbonfive/raygun" -> domain name = "github"
// * url = "http://www.zombie-bites.com"         -> domain name = "zombie-bites"
// * url = "https://www.cnet.com"                ->

// Solution 1:
function domainName(url) {
  let result = url;
  result = result.replace("https://", '');
  result = result.replace("http://", '');
  result = result.replace("www.", '');
  return result.split('.')[0];
};

// Solution 2:
function domainName2(url) {  
  // . matches any character (except for line terminators)
  // + matches the previous token between one and unlimited times, as many times as possible, giving back as needed (greedy)
  // \/ matches the character / literally (case sensitive)
  // g modifier: global. All matches (don't return after first match)
  return url.replace(/.+\/\/|www.|\..+/g, '')
}
