import {RowSolver, showRowDef} from "../src/RowSolver";

describe("test row solver", () => {
    it("fill none", () => {
        const r = new RowSolver(5,[]);
        expect(r.row_len).toEqual(5);
        expect(r.measures).toEqual([]);        

        expect(r.show()).toEqual({
            solved: "xxxxx",
            solutions: 1,
            is_solved: true
        });
    });    
    it("fill all", () => {
        const r = new RowSolver(5,[5]);
        expect(r.row_len).toEqual(5);
        expect(r.measures).toEqual([5]);        

        expect(r.show()).toEqual({
            solved: "*****",
            solutions: 1,
            is_solved: true
        });
    });
    it("fill all and solve", () => {
        const r = new RowSolver(5,[5]);
        expect(r.row_len).toEqual(5);
        expect(r.measures).toEqual([5]);        
        r.solve();
        expect(r.show()).toEqual({
            solved: "*****",
            solutions: 1,
            is_solved: true
        });
    });
    it("fill some", () => {
        const r = new RowSolver(5,[4]);
        expect(r.row_len).toEqual(5);
        expect(r.measures).toEqual([4]);
        expect(r.show()).toEqual(jasmine.objectContaining({
            solved: "?????",
            solutions: 0,
            is_solved: false
        }));
        r.solve()
        expect(r.show()).toEqual(jasmine.objectContaining({
            solved: "?***?",
            solutions: 2,
            is_solved: false
        }));
    });    
    it("fill double", () => {
        const r = new RowSolver(5,[1,2]);
        expect(r.show()).toEqual({
            solved: "?????",
            solutions: 0,
            is_solved: false
        });
        r.solve()
        expect(r.show()).toEqual({
            solved: "???*?",
            solutions: 3,
            is_solved: false
        });
    });
    it("not found solve", () => {
        const r = new RowSolver(5,[6]);
        expect(r.show()).toEqual({
            solved: "?????",
            solutions: 0,
            is_solved: false
        });
        expect(() => r.solve()).toThrow("Solutions not found")
    });
    it("not 1 solve", () => {
        const r = new RowSolver(5,[3, 1]);
        expect(r.show()).toEqual({
            solved: "?????",
            solutions: 0,
            is_solved: false
        });
        r.solve();
        expect(r.show()).toEqual({
            solved: "***x*",
            solutions: 1,
            is_solved: true
        });
    });    
    it("check some answer", () => {
        const r = new RowSolver(5,[2, 1]);
        expect(r.show()).toEqual({
            solved: "?????",
            solutions: 0,
            is_solved: false
        });
        r.solved = [2,2,0,2,2]
        r.solve();
        expect(r.show()).toEqual({
            solved: "**x??",
            solutions: 2,
            is_solved: false
        });
    });
    it("check weight", () => {
        const r1 = new RowSolver(5,[5]);  // full colored
        expect(r1.getWeight()).toBe(5);
        const r2 = new RowSolver(5,[2,1]);
        expect(r2.getWeight()).toBe(4);
        const r3 = new RowSolver(5,[1,1]);
        expect(r3.getWeight()).toBe(3);
        const r4 = new RowSolver(5,[2]);
        expect(r4.getWeight()).toBe(2);
        const r5 = new RowSolver(5,[1]);
        expect(r5.getWeight()).toBe(1);
        const r0 = new RowSolver(5,[]); // full blank
        expect(r0.getWeight()).toBe(5);
    });        
});