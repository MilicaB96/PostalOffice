class PostOffice {
  constructor() {
    if (this.constructor === PostOffice) {
      throw new Error("This is an abstract class");
    }
  }
}
class Customer extends PostOffice {
  constructor(firstName, lastName) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
  }
  acceptLetter(letter) {
    if (
      this.firstName === letter.receiver.firstName &&
      this.lastName === letter.receiver.lastName
    ) {
      return console.log(
        "This letter was sent by " +
          letter.sender.firstName +
          " " +
          letter.sender.lastName +
          "and its contents are:\n" +
          letter.content
      );
    } else {
      console.log("You dont have any letters from this sender");
    }
  }
}
class Letter extends PostOffice {
  constructor(sender, receiver, content) {
    super();
    this.sender = sender;
    this.receiver = receiver;
    this.content = content;
  }
}

let person1 = new Customer("Marko Markovic", "");
let person2 = new Customer("Ivan", "Ivanovic");

let letter1 = new Letter(person1, person2, "Hello there!");
console.log(letter1);
person2.acceptLetter(letter1);
