"use strict"

const writeResult = function(r) {
    document.querySelector("#result").value = r;
};

function Calculator(op1ID, op2ID, opID) {
    this.op1 = document.querySelector(op1ID);
    this.op2 = document.querySelector(op2ID);
    this.op = document.querySelector(opID);

    this.bind = function(btnCalc) {
        document.querySelector(btnCalc).onclick = () => {
            this.calculate();
        }
    };
    this.readValues = function() {
        let values = {};
        values["op1"] = Number(this.op1.value);
        values["op2"] = Number(this.op2.value);
        values["operand"] = this.op.value;
        return values;
    };
    this.calculate = function() {
        let values = this.readValues();
        let obj = {
            op1 : values.op1,
            op2 : values.op2,
            operator : encodeURIComponent(values.operand)
        };

        sendRequest('GET', 
                    'http://localhost:1000/', 
                    obj, 
                    writeResult
        );
    };
}

let calc = new Calculator("#operand1", "#operand2", "#operator");
calc.bind("#btnCalculate");

const sendRequest = (method, urlP, paramObj, response) => {
    let request = new XMLHttpRequest();

    if (method === 'GET' || method === 'DELETE') {
        let url = new URL(urlP);
        for (let key in paramObj) {
            url.searchParams.set(key, paramObj[key]);
        }

        request.open(method, url, true);
        request.send();

    }else if (method === 'PUT' || method === 'POST') {
        request.open(method, urlP, true);
        let json = JSON.stringify(paramObj);

        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        request.send(json);
    }
    request.onload = function() {
        if (request.status != 200) {
            alert(`Error ${request.status}: ${request.statusText}`);
        }else {
            response(request.response);
        }
    }
}