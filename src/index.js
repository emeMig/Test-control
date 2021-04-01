import { TestList } from './js/class';
import { createTestHTML } from './js/components.js';
import './styles.css';

export const testList1 = new TestList();
testList1.tests.forEach ( createTestHTML );

console.table(testList1.tests);