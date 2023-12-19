#!/usr/bin/env node
const {log, readLines, sum} = require("./common");

/* * * * * * * *
 * * DAY  19 * *
 * * * * * * * */

let lines = readLines('../inputs/19.txt');

let rules = {};
for (let rule; (rule = lines.shift());) {
    const [name, ...ops] = rule.split(/[{,:}]/).filter(x => x);
    const elseOp = ops.pop();
    const checks = [];
    for (let i = 0; i < ops.length; i += 2) {
        const [v, cmp, ...num] = [...ops[i]];
        checks.push({v, cmp, num: Number(num.join('')), result: ops[i + 1]});
    }
    rules[name] = {checks, elseOp};
}
const inputs = lines.map(l => eval('(' + l.replaceAll('=', ':') + ')'));

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function evaluate(rule, input) {
    if (rule === 'A') {
        const {x, m, a, s} = input;
        return x + m + a + s;
    }
    if (rule === 'R') {
        return 0;
    }
    for (let {v, cmp, num, result} of rules[rule].checks) {
        if (cmp === '<' && input[v] < num) {
            return evaluate(result, input);
        }
        if (cmp === '>' && input[v] > num) {
            return evaluate(result, input);
        }
    }
    return evaluate(rules[rule].elseOp, input);
}

log('solution #1: ', sum(inputs.map(input => evaluate('in', input))));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */


let acceptedRanges = [];

function checkRange(rule, range) {
    if (rule === 'R') {
        return;
    }
    if (rule === 'A') {
        acceptedRanges.push(range);
        return;
    }
    for (let {v, cmp, num, result} of rules[rule].checks) {
        const [from, to] = range[v];
        if (cmp === '<') {
            if (to < num) {
                checkRange(result, range);
                return;
            }
            if (from >= num) {
                continue;
            }
            checkRange(result, {...range, [v]: [from, num - 1]});
            range[v] = [num, to];
        } else {
            if (from > num) {
                checkRange(result, range);
                return;
            }
            if (to <= num) {
                continue;
            }
            checkRange(result, {...range, [v]: [num + 1, to]});
            range[v] = [from, num];
        }
    }
    checkRange(rules[rule].elseOp, range);
}

checkRange("in", {x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000]});

log('solution #2: ', sum(acceptedRanges.map(({x, m, a, s}) =>
    (x[1] - x[0] + 1) * (m[1] - m[0] + 1) * (a[1] - a[0] + 1) * (s[1] - s[0] + 1)
)));
