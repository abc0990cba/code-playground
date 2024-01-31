db.universities.insert([
  { country : 'Spain', city : 'Salamanca', name : 'USAL' },
  { country : 'Spain', city : 'Madrid', name : 'UPSA' },
  { country : 'France', city : 'Paris', name : 'USAL' }
])

db.universities.aggregate([
  { $match : { country : 'Spain' } }
])
//  Output:
// { "_id" : ObjectId("65bab0c44f1271e58c1ad68c"), "country" : "Spain", "city" : "Salamanca", "name" : "USAL" }
// { "_id" : ObjectId("65bab0c44f1271e58c1ad68d"), "country" : "Spain", "city" : "Madrid", "name" : "UPSA" }

db.universities.aggregate([
  { $match : { name : 'USAL' } }
])
//  Output:
// { "_id" : ObjectId("65bab0c44f1271e58c1ad68c"), "country" : "Spain", "city" : "Salamanca", "name" : "USAL" }
// { "_id" : ObjectId("65bab0c44f1271e58c1ad68e"), "country" : "France", "city" : "Paris", "name" : "USAL" }
