import { BadRequestException, Injectable } from '@nestjs/common';
import { ALPHABET } from 'src/constant';

interface CaesarParamsEncrypt {
  text: string;
  key: number;
}

interface CaesarParamsDecrypt {
  chipherText: string;
  key: number;
}

@Injectable()
export class CaesarService {
  private alphabet = ALPHABET.split('');

  public encrypt({ text, key }: CaesarParamsEncrypt) {
    try {
      const proccessEncrypt = [];
      let encrypt = '';
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === ' ') {
          encrypt += ' ';
          continue;
        }
        const findIndex = this.alphabet.indexOf(char);
        const index = (findIndex + key) % this.alphabet.length;
        encrypt += this.alphabet[index].toUpperCase();
        proccessEncrypt.push(
          `P${i + 1} = ${char} => ${findIndex} | C${
            i + 1
          } = E(${findIndex}) => (${findIndex} + ${key}) mod ${
            this.alphabet.length
          } => ${index} = ${encrypt[i]}`,
        );
      }
      return {
        encrypt,
        proccessEncrypt,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public decrypt({ chipherText, key }: CaesarParamsDecrypt) {
    try {
      let data = '';
      const proccessDecrypt = [];
      for (let i = 0; i < chipherText.length; i++) {
        const char = chipherText[i].toLowerCase();

        if (char === ' ') {
          data += ' ';
          continue;
        }

        const findIndex = this.alphabet.indexOf(char);
        let index = findIndex - key;
        if (index < 0) {
          index += this.alphabet.length;
        }

        const alphabetIndex = index % this.alphabet.length;
        data += this.alphabet[alphabetIndex].toLowerCase();

        proccessDecrypt.push(
          `C${i + 1} = ${char.toUpperCase()} => ${findIndex} | P${
            i + 1
          } = D(${findIndex}) => (${findIndex} - ${key}) mod ${
            this.alphabet.length
          } => ${alphabetIndex} = ${data[i]}`,
        );
      }
      return {
        decrypt: data,
        proccessDecrypt,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
