import Logger from "./logger";
import sinon from "sinon";
import { expect } from "chai";
import { bossHog } from '../index.js'

describe('bossHog', function() {
  it('should be a function', function() {
    //Arrange
    const boss = bossHog;

    //Act

    //Assert
    expect(typeof boss == 'function').to.be.equal(true);
  })
});

describe('Number 3 passed to bossHog function', function() {
  it('should be equal to Boss', function() {
    //Arrange
    const boss = bossHog(3);

    //Act
    bossHog(3);

    //Assert
    expect(boss === 'Boss').to.be.equal(true);
  })
});

describe('Number 5 passed to bossHog function', function() {
  it('should be equal to Hog', function() {
    //Arrange
    const boss = bossHog(5);

    //Act
    bossHog(5);

    //Assert
    expect(boss === 'Hog').to.be.equal(true);
  })
});

describe('Number 15 passed to bossHog function', function() {
  it('should be equal to BossHog', function() {
    //Arrange
    const boss = bossHog(15);

    //Act
    bossHog(15);

    //Assert
    expect(boss === 'BossHog').to.be.equal(true);
  })
});
