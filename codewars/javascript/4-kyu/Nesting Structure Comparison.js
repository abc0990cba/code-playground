// 4 kyu
// Nesting Structure Comparison
// https://www.codewars.com/kata/520446778469526ec0000001

// Task description
// Complete the function/method (depending on the language) to return true/True when its argument
// is an array that has the same nesting structures and same corresponding length of nested arrays as the first array.

// For example:
// should return true
// [ 1, 1, 1 ].sameStructureAs( [ 2, 2, 2 ] );          
// [ 1, [ 1, 1 ] ].sameStructureAs( [ 2, [ 2, 2 ] ] );  

// should return false 
// [ 1, [ 1, 1 ] ].sameStructureAs( [ [ 2, 2 ], 2 ] );  
// [ 1, [ 1, 1 ] ].sameStructureAs( [ [ 2 ], 2 ] );  

// should return true
// [ [ [ ], [ ] ] ].sameStructureAs( [ [ [ ], [ ] ] ] ); 

// should return false
// [ [ [ ], [ ] ] ].sameStructureAs( [ [ 1, 1 ] ] );    

// Solution 
Array.prototype.sameStructureAs = function (other) {
    const isElementArray = (elem, i) => Array.isArray(elem)
        ? elem.sameStructureAs(other[i])
        : true;

    return (
        this.length === other.length
            ? this.every(isElementArray)
            : false
    );
};
