"""
Вариант 1. Каталог электроники с быстрым поиском
MongoDB + PyMongo. CRUD, фильтрация, агрегация и индексы.
"""
import os
from pymongo import MongoClient, ASCENDING, TEXT
from pymongo.errors import PyMongoError

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "electronics_catalog")
COLLECTION_NAME = "products"

SAMPLE_PRODUCTS = [
    {"name":"Apple iPhone 15","category":"Смартфоны","brand":"Apple","price":349990,"stock":12,"specs":{"memory_gb":128,"color":"чёрный","screen_inches":6.1}},
    {"name":"Samsung Galaxy S24","category":"Смартфоны","brand":"Samsung","price":329990,"stock":9,"specs":{"memory_gb":256,"color":"серый","screen_inches":6.2}},
    {"name":"Xiaomi Redmi Note 13","category":"Смартфоны","brand":"Xiaomi","price":99990,"stock":25,"specs":{"memory_gb":256,"color":"синий","screen_inches":6.67}},
    {"name":"Apple iPhone 14","category":"Смартфоны","brand":"Apple","price":279990,"stock":7,"specs":{"memory_gb":128,"color":"белый","screen_inches":6.1}},
    {"name":"Samsung Galaxy A55","category":"Смартфоны","brand":"Samsung","price":189990,"stock":15,"specs":{"memory_gb":256,"color":"фиолетовый","screen_inches":6.6}},
    {"name":"Google Pixel 8","category":"Смартфоны","brand":"Google","price":299990,"stock":5,"specs":{"memory_gb":128,"color":"зелёный","screen_inches":6.2}},
    {"name":"Lenovo IdeaPad Slim 3","category":"Ноутбуки","brand":"Lenovo","price":249990,"stock":8,"specs":{"ram_gb":8,"storage_gb":512,"screen_inches":15.6}},
    {"name":"Apple MacBook Air M2","category":"Ноутбуки","brand":"Apple","price":549990,"stock":4,"specs":{"ram_gb":8,"storage_gb":256,"screen_inches":13.6}},
    {"name":"ASUS VivoBook 15","category":"Ноутбуки","brand":"ASUS","price":319990,"stock":6,"specs":{"ram_gb":16,"storage_gb":512,"screen_inches":15.6}},
    {"name":"HP Pavilion 14","category":"Ноутбуки","brand":"HP","price":379990,"stock":3,"specs":{"ram_gb":16,"storage_gb":512,"screen_inches":14}},
    {"name":"Acer Aspire 5","category":"Ноутбуки","brand":"Acer","price":289990,"stock":10,"specs":{"ram_gb":8,"storage_gb":512,"screen_inches":15.6}},
    {"name":"Dell Inspiron 16","category":"Ноутбуки","brand":"Dell","price":429990,"stock":2,"specs":{"ram_gb":16,"storage_gb":1024,"screen_inches":16}},
    {"name":"Sony WH-1000XM5","category":"Наушники","brand":"Sony","price":169990,"stock":11,"specs":{"wireless":True,"noise_canceling":True,"color":"чёрный"}},
    {"name":"Apple AirPods Pro 2","category":"Наушники","brand":"Apple","price":129990,"stock":18,"specs":{"wireless":True,"noise_canceling":True,"color":"белый"}},
    {"name":"JBL Tune 720BT","category":"Наушники","brand":"JBL","price":29990,"stock":30,"specs":{"wireless":True,"noise_canceling":False,"color":"синий"}},
    {"name":"Samsung Galaxy Buds FE","category":"Наушники","brand":"Samsung","price":44990,"stock":16,"specs":{"wireless":True,"noise_canceling":True,"color":"графит"}},
    {"name":"Logitech G Pro X","category":"Наушники","brand":"Logitech","price":69990,"stock":6,"specs":{"wireless":False,"noise_canceling":False,"color":"чёрный"}},
    {"name":"JBL Flip 6","category":"Колонки","brand":"JBL","price":59990,"stock":14,"specs":{"power_w":30,"wireless":True,"waterproof":True}},
    {"name":"Sony SRS-XB100","category":"Колонки","brand":"Sony","price":24990,"stock":20,"specs":{"power_w":5,"wireless":True,"waterproof":True}},
    {"name":"Apple HomePod mini","category":"Колонки","brand":"Apple","price":54990,"stock":8,"specs":{"power_w":20,"wireless":True,"waterproof":False}},
    {"name":"Xiaomi Mi Smart Speaker","category":"Колонки","brand":"Xiaomi","price":19990,"stock":19,"specs":{"power_w":12,"wireless":True,"waterproof":False}},
    {"name":"Samsung 55 QLED","category":"Телевизоры","brand":"Samsung","price":399990,"stock":5,"specs":{"screen_inches":55,"resolution":"4K","smart_tv":True}},
    {"name":"LG OLED C3 48","category":"Телевизоры","brand":"LG","price":499990,"stock":3,"specs":{"screen_inches":48,"resolution":"4K","smart_tv":True}},
    {"name":"Xiaomi TV A Pro 43","category":"Телевизоры","brand":"Xiaomi","price":149990,"stock":9,"specs":{"screen_inches":43,"resolution":"4K","smart_tv":True}},
    {"name":"Hisense 50A6K","category":"Телевизоры","brand":"Hisense","price":189990,"stock":7,"specs":{"screen_inches":50,"resolution":"4K","smart_tv":True}},
    {"name":"Canon EOS R50","category":"Фотоаппараты","brand":"Canon","price":399990,"stock":4,"specs":{"megapixels":24.2,"video_4k":True}},
    {"name":"Sony Alpha ZV-E10","category":"Фотоаппараты","brand":"Sony","price":349990,"stock":5,"specs":{"megapixels":24.2,"video_4k":True}},
    {"name":"Nikon Z30","category":"Фотоаппараты","brand":"Nikon","price":329990,"stock":3,"specs":{"megapixels":20.9,"video_4k":True}},
    {"name":"Logitech MX Master 3S","category":"Аксессуары","brand":"Logitech","price":54990,"stock":12,"specs":{"wireless":True,"dpi":8000}},
    {"name":"Logitech K380","category":"Аксессуары","brand":"Logitech","price":19990,"stock":22,"specs":{"wireless":True,"layout":"RU/EN"}},
    {"name":"Samsung T7 SSD 1TB","category":"Аксессуары","brand":"Samsung","price":49990,"stock":13,"specs":{"storage_gb":1000,"interface":"USB-C"}},
    {"name":"Kingston DataTraveler 128GB","category":"Аксессуары","brand":"Kingston","price":4990,"stock":40,"specs":{"storage_gb":128,"interface":"USB-A"}},
    {"name":"Anker PowerCore 20K","category":"Аксессуары","brand":"Anker","price":24990,"stock":17,"specs":{"capacity_mah":20000,"fast_charge":True}},
    {"name":"Apple Watch SE","category":"Умные часы","brand":"Apple","price":139990,"stock":8,"specs":{"gps":True,"water_resistant":True}},
    {"name":"Samsung Galaxy Watch 6","category":"Умные часы","brand":"Samsung","price":119990,"stock":10,"specs":{"gps":True,"water_resistant":True}},
    {"name":"Xiaomi Smart Band 8","category":"Умные часы","brand":"Xiaomi","price":19990,"stock":24,"specs":{"gps":False,"water_resistant":True}},
    {"name":"Garmin Venu 3","category":"Умные часы","brand":"Garmin","price":229990,"stock":3,"specs":{"gps":True,"water_resistant":True}},
]

