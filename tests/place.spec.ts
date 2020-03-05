import {CellSolve, showRowDef} from "../src/common";
import {RowSolver} from "../src/RowSolver";
import { PlaceSolver } from "../src/PlaceSolver";

describe("test place solver", () => {

    it("constructor", () => {
        const p1 = new PlaceSolver([[1,1], [3], [1,1]], [[3], [1], [3]]);
        expect(p1.rows.length).toEqual(6);
        expect(p1.getStringPlace()).toEqual("*?*\n***\n*?*");
    });

    it("solve", () => {
        const p1 = new PlaceSolver([[1,1], [3], [1,1]], [[3], [1], [3]]);
        p1.solve()
        expect(p1.getStringPlace()).toEqual("*x*\n***\n*x*");
    });

    it("bigsolve", () => {
        const p1 = new PlaceSolver(
            [[2], [1, 2], [2, 1, 1, 3], [2, 1, 2, 3], [3, 3, 3], [3, 3, 1, 1, 1], [1, 1, 1, 3, 1], [1, 3], [5], [2, 3], [6, 1], [2, 4, 2], [4, 7], [7, 5], [6, 2, 2]],
            [[1,2], [2,3], [5,3], [4,1,4], [1,1,6], [1,1,1,2], [8,1], [10,1], [10,1], [2,1,3], [1,1,2], [5,3], [6,3], [3,1,3], [1,3]]
        );
        
        p1.solve()        
        expect(p1.getStringPlace()).toEqual("xxxxxxxxxx**xxx\nxxxxxxxxx*x**xx\nxxx**xx*x*x***x\nxx**x*x**xx***x\nx***xx***xx***x\nx***xx***x*x*x*\n*x*x*x***xxx*xx\nxx*xxx***xxxxxx\nxxxxx*****xxxxx\nxxx**x***xxxxxx\nxxxx******xxx*x\nxxx**x****x**xx\nx****xxx*******\n*******xxx*****\n******x**xxxx**");
    });


});
