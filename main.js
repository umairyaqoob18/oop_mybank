import inquirer from 'inquirer';
class BankAccount {
    accountnumber;
    balance;
    constructor(accountnumber, balance) {
        this.accountnumber = accountnumber;
        this.balance = balance;
    }
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`with of$${amount}sucessful remaning balce is${this.balance}`);
        }
        else {
            console.log("insuffient balance");
        }
    }
    deposit(amount) {
        if (amount > 100) {
            amount -= 1;
        }
        this.balance += amount;
        console.log(`deposit of${amount}sucessfull remaning balance${this.balance}`);
    }
    checkbalance() {
        console.log(`current balance is${this.balance}`);
    }
}
class customer {
    firstname;
    lastname;
    age;
    gender;
    mobilenumber;
    account;
    constructor(firstname, lastname, age, gender, mobilenumber, account) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this.gender = gender;
        this.mobilenumber = mobilenumber;
        this.account
            = account;
    }
}
const account = [
    new BankAccount(2700, 1000),
    new BankAccount(2701, 6000),
    new BankAccount(2702, 9000)
];
const customers = [
    new customer("hamza", "amin", 23, "male", 27802700, account[0]),
    new customer("umair", "yaqoob", 32, "male", 27802701, account[1]),
    new customer("bilal", "manzoor", 30, "male", 27802702, account[2])
];
async function services() {
    do {
        const accountNumberinput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "enter your account number:"
        });
        const customer = customers.find(customer => customer.account.accountnumber === accountNumberinput.accountNumber);
        if (customer) {
            console.log(`welcome ,${customer.firstname}${customer.lastname}`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "select an operation",
                    choices: ["deposit", "withdraw", "check balance", "exit"]
                }]);
            switch (ans.select) {
                case "deposit":
                    const depositamount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "enter the amount to deposit:"
                    });
                    customer.account.deposit(depositamount.amount);
                    break;
                case "withdraw":
                    const withdrawamount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "enter the amount to withdraw:"
                    });
                    customer.account.withdraw(withdrawamount.amount);
                    break;
                case "check balance":
                    customer.account.checkbalance();
                    break;
                case "exit":
                    console.log("exiting bank program ");
                    console.log("thanks for using bank services");
                    return;
            }
        }
        else {
            console.log("invalid account number");
        }
    } while (true);
}
services();
