#!/usr/bin/env node
const {log, readLines, split} = require("./common");

/* * * * * * * *
 * * DAY  24 * *
 * * * * * * * */

let lines = readLines('../inputs/24.txt', split(/[@,]\s*/, s => BigInt(s)));

const paths = lines.map(([x, y, z, vx, vy, vz]) => ({p: [x, y, z], v: [vx, vy, vz]}));

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function findCore(from, to) {
    let counter = 0;
    for (let i = 0; i < paths.length; i++) {
        const {p: [a, e], v: [b, f]} = paths[i];
        for (let j = i + 1; j < paths.length; j++) {
            if (i === j) continue;
            const {p: [c, g], v: [d, h]} = paths[j];
            let sNenner = h * b - f * d;
            let tNenner = f * d - h * b;
            if (sNenner === 0n || tNenner === 0n) { // parallel
                continue;
            }
            let sZaehler = e * b - g * b + f * c - f * a;
            let tZaehler = g * d - e * d + h * a - h * c;
            if (sNenner < 0n) {
                sNenner = -sNenner;
                sZaehler = -sZaehler;
            }
            if (tNenner < 0n) {
                tNenner = -tNenner;
                tZaehler = -tZaehler;
            }
            if (sNenner !== tNenner) {
                throw new Error(`math is wrong with ${i}, ${j}`)
            }
            if (sZaehler >= 0n && tZaehler >= 0n) {
                const xZaehlerT = a * tNenner + tZaehler * b;
                const xZaehlerS = c * sNenner + sZaehler * d;
                const yZaehlerT = e * tNenner + tZaehler * f;
                const yZaehlerS = g * sNenner + sZaehler * h;

                if (xZaehlerS !== xZaehlerT || yZaehlerS !== yZaehlerT) {
                    log("math is wrong", i, paths[i], j, paths[j], `${a}*${tNenner}+${tZaehler}*${b} (${xZaehlerT}) =?= ${c}*${sNenner}+${sZaehler}*${d} (${xZaehlerS})`, `${e}*${tNenner}+${tZaehler}*${f} (${yZaehlerT}) =?= ${g}*${sNenner}+${sZaehler}*${h} (${yZaehlerS})`)
                    throw new Error(`math is wrong with ${i} ${paths[i]}, ${j} ${paths[j]}`)
                }
                const fromZaehler = from * sNenner;
                const toZaehler = to * sNenner;

                if ((fromZaehler <= xZaehlerS && toZaehler >= xZaehlerS)
                    && (fromZaehler <= yZaehlerS && toZaehler >= yZaehlerS)) {
                    //log('Schnittpunkt', i, j, paths[i], '@', sZaehler, sNenner, sZaehler / sNenner, 'mit', paths[j], '@', tZaehler, tNenner, tZaehler / tNenner, '')
                    counter++;
                }
            }
        }
    }
    return counter;
}

//log('solution #1: ', findCore(200000000000000n, 400000000000000n));
log('solution #1: ', findCore(7n, 27n));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function makeEquation() {
    let vars = 'abc';
    let equations = [];
    const vec = v => `{{${v.join('},{')}}}`;
    let vP = [...'xyz'].map(x => `Subscript[p,${x}]`);
    let vV = [...'xyz'].map(x => `Subscript[v,${x}]`);

    for (let i = 0; i < 3; i++) {
        const {p, v} = paths[i];
        equations.push(`${vec(p)}+${vec(v)}*${vars[i]}=${vec(vP)}+${vars[i]}*${vec(vV)}`);
        equations.push(`${vars[i]}>0`);
    }
    return "solve " + equations.join('\\(44) ');
}

const url = "https://www.wolframalpha.com/input?i2d=true&i=";
log('solution #2: ', 'check p_x+p_y+p_z from', url + encodeURIComponent(makeEquation()));