class ElectronicsCatalog:
    def __init__(self, uri=MONGO_URI, db_name=DB_NAME):
        self.client = MongoClient(uri, serverSelectionTimeoutMS=3000)
        self.db = self.client[db_name]
        self.products = self.db[COLLECTION_NAME]

    def ping(self):
        self.client.admin.command("ping")
        return True

    def create_indexes(self):
        self.products.create_index([("category", ASCENDING), ("price", ASCENDING)], name="category_price_idx")
        self.products.create_index([("brand", ASCENDING)], name="brand_idx")
        self.products.create_index([("name", TEXT), ("brand", TEXT)], name="product_text_idx")

    def seed(self, reset=False):
        if reset:
            self.products.delete_many({})
        if self.products.count_documents({}) == 0:
            self.products.insert_many(SAMPLE_PRODUCTS)
        return self.products.count_documents({})

    def create_product(self, product):
        if not product.get("name") or not product.get("category") or product.get("price") is None:
            raise ValueError("Необходимы name, category и price")
        if product["price"] < 0:
            raise ValueError("Цена не может быть отрицательной")
        return self.products.insert_one(product).inserted_id

    def get_product(self, product_id):
        from bson import ObjectId
        return self.products.find_one({"_id": ObjectId(product_id)})

    def update_price(self, product_id, new_price):
        from bson import ObjectId
        if new_price < 0:
            raise ValueError("Цена не может быть отрицательной")
        return self.products.update_one({"_id": ObjectId(product_id)}, {"$set": {"price": new_price}}).modified_count

    def delete_product(self, product_id):
        from bson import ObjectId
        return self.products.delete_one({"_id": ObjectId(product_id)}).deleted_count

    def search(self, keyword):
        return list(self.products.find({"$or":[{"name":{"$regex":keyword,"$options":"i"}},{"brand":{"$regex":keyword,"$options":"i"}}]}, {"name":1,"brand":1,"category":1,"price":1}).limit(20))

    def filter_products(self, category=None, min_price=None, max_price=None, brand=None, spec_key=None, spec_value=None):
        query = {}
        if category: query["category"] = category
        if brand: query["brand"] = brand
        price = {}
        if min_price is not None: price["$gte"] = min_price
        if max_price is not None: price["$lte"] = max_price
        if price: query["price"] = price
        if spec_key:
            query[f"specs.{spec_key}"] = spec_value
        return list(self.products.find(query, {"name":1,"category":1,"brand":1,"price":1,"specs":1}).sort("price", ASCENDING))

    def average_price_by_category(self):
        return list(self.products.aggregate([
            {"$group":{"_id":"$category","average_price":{"$avg":"$price"},"count":{"$sum":1}}},
            {"$sort":{"average_price":-1}}
        ]))

    def count_by_category(self):
        return list(self.products.aggregate([
            {"$group":{"_id":"$category","count":{"$sum":1}}},
            {"$sort":{"count":-1}}
        ]))

    def low_stock(self, threshold=5):
        return list(self.products.find({"stock":{"$lte":threshold}}, {"name":1,"stock":1,"price":1}).sort("stock", ASCENDING))

    def explain_category_price(self, category, max_price):
        return self.products.find({"category":category,"price":{"$lte":max_price}}).explain()

    def close(self):
        self.client.close()

