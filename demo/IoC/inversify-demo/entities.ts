import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { Weapon, ThrowableWeapon, Warrior } from './interfaces';
import { TYPES } from './types';

@injectable()
class Katana implements Weapon {
  public hit() {
    return 'cut!';
  }
}

@injectable()
class Shuriken implements ThrowableWeapon {
  public throw() {
    return 'hit!';
  }
}

function parameter(tag: string) {
  return function(target: any, propertyKey: Symbol | string, parameterIndex: number) {
    console.log(tag, target, propertyKey, parameterIndex);
    return target;
  }
}

@injectable()
class Ninja implements Warrior {
  private _katana: Weapon;
  private _shuriken: ThrowableWeapon;

  public constructor(@inject(TYPES.Weapon) katana: Weapon, @inject(TYPES.ThrowableWeapon) shuriken: ThrowableWeapon) {
    this._katana = katana;
    this._shuriken = shuriken;
  }

  public fight() {
    return this._katana.hit();
  }
  public sneak() {
    return this._shuriken.throw();
  }
  // public parameterDecoratorTestFunc(@parameter('#tag') a: boolean) {
  //   return a;
  // }
}

export { Ninja, Katana, Shuriken };
