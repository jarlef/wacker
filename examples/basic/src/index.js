class Person {
    constructor(firstName) {
        this.firstName = firstName;
    }

    sayHello() {
        console.log(`It's-A Me, ${this.firstName}!!`)
    }
}

const person = new Person('Mario');
person.sayHello();