import { expect } from "chai";
import { BossHog } from './bosshog.js';

describe("bosshog", () => {

    it("should return its input", () => {
        //Arrange
        const input = 1;

        //Act
        const result = BossHog(input);

        //Assert
        expect(input === result).to.be.equal(true);
    });

    it("should return 'Boss'", () => {
        //Arrange
        const input = 3;

        //Act
        const result = BossHog(input);

        //Assert
        expect(result === 'Boss').to.be.equal(true);
    });

    it("should return 'Hog'", () => {
        //Arrange
        const input = 5;

        //Act
        const result = BossHog(input);

        //Assert
        expect(result === 'Hog').to.be.equal(true);
    });

    it("should return 'BossHog'", () => {
        //Arrange
        const input = 15;

        //Act
        const result = BossHog(input);

        //Assert
        expect(result == 'BossHog').to.be.equal(true);
    });

  });