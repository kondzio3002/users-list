const consola = require('consola');
const inquirer = require('inquirer');

enum Action {
  List = 'list',
  Add = 'add',
  Remove = 'remove',
  Quit = 'quit'
}

type InquirerAnswers = {
  action: Action
}

const startApp = async () => {
  inquirer.prompt([{
    name: 'action',
    type: 'input',
    message: 'How can I help you?',
  }]).then((answers: InquirerAnswers) => {
    console.log("Chosen action: " + answers.action);
    startApp();
    if (answers.action === "quit") {
      return;
    }
  });
}

enum MessageVariant  {
  Success = 'success',
  Error = 'error',
  Info = 'info'
}

class Message {
  constructor (private content: string) {}

  show() {
    console.log(this.content);
  }

  capitalize() {
    console.log(this.content.charAt(0).toUpperCase() + this.content.slice(1).toLowerCase());
  }

  toUpperCase() {
    console.log(this.content.toUpperCase());
  }

  toLowerCase() {
    console.log(this.content.toLowerCase());
  }

  static showColorized(variant: MessageVariant, text: string) {
    if (variant === 'success') {
      consola.success(text)
    }
    else if (variant === 'error') {
      consola.error(text)
    }
    else if (variant === 'info') {
      consola.info(text)
    }
  }
}

startApp();