from src.catalog import ElectronicsCatalog

if __name__ == "__main__":
    catalog = ElectronicsCatalog()
    try:
        catalog.ping()
        count = catalog.seed(reset=True)
        catalog.create_indexes()
        print(f"Готово: загружено {count} товаров, индексы созданы.")
    finally:
        catalog.close()
