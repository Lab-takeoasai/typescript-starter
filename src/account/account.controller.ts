let debug = (target: any, name: string, descriptor: PropertyDescriptor) => {
  let delegate = descriptor.value;
  descriptor.value = function () {
    let args: string[] = [];
    for (let i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    console.log(`${name} in: ${args.join()}`);
    let result = delegate.apply(this, arguments);
    console.log(`${name} out: ${result}`);
    return result;
  };
  return descriptor;
};

export default class AccountController {
  public settings;
  constructor($scope) {
    "ngInject";
    this.settings = {
      enableFriends: true
    };
    this.add(1, 3);
  }
  @debug
  public add(a, b) {
    return a + b;
  }
}
