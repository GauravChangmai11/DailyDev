const nums = [1,2,3,4,5]

const sum = nums.reduce((sum,inp)=>sum+inp)
console.log("sum of all numbers is ", sum);

const cubes = nums.map(item=>item*item*item)
console.log("cubes of all the numbers are ",cubes);

const evens = nums.filter(item=>item%2==0)
console.log("all the even numbers are ",evens);

const odds = nums.filter(item=>item%2)
console.log("all the odd numbers are ",odds);