import Ammo from './ammo';
import Character from './character';
import PowerUpAmmo from './powerup-ammo';

class ObjectFactory {
    create (objectType) {
        switch(objectType) {
            case 'Ammo':
                return new Ammo();
                break;
            case 'Character':
                return new Character();
                break;
            case 'PowerUpAmmo':
                return new PowerUpAmmo();
                break;
        }
    }
}

export default ObjectFactory;