class Queue {
  constructor() {
    this.list = [];
  }
  enqueue(letter) {
    return this.list.push(letter);
  }
  dequeue() {
    return this.list.shift();
  }
  front() {
    return this.list[0];
  }
  isEmpty() {
    if (this.list.length === 0) {
      return true;
    } else {
      return false;
    }
  }
}
class PostOffice {
  constructor() {
    this.listOfLetters = new Queue();
    setInterval(async () => {
      console.log("sending..");
      if (this.listOfLetters.isEmpty()) {
        return console.log("All letters have been sent");
      }
      try {
        let data = await this.sendLetter(this.listOfLetters.front());
        if (data.receiver !== data.sender) {
          data.receiver.acceptLetter(data);
        } else {
          throw new Error("attempted auto send");
        }
      } catch (error) {
        console.log(error);
      }
      this.listOfLetters.dequeue();
    }, 10000);
  }
  addLetter(letter) {
    this.listOfLetters.enqueue(letter);
  }
  sendLetter(letter) {
    return new Promise((resolve, reject) => {
      if (Math.random() > 0.1) {
        setTimeout(() => {
          resolve(letter);
        }, 3000);
      } else {
        reject(Error("We lost the letter!"));
      }
    });
  }
}

class Customer {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  acceptLetter(letter) {
    return console.log(
      "This letter was sent by " +
        letter.sender.firstName +
        " " +
        letter.sender.lastName +
        " and its contents are:\n" +
        letter.content
    );
  }
}
class Letter {
  constructor(content) {
    this.sender = new Customer();
    this.receiver = new Customer();
    this.content = content;
  }
}

let PostaSrbije = new PostOffice();
let person1 = new Customer("Marko", "Markovic");
let person2 = new Customer("Ivan", "Ivanovic");

let letter1 = new Letter("Hello there!");
let letter2 = new Letter("Hello again!");
let letter3 = new Letter("Mailing this to myself");
letter1.sender = person1;
letter1.receiver = person2;
letter2.sender = person2;
letter2.receiver = person1;
letter3.sender = person1;
letter3.receiver = person1;
// console.log(letter1);
// console.log(letter2);

// person2.acceptLetter(letter1);
PostaSrbije.addLetter(letter1);
PostaSrbije.addLetter(letter2);
PostaSrbije.addLetter(letter3);
