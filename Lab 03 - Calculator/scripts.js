let res = document.getElementById("result");
// Function to clear screen
function clearScreen() {
    res.value = "";
}
// Function to clear screen
function backspace() {
    res.value = res.value.substr(0,res.value.length-1);
}

// Adds the value cliked on to the array. and displays it on the the input field
function display(value) {
    res.value += value;
}

// Final Function
function calculate() { 
    let exp = res.value;
    exp = exp.replace(/\s/g, ''); // removes all spaces in the string
    res.value = helper(exp, 0);
}

function helper(exp, idx) {
    let stk = [];
    let sign = '+';
    let num = 0;

    for (let i = idx; i < exp.length; i++) {
        let c = exp[i];

        if (c >= '0' && c <= '9') {
            num = num * 10 + (c - '0');
        }

        if (!(c >= '0' && c <= '9') || i === exp.length - 1) {
            if (c === '(') {
                num = help(exp, i + 1);
                let l = 1, r = 0;

                for (let j = i + 1; j < exp.length; j++) {
                    if (exp[j] === ')') {
                        r++;
                        if (r === l) {
                            i = j;
                            break;
                        }
                    }
                    else if (exp[j] === '(') l++;
                }
            }
            let pre = -1;
            switch (sign) {
                case '+':
                    stk.push(num);
                    break;
                case '-':
                    stk.push(num * -1);
                    break;
                case '*':
                    pre = stk.pop();
                    stk.push(pre * num);
                    break;
                case '/':
                    pre = stk.pop();
                    stk.push(pre / num);
                    break;
            }
            sign = c;
            num = 0;
            if (c === ')') break;
        }
    }

    let ans = 0;
    while (stk.length > 0) {
        ans += stk.pop();
    }
    return ans;
}