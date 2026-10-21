import unittest
from unittest.mock import MagicMock
from src.catalog import ElectronicsCatalog, SAMPLE_PRODUCTS

class CatalogUnitTests(unittest.TestCase):
    def test_dataset_has_at_least_30_products(self):
        self.assertGreaterEqual(len(SAMPLE_PRODUCTS), 30)

    def test_each_product_has_required_fields(self):
        for p in SAMPLE_PRODUCTS:
            self.assertIn("name", p)
            self.assertIn("category", p)
            self.assertIn("brand", p)
            self.assertGreaterEqual(p["price"], 0)

    def test_categories_are_not_empty(self):
        self.assertTrue(all(p["category"].strip() for p in SAMPLE_PRODUCTS))

if __name__ == "__main__":
    unittest.main()
