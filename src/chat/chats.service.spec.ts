import t from "./chats.service";
import { assert } from "chai";
import "../app";

describe("Chats service ", () => {
  let Chats: t;
  beforeEach(angular.mock.module("starter"));
  beforeEach(inject(function (_Chats_, _$httpBackend_) {
    Chats = _Chats_;
  }));

  it("(this is always true)", () => {
    assert.isNull(null);
  });

  it("has 5 columns", () => {
    assert.equal(5, Chats.all().length);
  });

  it(" has a man whose name is 'Max Lynx' in the second", () => {
    assert.equal("Max Lynx", Chats.get(1).name);
  });
});
