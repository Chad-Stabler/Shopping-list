// IMPORT MODULES under test here:
// import { example } from '../example.js';

import { renderElement } from '../render-utils.js';

const test = QUnit.test;

test('test renderElement', (expect) => {
    //Arrange
    // Set up your arguments and expectations
    const expected = '<div><p>3: apples</p></div>';
    
    //Act 
    // Call the function you're testing and set the result to a const
    const actual = renderElement({ item: 'apples', qty: '3', purchased: false });

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.equal(actual.outerHTML, expected);
});
