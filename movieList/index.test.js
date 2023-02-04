const { Builder, Capabilities, By } = require("selenium-webdriver");
require("chromedriver");
const driver = new Builder().withCapabilities(Capabilities.chrome()).build();
const targetLink = "http://127.0.0.1:5500/movieList/index.html";

beforeAll(async () => {
  await (await driver).get(targetLink);
});

afterAll(async () => {
  await (await driver).quit();
});

const addMovie = async (driver, movie) => {
  await driver.findElement(By.css("input")).sendKeys(`${movie}\n`);
  let resultText = await driver.findElement(By.css("span")).getText();
  expect(resultText).toContain(movie);
};

const crossMovie = async (driver, movie) => {
  let movieItem = await driver.findElement(
    By.xpath(`//span[text()="${movie}"]`)
  );
  movieItem.click();
  // await driver.sleep(3000);
  let movieClass = await movieItem.getAttribute("class");
  expect(movieClass).toContain("checked");
};

const deleteMovie = async (driver, movie) => {
  let movieDeleteBtn = await driver.findElement(
    By.xpath(`//span[text()="${movie}"]/following-sibling::button`)
  );
  movieDeleteBtn.click();
  let listText = await driver.findElement(By.css("ul")).getText();
  expect(listText).toBe("");
};

test("Test add movie function", async () => {
  await addMovie(driver, "Tenet");
});

test("Test cross movie function", async () => {
  await crossMovie(driver, "Tenet");
});

test("Test delete movie function", async () => {
  await deleteMovie(driver, "Tenet");
});
