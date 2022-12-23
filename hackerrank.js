function birthday(s, d, m) {
    // Write your code here
    let count = 0;
    for(let i = 0; i < s.length; i++){
        for(let j = i +1; j < m.length - 1;j++){
            while (j < m.length - 1){
                if(s[i] + s[j] === d){
                    count++
                }
            }
        }
        return count
    }
}