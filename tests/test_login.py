from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
import unittest

class TestLogin(unittest.TestCase):
    def setUp(self):
        # Set up Chrome WebDriver
        self.driver = webdriver.Chrome()
        self.driver.get("http://localhost:4200/login")  # Adjust URL to your local server

    def test_valid_login(self):
        driver = self.driver

        # Locate email and password fields
        email_field = driver.find_element(By.ID, "form2Example18")
        password_field = driver.find_element(By.ID, "form2Example28")
        submit_button = driver.find_element(By.XPATH, "//button[@type='submit']")

        # Enter valid credentials
        email_field.send_keys("valid_email@example.com")
        password_field.send_keys("valid_password")
        submit_button.click()

        time.sleep(2)  # Wait for the response

        # Check if redirected to the dashboard (Assuming the URL changes after login)
        self.assertIn("dashboard", driver.current_url)

    def test_invalid_login(self):
        driver = self.driver

        email_field = driver.find_element(By.ID, "form2Example18")
        password_field = driver.find_element(By.ID, "form2Example28")
        submit_button = driver.find_element(By.XPATH, "//button[@type='submit']")

        # Enter invalid credentials
        email_field.send_keys("invalid@example.com")
        password_field.send_keys("wrong_password")
        submit_button.click()

        time.sleep(2)  # Wait for the response

        # Verify error message
        error_message = driver.find_element(By.XPATH, "//p[@class='text-danger']")
        self.assertTrue(error_message.is_displayed())

    def test_empty_fields(self):
        driver = self.driver

        submit_button = driver.find_element(By.XPATH, "//button[@type='submit']")
        submit_button.click()

        time.sleep(2)

        # Check if error messages are displayed
        email_error = driver.find_element(By.XPATH, "//span[contains(text(),'Email is required')]")
        password_error = driver.find_element(By.XPATH, "//span[contains(text(),'Password is required')]")
        
        self.assertTrue(email_error.is_displayed())
        self.assertTrue(password_error.is_displayed())

    def tearDown(self):
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()
