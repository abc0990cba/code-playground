db.zipcodes.insertMany([
  { "_id" : "01001", "city" : "AGAWAM", "loc" : [ -72.622739, 42.070206 ], "pop" : 15338, "state" : "MA" },
  { "_id" : "01002", "city" : "CUSHMAN", "loc" : [ -72.51564999999999, 42.377017 ], "pop" : 36963, "state" : "MA" },
  { "_id" : "01005", "city" : "BARRE", "loc" : [ -72.10835400000001, 42.409698 ], "pop" : 4546, "state" : "MA" },
  
  { "_id" : "44044", "city" : "GRAFTON", "loc" : [ -82.043098, 41.28537 ], "pop" : 12127, "state" : "OH" },
  { "_id" : "44046", "city" : "HUNTSBURG", "loc" : [ -81.05718299999999, 41.530559 ], "pop" : 1804, "state" : "OH" },
  { "_id" : "44047", "city" : "JEFFERSON", "loc" : [ -80.75616599999999, 41.733513 ], "pop" : 8242, "state" : "OH" },
  
  { "_id" : "75571", "city" : "OMAHA", "loc" : [ -94.763944, 33.180794 ], "pop" : 1791, "state" : "TX" },
  { "_id" : "75572", "city" : "QUEEN CITY", "loc" : [ -94.154825, 33.18736 ], "pop" : 4376, "state" : "TX" },
  { "_id" : "75574", "city" : "SIMMS", "loc" : [ -94.60386200000001, 33.498727 ], "pop" : 3617, "state" : "TX" }

])


db.zipcodes.aggregate([
   { $group: { _id: "$state", totalPop: { $sum: "$pop" } } },
])
// Output:
// { "_id" : "MA", "totalPop" : 56847 }
// { "_id" : "OH", "totalPop" : 22173 }
// { "_id" : "TX", "totalPop" : 9784 }

db.zipcodes.aggregate([
  { $group: { _id: "$state", totalPop: { $sum: "$pop" } } },
  { $match: { totalPop: { $gte: 10000 } } }
])
// Output:
// { "_id" : "MA", "totalPop" : 56847 }
// { "_id" : "OH", "totalPop" : 22173 }

db.zipcodes.aggregate([
   { $group: { _id: { state: "$state", city: "$city" }, pop: { $sum: "$pop" } } }
])
// Output:
// { "_id" : { "state" : "MA", "city" : "AGAWAM" }, "pop" : 15338 }
// { "_id" : { "state" : "OH", "city" : "HUNTSBURG" }, "pop" : 1804 }
// { "_id" : { "state" : "OH", "city" : "JEFFERSON" }, "pop" : 8242 }
// { "_id" : { "state" : "OH", "city" : "GRAFTON" }, "pop" : 12127 }
// { "_id" : { "state" : "TX", "city" : "SIMMS" }, "pop" : 3617 }
// { "_id" : { "state" : "TX", "city" : "QUEEN CITY" }, "pop" : 4376 }
// { "_id" : { "state" : "TX", "city" : "OMAHA" }, "pop" : 1791 }
// { "_id" : { "state" : "MA", "city" : "CUSHMAN" }, "pop" : 36963 }
// { "_id" : { "state" : "MA", "city" : "BARRE" }, "pop" : 4546 }

db.zipcodes.aggregate( [
  { $group: { _id: { state: "$state", city: "$city" }, pop: { $sum: "$pop" } } },
  { $group: { _id: "$_id.state", avgCityPop: { $avg: "$pop" } } }
] )
// Output:
// { "_id" : "OH", "avgCityPop" : 7391 }
// { "_id" : "MA", "avgCityPop" : 18949 }
// { "_id" : "TX", "avgCityPop" : 3261.3333333333335 }
