import { validateInput } from "../scripts/validateInput"; // Adjust the import path as needed
import { setRdays } from "../scripts/setRdays"; // Adjust the import path as needed

// Mock the setRdays function
jest.mock("../scripts/setRdays", () => ({
  setRdays: jest.fn(),
}));

describe("validateInput", () => {
  let cityInput;
  let dateInp;
  let cityError;
  let dateError;

  beforeEach(() => {
    // Set up the DOM elements
    document.body.innerHTML = `
      <input id="city" />
      <input id="date" type="date" />
      <div id="city-error" style="display: none;"></div>
      <div id="date-error" style="display: none;"></div>
    `;

    cityInput = document.getElementById("city");
    dateInp = document.getElementById("date");
    cityError = document.getElementById("city-error");
    dateError = document.getElementById("date-error");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should show error for empty city input", () => {
    cityInput.value = "";
    dateInp.value = "2024-09-01"; // Valid date

    const result = validateInput();

    expect(result).toBe(false);
    expect(cityError.style.display).toBe("block");
    expect(cityError.innerHTML).toBe("You need to enter a name of a city");
  });

  test("should show error for date in the past", () => {
    cityInput.value = "New York";
    dateInp.value = "2020-01-01"; // Past date

    setRdays.mockReturnValue(-1); // Mock setRdays to return a negative value

    const result = validateInput();

    expect(result).toBe(false);
    expect(dateError.style.display).toBe("block");
    expect(dateError.innerHTML).toBe("Date cannot be in the past");
  });
});
