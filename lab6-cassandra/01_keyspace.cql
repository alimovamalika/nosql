CREATE KEYSPACE IF NOT EXISTS lab6
WITH replication = {
    'class': 'SimpleStrategy',
    'replication_factor': 1
};

USE lab6;
