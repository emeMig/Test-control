export class Test {

    // método estático para parsear como instancias los arrays devueltos del LS
    static fromJSON({ testName, id, complete, creationTime}) {
        const parsed = new Test(testName);
        parsed.id = id;
        parsed.complete = complete;
        parsed.creationTime = creationTime;

        return parsed;
    }

    constructor ( testName ) {
        this.testName = testName;
        this.id = new Date().getTime(); // current ms
        this.complete = false;
        this.creationTime = new Date();
    }

}