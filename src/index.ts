const consola = require('consola');
const inquirer = require('inquirer');

enum Action {
  List = 'list',
  Add = 'add',
  Edit = 'edit',
  Remove = 'remove',
  Quit = 'quit'
}

type InquirerAnswers = {
  action: Action
}

const startApp = () => {
  inquirer.prompt([{
    name: 'action',
    type: 'input',
    message: 'How can I help you?',
  }]).then(async (answers: InquirerAnswers) => {
    switch (answers.action) {
      case Action.List:
        users.showAll();
        break;
      case Action.Add:
        const user = await inquirer.prompt([{
          name: 'name',
          type: 'input',
          message: 'Enter name',
        }, {
          name: 'age',
          type: 'number',
          message: 'Enter age',
        }]);
        users.add(user);
        break;
      case Action.Edit:
        const userEdit = await inquirer.prompt([{
          name: 'name',
          type: 'input',
          message: 'Find user',
        }]);
        const newDataUser = await inquirer.prompt([{
            name: 'name',
            type: 'input',
            message: 'Enter name',
          }, {
            name: 'age',
            type: 'number',
            message: 'Enter age',
        }]);
        users.edit(userEdit.name, newDataUser);
        break;
      case Action.Remove:
        const name = await inquirer.prompt([{
          name: 'name',
          type: 'input',
          message: 'Enter name',
        }]);
        users.remove(name.name);
        break;
      case Action.Quit:
        Message.showColorized(MessageVariant.Info, 'Bye bye!');
        return;
      default:
        Message.showColorized(MessageVariant.Error, 'Command not found');
    }

    startApp();
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

interface User {
  name: string;
  age: number;
}

class UsersData {
  data: User[] = new Array;

  showAll() {
    Message.showColorized(MessageVariant.Info, 'Users data');
    if (this.data.length === 0) {
      console.log('No data...');
    } else {
      console.table(this.data);
    }
  }

  add(user: User) {
    if (user.age > 0 && user.name) {
      this.data.push(user);
      Message.showColorized(MessageVariant.Success, 'User has been succesfully added!');
    } else {
      Message.showColorized(MessageVariant.Error, 'Wrong data!');
    }
  }

  edit(nameUser: string, user: User) {
    const findUser = this.data.find(u => u.name === nameUser);
    if (findUser) {
      findUser.name = user.name;
      findUser.age = user.age;
      Message.showColorized(MessageVariant.Success, 'User has been succesfully edit!');
    } else {
      Message.showColorized(MessageVariant.Error, 'Wrong data');
    }
  }

  remove(nameUser: string) {
    const findUser = this.data.find(user => user.name === nameUser);
    if (findUser) {
      const index = this.data.indexOf(findUser);
      this.data.splice(index, 1);
      Message.showColorized(MessageVariant.Success, 'User deleted!');
    } else {
      Message.showColorized(MessageVariant.Error, 'User not found...');
    }
  }
}

const users = new UsersData();
console.log('\n');
console.info('???? Welcome to the UsersApp!');
console.log('====================================');
Message.showColorized(MessageVariant.Info, 'Available actions');
console.log('\n');
console.log('list - show all users');
console.log('add = add new user to the list');
console.log('edit = edit user from the list');
console.log('remove - remove user from the list');
console.log('quit - quit the app');
console.log('\n');

startApp();