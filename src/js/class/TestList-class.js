import { Test } from './index';

export class TestList {

    constructor() {

        this.loadLS();
    }

    insertTest ( test ) {
        this.tests.push(test);
        this.saveLS();
    }

    deleteTest ( testId ) {
        this.tests = this.tests.filter( test  => test.id !== +testId );
        this.saveLS();
    
    }

    toggleComplete ( testId ) {

        for (let test of this.tests) {
            if (test.id === +testId) {
                test.complete = !test.complete;
                break;
            }
        };
        this.saveLS();
    }

    deleteCompleted() {
        this.tests = this.tests.filter( test  => !test.complete );
        this.saveLS();
    }

    saveLS(){
        localStorage.setItem('tests', JSON.stringify( this.tests ));
    }

    loadLS(){
        this.tests = localStorage.getItem('tests') 
            ?  JSON.parse( localStorage.getItem('tests') ) 
            : [];  
        
        this.tests = this.tests.map ( Test.fromJSON );    
    }

}