def printable(doc):
    if not doc: return "Не найдено"
    doc = dict(doc)
    doc["_id"] = str(doc.get("_id", ""))
    return doc

if __name__ == "__main__":
    catalog = ElectronicsCatalog()
    try:
        catalog.ping()
        print("MongoDB подключена.")
        print("Добавлено/уже существует записей:", catalog.seed())
        catalog.create_indexes()
        print("\n1. Поиск по слову 'Apple':")
        for item in catalog.search("Apple")[:5]: print(printable(item))
        print("\n2. Ноутбуки до 350000 ₸:")
        for item in catalog.filter_products(category="Ноутбуки", max_price=350000): print(printable(item))
        print("\n3. Средняя цена по категориям:")
        for item in catalog.average_price_by_category(): print(item)
        print("\n4. Категории и количество товаров:")
        for item in catalog.count_by_category(): print(item)
        print("\n5. Товары с остатком <= 5:")
        for item in catalog.low_stock(5): print(printable(item))
        print("\n6. Беспроводные наушники:")
        for item in catalog.filter_products(category="Наушники", spec_key="wireless", spec_value=True): print(printable(item))
        print("\n7. Samsung от 100000 до 400000 ₸:")
        for item in catalog.filter_products(brand="Samsung", min_price=100000, max_price=400000): print(printable(item))
        print("\n8. Сравнение запроса с индексом — explain executionStats:")
        explain = catalog.explain_category_price("Ноутбуки", 350000)
        print(explain.get("executionStats", {}))
    except PyMongoError as exc:
        print("Ошибка MongoDB:", exc)
        print("Проверьте, что MongoDB запущена и MONGO_URI указан верно.")
    finally:
        catalog.close()
