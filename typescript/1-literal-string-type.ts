const makeRequest = (method: 'POST' | 'GET') => {
  console.log(method);
}

// case 1
const obj = { method: 'GET' }
makeRequest(obj.method); // string is not assignable to 'POST' | 'GET'

// case 2
const obj2 = { method: 'GET' } as const
makeRequest(obj2.method); // OK

// case 3
const obj3 = { method: 'GET' as 'GET' }
makeRequest(obj3.method); // OK

// case 4
const obj4 = { method: 'GET' }
makeRequest(obj4.method  as 'GET'); // OK
