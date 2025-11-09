/**
 * @param {number[]} balance
 */
var Bank = function(balance) {
	this.balance = balance;
	this.n = balance.length;
};

Bank.prototype.valid_account = function(account) {
	return account >= 1 && account <= this.n;
};

/**
 * @param {number} account1
 * @param {number} account2
 * @param {number} money
 * @return {boolean}
 */
Bank.prototype.transfer = function(account1, account2, money) {
	if (!this.valid_account(account1) || !this.valid_account(account2) || this.balance[account1 - 1] < money)
		return false;

	this.balance[account1 - 1] -= money;
	this.balance[account2 - 1] += money;
	return true;
};

/**
 * @param {number} account
 * @param {number} money
 * @return {boolean}
 */
Bank.prototype.deposit = function(account, money) {
	if (!this.valid_account(account))
		return false;
	this.balance[account - 1] += money;
	return true;
};

/**
 * @param {number} account
 * @param {number} money
 * @return {boolean}
 */
Bank.prototype.withdraw = function(account, money) {
	if (!this.valid_account(account) || this.balance[account - 1] < money)
		return false;
	this.balance[account - 1] -= money;
	return true;
};

import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("2043. Simple Bank System", () => {
	it("test-1", () => {
		const bank = new Bank([10, 100, 20, 50, 30]);
		assert.strictEqual(bank.withdraw(3, 10), true);
		assert.strictEqual(bank.transfer(5, 1, 20), true);
		assert.strictEqual(bank.deposit(5, 20), true);
		assert.strictEqual(bank.transfer(3, 4, 15), false);
		assert.strictEqual(bank.withdraw(10, 50), false);
	});
});
