const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

let browser, page; // Declare reusable variables
let clientUrl = 'http://localhost:5500/'

function fakeResponse(data){
    return {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
}

let testMessages = {
    1: {
        author: 'Pesho',
        content: 'My message'
    },
    2: {
        author: 'George',
        content: 'George message'
    }
}

let testCreateMessage = {
    3: {
        author: 'Ivan',
        content: 'Ivan message',
        _id: 3
    },
}

describe('E2E tests', async () => {
    // before(async () => { browser = await chromium.launch({
    //     headless: false,
    //     slowMo: 1000
    //     }); 
    // });

    before(async () => { browser = await chromium.launch(); });
    after(async () => { await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });

    describe('load messages', () => {
        it('should call server', async() => {
            await page.route('**/jsonstore/messenger', route => {
                route.fulfill(fakeResponse(testMessages))
            });
            
            await page.goto(clientUrl);

            const [response] = await Promise.all([
                page.waitForResponse('**/jsonstore/messenger'), 
                page.click('#refresh')
            ]);
            let result = await response.json();
            expect(result).eql(testMessages);

        });

        it('should show data in textArea', async() => {
            await page.route('**/jsonstore/messenger', route => {
                route.fulfill(fakeResponse(testMessages))
            });
            
            await page.goto(clientUrl);

            const [response] = await Promise.all([
                page.waitForResponse('**/jsonstore/messenger'), 
                page.click('#refresh')
            ]);
            let textAreaText = await page.$eval('#messages', (textArea) => textArea.value);
            let text = Object.values(testMessages)
                .map(x => `${x.author}: ${x.content}`)
                .join('\n');
            expect(textAreaText).eql(text);
        });
    });

    describe('create message', () => {
        it('should call server with correct data', async() => {
            let requestData = undefined;
            let expected = {
                author: 'Ivan',
                content: 'Ivan message',
            }

            await page.route('**/jsonstore/messenger', (route, request) => {
                if(request.method().toLowerCase()==='post'){
                    requestData = request.postData()
                    route.fulfill(fakeResponse(testCreateMessage))
                }
        
            });
            
            await page.goto(clientUrl);
            await page.fill('#author', expected.author);
            await page.fill('#content', expected.content);

            const [response] = await Promise.all([
                page.waitForResponse('**/jsonstore/messenger'), 
                page.click('#submit')
            ]);


            let result = JSON.parse(requestData);
            expect(result).to.eql(expected);

        });

        it('should clear inputs', async() => {
            let requestData = undefined;
            let expected = {
                author: 'Ivan',
                content: 'Ivan message',
            }

            await page.route('**/jsonstore/messenger', (route, request) => {
                if(request.method().toLowerCase()==='post'){
                    requestData = request.postData()
                    route.fulfill(fakeResponse(testCreateMessage))
                }
        
            });
            
            await page.goto(clientUrl);
            await page.fill('#author', expected.author);
            await page.fill('#content', expected.content);

            const [response] = await Promise.all([
                page.waitForResponse('**/jsonstore/messenger'), 
                page.click('#submit')
            ]);

            let authorInput = await page.$eval('#author', a => a.value);
            let contentInput = await page.$eval('#content', a => a.value)


            expect(authorInput).to.equal('');
            expect(contentInput).to.equal('');

        });

    });
});