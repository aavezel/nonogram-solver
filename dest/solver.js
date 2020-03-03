define("RowSolver", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CellSolve;
    (function (CellSolve) {
        CellSolve[CellSolve["Blank"] = 0] = "Blank";
        CellSolve[CellSolve["Colored"] = 1] = "Colored";
        CellSolve[CellSolve["Unknown"] = 2] = "Unknown";
    })(CellSolve || (CellSolve = {}));
    class RowSolver {
        constructor(len, measures) {
            this.solutions = [];
            this.is_solved = false;
            this.row_len = len;
            this.measures = measures;
            this.solved = new Array(this.row_len).fill(CellSolve.Unknown);
            this.solutions = null;
            if (measures.length == 0) {
                this.is_solved = true;
                this.solved = new Array(this.row_len).fill(CellSolve.Blank);
                this.solutions = [this.solved];
            }
            if (measures.length == 1 && measures[0] == len) {
                this.is_solved = true;
                this.solved = new Array(this.row_len).fill(CellSolve.Colored);
                this.solutions = [this.solved];
            }
        }
        solve() {
            let solutions = [];
            for (const sol of RowSolver.fill_array(this.row_len, this.measures)) {
                if (RowSolver.check_solution(this.solved, sol)) {
                    solutions.push(sol);
                }
            }
            this.solutions = solutions;
            if (solutions.length == 0) {
                throw "Solutions not found";
            }
            else if (solutions.length == 1) {
                this.solved = solutions[0];
                this.is_solved = true;
            }
            else {
                this.solved = RowSolver.join_solutions(solutions);
            }
        }
        static check_solution(solved, solutions) {
            return solved.every((solv, idx) => {
                if (solv == CellSolve.Unknown)
                    return true;
                return solv == solutions[idx];
            });
        }
        static *fill_array(len, measures) {
            if (measures.length == 0) {
                yield new Array(len).fill(CellSolve.Blank);
                return;
            }
            if (measures.length == 1 && measures[0] == len) {
                yield new Array(len).fill(CellSolve.Colored);
                return;
            }
            const [first, ...next] = measures;
            const need_next = RowSolver.measures_length(next);
            const has_next = need_next > 0;
            const place = len - (first + need_next) - (has_next ? 1 : 0);
            for (let i = 0; i <= place; i++) {
                let arr = [...Array(i).fill(CellSolve.Blank), ...Array(first).fill(CellSolve.Colored)];
                if (has_next)
                    arr.push(CellSolve.Blank);
                const next_len = len - arr.length;
                for (let append of RowSolver.fill_array(next_len, next)) {
                    yield [...arr, ...append];
                }
            }
        }
        static measures_length(measures) {
            if (measures.length == 0)
                return 0;
            return measures.reduce((p, e) => p + e, 0) + (measures.length - 1);
        }
        static join_solutions(solutions) {
            if (solutions.length == 0) {
                return [];
            }
            if (solutions.length == 1) {
                return solutions[1];
            }
            let [first, ...next] = solutions;
            return first.map((val, idx) => next.every(nxt => nxt[idx] == val) ? val : CellSolve.Unknown);
        }
        getWeight() {
            if (this.measures.length == 0)
                return;
            return RowSolver.measures_length(this.measures);
        }
        show() {
            return {
                solved: this.solved.map(e => "x*?"[e]).join(""),
                solutions: this.solutions.length,
                is_solved: this.is_solved
            };
        }
    }
    exports.default = RowSolver;
});
