from aws_lambda_powertools import Logger
from config import settings
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

logger = Logger(service="decodingml/crawler")


class MongoDatabaseConnector:

    _instance: MongoClient = None

    def __new__(cls, *args, **kwargs) -> MongoClient:
        if cls._instance is None:
            try:
                cls._instance = MongoClient(settings.DATABASE_HOST)
            except ConnectionFailure as e:
                logger.error(f"Couldn't connect to the database: {str(e)}")
                raise

        logger.info(f"Connection to database with uri: {settings.DATABASE_HOST} successful")
        return cls._instance

    def close(self):
        if self._instance:
            self._instance.close()
            logger.info("Connected to database has been closed.")


connection = MongoDatabaseConnector()
