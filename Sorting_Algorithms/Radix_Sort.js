// Time: All: O(nk), Space: O(n+k), n - length of array, k - num of digits in the largest num

// Radix sort (bucket sort and digital sort) is a non-comparative sorting algorithm that creates 
// and distributes elements into buckets according to their radix. For elements with more than 
// one significant digit, this bucketing process is repeated for each digit, while preserving 
// the ordering of the prior step, until all digits have been considered. 

function getDigit(num, i) {
  return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
}

function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function mostDigits(nums) {
  let maxDigits = 0;
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(nums[i]));
  }
  return maxDigits;
}

function radixSort(nums){
    let maxDigitCount = mostDigits(nums);
    for (let k = 0; k < maxDigitCount; k++){
        let digitBuckets = Array.from({length: 10}, () => []);
        for (let i = 0; i < nums.length; i++){
            let digit = getDigit(nums[i],k);
            digitBuckets[digit].push(nums[i]);
        }
        nums = [].concat(...digitBuckets);
    }
    return nums;
}

console.log(radixSort([23,345,5467,12,2345,9852]));
