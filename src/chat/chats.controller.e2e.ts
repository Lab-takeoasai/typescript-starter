import { assert } from "chai";

describe("Chat controller ", () => {

  beforeEach(function() {
    browser.get("/#/tab/chats");
  });

  it("(this is always true)", () => {
    assert.isNull(null);
  });

  it("'s title is 'Chats'", () => {
    return browser.getTitle().then(title => {
      assert.equal(title, "Chats");
    });
  });
});
