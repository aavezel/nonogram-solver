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
});