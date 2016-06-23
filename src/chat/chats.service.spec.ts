import { assert } from "chai";
import "../app";

describe("this is", () => {
  let Chats;
  beforeEach(angular.mock.module("starter"));
  beforeEach(inject(function (_Chats_) {
    Chats = _Chats_;
  }));

  it("always true", () => {
    console.log("here", Chats.all());

    assert.isNull(null);
  });
});
