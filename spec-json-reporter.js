var fs = require('fs');

class JSONReporter {

    constructor(path) {
        this.path = path;
        this.jasmineTestsStarted = null;
        this.JSONObj = {};
        this.openFileSync(this.path);
    }

    openFileSync(path) {
        fs.openSync(path, 'w', (err, fd) => {
            if(err) throw err;            
        });
    }

    log(string) {
        fs.appendFile(this.path, string, (err) => {
            if(err) throw err
        })
    }

    logSync(string) {
        fs.appendFileSync(this.path, string, (err) => {
            if(err) throw err
        })
    }

    jasmineStarted(jasmine) {
        this.jasmineTestsStarted = new Date();
        this.log('//--------------------------------\n'+
                 '//     Begin of tests Run         \n'+
                 '//--------------------------------\n');
        this.log('//Started Executing test cases @ ' + this.jasmineTestsStarted.toLocaleString());
        this.log('\n//Total specs defined = ' + jasmine.totalSpecsDefined +'\n');
    }

    suiteStarted(suite) {
        this.JSONObj[suite.description.trim()] = []
    }

    specStarted(spec) {
       
    }

    specDone(spec) {
        var suite = spec.fullName.replace(spec.description, '').trim();     
        this.JSONObj[suite].push(spec);
    }

    jasmineDone() {
        let totalTime = (new Date() - this.jasmineTestsStarted) / 1000;
        this.logSync(JSON.stringify(this.JSONObj, null, 2)+'\n');
        this.log('//--------------------------------\n'+
                 '//     End of tests Run           \n'+
                 '//--------------------------------\n');
        this.log('//Finshed Executing test cases @ ' + new Date().toLocaleString());
        this.log('\n//Tota time taken = ' + totalTime);
   
    }
}

module.exports = exports = JSONReporter