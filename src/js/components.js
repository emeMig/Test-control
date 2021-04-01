import { Test } from "./class";
import { testList1 } from "../index.js"

// Referencias HTML
const divTestList = document.querySelector ('.test-list');
const textInput = document.querySelector('.new-test');
const deleteAll = document.querySelector('.clear-completed');
const filters = document.querySelector('.filters');
const selectedFilter = document.querySelectorAll('.filtro'); 

export const createTestHTML = ( test ) => {
    const htmlTest = `
    <li class="${ test.complete ? 'completed' : ''  }" data-id="${ test.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ test.complete ? 'checked' : '' }>
            <label>${ test.testName }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>
    `

    const div = document.createElement('div');
    div.innerHTML = htmlTest;

    divTestList.append( div.firstElementChild );
    return div.firstElementChild;

}

// EventListeners

textInput.addEventListener('keyup', ( e ) => {
    if ( e.keyCode === 13 && textInput.value.length > 0) {
        const newTest = new Test(textInput.value);
        testList1.insertTest( newTest );
        createTestHTML( newTest );
        textInput.value = '';
    }
});

divTestList.addEventListener('click', (e) => {
    const clickedIn = e.target.localName; // input, label, button 
    const testElement = e.target.parentElement.parentElement; // el <li> donde se hace click
    const testId = testElement.getAttribute('data-id');

    if ( clickedIn.includes('input')) { // click en check
        testList1.toggleComplete( testId );
        testElement.classList.toggle('completed');
    }
    else if ( clickedIn.includes('button'))  { // click en el delete
        testList1.deleteTest ( testId );
        divTestList.removeChild ( testElement);
    }  
    else if ( clickedIn.includes('label'))  { // click en el label

        console.log(`launch JEST on location: ${ testId }`);
        // launch JEST test plugin 

    }
});

deleteAll.addEventListener('click', () => {
    testList1.deleteCompleted(); 
    for (let i = divTestList.children.length - 1 ; i >= 0; i--) {
        const elem = divTestList.children[i];
        if (elem.classList.contains('completed'))
            divTestList.removeChild(elem);
    }
})

filters.addEventListener('click', (e) => {
    const filterTarget = e.target.text;
    if (!filterTarget) return;

    selectedFilter.forEach( elem => elem.classList.remove('selected')); 
    e.target.classList.add('selected');

    for ( let elem of divTestList.children) {     
        elem.classList.remove('hidden'); // esto remueve .hidden si se filtra por tests 
        const completed = elem.classList.contains('completed');
        switch (filterTarget) {
            case 'Pendientes':
                if (completed ) {
                    elem.classList.add('hidden');
                }
            break;
            case 'Completados':
                if (!completed) {
                    elem.classList.add('hidden');
                }    
        }
    }   
})