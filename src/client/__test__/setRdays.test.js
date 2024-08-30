const { setRdays } = require("../scripts/setRdays"); 
const now = new Date();
const futureDate = new Date();
futureDate.setDate(now.getDate() + 5); 

test("give me the remaining days from now to the date I will set as the parameter", () => {
  expect(setRdays(futureDate)).toBe(5); 
});
